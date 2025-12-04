package com.emindogan.starter.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@Document(collection = "weather")
public class WeatherData {
    @Id
    private String id; //city + tarih
    private String city;
    private double temperature;
    private int humidity; //nem
    private double feels_like; //hissedilen sıcaklık
    private String description;
    private String main;
    private String icon;
    private LocalDateTime lastUpdate;

}
