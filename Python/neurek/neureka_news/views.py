from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from .serializers import SummaryArticleSerializer, IdsSerializer, IdSerializer, RateSerializer
import json
from django.http import HttpResponse, JsonResponse
from .models import db, DetailsArticle, SummaryArticle, KeywordArticle, HeadlineNews
from .news_cluster import kmeans_cluster
from .news_recommend import recommend_news
from .news_summary import news_summary_id
from .news_personal_recommend import read_article_and_update_interests, recommend_articles_to_user
from rest_framework.decorators import api_view


# 베이스
class SummaryArticleViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = SummaryArticleSerializer

    @api_view(["GET"])
    def get_queryset(self):
        """MongoDB에서 데이터를 조회하는 커스텀 메서드"""
        # 이 메서드는 DRF의 기대에 따라 존재해야 하지만,
        # 실제로 MongoDB 쿼리 결과를 직접 반환하는 용도로 사용됩니다.
        # 이 메서드의 존재는 DRF의 오류 메시지를 방지하기 위한 것입니다.
        return None

    def list(self, request, *args, **kwargs):
        queryset = list(db['summary_article_collection'].find({}))
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


# 요약기사 불러오기
def load_news_data():
    data = SummaryArticle.find_all()
    return data

# 뉴스 요약 정보 전체 전송(기사 전체보기)
@api_view(['GET'])
def news_api(request):
    news_data = load_news_data()

    return HttpResponse(json.dumps(news_data[:100], ensure_ascii=False, indent=4),
                        content_type="application/json; charset=utf-8")


# 뉴스들의 키워드 개수 전체 전송(버블 띄우기)
@api_view(['GET'])
def news_bubble(request):
    requested_keywords = request.GET.getlist('keywords')

    # requested_keywords가 비어있으면 기본 키워드 리스트를 할당
    if not requested_keywords:
        requested_keywords = ["반도체", "금융", "기술", "경영", "가상화폐", "유가증권", "정치", "해외토픽"]

    # MongoDB에서 주어진 키워드 리스트에 해당하는 데이터를 조회
    keyword_data = KeywordArticle.find_by_keywords(requested_keywords)

    if not keyword_data:
        return JsonResponse({"error": "No data found for the provided keywords"}, status=404)

    combined_data = []
    for sub_keyword, details in keyword_data.items():
        unique_ids = list(set(details["ids"]))  # 중복 ID 제거
        combined_data.append({
            "keyword": sub_keyword,
            "count": details["count"],
            "ids": unique_ids
        })

    # combined_data를 count 기준으로 내림차순 정렬
    sorted_combined_data = sorted(combined_data, key=lambda x: x['count'], reverse=True)

    # 상위 30개 항목만 선택
    top_30_data = sorted_combined_data[:30]

    # 상위 30개 항목을 JSON 응답으로 반환
    return JsonResponse(top_30_data, safe=False, json_dumps_params={'ensure_ascii': False, 'indent': 4})


# 4개의 '엄선' 된 기사
@api_view(['POST'])
def news_keywords_article(request):
    # Serializer에서 '_ids'를 받도록 수정
    serializer = IdsSerializer(data=request.data)
    if serializer.is_valid():
        # Serializer에서 검증된 '_ids'를 가져옴
        _ids = serializer.validated_data['ids']
        search_list = kmeans_cluster(_ids)  # kmeans_cluster 함수 호출, 여기서 '_ids'를 인자로 전달
        # kmeans_cluster의 결과를 응답 데이터로 사용
        return Response({'message': 'IDs processed successfully', 'data': search_list})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 뉴스 상세보기
@api_view(["POST"])
def news_details(request):
    serializer = IdSerializer(data=request.data)
    if serializer.is_valid():
        _id = serializer.validated_data.get('_id')
        try:
            article = DetailsArticle.find_by_id(_id)
            if article:
                DetailsArticle.increment_views_by_id(_id)
                return Response(article)
            else:
                return Response({"message": "Article not found. 해당되는 기사를 db에서 찾지 못했습니다."}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"message": "Invalid ID format. ID 형식이 잘못되었습니다."}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 뉴스 상세 보기에서 '이와 비슷한 기사'
@api_view(["POST"])
def news_recommend(request):
    serializer = IdSerializer(data=request.data)
    if serializer.is_valid():
        _id = serializer.validated_data.get('_id')
        try:
            print(str(_id))
            recommend_list = recommend_news(str(_id))
            if recommend_list:
                return Response(recommend_list)
            else:
                return Response({"message": "추천해줄만한 기사가 없습니다."}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"message": "Invalid ID format. ID 형식이 잘못되었습니다."}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 뉴스 요약(메일 발송용도)
@api_view(["POST"])
def news_summary(request):
    serializer = IdSerializer(data=request.data)
    if serializer.is_valid():
        id_str = serializer.validated_data.get('_id')
        summary_text, title = news_summary_id(id_str)
        if summary_text:
            return Response({"title": title, "summary": summary_text})
        else:
            return Response({"message": "요약에 실패 했어요"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 평점 수정해주기
@api_view(["POST"])
def update_rating(request):
    serializer = RateSerializer(data=request.data)
    if serializer.is_valid():
        _id = serializer.validated_data.get('_id')
        rating = serializer.validated_data.get('rating')
        user_id = serializer.validated_data.get('user_id')

        if DetailsArticle.update_rating(_id, rating, user_id):
            return Response({"message": "평점 등록 성공"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "평점 등록에 실패 했어요"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# HEADLINE 뉴스 5개
@api_view(["GET"])
def get_headlines(request):
    news_data = HeadlineNews.find_all()

    return HttpResponse(json.dumps(news_data, ensure_ascii=False, indent=4),
                        content_type="application/json; charset=utf-8")


# 사용자가 디테일 페이지에 들어갔을때 이 요청을 해줘야함
@api_view(["POST"])
def update_interests(request):
    # 요청에서 사용자 ID와 기사 ID를 추출합니다.
    user_id = request.data.get('user_id')
    article_id = request.data.get('article_id')

    # 유효성 검사: 사용자 ID와 기사 ID가 제공되었는지 확인합니다.
    if not user_id or not article_id:
        return Response({"error": "Missing user_id or article_id in request. 제대로 주셔야해유"},
                        status=status.HTTP_400_BAD_REQUEST)

    try:
        # 성공 응답을 반환합니다.
        return Response(read_article_and_update_interests(user_id, article_id),
                        status=status.HTTP_200_OK)
    except Exception as e:
        # 오류 처리: 예상치 못한 오류가 발생한 경우
        return Response(read_article_and_update_interests(user_id, article_id),
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# 사용자에게 기사 추천
@api_view(["POST"])
def recommend_for_user(request):
    # 요청에서 사용자 ID를 추출합니다.
    user_id = request.data.get('user_id')
    topic = request.data.get('topic', [])

    # # 유효성 검사
    # if not user_id:
    #     return Response({"error": "Missing user_id in request. user_id를 제대로 주세요!"},
    #                     status=status.HTTP_400_BAD_REQUEST)

    # 유효성 검사2
    if not isinstance(topic, list):
        return Response({"error": "Invalid topic format. topic은 리스트 형태여야 합니다."},
                        status=status.HTTP_400_BAD_REQUEST)

    try:
        # 사용자에게 추천할 기사
        recommended_articles = recommend_articles_to_user(user_id, topic)
        # 성공 응답과 함께 추천 기사 정보를 반환
        return Response(recommended_articles, status=status.HTTP_200_OK)
    except Exception as e:
        # 오류 처리: 예상치 못한 오류가 발생한 경우
        return Response({"error": f"An error occurred: {str(e)} 이건.. 예상치 못했는걸요?"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)
