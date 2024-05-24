import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests
from bs4 import BeautifulSoup, NavigableString, Tag
import time
from neurek.neureka_news.models import DetailsArticle
from datetime import datetime


def process_element(element):
    content = ''
    if isinstance(element, NavigableString):
        if str(element).strip() != '':
            content += str(element).strip() + '\n'
    elif isinstance(element, Tag):
        if element.name == 'strong':
            content += f"<strong>{element.text.strip()}</strong>\n"
        elif element.name == 'br':
            content += '\n'
        elif element.name == 'span' and element.get('data-type') == 'ore':
            content += f"{element.text.strip()}\n"
        elif element.name == 'img':
            img_src = element.get('data-src')
            content += f"<img src='{img_src}'>\n"
        else:
            for child in element.children:
                content += process_element(child)  # 자식 요소에 대한 재귀적 처리
    return content


def keyword_extraction(url):
    response = requests.get(url)
    time.sleep(0.1)  # 서버에 과부하를 주지 않기 위해 잠시 대기
    soup = BeautifulSoup(response.content, "html.parser")

    article = soup.find("article")

    detail_text = process_element(article)
    if article:
        article_text = article.get_text(strip=True)
        # article_text가 있는 경우에만 이미지 태그를 찾음
        img_tag = soup.select_one('#img1')
        img_src = img_tag['data-src'] if img_tag and img_tag.get('data-src') else None
    else:
        # article_text가 없는 경우, img_src도 None으로 설정
        article_text = "No article text found"
        img_src = None

    date_element = soup.select_one('[data-date-time]')
    if date_element:
        date_time_str = date_element['data-date-time']
        # 여러 날짜 형식을 시도
        date_formats = ['%Y-%m-%dT%H:%M:%S', '%Y-%m-%d %H:%M:%S']
        for fmt in date_formats:
            try:
                date_time = datetime.strptime(date_time_str, fmt)
                date_time.strftime('%Y-%m-%d %H:%M')
            except ValueError:
                continue  # 현재 형식이 맞지 않으면 다음 형식으로 시도
        date_time = date_time.strftime('%Y-%m-%d %H:%M')
    else:
        date_time = datetime.now().strftime('%Y-%m-%d %H:%M')

    return article_text, img_src, date_time, detail_text


# 개별 뉴스 항목 처리를 위한 함수
def process_news_item(i, soup):
    news_item = soup.select_one(f'#sp_nws{i}')
    if news_item:
        title_element = news_item.select_one('.news_tit')
        press_element = news_item.select_one('.info.press')
        summary_element = news_item.select_one('.api_txt_lines.dsc_txt_wrap')

        info_group_links = news_item.select('.info_group a')
        naver_news_link = None
        for link in info_group_links:
            if 'https://n.news.naver.com/mnews' in link['href']:
                naver_news_link = link['href']
                break

        if not naver_news_link:
            return None  # 조건을 만족하지 않는 링크는 제외

        title = title_element.text.strip() if title_element else None
        press = press_element.text.strip() if press_element else None
        summary = summary_element.text.strip() if summary_element else None

        # 다른 함수 호출 및 처리...
        text, thumbnail_url, article_date, detail_text = keyword_extraction(naver_news_link)

        detail_article = DetailsArticle(
            detail_url=naver_news_link[:-8],
            detail_title=title,
            detail_press=press,
            detail_text=detail_text,
            detail_date=article_date,
            detail_topic="",
            detail_keywords=""
        )
        detail_article.save()

        news_data = {
            'link': naver_news_link[:-8],
            '_id': str(DetailsArticle.find_by_url(naver_news_link[:-8])['_id']),
            'title': title,
            'press': press,
            'summary': summary,
            'thumbnail_url': thumbnail_url,
            'article_date': article_date
        }

        return news_data


def crawling_news(keyword):
    url = (f"https://search.naver.com/search.naver?where=news&query={keyword}"
           f"&sm=tab_opt&sort=0&photo=0&field=0&pd=0&ds=&de="
           f"&docid=&related=0&mynews=1&office_type=3&office_section_code="
           f"&news_office_checked=&nso=&is_sug_officeid=0&office_category=3&service_area=1")


    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    # 임시로 모든 뉴스 항목 저장
    temp_news_list = []

    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(process_news_item, i, soup) for i in range(1, 10)]
        for future in as_completed(futures):
            news_data = future.result()
            if news_data:
                temp_news_list.append(news_data)

    # 'https://n.news.naver.com/mnews'로 시작하는 링크를 가진 기사만 선택
    filtered_news_list = [news for news in temp_news_list if news and 'https://n.news.naver.com/mnews' in news['link']]

    # 필터링된 뉴스 리스트에서 상위 5개 선택
    news_list = filtered_news_list[:5]

    return news_list


# 확인용
import pprint
if __name__ == "__main__":
    start_time = time.time()

    pprint.pprint(crawling_news("스포츠"))

    end_time = time.time()  # 종료 시간 저장
    elapsed_time = end_time - start_time  # 경과 시간 계산

    print(f"Execution time: {elapsed_time} seconds")