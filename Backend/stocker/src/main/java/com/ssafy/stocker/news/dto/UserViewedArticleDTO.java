package com.ssafy.stocker.news.dto;

import com.ssafy.stocker.user.dto.UserInfoEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
public class UserViewedArticleDTO {

    private UserInfoEntity user;

    private String email;

    private int rating;
}
