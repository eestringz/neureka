package com.ssafy.stocker.setting.config;


import com.ssafy.stocker.company.service.SendMailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class SchedulerConfig {
    private final SendMailService sendMailService;

    public SchedulerConfig (SendMailService sendMailService){
        this.sendMailService = sendMailService;
    }

// 매일 오전 9시 실행
//    @Scheduled(cron = "0 0 9 * * ?")


    //서버를 실행시킬때마다 실행
//    @Scheduled(initialDelay = 0 , fixedDelay = Long.MAX_VALUE)
//    public void sendMail() {
//        sendMailService.sendMail();
//    }
}
