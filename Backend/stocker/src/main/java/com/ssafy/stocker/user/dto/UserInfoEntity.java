package com.ssafy.stocker.user.dto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "user_info")
@Getter
@Setter
public class UserInfoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_info_id")
    private Long userInfoId ;

    private String email;

    private String nickname;

    private String phone;

    private String birth;
    private Boolean gender ;

    private String name;
}

//
//create table user_info
//        ( user_info_id int primary key auto_increment  ,
//          email varchar(255)  ,
//nickname varchar(255),
//phone varchar(255),
//birth varchar(255),
//gender tinyint
//);
