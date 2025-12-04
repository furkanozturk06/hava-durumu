package com.emindogan.starter.repository;

import com.emindogan.starter.model.WeatherData;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

@org.springframework.stereotype.Repository
    public interface WeatherRepository extends MongoRepository<WeatherData, String> {
        WeatherData findTopByCityOrderByLastUpdateDesc(String city);
    // Şehrin tüm kayıtlarını getir (liste döner, geçmiş sorgular için)
    List<WeatherData> findByCityOrderByLastUpdateDesc(String city);
    }


