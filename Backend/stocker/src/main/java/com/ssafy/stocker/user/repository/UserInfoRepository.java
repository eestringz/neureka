package com.ssafy.stocker.user.repository;

import com.ssafy.stocker.user.dto.UserInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfoEntity, Long> {

    UserInfoEntity findByEmail(String email);

    boolean existsByEmail(String email);
}
