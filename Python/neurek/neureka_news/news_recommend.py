from neurek.neureka_news.models import DetailsArticle, SummaryArticle
from neurek.neureka_news.LDA.keyword_for_lda import text_through_LDA_probability
import requests
import numpy as np
from bs4 import BeautifulSoup
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from bareunpy import Tagger
import time
from bson.objectid import ObjectId
import pprint
from concurrent.futures import ThreadPoolExecutor, as_completed
import os
import random


#### 크롤링 후 처리
# 바른AI를 사용해 형태소 분석을 진행
# https://bareun.ai/docs
API_KEY = "koba-E6NTYJA-XRXUDDI-U26NETA-QDNVN2A"
tagger = Tagger(API_KEY, 'localhost', 5757)

# Sentence Transformer 모델 로드
model = SentenceTransformer('ddobokki/klue-roberta-small-nli-sts')


def article_extraction(url):
    response = requests.get(url)
    time.sleep(0.2)  # 서버에 과부하를 주지 않기 위해 잠시 대기
    soup = BeautifulSoup(response.content, "html.parser")

    # `soup.find("article")`의 결과가 None인 경우를 처리
    article = soup.find("article")
    if article:
        article_text = article.get_text(strip=True)
    else:
        article_text = {"error": "뭔가 잘못된것 같아요"}

    return article_text


def mmr(doc_embedding, candidate_embeddings, words, top_n, diversity):
    word_doc_similarity = cosine_similarity(candidate_embeddings, doc_embedding.reshape(1, -1))
    word_similarity = cosine_similarity(candidate_embeddings)

    keywords_idx = [np.argmax(word_doc_similarity)]
    candidates_idx = [i for i in range(len(words)) if i != keywords_idx[0]]

    for _ in range(top_n - 1):
        candidate_similarities = word_doc_similarity[candidates_idx, :]
        target_similarities = np.max(word_similarity[candidates_idx][:, keywords_idx], axis=1)

        mmr_values = (1 - diversity) * candidate_similarities.T - diversity * target_similarities
        mmr_idx = candidates_idx[np.argmax(mmr_values)]

        keywords_idx.append(mmr_idx)
        candidates_idx.remove(mmr_idx)

    top_keywords = [words[idx] for idx in keywords_idx]
    return top_keywords


def keyword_ext(text, stop_words):
    tokenized_doc = tagger.pos(text)
    # stop_words를 고려하여 불용어가 아닌 명사만 추가
    tokenized_nouns = ' '.join([word[0] for word in tokenized_doc if word[1] in ['NNG', 'NNP'] and word[0] not in stop_words])

    n_gram_range = (1, 1)
    count = CountVectorizer(ngram_range=n_gram_range).fit([tokenized_nouns])
    candidates = count.get_feature_names_out()

    doc_embedding = model.encode([text])[0]
    candidate_embeddings = model.encode(candidates)

    return mmr(doc_embedding, candidate_embeddings, candidates, top_n=3, diversity=0.3)

def load_stop_words(file_name):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_dir, file_name)
    with open(file_path, 'r', encoding='utf-8') as file:
        stop_words = set(line.strip() for line in file)

    return stop_words

def fetch_article_details(article_id):
    article = DetailsArticle.find_by_id(article_id)
    article['_id'] = str(article['_id'])

    try:
        response = requests.get(article['detail_url'])
        time.sleep(0.2)  # 서버에 과부하를 주지 않기 위해 잠시 대기
        soup = BeautifulSoup(response.content, "html.parser")

        img_src = None  # 기본값 설정
        img_tag = soup.select_one('#img1')
        if img_tag and img_tag.has_attr('data-src'):
            img_src = img_tag['data-src']
        else:
            alternative_tag = soup.select_one('#contents > div._VOD_PLAYER_WRAP')
            if alternative_tag and alternative_tag.has_attr('data-cover-image-url'):
                img_src = alternative_tag['data-cover-image-url']

        return {"_id": article['_id'], "title": article['detail_title'], "thumbnail_url": img_src}
    except Exception as e:
        print(f"Error fetching article details: {e}")
        return None


def recommend_news(id_str):
    try:
        _id = ObjectId(id_str)  # Convert string ID to ObjectId
    except:
        print("Invalid ID format.")
        return []
    # 해당 ID에 해당하는 기사
    article_data = DetailsArticle.find_by_id(_id)

    # 불러온 내용이 있는지 확인
    if article_data:
        # 그 기사에 topic이 존재하는지 확인하고, 없을 때 topic과 keywords를 추가
        if DetailsArticle.is_topic_empty_for_id(_id):
            stop_words_path = "LDA/stop_words.txt"
            stop_words = load_stop_words(stop_words_path)

            article_text = article_extraction(article_data['detail_url'])

            new_topic = text_through_LDA_probability(article_text)
            new_keywords = keyword_ext(article_text, stop_words)

            update_success = DetailsArticle.update_topic_and_keywords(_id, new_topic, new_keywords)

            if update_success:
                print("Topic and keywords were successfully updated.")
            else:
                print("Failed to update topic and keywords.")
        else:
            new_keywords = article_data['detail_keywords']
            print("Article already has a topic.")

        # 비슷한 기사를 불러오기
        similar_ids = DetailsArticle.find_urls_by_keywords_sorted_by_average_rating(new_keywords)

        summary_article = []
        for article_id in similar_ids:
            article = SummaryArticle.find_by_id(article_id)
            if article is not None and str(article['_id']) != _id:
                article['_id'] = str(article['_id'])
                summary_article.append(article)

        result = []
        if len(summary_article) != 0:
            print("그냥 뉴스")
            for article in summary_article:
                temp = {"_id": article['_id'],
                        "title": article['article_title'],
                        "thumbnail_url": article['thumbnail_url']}
                result.append(temp)

        else:
            # 기업뉴스에서 들어왔을 경우
            print("기업 뉴스(기사 요약본에 없는경우)")
            with ThreadPoolExecutor(max_workers=5) as executor:
                future_to_article_id = {
                    executor.submit(fetch_article_details, article_id): article_id for article_id in similar_ids
                }
                for future in as_completed(future_to_article_id):
                    article_details = future.result()
                    if article_details:
                        result.append(article_details)

        # 리스트 섞기
        random.shuffle(result)

        return result
    else:
        print("추천 기사를 받는데 오류입니다.")
        return []


# # #확인용
# if __name__ == "__main__":
#     start_time = time.time()
#
#     recommend_news_list = []
#     pprint.pprint(recommend_news("660a622b95108de5536dce2d"))
#     end_time = time.time()  # 종료 시간 저장
#     elapsed_time = end_time - start_time  # 경과 시간 계산
#
#     print(f"Execution time: {elapsed_time} seconds")