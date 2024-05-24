from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime, timedelta
import json
import random

# MongoDB 클라이언트 설정 실서버
ssafy_mongo = 'mongodb+srv://S10P23C105:cKyZzMD36a@ssafy.ngivl.mongodb.net/S10P23C105?authSource=admin'
ssafy_db = 'S10P23C105'
local_mongo = 'mongodb://localhost:27017/'
local_db = 'article_database'

# True 원격 db False 로컬 db
mode = True
mongo = ssafy_mongo if mode else local_mongo
mongo_db = ssafy_db if mode else local_db

client = MongoClient(f'{mongo}')
db = client[f'{mongo_db}']

# MongoDB 로컬 서버
# client = MongoClient('mongodb://localhost:27017/')
# db = client['article_database']

if __name__ == '__main__':
    print("is neureka new model")


# TODO 책갈피 : 요약 기사
class SummaryArticle:
    collection = db['summary_article_collection']

    def __init__(self, _id, thumbnail_url, article_title, article_link,
                 article_summary, press, date_time, nouns, topic, keywords, sentiment):
        self._id = ObjectId(_id)
        self.thumbnail_url = thumbnail_url
        self.article_title = article_title
        self.article_link = article_link
        self.article_summary = article_summary
        self.press = press
        self.date_time = date_time
        self.nouns = nouns
        self.topic = topic
        self.keywords = keywords
        self.sentiment = sentiment

    def save(self):
        """문서 저장 또는 업데이트"""
        document = {k: v for k, v in self.__dict__.items() if not k.startswith('_')}
        self.collection.update_one(
            {'_id': self._id},
            {'$set': document},
            upsert=True
        )

    @classmethod
    def find_all(cls):
        """컬렉션의 모든 문서 조회"""
        documents_cursor = cls.collection.find({}).sort("date_time", -1)
        documents_list = []
        for doc in documents_cursor:
            # ObjectId를 문자열로 변환하여 '_id' 값을 업데이트
            doc['_id'] = str(doc['_id'])
            documents_list.append(doc)
        return documents_list


    @classmethod
    def find_by_id(cls, _id):
        """_id로 문서 조회"""
        # 문자열 id를 ObjectId로 변환
        object_id = ObjectId(_id)
        return cls.collection.find_one({"_id": object_id})

    @classmethod
    def find_by_topics(cls, topics):
        """주어진 토픽 리스트에 해당하는 기사들을 조회"""
        documents_cursor = cls.collection.find({'topic': {'$in': topics}})
        documents_list = []
        for doc in documents_cursor:
            # ObjectId를 문자열로 변환하여 '_id' 값을 업데이트
            doc['_id'] = str(doc['_id'])
            documents_list.append(doc)
        return documents_list

    @classmethod
    def trim_collection(cls, max_docs=2000):
        """
        컬렉션의 문서 개수가 max_docs를 초과하는 경우,
        가장 오래된 문서부터 초과분을 삭제합니다.
        """
        # 현재 컬렉션의 문서 개수 확인
        current_count = cls.collection.count_documents({})
        excess = current_count - max_docs

        if excess > 0:
            # 가장 오래된 문서부터 삭제할 개수만큼 삭제
            # date_time 필드를 기준으로 오름차순 정렬하여 가장 오래된 문서를 찾음
            delete_result = cls.collection.find().sort('date_time', 1).limit(excess)
            ids_to_delete = [doc['_id'] for doc in delete_result]

            # 해당 _id를 가진 문서들 삭제
            cls.collection.delete_many({'_id': {'$in': ids_to_delete}})

            return True, f"{excess} documents were deleted."
        else:
            return False, "No documents were deleted. Collection does not exceed the max_docs limit."

    def set_keywords(self, keywords):
        self.keywords = json.dumps(keywords)

    def get_keywords(self):
        return json.loads(self.keywords)


# TODO 책갈피 : 상세 기사
class DetailsArticle:
    collection = db['details_article_collection']

    def __init__(self, detail_url, detail_title, detail_text, detail_press, detail_date,
                 detail_topic, detail_keywords, views=0):
        self.detail_url = detail_url
        self.detail_title = detail_title
        self.detail_text = detail_text
        self.detail_press = detail_press
        self.detail_date = detail_date
        self.detail_topic = detail_topic
        self.detail_keywords = detail_keywords

    def save(self):
        """문서 저장. detail_url이 기존에 없을 경우에만 저장 (업서트 사용)."""
        document = {k: v for k, v in self.__dict__.items() if not k.startswith('_')}
        try:
            # 업서트 옵션을 사용하여 조건에 맞는 문서가 없을 경우에만 새로운 문서를 삽입
            result = self.collection.update_one(
                {"detail_url": self.detail_url},  # 검색 조건
                {"$setOnInsert": document},  # 삽입될 문서
                upsert=True  # 업서트 옵션 활성화
            )
            return result.upserted_id is not None  # 성공 여부
        except Exception as e:
            print(f"Error saving document: {e}")
            return False

    @classmethod
    def find_by_url(cls, url):
        """URL로 문서 조회하며 '_id' 필드 제외"""
        # '_id' 필드를 제외하고 나머지 데이터만 조회
        document = cls.collection.find_one({"detail_url": url})
        return document

    @classmethod
    def find_by_id(cls, _id):
        """_id로 문서 조회"""
        document = cls.collection.find_one({'_id': ObjectId(_id)})
        if document:
            document['_id'] = str(document['_id'])  # ObjectId를 문자열로 변환
        return document

    # TODO : 여기 수정해야함. user_id가 추가되었음을 알려.
    @classmethod
    def update_rating(cls, _id, user_rating, user_id):
        """_id에 해당하는 문서의 평점 업데이트"""
        document = cls.collection.find_one({"_id": ObjectId(_id)})

        if document:
            new_rate = document.get('detail_rate', 0) + user_rating
            new_rate_count = document.get('detail_rate_count', 0) + 1
            update_result = cls.collection.update_one(
                {"_id": ObjectId(_id)},
                {"$set": {"detail_rate": new_rate, "detail_rate_count": new_rate_count}}
            )

            # 평점에 따른 가중치 결정
            weight = 1 if user_rating == 3 else 2 if user_rating in [4, 5] else -1

            # UserProfile 클래스 인스턴스 생성 및 관심도 업데이트
            user_profile = UserProfile(user_id)
            user_profile.update_interests_from_rating(document.get('detail_keywords', []), weight)

            return True
        else:
            return False

    @classmethod
    def find_urls_by_keywords_sorted_by_average_rating(cls, keywords):
        """주어진 키워드를 포함하고, 평균 점수로 정렬한 후, 상위 30개의 _id만 추출하여 반환"""

        # 현재 날짜로부터 14일 전의 날짜를 계산
        seven_days_ago = datetime.now() - timedelta(days=14)

        pipeline = [
            {"$match": {
                "detail_keywords": {"$in": keywords},
                "detail_date": {"$gte": seven_days_ago.strftime('%Y-%m-%d %H:%M')}
            }},
            {"$addFields": {
                "weighted_score": {
                    "$multiply": ["$average_rating", 2]  # 평점에 가중치 2
                }
            }},
            {"$sort": {"weighted_score": -1, "detail_date": -1}},  # weighted_score와 detail_date 모두를 고려하여 정렬
            {"$project": {"_id": 1}},
            {"$limit": 30}  # 상위 30개 문서 선택
        ]

        # 파이프라인 실행 코드
        docs = cls.collection.aggregate(pipeline)

        # 조회 결과에서 _id만 추출하여 리스트로 변환하여 반환
        ids = [str(doc['_id']) for doc in docs]

        return ids

    @classmethod
    def is_topic_empty_for_url(cls, detail_url):
        """주어진 detail_url에 해당하는 문서의 detail_topic이 빈 문자열인지 확인"""
        document = cls.collection.find_one({"detail_url": detail_url})
        if document:
            # 문서를 찾았고, detail_topic 필드가 존재하며 빈 문자열인 경우 True 반환
            if document.get("detail_topic") == "":
                return True
        # 문서를 찾지 못하거나 detail_topic 필드가 존재하지 않는 경우 False 반환
        return False

    @classmethod
    def is_topic_empty_for_id(cls, _id):
        """주어진 _id에 해당하는 문서의 detail_topic이 빈 문자열인지 확인"""
        document = cls.collection.find_one({"_id": ObjectId(_id)})
        return document and document.get("detail_topic") == ""

    @classmethod
    def update_topic_and_keywords(cls, _id, new_detail_topic, new_detail_keywords):
        """주어진 _id에 해당하는 문서의 detail_topic과 detail_keywords를 업데이트"""
        update_result = cls.collection.update_one(
            {"_id": ObjectId(_id)},
            {"$set": {"detail_topic": new_detail_topic, "detail_keywords": new_detail_keywords}}
        )
        return update_result.modified_count > 0

    # 조회수 + 1
    @classmethod
    def increment_views_by_id(cls, _id):
        """_id에 해당하는 문서의 views 수를 1 증가시킴. views가 없다면 1로 초기화."""
        # _id를 사용하여 문서 조회 및 views 업데이트
        update_result = cls.collection.update_one(
            {"_id": ObjectId(_id)},  # 검색 조건
            {"$inc": {"views": 1}},  # $inc 연산자를 사용하여 views 값을 1 증가
            upsert=True  # 문서가 없을 경우 새로운 문서를 삽입
        )
        return update_result.modified_count > 0


# TODO 책갈피 : 기사의 키워드 (버블 띄울때 필요)
class KeywordArticle:
    collection = db['keyword_article_collection']

    @classmethod
    def save_keywords(cls, keyword_dict):
        """기존 데이터를 삭제하고 새로운 키워드 딕셔너리 저장"""
        # 컬렉션의 모든 문서 삭제
        cls.collection.delete_many({})
        document = {"keywords": keyword_dict}
        result = cls.collection.insert_one(document)
        return result.inserted_id

    @classmethod
    def find_by_keywords(cls, keywords):
        """주어진 키워드 리스트에 해당하는 데이터 조회 및 더하기"""
        result = cls.collection.find_one({})
        if not result or 'keywords' not in result:
            return None

        if len(keywords) == 8:
            total = {}
            for keyword in keywords:
                if keyword in result['keywords']:
                    keyword_data = result['keywords'][keyword]
                    for sub_keyword, details in keyword_data.items():
                        if sub_keyword not in total:
                            total[sub_keyword] = {"count": 0, "ids": []}
                        total[sub_keyword]['count'] += details['count']

                        # 중복 제거 처리
                        total[sub_keyword]['ids'] = list(set(total[sub_keyword]['ids'] + details['_ids']))

            return total
        else:
            ids_per_keyword = max(1, 30 // len(keywords))  # 각 키워드별로 추출할 _ids 개수, 최소 1개는 보장
            total = {}

            for keyword in keywords:
                if keyword in result['keywords']:
                    keyword_data = result['keywords'][keyword]
                    for sub_keyword, details in keyword_data.items():
                        if sub_keyword not in total:
                            total[sub_keyword] = {"count": 0, "ids": []}

                        # ids_per_keyword 개수만큼의 _ids를 선택
                        selected_ids = details['_ids'][:ids_per_keyword]

                        total[sub_keyword]['count'] += details['count']
                        total[sub_keyword]['ids'].extend(selected_ids)  # 기존 ids에 추가

                        # 최종적으로 ids 중복 제거
                        total[sub_keyword]['ids'] = list(set(total[sub_keyword]['ids']))

            return total


# TODO 책갈피 : 헤드 라인 뉴스
class HeadlineNews:
    collection = db['headlines']

    def __init__(self, _id, headline_url, headline_thumbnail_url,
                 headline_title, headline_press, headline_date):
        self._id = _id
        self.headline_url = headline_url
        self.headline_thumbnail_url = headline_thumbnail_url
        self.headline_title = headline_title
        self.headline_press = headline_press
        self.headline_date = headline_date


    def save(self):
        """문서 저장. _id가 제공되지 않은 경우에만 새로운 문서로 삽입"""
        if not self._id:  # _id가 없는 경우, 새 문서로 취급
            document = {k: v for k, v in self.__dict__.items() if v is not None and not k.startswith('_')}
            result = self.collection.insert_one(document)
            self._id = str(result.inserted_id)  # 삽입된 문서의 ObjectId를 문자열로 변환하여 저장
        else:  # _id가 있는 경우, 해당 _id를 가진 문서를 업데이트
            self.collection.update_one(
                {'_id': ObjectId(self._id)},  # ObjectId로 변환
                {'$set': {k: v for k, v in self.__dict__.items() if v is not None and not k.startswith('_')}},
                upsert=True
            )

    @classmethod
    def delete_all(cls):
        cls.collection.delete_many({})

    @classmethod
    def find_all(cls):
        """컬렉션의 모든 문서 조회"""
        documents_cursor = cls.collection.find({})
        documents_list = list(documents_cursor)
        for document in documents_list:
            # ObjectId를 문자열로 변환
            document['_id'] = str(document['_id'])

        # 6개만 보내주도록 변경
        return documents_list[:6]


# TODO 책갈피 : 유저 추천 기사를 위한 유저 테이블
class UserProfile:
    collection = db['user']

    def __init__(self, user_id=None):
        self.client = MongoClient(f'{mongo}')
        self.db = self.client[f'{mongo_db}']
        self.collection = self.db['user']
        self.user_id = user_id

    def read_article(self, user_id, article):
        """기사 읽었을 때 관심도 업데이트"""
        now = datetime.now()

        update_operations = {
            '$inc': {},
            '$set': {}
        }

        # 토픽과 신문사에 대한 관심도 업데이트
        if 'detail_topic' in article:
            update_operations['$inc']['interests.topics.' + article['detail_topic'] + '.score'] = 1
            update_operations['$set']['interests.topics.' + article['detail_topic'] + '.last_read'] = now

        if 'detail_press' in article:
            update_operations['$inc']['interests.press.' + article['detail_press']] = 1

        # 키워드가 리스트 형태로 제공되므로, 각 키워드에 대해 반복 처리
        for keyword in article.get('detail_keywords', []):
            update_operations['$inc']['interests.keywords.' + keyword + '.score'] = 1
            update_operations['$set']['interests.keywords.' + keyword + '.last_read'] = now

        # MongoDB 업데이트 연산 실행
        self.collection.update_one({'user_id': user_id}, update_operations, upsert=True)
        # 시간에 따른 관심도 조정 및 오래된 데이터 삭제 로직을 이후에 실행
        self.adjust_interests_based_on_time(user_id)

    # 관심도 갱신
    def adjust_interests_based_on_time(self, user_id):
        """시간에 따른 관심도 조정 및 오래된 데이터 삭제"""
        user_data = self.collection.find_one({'user_id': user_id})
        if not user_data or 'interests' not in user_data:
            return {"message": "어라... 이상하네요... 왜 유저 정보가 없지.."}

        now = datetime.now()
        if 'keywords' in user_data['interests']:
            keywords_data = user_data['interests']['keywords']

            # 키워드 데이터를 마지막 읽은 시간에 따라 내림차순 정렬
            sorted_keywords = sorted(keywords_data.items(), key=lambda item: item[1]['last_read'], reverse=True)

            # 20개 이상의 키워드가 있다면, 그 이후의 키워드에 대해 값 조정
            for keyword, data in sorted_keywords[20:]:
                if data['score'] > 0:
                    keywords_data[keyword]['score'] -= 1
                elif data['score'] < 0:
                    keywords_data[keyword]['score'] += 1

            # 2달 이상 오래된 키워드 또는 점수가 0인 키워드 삭제
            two_months_ago = now - timedelta(days=60)
            for keyword, data in list(keywords_data.items()):
                if data['last_read'] < two_months_ago or data['score'] == 0:
                    del keywords_data[keyword]

            self.collection.update_one({'user_id': user_id}, {'$set': {'interests.keywords': keywords_data}})

        if 'topics' in user_data['interests']:
            topics_data = user_data['interests']['topics']

            # 토픽 데이터를 마지막 읽은 시간에 따라 내림차순 정렬
            sorted_topics = sorted(topics_data.items(), key=lambda item: item[1].get('last_read', now), reverse=True)

            # 20개 이상의 토픽이 있다면, 그 이후의 토픽에 대해 값 조정
            for topic, data in (sorted_topics[20:] if len(sorted_topics) > 20 else []):
                if data['score'] > 0:
                    topics_data[topic]['score'] -= 1

            self.collection.update_one({'user_id': user_id}, {'$set': {'interests.topics': topics_data}})

    def recommend_articles_for_anonymous(self):
        # MongoDB에서 DetailsArticle 데이터 조회
        detail_articles = list(DetailsArticle.collection.find())

        # 현재 날짜로부터 7일 이전의 날짜를 문자열 형태로 계산
        seven_days_ago_str = (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d %H:%M')

        recommended_articles = []
        for article in detail_articles:
            # 문자열 형태의 날짜를 비교하여 최근 7일 이내인지 확인
            if article['detail_date'] >= seven_days_ago_str:
                # 각 DetailsArticle 문서의 _id가 SummaryArticle 컬렉션에 존재하는지 확인
                summary_article = SummaryArticle.collection.find_one({"_id": article['_id']})

                if summary_article:
                    # 조건을 만족하는 경우, 최종 결과에 포함시키기 전에 처리
                    article_data = {key: value if key != '_id' else str(value) for key, value in summary_article.items() if
                                    key != 'nouns'}
                    recommended_articles.append(article_data)

                # 최대 10개의 결과만 필요
                if len(recommended_articles) >= 10:
                    break

        # 추천 기사 목록을 무작위로 섞음
        random.shuffle(recommended_articles)

        # 필터링된 기사 중 최대 2개 선택
        return recommended_articles[:2]

    def recommend_articles_for_user(self, user_id, topic):
        """사용자 ID가 주어졌을 때 사용자의 선호도에 기반한 기사 추천"""
        user_profile = self.collection.find_one({'user_id': user_id})

        if not user_profile:
            # 사용자 프로필이 없는 경우, 새로운 프로필 생성 및 저장
            user_profile = {
                'user_id': user_id,
                'interests': {'keywords': {}}
            }
            self.collection.insert_one(user_profile)
            user_profile = self.collection.find_one({'user_id': user_id})  # 재조회

        if topic:
            summary_articles = SummaryArticle.find_by_topics(topic)
        else:
            summary_articles = SummaryArticle.find_all()

        if not user_profile or 'interests' not in user_profile:
            latest_articles = sorted(summary_articles, key=lambda x: x['date_time'], reverse=True)
            recommended_articles = latest_articles[:10]
            random.shuffle(recommended_articles)
            recommended_articles = recommended_articles[:2]
        else:
            preferred_keywords = set(user_profile['interests'].get('keywords', {}).keys())
            article_similarities = []

            for article in summary_articles:
                article_keywords_set = set(article['keywords'])
                intersection = len(article_keywords_set.intersection(preferred_keywords))
                union = len(article_keywords_set.union(preferred_keywords))
                jaccard_similarity = intersection / union if union else 0
                article_similarities.append((article, jaccard_similarity))

            article_similarities.sort(key=lambda x: x[1], reverse=True)
            recommended_articles = article_similarities[:10]
            random.shuffle(recommended_articles)
            recommended_articles = recommended_articles[:2]
        return [
            {key: value if key != '_id' else str(value) for key, value in article[0].items() if key != 'nouns'}
            for article in recommended_articles
        ]

    def update_interests_from_rating(self, keywords, weight):
        """평점에 따라 사용자의 키워드 관심도 업데이트"""
        now = datetime.now()
        update_operations = {}
        for keyword in keywords:
            keyword_score_inc_key = f'interests.keywords.{keyword}.score'
            keyword_last_read_set_key = f'interests.keywords.{keyword}.last_read'

            update_operations.setdefault('$inc', {})[keyword_score_inc_key] = weight
            update_operations.setdefault('$set', {})[keyword_last_read_set_key] = now

        self.collection.update_one({'user_id': self.user_id}, update_operations, upsert=True)
        self.adjust_interests_based_on_time(self.user_id)