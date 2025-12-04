# 🌤️ Full-Stack Weather App (Hava Durumu Uygulaması)

![React](https://img.shields.io/badge/Frontend-React-61DAFB) ![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F) ![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248) ![Java](https://img.shields.io/badge/Language-Java-ED8B00)

Bu proje, kullanıcıların anlık hava durumu verilerine erişebileceği, şehir araması yapabileceği ve favori lokasyonlarını veritabanına kaydedebileceği modern bir web uygulamasıdır. **React** arayüzü, **Spring Boot** REST API servisi ve **MongoDB** veritabanı altyapısı kullanılarak geliştirilmiştir.

## 🚀 Özellikler

* **Anlık Hava Durumu:** Şehir ismine göre güncel sıcaklık, nem ve rüzgar bilgilerini görüntüleme.
* **Favorilere Ekleme:** Kullanıcılar sık takip ettikleri şehirleri MongoDB veritabanına kaydedebilir.
* **Arama Geçmişi:** Yapılan son aramaların listelenmesi.
* **RESTful API:** Spring Boot ile geliştirilmiş, JSON tabanlı veri iletişimi.
* **Responsive Tasarım:** Mobil ve masaüstü uyumlu React arayüzü.

## 🛠️ Teknoloji Yığını (Tech Stack)

Proje aşağıdaki teknolojiler üzerine inşa edilmiştir:

### Frontend (İstemci)
* **React.js:** Kullanıcı arayüzü oluşturma.
* **Axios:** Backend API ile HTTP istekleri için.
* **CSS / Bootstrap:** Tasarım ve stil işlemleri.

### Backend (Sunucu)
* **Java 17+**: Programlama dili.
* **Spring Boot:** Uygulama çatısı.
* **Spring Data MongoDB:** Veritabanı etkileşimi için.
* **OpenWeatherMap API:** Harici hava durumu veri sağlayıcısı.

### Database (Veri Tabanı)
* **MongoDB:** NoSQL veritabanı (Kullanıcı tercihleri ve loglar için).

## 🏗️ Mimari Yapı

Uygulama temel olarak şu akışla çalışır:
1.  Kullanıcı **React** arayüzünden bir şehir aratır.
2.  React, **Spring Boot** API'sine bir istek atar.
3.  Spring Boot, harici **OpenWeatherMap API**'sinden veriyi çeker.
4.  Gelen veri işlenir ve kullanıcıya sunulur.
5.  Kullanıcı "Kaydet" derse, veri **MongoDB**'ye yazılır.

## 📸 Ekran Görüntüleri

| Arama Ekranı | Favoriler Listesi |
| :---: | :---: |
| ![Search](https://via.placeholder.com/300x200?text=Arama+Ekrani) | ![List](https://via.placeholder.com/300x200?text=Favoriler) |

## ⚙️ Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### Ön Gereksinimler
* Node.js ve npm
* JDK 17 veya üzeri
* MongoDB (Yerel veya Atlas URL'i)
* OpenWeatherMap API Key (Ücretsiz alınabilir)

### 1. Backend Kurulumu (Spring Boot)

1.  `backend` klasörüne gidin.
2.  `src/main/resources/application.properties` dosyasını açın ve kendi ayarlarınızı girin:
    ```properties
    spring.data.mongodb.uri=mongodb://localhost:27017/weather_db
    weather.api.key=SENIN_OPENWEATHER_API_ANAHTARIN
    server.port=8080
    ```
3.  Projeyi çalıştırın:
    ```bash
    mvn spring-boot:run
    ```

### 2. Frontend Kurulumu (React)

1.  `frontend` klasörüne gidin.
2.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```
3.  Uygulamayı başlatın:
    ```bash
    npm start
    ```
4.  Tarayıcıda `http://localhost:3000` adresine gidin.

## 🔌 API Endpoints

Backend tarafında kullanılan temel servis uç noktaları:

| Metot | Endpoint | Açıklama |
| :--- | :--- | :--- |
| `GET` | `/api/weather/{city}` | Belirtilen şehrin hava durumunu getirir. |
| `POST` | `/api/favorites` | Bir şehri favorilere ekler (MongoDB). |
| `GET` | `/api/favorites` | Kayıtlı favori şehirleri listeler. |
| `DELETE` | `/api/favorites/{id}` | Favori şehri siler. |

## 👨‍💻 Geliştirici

**Furkan Öztürk**

---
*Bu proje Full-Stack geliştirme yeteneklerimi geliştirmek amacıyla yapılmıştır.*
