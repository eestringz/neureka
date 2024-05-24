import os
import json
import time
from sentence_transformers import SentenceTransformer
from bareunpy import Tagger

# 바른AI를 사용해 형태소 분석을 진행합니다
# 형태소 분석을 위해서 Docker 환경에 GPU 버전으로 컨테이너와 이미지를 설치했습니다.
# 도커 이미지 설치 문서 URL : https://bareun.ai/docs -> 설치 -> 도커로 설치
# 바른 image gpu버전  도커 허브 : https://hub.docker.com/r/bareunai/bareun-gpu
# API_KEY = "koba-2XBK6DY-HNAE4VY-RYZWFHA-GCGGG2A"
API_KEY = "koba-E6NTYJA-XRXUDDI-U26NETA-QDNVN2A"
# print("API 키 입니다." , API_KEY)
tagger = Tagger(API_KEY, 'localhost', 5757)  # KPF에서 제공하는 바른 형태소분석기

model = SentenceTransformer('ddobokki/klue-roberta-small-nli-sts')

# 키워드에 연관된 기사
keyword_news = {}

def keyword_nouns(text):
    tokenized_doc = tagger.pos(text)
    tokenized_nouns = ' '.join([word[0] for word in tokenized_doc if word[1] == 'NNG' or word[1] == 'NNP'])
    return tokenized_nouns


def keyword_nouns_frequency(top_keywords, text):
    k_n_freq = []
    text_array = text.split()
    for i in top_keywords:
        for j in text_array:
            if i == j:
                k_n_freq.append(i)
    return k_n_freq


if __name__ == "__main__":

    # 스크립트의 현재 디렉토리를 기반으로 파일의 경로를 설정합니다.
    newsDataTime = time.time()
    current_directory = os.path.dirname(__file__)
    # file_path = os.path.join(current_directory, 'data/lda_test_data.json')
    file_path = os.path.join(current_directory, 'data/lda_news_data.json')
    with open(file_path, 'r', encoding='utf-8') as file:
        news_data = json.load(file)

    print(len(news_data))
    print("데이터 처리 총 시간: ", time.time() - newsDataTime)

    len_news_data = len(news_data)

    with open("stop_words.txt", "r", encoding="utf-8") as file:
        stop_words = [word.rstrip() for word in file.readlines()]
    # print(stop_words)
    a = time.time()
    count = 0
    for i in range(len_news_data):
        start_time = time.time()
        # url = news_data[i]["article_link"]
        # text = keyword_extraction(url)
        # text = news_data[i]["article"]
        text = news_data[i]
        # if not text: # text가 비어있는 경우
        #     news_data[i]["nouns"] = []
        #     continue

        # news_data[i]["id"] = i
        # news_data[i]["keyword"], news_data[i]["nouns"] = keyword_ext(i, text)
        # keyword_now, nouns_now = keyword_ext(i, text)
        # news_data[i]["keyword"] = keyword_now
        # news_data[i]["key_nouns_freq"] = keyword_nouns_frequency(keyword_now, nouns_now)
        # news_data[i]["nouns"] = keyword_nouns(text).split()
        tokenized_text = keyword_nouns(text).split()
        # news_data[i] = tokenized_text.apply(lambda x: [word for word in x if word not in (stop_words)])
        news_data[i] = [token for token in tokenized_text if token not in stop_words and len(token) >= 2]

        print(f'{i}번째 기사 작업 시간: {time.time() - start_time}초')
    print("데이터 처리 총 시간: ", time.time() - a)

    # with open('data/ssafy_dataset_news_2023.json', 'w', encoding='utf-8') as file:
    #     json.dump(news_data, file, ensure_ascii=False, indent=4)  # 한글 등 유니코드 문자를 그대로 유지

    with open('data/lda_test_data_filtered.json', 'w', encoding='utf-8') as file:
        json.dump(news_data[:len_news_data], file, ensure_ascii=False, indent=4)  # 한글 등 유니코드 문자를 그대로 유지

    print("저장완료")

    # with open('data/ssafy_dataset_news_2023_data.json', 'w', encoding='utf-8') as file:
    #     json.dump(keyword_news, file, ensure_ascii=False, indent=4)  # 한글 등 유니코드 문자를 그대로 유지import time


def text_through_LDA_probability(text):
    import gensim
    # 기사본문(텍스트) 토큰화.
    tokenized_text_TTLP = keyword_nouns(text).split()

    stop_words_path = os.path.abspath(
        os.path.join(os.path.dirname(__file__), '..', 'LDA', 'stop_words.txt'))

    # 불용어 불러오기
    with open(stop_words_path, "r", encoding="utf-8") as file:
        stop_word_TTLP = [word.rstrip() for word in file.readlines()]
    # 불용어 처리
    tokenized_text_TTLP = [token for token in tokenized_text_TTLP if token not in stop_word_TTLP and len(token) >= 2]

    from datetime import date
    # LDA 모델이 저장된 경로
    # today_folder_path = f"model/{date.today()}"

    # today_folder_path = "/model/main_model"
    # today_folder_path = "LDA/model/main_model"

    today_folder_path = os.path.abspath(
        os.path.join(os.path.dirname(__file__), '..', 'LDA', 'model', '2024-03-20'))
    # 저장된 LDA모델 불러오기
    ldamodel = gensim.models.ldamodel.LdaModel.load(today_folder_path + '/lda_model_crawled')

    # tokenized text를 이용해 dictionary와 corpus 만들기
    # dictionary = gensim.corpora.Dictionary(data)
    dictionary = ldamodel.id2word

    corpus = dictionary.doc2bow(tokenized_text_TTLP)


    topics_list = [
        "반도체",
        "기술",
        "경영",
        "금융",
        "경영",
        "금융",
        "가상화폐",
        "금융",
        "유가증권",
        "해외토픽",
        "기타",
        "정치",
        "기술",
        "해외토픽",
        "반도체",
        "해외토픽",
        "경영",
        "경영",
        "유가증권",
        "유가증권"
    ]

    doc_topics = ldamodel.get_document_topics(corpus)
    # 이 기사가 특정 토픽에 해당할 확률을 계산하여 확률이 가장 큰 군집을 반환함
    max_prob = 0
    topic_name = ""
    for topic, prob in doc_topics:
        if max_prob < round(prob * 100, 2):
            max_prob = round(prob * 100, 2)
            topic_name = topics_list[topic]
        # max_prob = max(max_prob, round(prob*100, 2))

        # print(f"토픽 {topic}: 확률 {round(prob*100, 2)}")
    if(max_prob < 33) : return "기타"
    return topic_name