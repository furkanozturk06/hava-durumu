package com.emindogan.starter.controller;

import com.emindogan.starter.model.WeatherData;
import com.emindogan.starter.services.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/weather")
@CrossOrigin(origins = "http://localhost:5174")  // React dev sunucusuna izin ver
public class RestWeatherController {
    @Autowired
    private WeatherService weatherService;
    @GetMapping
    public WeatherData getWeather(@RequestParam String city) {
        return weatherService.getweather(city);
    }
}
