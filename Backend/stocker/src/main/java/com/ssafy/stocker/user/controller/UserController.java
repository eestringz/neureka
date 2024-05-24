package com.ssafy.stocker.user.controller;

import com.ssafy.stocker.user.dto.UserInfoEntity;
import com.ssafy.stocker.user.entity.UserEntity;
import com.ssafy.stocker.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@Slf4j
@RestController
@RequestMapping(value = "/api/v1/user", produces = "application/json")
@Tag(name = "User", description = "User API")
public class UserController {

    private final UserService userService;



    public UserController(UserService userService){
        this.userService = userService;
    }



    @GetMapping("/mypage")
    @Operation(summary = "회원정보를 조회합니다" )
    public ResponseEntity<?> userDetails(@RequestParam @Parameter String email){
        try {
            log.info("user/mypage 시작 param email : " + email );
            UserInfoEntity userInfoEntity= userService.findUser(email);

                return new ResponseEntity<UserInfoEntity>(userInfoEntity, HttpStatus.OK);

        }catch (Exception e){
            e.printStackTrace();

            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST) ;
        }

    }


    @PostMapping("/mypage")
    @Operation(summary = "회원정보를 변경합니다 gender 남자 true 여자  false " )
//    public ResponseEntity<?> userInfoModify(@RequestParam String email , @RequestParam String phone ,@RequestParam String nickname , @RequestParam String birth ,  @RequestParam Boolean gender){    public ResponseEntity<?> userInfoModify(@RequestParam String email , @RequestParam String phone ,@RequestParam String nickname , @RequestParam String birth ,  @RequestParam Boolean gender){
    public ResponseEntity<?> userInfoModify(@RequestBody UserInfoEntity userInfo){


        try {
            userService.modifyUserInfo(userInfo);

            return new ResponseEntity<>(HttpStatus.OK);


        }catch (Exception e){
            e.printStackTrace();

            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST) ;
        }

    }


}
