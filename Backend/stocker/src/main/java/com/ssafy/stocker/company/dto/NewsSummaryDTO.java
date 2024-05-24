package com.ssafy.stocker.company.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@Getter
@Setter
@AllArgsConstructor
public class NewsSummaryDTO {

    private String title;

    private String summary;

}


