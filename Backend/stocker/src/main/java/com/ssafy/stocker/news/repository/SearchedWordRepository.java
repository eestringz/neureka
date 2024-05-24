package com.ssafy.stocker.news.repository;

import com.ssafy.stocker.news.dto.HotWordDTO;
import com.ssafy.stocker.news.entity.SearchedWordEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SearchedWordRepository extends JpaRepository<SearchedWordEntity , Long> {


    @Query("select new com.ssafy.stocker.news.dto.HotWordDTO(s.word, count(s) ) from searched_word  s group by  s.word ORDER BY COUNT(s) desc" )
    List<HotWordDTO> countHotWord();
}
