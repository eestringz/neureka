package com.ssafy.stocker.news.entity;

import com.ssafy.stocker.user.dto.UserInfoEntity;
import com.ssafy.stocker.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "user_viewed_article")
@Getter
@Setter
public class UserViewedArticleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uva_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_info_id")
    private UserInfoEntity user;

    @Column(name = "article_id")
    private String articleId;

    @Column(name = "rating")
    private String rating;
}
