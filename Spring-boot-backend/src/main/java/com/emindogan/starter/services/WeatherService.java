package com.emindogan.starter.services;
import com.emindogan.starter.model.WeatherData;
import com.emindogan.starter.repository.WeatherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

import java.time.LocalDate;
import java.time.LocalDateTime;

@org.springframework.stereotype.Service
public class WeatherService {
    @Autowired
    private RestTemplate restTemplate;
    private final String Api_Key = "be6d362a0ebe9a17403e7f2456cd83bc";
    private final String Base_URL = "https://api.openweathermap.org/data/2.5";
    @Autowired
    private WeatherRepository weatherRepository;

    public WeatherData getweather(String city) {
        // DB'de bu şehrin en son kaydını al
        WeatherData lastData = weatherRepository.findTopByCityOrderByLastUpdateDesc(city);

        if (lastData == null) {
            // Eğer hiç kayıt yoksa API'den çek ve kaydet
            WeatherData newData = fetchFromApi(city);
            newData.setLastUpdate(LocalDateTime.now());
            newData.setId(city + "_" + LocalDateTime.now()); // eşsiz id
            weatherRepository.save(newData);
            return newData;
        } else {
            WeatherData newData = fetchFromApi(city);
            newData.setLastUpdate(LocalDateTime.now());
            newData.setId(city + "_" + LocalDateTime.now());
            weatherRepository.save(newData);
            return newData;
        }
    }

    private WeatherData fetchFromApi(String city) {
        String url = Base_URL + "/weather?q=" + city + "&appid=" + Api_Key + "&units=metric&lang=tr";
        String response = restTemplate.getForObject(url, String.class);

        JSONObject json = new JSONObject(response);

        WeatherData weatherData = new WeatherData();
        weatherData.setId(city + "_" + LocalDateTime.now());
        weatherData.setCity(json.getString("name").split(" ")[0]);
        weatherData.setTemperature(json.getJSONObject("main").getDouble("temp"));
        weatherData.setFeels_like(json.getJSONObject("main").getDouble("feels_like"));
        weatherData.setHumidity(json.getJSONObject("main").getInt("humidity"));

        JSONObject weather = json.getJSONArray("weather").getJSONObject(0);
        weatherData.setMain(weather.getString("main"));
        weatherData.setDescription(weather.getString("description"));
        weatherData.setIcon(weather.getString("icon"));

        return weatherData;
    }
}
