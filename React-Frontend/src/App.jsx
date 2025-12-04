import React, { useEffect, useMemo, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import './App.css';

// Backend bağlantısı (Spring Boot)
const API_BASE = import.meta.env.VITE_API_URL || "http://backend:8080";

function formatDate(value) {
  if (!value) return "-";
  const d = new Date(value);
  d.setHours(d.getHours() + 3); // +3 saat ekle
  return d.toLocaleString("tr-TR");
}


function WeatherCard({ data }) {
  if (!data) return null;

  // Hava durumuna göre animasyonlu ikon sınıfı
  const getWeatherAnimationClass = (main) => {
    switch (main?.toLowerCase()) {
      case "clear":
        return "sunny-animation";
      case "rain":
        return "rainy-animation";
      case "clouds":
        return "cloudy-animation";
      default:
        return "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      className="weather-card"
    >
      <div className={`weather-icon ${getWeatherAnimationClass(data.main)}`}> 
        {data.main?.toLowerCase() === 'clear' ? '☀️' : data.main?.toLowerCase() === 'rain' ? '🌧️' : data.main?.toLowerCase() === 'clouds' ? '☁️' : '🌍'}
      </div>
      <h2 className="city-name">{data.city}</h2>
      <div className="weather-info">
        <p>🌡️ Sıcaklık: <span>{Math.round(data.temperature)} °C</span></p>
        <p>🤗 Hissedilen: <span>{Math.round(data.feels_like)} °C</span></p>
        <p>💧 Nem: <span>{data.humidity} %</span></p>
        <p>🌈 Durum: <span>{data.description || "Bilinmiyor"}</span></p>
        <p className="update-time">📅 Güncelleme: {formatDate(data.lastUpdate)}</p>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [recent, setRecent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("recent-cities")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("recent-cities", JSON.stringify(recent));
  }, [recent]);

  const canSearch = useMemo(() => city.trim().length > 0, [city]);

  async function fetchWeather(targetCity) {
    const q = (targetCity ?? city).trim();
    if (!q) return;
    setLoading(true);
    setError("");
    try {
      const url = `${API_BASE}/weather?city=${encodeURIComponent(q)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("API isteği başarısız");
      const json = await res.json();
      setData(json);

      setRecent((prev) => {
        const next = [json.city || q, ...prev.filter((c) => c !== (json.city || q))].slice(0, 5);
        return next;
      });
    } catch (e) {
      setError(e.message || "Bilinmeyen hata");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (canSearch) fetchWeather();
  }

  return (
    <div className="app-container">
      <motion.h1
        initial={{ opacity: 0, y: -70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="app-title"
      >
        Hava Durumu
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="search-form"
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Şehir adı (örn. Ankara)"
          className="search-input"
        />
        <motion.button
          type="submit"
          disabled={!canSearch || loading}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="search-button"
        >
          {loading ? "Yükleniyor..." : "Getir"}
        </motion.button>
      </motion.form>

      <AnimatePresence>
        {recent.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="recent-cities"
          >
            {recent.map((c) => (
              <motion.button
                key={c}
                onClick={() => fetchWeather(c)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="recent-button"
              >
                {c}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="error-message"
          >
            ❌ {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {data && <WeatherCard data={data} />}
      </AnimatePresence>

      <AnimatePresence>
        {!data && !loading && !error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="initial-prompt"
          >
            Bir şehir adı yazıp <strong>Getir</strong> butonuna tıkla 🌍
          </motion.p>
        )}
      </AnimatePresence>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.7 }}
        className="app-footer"
      >
       
      </motion.footer>
    </div>
  );
}