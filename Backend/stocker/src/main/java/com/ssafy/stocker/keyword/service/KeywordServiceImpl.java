package com.ssafy.stocker.keyword.service;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class KeywordServiceImpl implements KeywordService {
    @Override
    public List<String> findKeyword() {

        List<String> keywords = Arrays.asList("반도체", "금융", "기술", "경영", "가상화폐", "유가증권", "정치", "해외토픽");

        return keywords;
    }
}
