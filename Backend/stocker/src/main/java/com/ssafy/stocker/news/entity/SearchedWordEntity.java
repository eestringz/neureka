package com.ssafy.stocker.news.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity(name="searched_word")
@Getter
@Setter
public class SearchedWordEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sw_id")
    private Long SWId;

    private String word;

    private String email;

//    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "search_time")
    private LocalDateTime searchTime;


}
