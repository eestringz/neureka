package com.ssafy.stocker.company.controller;


import com.ssafy.stocker.company.entity.CompanyEntity;
import com.ssafy.stocker.company.entity.CompanyReadEntity;
import com.ssafy.stocker.company.entity.UserCompanyEntity;
import com.ssafy.stocker.company.service.CompanyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.extern.slf4j.Slf4j;
import org.objectweb.asm.TypeReference;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping(value = "/api/v1/company" , produces = "application/json")
public class CompanyController {


    private final CompanyService companyService;
    private final WebClient webClient ;
    public CompanyController(CompanyService companyService, WebClient.Builder webClientBuilder){
        this.companyService = companyService;
        this.webClient = webClientBuilder.baseUrl("http://localhost:8000").build() ;
    }

    @Operation(summary = "사용자가 최근 조회한 기업을 리스트에 추가합니다." )
    @PostMapping("/read")
    public ResponseEntity<?> companyReadAdd( @RequestParam String email ,@RequestParam String code){
        try {
            companyService.addCompanyRead(code , email);

            return new ResponseEntity<>(HttpStatus.OK);

        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @Operation(summary = "사용자가 최근 조회한 기업 리스트를 조회해 옵니다" )
    @GetMapping("/read")
    public ResponseEntity<?> companyReadList( @RequestParam String email){
        try {
            List<CompanyReadEntity> companyRead = companyService.listCompanyRead( email);

            return new ResponseEntity<List<CompanyReadEntity>>(companyRead ,HttpStatus.OK);

        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "주식 최근 10년간 가격을 조회합니다." )
    @GetMapping("/stock/price")
    public ResponseEntity<String> getDataFromDjango(@RequestParam @Parameter String code) {
        String url = "/data/finance/fetch_krx/?code=" + code;

        String response = webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return ResponseEntity.ok(response);
    }


    @Operation(summary = "주식 목록 리스트를 조회합니다." )
    @GetMapping("/list")
    public ResponseEntity<?> findList() {
        try {
            List<CompanyEntity> companyList = companyService.findCompanyList();
            return new ResponseEntity<List<CompanyEntity>>(companyList, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "유저가 관심있는 회사를 추가합니다" )
    @PostMapping("/like")
    public ResponseEntity<?> addLikeCompany(@RequestParam String email , @RequestParam String code){
        try {
            log.info(email + " " + code);
            companyService.addLikeCompany(email , code);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


    }

    @Operation(summary = "메일 전송 여부를 변경합니다")
    @PostMapping("/send/mail/check")
    public ResponseEntity<?> sendMailModify(@RequestParam String code ,@RequestParam String email, @RequestParam  Boolean isCheck){
        try {

            companyService.modifySendMail(code, email, isCheck);

            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }



    @Operation(summary = "유저가 관심있는 회사 리스트를 조회합니다.")
    @GetMapping("/like/list")
    public ResponseEntity<?> userLikeCompanyFind(@RequestParam String email){
        try {
             List<UserCompanyEntity> userCompanyList=  companyService.findUserLIkeCompany(email);

            return new ResponseEntity<List<UserCompanyEntity>>(userCompanyList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


    }

    @Operation(summary = "유저가 관심을 추가했던 회사를 삭제합니다" )
    @DeleteMapping("/like")
    public ResponseEntity<?> deleteLikeCompany(@RequestParam String email , @RequestParam String code){
        try {
            log.info(email + " " + code);
            companyService.deleteLikeCompany(email , code);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @Operation(summary = "해당 기업의 관련 최근 뉴스를 5개 조회합니다." )
    @GetMapping("/newsfive")
    public  ResponseEntity<?> getNewsFive(@RequestParam String company){
        try {
//            System.out.println(company);
            String url = "/data/finance/stock_news/";

            Map<String, String> requestData = new HashMap<>();
            requestData.put("keyword", company);

            String response = webClient.post()
                    .uri(url)
                    .bodyValue(requestData)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();


            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}
