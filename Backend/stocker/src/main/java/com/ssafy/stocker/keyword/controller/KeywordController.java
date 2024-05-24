package com.ssafy.stocker.keyword.controller;

import com.ssafy.stocker.keyword.service.KeywordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/api/v1/keyword", produces = "application/json")
public class KeywordController {

    private final KeywordService keywordService ;
    private final WebClient webClient ;

    public KeywordController(KeywordService keywordService, WebClient.Builder webClientBuilder){
        this.keywordService = keywordService;
        this.webClient = webClientBuilder.baseUrl("http://localhost:8000").build();
    }



    @GetMapping()
    @Operation(summary = "메인화면에 띄울 키워드들을 조회합니다" )
    public ResponseEntity<?> keywordList(@RequestParam(value = "keywords", required = false) List<String> keywords){
        try {
            if(keywords == null){
                keywords =  keywordService.findKeyword();
            }

            String url = "/data/news/api/bubble/";

            // URI에 쿼리 매개변수 추가
            UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url);
            for (String keyword : keywords) {
                builder.queryParam("keywords", keyword);
            }

            // URI를 문자열로 변환
            String uriString = builder.build().toUriString();


            // 응답 처리

            String response = webClient.get()
                    .uri(uriString)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            System.out.println(response);

            return new ResponseEntity<>(response, HttpStatus.OK);

        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }


//    @PostMapping
//    @Operation(summary = "")
//    public ResponseEntity<?> keywordSave(@RequestBody String userId , String){
//
//    }
}
