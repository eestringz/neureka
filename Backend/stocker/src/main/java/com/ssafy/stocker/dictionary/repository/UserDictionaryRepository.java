package com.ssafy.stocker.dictionary.repository;

import com.ssafy.stocker.dictionary.entity.DictionaryEntity;
import com.ssafy.stocker.dictionary.entity.UserDictionaryEntity;
import com.ssafy.stocker.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserDictionaryRepository extends JpaRepository<UserDictionaryEntity, Long> {
    List<UserDictionaryEntity> findByUser(UserEntity user);

    @Transactional
    void deleteByUserAndDictionary(UserEntity user , DictionaryEntity dictionary);
}
