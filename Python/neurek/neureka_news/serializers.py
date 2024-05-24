from rest_framework import serializers


class SummaryArticleSerializer(serializers.Serializer):
    thumbnail_url = serializers.URLField()
    article_title = serializers.CharField(max_length=1024)
    article_link = serializers.URLField()
    article_summary = serializers.CharField()
    press = serializers.CharField(max_length=255)
    date_time = serializers.DateTimeField()
    keywords = serializers.JSONField()


class IdsSerializer(serializers.Serializer):
    ids = serializers.ListField(child=serializers.CharField(max_length=24))

class IdSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length=24)

class RateSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length=24)
    rating = serializers.IntegerField(min_value=0, max_value=5)
    user_id = serializers.CharField(max_length=30)
