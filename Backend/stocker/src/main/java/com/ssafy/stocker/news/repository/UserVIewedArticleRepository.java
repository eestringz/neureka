package com.ssafy.stocker.news.repository;

import com.ssafy.stocker.news.entity.UserViewedArticleEntity;
import com.ssafy.stocker.user.dto.UserInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.support.SimpleTriggerContext;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserVIewedArticleRepository extends JpaRepository<UserViewedArticleEntity, Long> {

    Optional<UserViewedArticleEntity> findByArticleIdAndUser(String newsId, UserInfoEntity userInfoDto);

}
