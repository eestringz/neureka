from pymongo import MongoClient
import json

# MongoDB 클라이언트 설정
client = MongoClient('mongodb://localhost:27017/')
db = client['article_database']

if __name__ == '__main__':
    print("is neureka stock model")