package com.ssafy.stocker.news.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@Data
@Getter
@Setter
@AllArgsConstructor
public class HotWordDTO {

    private String word;

    private Long count;


}
