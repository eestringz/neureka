package com.ssafy.stocker.user.oauth2;

import com.ssafy.stocker.user.dto.CustomOAuth2User;
import com.ssafy.stocker.setting.jwt.JWTUtil;
import com.ssafy.stocker.user.repository.UserRepository;
import com.ssafy.stocker.user.service.RedisService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

@Component
@Slf4j
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;
    private final RedisService redisService;
    private final UserRepository userRepository;

    @Value("${access.token.expiration.time}")
    private Long accessExpireMs ;

    @Value("${refresh.token.expiration.time}")
    private Long refreshExpireMs ;
    public CustomSuccessHandler(JWTUtil jwtUtil, RedisService redisService, UserRepository userRepository) {

        this.jwtUtil = jwtUtil;
        this.redisService = redisService;
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        //OAuth2User
        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();

        String username = customUserDetails.getUsername();
        String email = userRepository.findByUsername(username).getEmail();

        log.info("success핸들러 " + email);

        // 권한을 찾아서 권한 설정해줌
        // authentication.getAuthorities()를 호출하여
        // 현재 사용자에게 부여된 권한을 나타내는 GrantedAuthority 객체의 컬렉션을 얻습니다.
        // 이 컬렉션에는 사용자가 가진 모든 권한이 포함되어 있습니다.
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();



        String access = jwtUtil.createJwt("access",email, username, role, accessExpireMs);
        String refresh = jwtUtil.createJwt("refresh",email, username, role, refreshExpireMs);

        log.info("accesstoken : " + access);
        log.info("refreshtoken" + refresh);


        //redis 에 담아서 reftoken 관리

        redisService.setValues(username, refresh, refreshExpireMs );


//       response.addHeader("Authorization" , "Bearer " +access);
        response.addCookie(createCookie("refresh", refresh));
        response.addCookie(createCookie("Authorization", access));
//        response.addHeader("Authorization" , "Bearer " +access);
        log.info("response " + response.getHeader("Authorization"));
        response.sendRedirect("http://localhost:5173");
    }

    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(60*60*60*60);
        //cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setHttpOnly(false);

        return cookie;
    }
}
