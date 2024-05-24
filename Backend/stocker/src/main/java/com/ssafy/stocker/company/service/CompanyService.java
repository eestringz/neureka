package com.ssafy.stocker.company.service;

import com.ssafy.stocker.company.entity.CompanyEntity;
import com.ssafy.stocker.company.entity.CompanyReadEntity;
import com.ssafy.stocker.company.entity.UserCompanyEntity;

import java.util.List;

public interface CompanyService {
    List<CompanyEntity> findCompanyList();



    void addLikeCompany(String email, String code);
    void deleteLikeCompany(String email, String code);
    List<UserCompanyEntity> findUserLIkeCompany(String email);

    void addCompanyRead(String code ,String email);

    List<CompanyReadEntity> listCompanyRead( String email);

    void modifySendMail(String code,String email, Boolean isCheck);
}
