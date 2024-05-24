package com.ssafy.stocker.user.controller;

import ch.qos.logback.classic.Logger;
import com.ssafy.stocker.user.service.ReissueService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
@Slf4j
public class ReissueController {


    private final ReissueService reissueService;

    public ReissueController( ReissueService reissueService) {


        this.reissueService = reissueService;
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        log.info("토큰 재발행 실행");
        return reissueService.reissueRefreshToken(request, response);

    }
}