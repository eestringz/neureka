package com.ssafy.stocker.company.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.stocker.company.dto.NewsSummaryDTO;
import com.ssafy.stocker.company.entity.CompanyEntity;
import com.ssafy.stocker.company.entity.UserCompanyEntity;
import com.ssafy.stocker.company.repository.UserCompanyRepository;
import com.ssafy.stocker.company.service.SendMailService;
import com.ssafy.stocker.user.entity.UserEntity;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class SendMailServiceImpl implements SendMailService {

    private final UserCompanyRepository userCompanyRepository;
    private final JavaMailSender javaMailSender;
    private final WebClient webClient ;
    private final TemplateEngine templateEngine;
    private final ObjectMapper objectMapper;
    public SendMailServiceImpl(UserCompanyRepository userCompanyRepository, JavaMailSender javaMailSender, WebClient.Builder webClientBuilder,TemplateEngine templateEngine, ObjectMapper objectMapper){
        this.userCompanyRepository = userCompanyRepository;
        this.javaMailSender = javaMailSender;
        this.webClient = webClientBuilder.baseUrl("http://localhost:8000").build() ;
        this.templateEngine = templateEngine;
        this.objectMapper = objectMapper;
    }

    @Override
    public void sendMail() {
        // 유저 찾기
        List<UserCompanyEntity> userCompanylist = userCompanyRepository.findByIsSendmail(true);

        // log 위한 변수
        int sendCount = 0 ;

        for(UserCompanyEntity userCompany : userCompanylist){
            log.info(userCompany.getUser().getEmail() + "에게" + userCompany.getCompany().getCompanyName() + "의 정보를 보냅니다" ) ;

            // 각 유저에게 메일 전송
            Boolean isSendCheck = sendUser(userCompany);

            //메일 전송 완료라면
            if(isSendCheck){
                log.info(userCompany.getUser().getEmail() + "에게 메일 전송 완료" );
                sendCount ++;
            }

        }

        log.info(sendCount + " 건 메일 전송 완료");

        // }
    }


    @Override
    public boolean sendUser(UserCompanyEntity userCompany) {
        UserEntity user = userCompany.getUser();
        CompanyEntity company = userCompany.getCompany();
        String companyName = company.getCompanyName();
        List<String> newsIds = getSubscribeNews(companyName);

        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(user.getEmail());
            helper.setSubject("\uD83D\uDCE7" + user.getName() + "님 " + company.getCompanyName()  +"에 대한 오늘의 뉴레카.");

            StringBuilder mainMessage = new StringBuilder();
            mainMessage.append("<html><body>");

            for (int i = 0; i < newsIds.size(); i++) {
                String summaryNews = getSummaryNews(newsIds.get(i));
                NewsSummaryDTO newsSummary = convertJsonToDto(summaryNews) ;
                String newsSummaryHTML = generateNewsSummaryHTML(newsSummary.getTitle(), newsSummary.getSummary());
                mainMessage.append(newsSummaryHTML);
            }

            mainMessage.append("</body></html>");
            helper.setText(mainMessage.toString(), true);

            javaMailSender.send(message);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }


    }
//        UserEntity user = userCompany.getUser();
//
//        //company 정보
//        CompanyEntity company = userCompany.getCompany();
//
//        String companyName = company.getCompanyName();
//
//        //구독한 기업에 해당하는 뉴스 id 5개를 불러 옵니다
//        List<String> newsIds = getSubscribeNews(companyName);
//
//        log.info("sendUser 메서드 newsIds : " + newsIds.toString());
//
//        try {
//            MimeMessage message = javaMailSender.createMimeMessage();
//            MimeMessageHelper helper = new MimeMessageHelper(message, true);
//            helper.setTo(user.getEmail());
//            helper.setSubject("\uD83D\uDCE7" + user.getName() + "님 " + company.getCompanyName()  +"에 대한 오늘의 요약뉴스입니다.");
//
//            StringBuilder mainMessage = new StringBuilder();
//            mainMessage.append("<html><body>");
//            for (int i = 0; i < newsIds.size(); i++) {
//                String summaryNews = getSummaryNews(newsIds.get(i));
//                log.info("요약뉴스 결과 summaryNews: " + summaryNews);
//                mainMessage.append("<h2>📌").append(i+1).append("번째 뉴스 요약입니다.</h2>");
//                mainMessage.append("<strong>").append(summaryNews.replaceAll("\"",""));
//                log.info("요약 정보 담기는 중 ~ "+ mainMessage.toString());
//            }
//
//            mainMessage.append("</body></html>");
//            helper.setText(mainMessage.toString(), true);
//
//
//            log.info(message.toString());
//            javaMailSender.send(message);
//            log.info("메일 전송 완료");
//
//            return true;
//        } catch (Exception e) {
//            e.printStackTrace();
//            return false;
//        }
//    }


    private String generateNewsSummaryHTML(String newsTitle, String summary) {
        // Thymeleaf 컨텍스트 생성
        Context context = new Context();
        context.setVariable("newsTitle", "\uD83D\uDCCC" + newsTitle);
        context.setVariable("summary", summary);

        // 타임리프 템플릿을 사용하여 HTML 생성
        return templateEngine.process("email-template", context);
    }



    //요약한 값 불러오기
    private String getSummaryNews(String newsId) {


        String url = "/data/news/api/news_summary/";
        log.info("getsummaryNews"  + newsId + "실행" + "경로는 " + url);
        Map<String, String> requestData = new HashMap<>();
        requestData.put("_id", newsId);

        String summaryNews = webClient.post()
                .uri(url)
                .bodyValue(requestData)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return summaryNews;

    }

    // 구독한 뉴스 5개 요청
    public List<String> getSubscribeNews(String company){
        String url = "/data/finance/stock_news/";

        Map<String, String> requestData = new HashMap<>();
        requestData.put("keyword", company);

        String response = webClient.post()
                .uri(url)
                .bodyValue(requestData)
                .retrieve()
                .bodyToMono(String.class)
                .block();


        ObjectMapper mapper = new ObjectMapper();
        List<String> ids = new ArrayList<>();

        try {
            JsonNode rootNode = mapper.readTree(response);
            for (JsonNode node : rootNode){
                String id = node.get("_id").asText();
                ids.add(id);
            }
        } catch (JsonMappingException e) {
            throw new RuntimeException(e);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return ids ;
    }



    public NewsSummaryDTO convertJsonToDto(String jsonString) {
        try {
            return objectMapper.readValue(jsonString, NewsSummaryDTO.class);
        } catch (Exception e) {
            // JSON 변환 중에 오류가 발생할 경우 처리
            e.printStackTrace();
            return null; // 또는 적절한 오류 처리를 하세요.
        }
    }
}