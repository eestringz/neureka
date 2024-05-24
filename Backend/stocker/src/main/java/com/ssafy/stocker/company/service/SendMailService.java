package com.ssafy.stocker.company.service;

import com.ssafy.stocker.company.entity.UserCompanyEntity;

public interface SendMailService {


    void sendMail();

    boolean sendUser(UserCompanyEntity userCompany);


}
