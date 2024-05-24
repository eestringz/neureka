package com.ssafy.stocker.dictionary.service;

import ch.qos.logback.classic.Logger;
import com.ssafy.stocker.company.entity.CompanyEntity;
import com.ssafy.stocker.company.entity.UserCompanyEntity;
import com.ssafy.stocker.dictionary.dto.DictionaryDTO;
import com.ssafy.stocker.dictionary.entity.DictionaryEntity;
import com.ssafy.stocker.dictionary.entity.UserDictionaryEntity;
import com.ssafy.stocker.dictionary.repository.DictinaryRepository;
import com.ssafy.stocker.dictionary.repository.UserDictionaryRepository;
import com.ssafy.stocker.user.entity.UserEntity;
import com.ssafy.stocker.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DictionaryServiceImpl implements DictionaryService{

    private final DictinaryRepository dictinaryRepository;
    private final UserRepository userRepository;
    private final UserDictionaryRepository userDictionaryRepository;

    public DictionaryServiceImpl(DictinaryRepository dictinaryRepository , UserRepository userRepository, UserDictionaryRepository userDictionaryRepository){
        this.dictinaryRepository = dictinaryRepository;
        this.userRepository = userRepository;
        this.userDictionaryRepository = userDictionaryRepository;
    }
    @Override
    public List<DictionaryEntity> findDictionaryList() {

        List<DictionaryEntity> dictionaryList = dictinaryRepository.findAll();

        return dictionaryList;
    }

    @Override
    public DictionaryEntity findDictionary(String title) {
        DictionaryEntity dictionary = dictinaryRepository.findByTitle(title);
        return dictionary;
    }

    @Override
    public void addLikeDictionary(String email, String title) {
        UserEntity user = userRepository.findByEmail(email);
        DictionaryEntity dictionary = dictinaryRepository.findByTitle(title);

        UserDictionaryEntity userDictionary = new UserDictionaryEntity() ;
        userDictionary.setUser(user);
        userDictionary.setDictionary(dictionary);

        userDictionaryRepository.save(userDictionary);
    }

    @Override
    public List<UserDictionaryEntity> findUserLikeDictionary(String email) {
        UserEntity user = userRepository.findByEmail(email);
        List<UserDictionaryEntity> userDictionaryList = userDictionaryRepository.findByUser(user);

        return userDictionaryList;
    }

    @Override
    @Transactional
    public void deleteLikeDictionary(String email, String title) {
        UserEntity user = userRepository.findByEmail(email);
        DictionaryEntity dictionary = dictinaryRepository.findByTitle(title);

        UserDictionaryEntity userDictionary = new UserDictionaryEntity();

        userDictionary.setDictionary(dictionary);
        userDictionary.setUser(user);

        userDictionaryRepository.deleteByUserAndDictionary(user, dictionary);
    }


}
