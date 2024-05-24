from neurek.neureka_news.models import UserProfile, DetailsArticle
import time


def read_article_and_update_interests(user_id, article_id):
    """
    사용자가 기사를 읽었을 때 호출되는 함수입니다.
    사용자의 관심도를 업데이트합니다.
    """
    # 해당 기사의 정보를 조회합니다.

    article = DetailsArticle.find_by_id(article_id)

    if article:
        # UserProfile 인스턴스를 생성합니다.
        user_profile = UserProfile(user_id)
        # 기사 정보를 바탕으로 사용자의 관심도를 업데이트합니다.
        user_profile.read_article(user_id, {
            'detail_topic': article.get('detail_topic'),
            'detail_press': article.get('detail_press'),
            'detail_keywords': article.get('detail_keywords')
        })

        print(f"User {user_id}'s interests updated based on article {article_id}.")
        return {"message": "유저가 기사를 읽음으로써, 관심도가 증가했습니다"}
    else:
        message = f"Article {article_id} not found. 기사가 없는데요..."
        print(message)
        return {"message": message}


def recommend_articles_to_user(user_id, topic):
    """
    사용자의 선호도에 기반한 기사를 추천하는 함수입니다.
    """

    user_profile = UserProfile(user_id)

    if user_id is not None:
        # 사용자 ID가 주어진 경우, 사용자 선호도 기반 추천
        recommended_articles = user_profile.recommend_articles_for_user(user_id, topic)
    else:
        # 사용자 ID가 주어지지 않은 경우, 익명 사용자를 위한 추천
        recommended_articles = user_profile.recommend_articles_for_anonymous()

    if recommended_articles:
        print("sucessful recommendations 드디어 성공했군요")
        return recommended_articles
    else:
        print("No recommendations available.")
        return []

# # 테스트 코드
# if __name__ == '__main__':
#     # 테스트 사용자 ID와 기사 ID
#     test_user_id = '2710yap3'
#     test_article_id = '6607caaf666b59298cefbb02'
#
#    start_time = time.time()
#     # 사용자가 기사를 읽고 관심도를 업데이트하는 시나리오
#     read_article_and_update_interests(test_user_id, test_article_id)
#
#     # 사용자에게 기사를 추천하는 시나리오
#     # 2번째 매개변수에 topic을 리스트로 넣어보세요
#     print(recommend_articles_to_user("2710yap@gmail.com", ["금융"]))
#     print(recommend_articles_to_user(None, []))
#
#    end_time = time.time()  # 종료 시간 저장
#    elapsed_time = end_time - start_time  # 경과 시간 계산
#
#    print(f"Execution time: {elapsed_time} seconds")