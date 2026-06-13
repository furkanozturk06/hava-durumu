package com.emindogan.starter.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    // İzin verilen originler ortam değişkeninden (virgülle ayrılmış) okunur.
    @Value("${cors.allowed-origins}")
    private String allowedOrigins;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        final String[] origins = allowedOrigins.split("\\s*,\\s*");
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(origins)   // Env-bazlı whitelist
                        .allowedMethods("GET");    // Salt-okunur API: yalnızca GET
            }
        };
    }
}
