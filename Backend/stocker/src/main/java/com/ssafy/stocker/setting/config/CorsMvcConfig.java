package com.ssafy.stocker.setting.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsMvcConfig implements WebMvcConfigurer {



    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {

        corsRegistry.addMapping("/**")
                .exposedHeaders("Set-Cookie")
                .exposedHeaders("Authorization")
                .allowedOrigins("http://localhost:5173" ,"http://192.168.100.134:3000" , "http://192.168.100.134:5173")
                .allowCredentials(true);

    }
}
