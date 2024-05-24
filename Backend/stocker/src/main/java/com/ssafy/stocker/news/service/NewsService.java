package com.ssafy.stocker.news.service;

import com.ssafy.stocker.news.dto.HotWordDTO;
import com.ssafy.stocker.news.entity.SearchedWordEntity;
import com.ssafy.stocker.news.entity.UserViewedArticleEntity;
import com.ssafy.stocker.user.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.List;

public interface NewsService {

    public void saveUserViewedArticle(String email, String newsUrl);

    public Object getRedisListValue(String key);

    void addSearchWord(SearchedWordEntity searchedWord);

    List<HotWordDTO> findHotWord();


    void saveUserArticleRating(String email, String newsId, String rating);

    String returnUserArticleRating(String email, String newsId);
}

