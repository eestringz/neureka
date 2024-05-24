package com.ssafy.stocker.user.service;

import com.ssafy.stocker.user.dto.UserInfoEntity;
import com.ssafy.stocker.user.entity.UserEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    UserInfoEntity findUser(String email);

    void modifyUserInfo(UserInfoEntity userInfoEntity);
}
