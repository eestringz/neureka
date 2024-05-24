import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from apscheduler.schedulers.background import BlockingScheduler
from neurek.neureka_news.models import SummaryArticle
from neurek.neureka_news.news_headline import load_headline_news
from neurek.neureka_news.news_crawling import for_schedule, crawling
import datetime
import time


def reload_headline():
    print(f'Headline news Execution : {datetime.datetime.now()}')
    start_time = time.time()
    load_headline_news()
    end_time = time.time()  # 종료 시간 저장
    elapsed_time = end_time - start_time  # 경과 시간 계산

    print(f"Headline news Execution time: {elapsed_time} seconds")


def start_crawling():
    print(f'Crawling Execution : {datetime.datetime.now()}')
    start_time = time.time()
    crawling()
    SummaryArticle.trim_collection()
    load_article = SummaryArticle.find_all()
    for_schedule(load_article)

    end_time = time.time()  # 종료 시간 저장
    elapsed_time = end_time - start_time  # 경과 시간 계산

    print(f"News Crawling Execution time: {elapsed_time} seconds")


def test():
    print("실행됨")


# 이 scheduler.py가 있는 경로에서 "python .\scheduler.py"
def main():
    schedule = BlockingScheduler(timezone='Asia/Seoul')
    # schedule.add_job(test, 'interval', seconds=5, id='test')
    schedule.add_job(reload_headline, 'interval', minutes=60, id='headline')
    # schedule.add_job(start_crawling, 'interval', minutes=60, id='crawling')
    # schedule.add_job(start_crawling, 'interval', minutes=10, id='crawling')
    # schedule.add_job(reload_headline, 'cron', hour=9, minute=00, id='headline')
    schedule.add_job(start_crawling, 'cron', hour=6, minute=00, id='crawling')

    schedule.start()


if __name__ == "__main__":
    main()