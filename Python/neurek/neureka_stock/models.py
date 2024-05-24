from pymongo import MongoClient
import json

# MongoDB 클라이언트 설정
client = MongoClient('mongodb+srv://S10P23C105:cKyZzMD36a@ssafy.ngivl.mongodb.net/S10P23C105?authSource=admin')
db = client['S10P23C105']

if __name__ == '__main__':
    print("is neureka stock model")