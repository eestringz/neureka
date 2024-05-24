package com.ssafy.stocker.company.entity;

import com.ssafy.stocker.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "user_like_company")
@Getter
@Setter
public class UserCompanyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ulc_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private CompanyEntity company;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;


    @Column(name = "send_mail" )
    private Boolean isSendmail ;
}
