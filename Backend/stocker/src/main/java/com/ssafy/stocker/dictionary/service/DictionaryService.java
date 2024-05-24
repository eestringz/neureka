package com.ssafy.stocker.dictionary.service;


import com.ssafy.stocker.dictionary.dto.DictionaryDTO;
import com.ssafy.stocker.dictionary.entity.DictionaryEntity;
import com.ssafy.stocker.dictionary.entity.UserDictionaryEntity;

import java.util.List;

public interface DictionaryService {
    List<DictionaryEntity> findDictionaryList();


    DictionaryEntity findDictionary(String title);

    void addLikeDictionary(String email, String title);

    List<UserDictionaryEntity> findUserLikeDictionary(String email);

    void deleteLikeDictionary(String email, String title);
}