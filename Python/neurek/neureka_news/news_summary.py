# -*- coding: utf-8 -*-
import torch
from transformers import PreTrainedTokenizerFast
from transformers import BartForConditionalGeneration
import requests
import time
from bs4 import BeautifulSoup
from neurek.neureka_news.models import DetailsArticle

model_type = 2
if model_type == 1:
    tokenizer = PreTrainedTokenizerFast.from_pretrained('ainize/kobart-news')
    model = BartForConditionalGeneration.from_pretrained('ainize/kobart-news')
elif model_type == 2:
    tokenizer = PreTrainedTokenizerFast.from_pretrained('gogamza/kobart-summarization')
    model = BartForConditionalGeneration.from_pretrained('gogamza/kobart-summarization')
elif model_type == 3:
    tokenizer = PreTrainedTokenizerFast.from_pretrained('digit82/kobart-summarization')
    model = BartForConditionalGeneration.from_pretrained('digit82/kobart-summarization')


example_text = """
1일 오후 9시까지 최소 20만3220명이 코로나19에 신규 확진됐다. 또다시 동시간대 최다 기록으로, 사상 처음 20만명대에 진입했다.
방역 당국과 서울시 등 각 지방자치단체에 따르면 이날 0시부터 오후 9시까지 전국 신규 확진자는 총 20만3220명으로 집계됐다.
국내 신규 확진자 수가 20만명대를 넘어선 것은 이번이 처음이다.
동시간대 최다 기록은 지난 23일 오후 9시 기준 16만1389명이었는데, 이를 무려 4만1831명이나 웃돌았다. 전날 같은 시간 기록한 13만3481명보다도 6만9739명 많다.
확진자 폭증은 3시간 전인 오후 6시 집계에서도 예견됐다.
오후 6시까지 최소 17만8603명이 신규 확진돼 동시간대 최다 기록(24일 13만8419명)을 갈아치운 데 이어 이미 직전 0시 기준 역대 최다 기록도 넘어섰다. 역대 최다 기록은 지난 23일 0시 기준 17만1451명이었다.
17개 지자체별로 보면 서울 4만6938명, 경기 6만7322명, 인천 1만985명 등 수도권이 12만5245명으로 전체의 61.6%를 차지했다. 서울과 경기는 모두 동시간대 기준 최다로, 처음으로 각각 4만명과 6만명을 넘어섰다.
비수도권에서는 7만7975명(38.3%)이 발생했다. 제주를 제외한 나머지 지역에서 모두 동시간대 최다를 새로 썼다.
부산 1만890명, 경남 9909명, 대구 6900명, 경북 6977명, 충남 5900명, 대전 5292명, 전북 5150명, 울산 5141명, 광주 5130명, 전남 4996명, 강원 4932명, 충북 3845명, 제주 1513명, 세종 1400명이다.
집계를 마감하는 자정까지 시간이 남아있는 만큼 2일 0시 기준으로 발표될 신규 확진자 수는 이보다 더 늘어날 수 있다. 이에 따라 최종 집계되는 확진자 수는 21만명 안팎을 기록할 수 있을 전망이다.
한편 전날 하루 선별진료소에서 이뤄진 검사는 70만8763건으로 검사 양성률은 40.5%다. 양성률이 40%를 넘은 것은 이번이 처음이다. 확산세가 계속 거세질 수 있다는 얘기다.
이날 0시 기준 신규 확진자는 13만8993명이었다. 이틀 연속 13만명대를 이어갔다.
"""


def news_summary_id(_id):
    article_data = DetailsArticle.find_by_id(_id)
    url = article_data['detail_url']
    title = article_data['detail_title']

    response = requests.get(url)
    time.sleep(0.2)  # 서버에 과부하를 주지 않기 위해 잠시 대기
    soup = BeautifulSoup(response.content, "html.parser")

    # `soup.find("article")`의 결과가 None인 경우를 처리
    article = soup.find("article")
    if article:
        article_text = article.get_text(strip=True)
    else:
        article_text = {"error": "뭔가 잘못된 것 같아요"}

    return news_summary(article_text), title

def news_summary(text):
    # 토크나이저를 사용하여 뉴스기사 원문을 모델이 인식할 수 있는 토큰형태로 바꿔줍니다.
    input_ids = tokenizer.encode(text, max_length=1024, truncation=True)
    # print(input_ids)

    # 모델에 넣기 전 문장의 시작과 끝을 나타내는 토큰을 추가합니다.
    input_ids = [tokenizer.bos_token_id] + input_ids + [tokenizer.eos_token_id]
    input_ids = torch.tensor([input_ids])
    # print(input_ids)

    summary_text_ids = model.generate(
        input_ids=input_ids,
        bos_token_id=model.config.bos_token_id,
        eos_token_id=model.config.eos_token_id,
        length_penalty=1.0,   # 길이에 대한 penalty. 1보다 작은 경우 더 짧은 문장을 생성하도록 유도하며, 1보다 클 경우 길이가 더 긴 문장을 유도
        max_length=128,   # 요약문의 최대 길이 설정
        min_length=32,    # 요약문의 최소 길이 설정
        num_beams=4,  # 문장 생성시 다음 단어를 탐색하는 영역의 개수
    )

    # print(summary_text_ids)

    print(tokenizer.decode(summary_text_ids[0], skip_special_tokens=True))
    return tokenizer.decode(summary_text_ids[0], skip_special_tokens=True)


# 테스트 용
if __name__ == "__main__":
    start_time = time.time()

    # _id
    news_summary_id("660befb895108de55394f4ca")

    end_time = time.time()  # 종료 시간 저장
    elapsed_time = end_time - start_time  # 경과 시간 계산

    print(f"Execution time: {elapsed_time} seconds")
