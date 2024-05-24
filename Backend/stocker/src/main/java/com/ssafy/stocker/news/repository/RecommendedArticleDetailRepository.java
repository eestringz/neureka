package com.ssafy.stocker.news.repository;

import com.ssafy.stocker.news.entity.RecommendedArticleDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommendedArticleDetailRepository extends JpaRepository<RecommendedArticleDetailEntity,Long> {
}
