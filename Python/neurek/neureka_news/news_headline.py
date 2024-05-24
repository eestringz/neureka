import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
import requests
from bs4 import BeautifulSoup, NavigableString, Tag
from neurek.neureka_news.models import DetailsArticle, HeadlineNews
import time
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor


def extract_article_details(url):
    # 기본 날짜 설정
    formatted_date = datetime.now().strftime('%Y-%m-%d %H:%M')
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, "html.parser")


        # 이미지 소스 추출
        img_tag = soup.select_one('#img1')
        img_src = img_tag['data-src'] if img_tag and img_tag.get('data-src') else None

        # 날짜 추출
        date_element = soup.select_one('[data-date-time]')
        if date_element:
            date_time_str = date_element['data-date-time']
            date_formats = ['%Y-%m-%dT%H:%M:%S', '%Y-%m-%d %H:%M:%S']
            for fmt in date_formats:
                try:
                    date_time = datetime.strptime(date_time_str, fmt)
                    formatted_date = date_time.strftime('%Y-%m-%d %H:%M')
                    break  # 일치하는 형식을 찾으면 반복 종료
                except ValueError:
                    continue  # 현재 형식이 맞지 않으면 다음 형식으로 시도
    except Exception as e:
        img_src = None
        # formatted_date는 기본값을 유지

    return img_src, formatted_date

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


def extract_content_from_url(url):
    response = requests.get(url)
    html = response.text

    soup = BeautifulSoup(html, 'html.parser')
    article = soup.find('article', id='dic_area')

    return process_element(article)


def fetch_article_data(article_li):
    try:
        # 각 요소에 대한 정보 추출 및 할당
        link_element = article_li.find('a', class_='sa_thumb_link')
        title_element = article_li.find('strong', class_='sa_text_strong')
        press_element = article_li.find('div', class_='sa_text_press')

        # 링크 URL 확인
        link_url = link_element['href'] if link_element else None
        if not link_url:
            return None  # 링크가 없는 경우 None 반환

        # 제목과 언론사 텍스트 추출
        title_text = title_element.text.strip() if title_element else ""
        press_text = press_element.text.strip() if press_element else ""

        # 기사 상세 정보 추출
        thumbnail, article_date = extract_article_details(link_url)

        # 기사 원문에 저장
        detail_article = DetailsArticle(
            detail_url=link_url,
            detail_title=title_text,
            detail_press=press_text,
            detail_text=extract_content_from_url(link_url),
            detail_date=article_date,
            detail_topic="",
            detail_keywords=""
        )
        detail_article.save()

        id = str(DetailsArticle.find_by_url(link_url)['_id'])

        headline_news = HeadlineNews(
            _id=id,
            headline_url=link_url,
            headline_thumbnail_url=thumbnail,
            headline_title=title_text,
            headline_press=press_text,
            headline_date=article_date
        )

        headline_news.save()

    except Exception as e:
        print(f"Error processing article: {e}")
        return None  # 오류 발생 시 None 반환

def load_headline_news():
    url = "https://news.naver.com/section/101"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    result_list = []
    list_container = soup.select_one('#newsct > div.section_component.as_section_headline._PERSIST_CONTENT')

    # 모든 기사 항목(li 태그) 리스트
    articles_li = list_container.find_all('li', class_='sa_item _SECTION_HEADLINE') if list_container else []
    articles_li_blind = list_container.find_all('li', class_='sa_item _SECTION_HEADLINE is_blind') if list_container else []

    # 새로운 헤드라인 뉴스를 위해 db 삭제
    HeadlineNews.delete_all()

    with ThreadPoolExecutor(max_workers=5) as executor:
        # 각 기사에 대한 fetch_article_data 함수 실행
        futures = [executor.submit(fetch_article_data, article_li) for article_li in articles_li]
        for future in futures:
            article_data = future.result()
            if article_data:  # 유효한 데이터인 경우 결과 리스트에 추가
                result_list.append(article_data)

    with ThreadPoolExecutor(max_workers=5) as executor:
        # 각 기사에 대한 fetch_article_data 함수 실행
        futures = [executor.submit(fetch_article_data, article_li) for article_li in articles_li_blind]
        for future in futures:
            article_data = future.result()
            if article_data:  # 유효한 데이터인 경우 결과 리스트에 추가
                result_list.append(article_data)

    return result_list



# # 테스트
import pprint
if __name__ == "__main__":
    start_time = time.time()
    test = load_headline_news()
    pprint.pprint(test)

    end_time = time.time()  # 종료 시간 저장
    elapsed_time = end_time - start_time  # 경과 시간 계산

    print(f"Execution time: {elapsed_time} seconds")