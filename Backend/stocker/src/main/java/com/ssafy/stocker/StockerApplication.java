package com.ssafy.stocker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling

@SpringBootApplication
public class StockerApplication {

	public static void main(String[] args) {
		SpringApplication.run(StockerApplication.class, args);
	}

}
