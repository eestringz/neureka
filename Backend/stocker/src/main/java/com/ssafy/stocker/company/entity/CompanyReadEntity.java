package com.ssafy.stocker.company.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "company_read")
@Getter
@Setter
public class CompanyReadEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cr_id")
    private Long crId ;

    private String email ;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private CompanyEntity company;

}


