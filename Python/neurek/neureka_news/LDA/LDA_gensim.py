import json
import gensim
import pandas as pd

def string_to_array(string):
    # 공백을 기준으로 문자열을 분할하여 배열로 변환
    word_array = []
    if(string != []):
        word_array = string.split()
    return word_array


# 처음부터 100개의 데이터만 읽기
with open('lda_test_data_filtered.json', 'r', encoding='utf-8') as f:
    data = json.load(f)


# 가져온 키워드를 바탕으로 word dictionary 만들기
dictionary = gensim.corpora.Dictionary(data)

# 가져온 키워드와 word dictionary를 바탕으로 corpus 만들기
corpus = [dictionary.doc2bow(text) for text in data]


# # =========================
# # 모델 학습하기. 가져온 데이터를 이용하여 최초 1회 실행하면 이후 학습된 모델 데이터를 저장합니다
# # 토픽의 개수 Hyper params
# NUM_TOPICS = 20
# # corpus와 word dictionary, 기타 hyper params로 LdaModel 학습하기 및 토픽 리스트 추출하기
# ldamodel = gensim.models.ldamodel.LdaModel(corpus, num_topics = NUM_TOPICS, id2word=dictionary, passes=15)
#
# # 학습된 LDA모델 따로 저장하기
# # 모델 저장
# import os
# from datetime import date
# # 오늘 날짜 얻기
# today_folder_path = f"model/{date.today()}"
# if not os.path.exists(today_folder_path):
#     os.makedirs(today_folder_path)
#     print(f"'{today_folder_path}' 폴더가 생성되었습니다.")
# ldamodel.save(today_folder_path+'/lda_model_crawled')
# # =========================


# =========================
# 저장된 LDA모델 불러오기
from datetime import date
# today_folder_path = f"model/{date.today()}"
today_folder_path = "model/2024-03-20"
ldamodel = gensim.models.ldamodel.LdaModel.load(today_folder_path+ '/lda_model_crawled')
# =========================

# # =========================
# # 토픽의 단어 4개만 추출하여 출력하기
# import re
# topics = ldamodel.print_topics(num_words=10)
# countTmp = 1
# for topic in topics:
#     # print(topic)
#     print(countTmp, end=" 번째 : ")
#     matches = re.findall(r'"([^"]*)"', topic[1])
#     for match in matches:
#         print(match, end=" | ")
#     print()
#     print()
#     countTmp += 1
# =========================


# # =========================
# # 기존 모델에 새로운 데이터를 추가해 학습하기
# ldamodel.update(corpus)
# # =========================


# # =========================
# # 추출한 토픽 리스트를 바탕으로 특정 기사가 어느 토픽에 해당할 확률이 가까운지 계산하기
# print(len(corpus))
# for i in range(1,6):
#     doc_topics = ldamodel.get_document_topics(corpus[i])
#     print(f"{i}번째 기사")
#     for topic, prob in doc_topics:
#         print(f"토픽 {topic}: 확률 {round(prob*100, 2)}")
# # =========================


# # =========================
# # 문서별 토픽 분포를 나타내는 함수입니다
# def make_topictable_per_doc(ldamodel, corpus):
#     topics = []

#     # 몇 번째 문서인지를 의미하는 문서 번호와 해당 문서의 토픽 비중을 한 줄씩 꺼내온다.
#     for i, topic_list in enumerate(ldamodel[corpus]):
#         doc = topic_list[0] if ldamodel.per_word_topics else topic_list
#         doc = sorted(doc, key=lambda x: (x[1]), reverse=True)

#         # 모든 문서에 대해서 각각 아래를 수행
#         for j, (topic_num, prop_topic) in enumerate(doc): #  몇 번 토픽인지와 비중을 나눠서 저장한다.
#             if j == 0:  # 정렬을 한 상태이므로 가장 앞에 있는 것이 가장 비중이 높은 토픽
#                 topics.append([int(topic_num), round(prop_topic, 4), topic_list])
#                 break

#     # 리스트를 데이터프레임으로 변환
#     topic_table = pd.DataFrame(topics, columns=['Topic', 'Weight', 'Topic_List'])
#     return topic_table

# topictable = make_topictable_per_doc(ldamodel, corpus)
# topictable = topictable.reset_index() # 문서 번호을 의미하는 열(column)로 사용하기 위해서 인덱스 열을 하나 더 만든다.
# topictable.columns = ['문서 번호', '가장 비중이 높은 토픽', '가장 높은 토픽의 비중', '각 토픽의 비중']
# # 문서별 토픽 분포 나타내기
# print("===============================================================================================")
# print(topictable[:20])
# # =========================


# =========================
# LDA 시각화하기
import pyLDAvis
import pyLDAvis.gensim_models as gensimvis

# 학습된 LDA 모델을 시각화합니다. 토픽별 단어 분포를 나타냅니다
vis_data = gensimvis.prepare(ldamodel, corpus, dictionary)
# 시각화 자료 display(작동안함)
# pyLDAvis.display(vis_data)

# 시각화 데이터를 저장합니다.
pyLDAvis.save_html(vis_data, 'lda_visualization.html')
# =========================