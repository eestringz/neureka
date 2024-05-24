from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import (news_api, news_bubble, news_keywords_article,
                    news_details, news_recommend, news_summary, update_rating, get_headlines,
                    update_interests, recommend_for_user)

router = DefaultRouter()
router.register(r'base', views.SummaryArticleViewSet, basename='base')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/today/', news_api, name='news_api'),
    path('api/bubble/', news_bubble, name='news_bubble'),
    path('api/keyword_article/', news_keywords_article, name='news_keywords_article'),
    path('api/news_details/', news_details, name='news_details'),
    path('api/recommend/', news_recommend, name='news_recommend'),
    path('api/news_summary/', news_summary, name='news_summary'),
    path('api/update_rate/', update_rating, name='update_rate'),
    path('api/headlines/', get_headlines, name='get_headlines'),
    path('api/update_interests/', update_interests, name='update_interests'),
    path('api/recommend_for_user/', recommend_for_user, name='recommend_for_user')
]