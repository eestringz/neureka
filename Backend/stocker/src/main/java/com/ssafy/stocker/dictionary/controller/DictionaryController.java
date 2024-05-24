package com.ssafy.stocker.dictionary.controller;


import com.ssafy.stocker.company.entity.UserCompanyEntity;
import com.ssafy.stocker.dictionary.dto.DictionaryDTO;
import com.ssafy.stocker.dictionary.entity.DictionaryEntity;
import com.ssafy.stocker.dictionary.entity.UserDictionaryEntity;
import com.ssafy.stocker.dictionary.service.DictionaryService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping(value = "/api/v1/dictionary", produces = "application/json")
public class DictionaryController {

    private final DictionaryService dictinaryService;


    public DictionaryController(DictionaryService dictinaryService) {
        this.dictinaryService = dictinaryService;
    }

    @Operation(summary = "용어사전 리스트를 조회합니다" )
    @GetMapping("/list")
    public ResponseEntity<?> findList(){
        try {
            List<DictionaryEntity> dictionaryList = dictinaryService.findDictionaryList();
            return new ResponseEntity<List<DictionaryEntity>>(dictionaryList, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get")
    @Operation(summary = "경제 용어 상세 항목을 조회합니다" )
    public ResponseEntity<?> find(@RequestParam String title){
        try {
            DictionaryEntity dictionary = dictinaryService.findDictionary(title);
            return new ResponseEntity<DictionaryEntity>(dictionary, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }


    @Operation(summary = "유저가 관심있는 용어를 추가합니다" )
    @PostMapping("/like")
    public ResponseEntity<?> addLikeDictionary(@RequestParam String email , @RequestParam String title){
        try {
            log.info(email + " " + title);
            dictinaryService.addLikeDictionary(email ,  title);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "유저가 관심있는 용어를 삭제합니다.")
    @DeleteMapping("/like/delete")
    public ResponseEntity<?> deleteLikeDictionary(@RequestParam String email , @RequestParam String title){
        try {
            log.info(email + " " + title );

            dictinaryService.deleteLikeDictionary(email, title);

            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "유저가 관심있는 용어리스트를 조회합니다" )
    @GetMapping("/like/list")
    public ResponseEntity<?> userLikeDictionaryFind(String email){
        try {
            List<UserDictionaryEntity> userDictionaryEntityList=  dictinaryService.findUserLikeDictionary(email);

            return new ResponseEntity< List<UserDictionaryEntity>>(userDictionaryEntityList, HttpStatus.OK);

        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }



}
