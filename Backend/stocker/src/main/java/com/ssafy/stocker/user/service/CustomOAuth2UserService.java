package com.ssafy.stocker.user.service;

import com.ssafy.stocker.user.dto.*;
import com.ssafy.stocker.user.entity.UserEntity;
import com.ssafy.stocker.user.repository.UserInfoRepository;
import com.ssafy.stocker.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;

    public CustomOAuth2UserService(UserRepository userRepository , UserInfoRepository userInfoRepository) {

        this.userRepository = userRepository;
        this.userInfoRepository = userInfoRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        log.info(oAuth2User.toString());

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        log.info("커스텀서비스" + registrationId);
        log.info("name " + oAuth2User.getName()  );
        log.info(oAuth2User.getAttributes().toString());

        OAuth2Response oAuth2Response = null;

        if (registrationId.equals("naver")) {

            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        }
        else if (registrationId.equals("google")) {
            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        }
        else if (registrationId.equals("kakao")){
            log.info("kakao 로그인 시도");
//            KakaoResponse kakaoResponse = KakaoResponseConverter.convertFromJsonString(oAuth2User.getAttributes());

            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());

        }
        else{
            return null;
        }

        String username = oAuth2Response.getProvider()+" "+oAuth2Response.getProviderId();
        UserEntity existData = userRepository.findByUsername(username);

        if (existData == null) {

            UserEntity userEntity = new UserEntity();
            userEntity.setUsername(username);
            userEntity.setEmail(oAuth2Response.getEmail());
            userEntity.setName(oAuth2Response.getName());
            userEntity.setRole("ROLE_USER");

            UserInfoEntity userInfo = new UserInfoEntity();
            userInfo.setEmail(oAuth2Response.getEmail());
            userInfo.setName(oAuth2Response.getName());
            userInfoRepository.save(userInfo);
            userRepository.save(userEntity);

            UserDTO userDTO = new UserDTO();
            userDTO.setUsername(username);
            userDTO.setName(oAuth2Response.getName());
            userDTO.setRole("ROLE_USER");

            return new CustomOAuth2User(userDTO);
        }
        else {

            existData.setEmail(oAuth2Response.getEmail());
            existData.setName(oAuth2Response.getName());

            userRepository.save(existData);

            UserDTO userDTO = new UserDTO();
            userDTO.setUsername(existData.getUsername());
            userDTO.setName(oAuth2Response.getName());
            userDTO.setRole(existData.getRole());

            return new CustomOAuth2User(userDTO);
        }
    }
}
