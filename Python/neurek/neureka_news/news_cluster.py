import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from neurek.neureka_news.models import SummaryArticle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics import pairwise_distances_argmin_min
from bareunpy import Tagger
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('ddobokki/klue-roberta-small-nli-sts')
API_KEY = "koba-E6NTYJA-XRXUDDI-U26NETA-QDNVN2A"
tagger = Tagger(API_KEY, 'localhost', 5757)  # KPF에서 제공하는 바른 형태소분석기

# 불용어
# 현재 스크립트 파일의 경로를 가져옵니다.
current_file_path = os.path.abspath(__file__)
# 현재 스크립트 파일의 디렉토리를 가져옵니다.
current_dir = os.path.dirname(current_file_path)
# stop_words.txt 파일의 상대 경로를 생성합니다.
stop_words_path = os.path.join(current_dir, 'LDA', 'stop_words.txt')
# 이제 파일을 열 수 있습니다.
with open(stop_words_path, 'r', encoding='utf-8') as file:
    stop_words = set(line.strip() for line in file)

def keyword_nouns(text):
    tokenized_doc = tagger.pos(text)
    tokenized_nouns = ' '.join([word[0] for word in tokenized_doc if word[1] in ['NNG', 'NNP'] and word[0] not in stop_words])
    return tokenized_nouns


def kmeans_cluster(id_list):
    # _id 리스트가 비었을 경우 빈 리스트 반환
    if not id_list:
        return []

    # _id 리스트의 길이가 4 미만이면 클러스터링 없이 바로 결과 반환
    if len(id_list) < 4:
        search_result = []
        for article_id in id_list:
            article = SummaryArticle.find_by_id(article_id)

            if article:
                article['_id'] = str(article['_id'])
                search_result.append(article)
        return search_result

    # _id 리스트의 길이가 4 이상일 때는 아래의 로직을 실행
    nouns_list = []
    # 텍스트 벡터화
    tfidf_vectorizer = TfidfVectorizer()

    for _id in id_list:
        article = SummaryArticle.find_by_id(_id)
        if article and 'nouns' in article:
            nouns_list.append(article['nouns'])

    # 명사 리스트를 텍스트 벡터화
    if nouns_list:
        tfidf_matrix = tfidf_vectorizer.fit_transform(nouns_list)

        # KMeans 클러스터링
        kmeans = KMeans(n_clusters=4, random_state=42).fit(tfidf_matrix)

        # 클러스터의 중심에 가장 가까운 기사를 선택
        closest, _ = pairwise_distances_argmin_min(kmeans.cluster_centers_, tfidf_matrix)
        representative_ids = [id_list[idx] for idx in closest]

        search_result = []
        for article_id in representative_ids:
            article = SummaryArticle.find_by_id(article_id)
            if article:
                article['_id'] = str(article['_id'])
                search_result.append(article)

        return search_result
    else:
        # 명사 리스트가 비어 있는 경우에 대한 처리
        return []
