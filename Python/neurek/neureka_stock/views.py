from django.http import JsonResponse, HttpResponse
from rest_framework import status
from rest_framework.response import Response
import FinanceDataReader as fdr
import json
from rest_framework.decorators import api_view
from .stock_news import crawling_news
from .serializers import KeywordSerializer


def fetch_and_save_krx_data(request):
    # GET 요청으로부터 'code' 파라미터 값을 가져옵니다.
    stock_code = request.GET.get('code', '')  # 기본값으로 빈 문자열

    # 유효한 주식 코드가 제공되었는지 확인
    if not stock_code:
        return HttpResponse("Stock code is required. 코드 제대로 주라고 아.", status=400)

    # KRX 데이터를 DataFrame으로 가져옵니다.
    df_krx = fdr.DataReader(stock_code)

    df_krx = df_krx.tail(3650)
    # 'Date' 인덱스를 일반 열로 변환하고 날짜 형식을 'YYYY-MM-DD'로 변경
    df_krx.reset_index(inplace=True)
    df_krx['Date'] = df_krx['Date'].dt.strftime('%Y-%m-%d')


    # DataFrame 컬럼 이름을 모두 소문자로 변경
    df_krx.columns = [col.lower() for col in df_krx.columns]

    # DataFrame을 JSON 형식의 문자열로 변환
    json_data = df_krx.to_json(orient='records', force_ascii=False)

    # 변환된 JSON 문자열을 보기 좋게 포맷팅
    formatted_json_data = json.dumps(json.loads(json_data), ensure_ascii=False, indent=4)

    # 포맷팅된 JSON 문자열을 HttpResponse 객체를 사용하여 반환
    return HttpResponse(formatted_json_data, content_type="application/json; charset=utf-8")

@api_view(["POST"])
def stock_news(request):
    serializer = KeywordSerializer(data=request.data)
    if serializer.is_valid():
        keyword = serializer.validated_data.get('keyword')
        news_data = crawling_news(keyword)
        return Response(news_data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)