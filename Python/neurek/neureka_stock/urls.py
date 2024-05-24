from django.urls import path
from .views import fetch_and_save_krx_data, stock_news 

urlpatterns = [
    path('fetch_krx/', fetch_and_save_krx_data, name='fetch_krx_data'),
    path('stock_news/', stock_news, name='stock_news'),
]

