package com.ssafy.stocker.news.service;

import com.ssafy.stocker.news.dto.HotWordDTO;
import com.ssafy.stocker.news.dto.UserViewedArticleDTO;
import com.ssafy.stocker.news.entity.SearchedWordEntity;
import com.ssafy.stocker.news.entity.UserViewedArticleEntity;
import com.ssafy.stocker.news.repository.RecommendedArticleDetailRepository;
import com.ssafy.stocker.news.repository.SearchedWordRepository;
import com.ssafy.stocker.news.repository.UserVIewedArticleRepository;
import com.ssafy.stocker.user.dto.UserDTO;
import com.ssafy.stocker.user.dto.UserInfoEntity;
import com.ssafy.stocker.user.service.RedisService;
import com.ssafy.stocker.user.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NewsServiceImpl implements NewsService {

    private final UserVIewedArticleRepository userVIewedArticleRepository;
    private final RecommendedArticleDetailRepository recommendedArticleDetailRepository;
    private final RedisService redisService;
    private final SearchedWordRepository searchedWordRepository;

    private final UserServiceImpl userServiceImpl;

    public NewsServiceImpl(UserVIewedArticleRepository userVIewedArticleRepository, RecommendedArticleDetailRepository recommendedArticleDetailRepository, RedisService redisService, SearchedWordRepository searchedWordRepository, UserServiceImpl userServiceImpl) {
        this.userVIewedArticleRepository = userVIewedArticleRepository;
        this.recommendedArticleDetailRepository = recommendedArticleDetailRepository;
        this.redisService = redisService;
        this.searchedWordRepository = searchedWordRepository;
        this.userServiceImpl = userServiceImpl;
    }

    @Override
    public void saveUserViewedArticle(String email, String newsUrl) {
        redisService.setValuesToList(email,newsUrl, (long) (7 * 24 * 60 * 60 * 1000));
    }

    @Override
    public Object getRedisListValue(String key) {
        return redisService.getValuesToList(key);
    }

    @Override
    public void addSearchWord(SearchedWordEntity searchedWord) {

        searchedWordRepository.save(searchedWord);
    }

    @Override
    public List<HotWordDTO> findHotWord() {
        return  searchedWordRepository.countHotWord() ;
    }

    @Override
    public void saveUserArticleRating(String email, String newsId, String rating) {
        UserInfoEntity userInfoDto = userServiceImpl.findUser(email);

        UserViewedArticleEntity userViewedArticleEntity = new UserViewedArticleEntity();

        Optional<UserViewedArticleEntity> isRated = userVIewedArticleRepository.findByArticleIdAndUser(newsId, userInfoDto);
        if(isRated.isPresent()){
            userViewedArticleEntity = isRated.get();
        }


        userViewedArticleEntity.setUser(userInfoDto);
        userViewedArticleEntity.setArticleId(newsId);
        userViewedArticleEntity.setRating(rating);


        userVIewedArticleRepository.save(userViewedArticleEntity);
    }

    @Override
    public String returnUserArticleRating(String email, String newsId) {
        UserInfoEntity userInfoDto = userServiceImpl.findUser(email);

        Optional<UserViewedArticleEntity> rating = userVIewedArticleRepository.findByArticleIdAndUser(newsId, userInfoDto);

        if(rating.isPresent()){
            return rating.get().getRating();
        }else{
            return "";
        }
    }

    // 개수 받는거 설정 상위 10개

}
