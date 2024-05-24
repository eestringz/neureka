package com.ssafy.stocker.news.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "recommended_article_detail")
@Getter
@Setter
public class RecommendedArticleDetailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rad_id")
    private Long id;

//    private
}
