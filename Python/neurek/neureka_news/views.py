from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from .serializers import SummaryArticleSerializer, LinksSerializer, UrlSerializer
import json
from django.http import HttpResponse, JsonResponse
from .models import db, DetailsArticle, SummaryArticle, KeywordArticle
from .news_cluster import kmeans_cluster
from rest_framework.decorators import api_view

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


def load_news_data():
    data = SummaryArticle.find_all()
    return data

# 뉴스 요약 정보 전체 전송
@api_view(['GET'])
def news_api(request):
    news_data = load_news_data()

    return HttpResponse(json.dumps(news_data[:100], ensure_ascii=False, indent=4),
                        content_type="application/json; charset=utf-8")


# 뉴스들의 키워드 개수 전체 전송
@api_view(['GET'])
def news_bubble(request):
    requested_keywords = request.GET.getlist('keywords')

    # requested_keywords가 비어있으면 기본 키워드 리스트를 할당
    if not requested_keywords:
        requested_keywords = ["반도체", "금융", "기술", "경영", "가상화폐", "유가증권", "정치", "해외토픽"]

    # MongoDB에서 주어진 키워드 리스트에 해당하는 데이터를 조회
    # KeywordArticle.find_by_keywords 메소드를 적절히 수정하거나 다른 메소드를 사용해야 할 수 있음
    keyword_data = KeywordArticle.find_by_keywords(requested_keywords)

    if not keyword_data:
        return JsonResponse({"error": "No data found for the provided keywords"}, status=404)

    combined_data = []
    for sub_keyword, details in keyword_data.items():
        unique_links = list(set(details["links"]))  # 중복 링크 제거
        combined_data.append({
            "keyword": sub_keyword,
            "count": details["count"],
            "links": unique_links
        })

    # combined_data를 count 기준으로 내림차순 정렬
    sorted_combined_data = sorted(combined_data, key=lambda x: x['count'], reverse=True)

    # 상위 30개 항목만 선택
    top_30_data = sorted_combined_data[:30]

    # 상위 30개 항목을 JSON 응답으로 반환
    return JsonResponse(top_30_data, safe=False, json_dumps_params={'ensure_ascii': False, 'indent': 4})



@api_view(['POST'])
def news_keywords_article(request):
    serializer = LinksSerializer(data=request.data)
    if serializer.is_valid():
        links = serializer.validated_data['links']
        search_list = kmeans_cluster(links)  # kmeans_cluster 함수 호출
        # kmeans_cluster의 결과를 응답 데이터로 사용
        return Response({'message': 'Links processed successfully', 'data': search_list})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def news_details(request):
    serializer = UrlSerializer(data=request.data)
    if serializer.is_valid():
        url = serializer.validated_data.get('link')
        article = DetailsArticle.find_by_url(url)
        if article:
            return Response(article)
        else:
            return Response({"message": "Article not found 해당되는 기사를 db에서 찾지 못했습니다."}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)