
import { useState } from "react";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name!");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      );

      if (!geoRes.ok) throw new Error("Network error. Try again.");

      const geoData = await geoRes.json();

      if (!geoData.results?.length) {
        throw new Error("City not found! Try another city.");
      }

      const place = geoData.results[0];

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=auto`
      );

      if (!res.ok) throw new Error("Unable to get weather data.");

      const data = await res.json();

      setWeather({
        city: place.name,
        country: place.country || "",
        temp: Math.round(data.current.temperature_2m),
        feels: Math.round(data.current.apparent_temperature),
        humidity: data.current.relative_humidity_2m,
        wind: data.current.wind_speed_10m,
        rain: data.current.precipitation,
        code: data.current.weather_code
      });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const getCondition = (code) => {
    if (code === 0) return ["☀️", "Clear Sky"];
    if ([1, 2].includes(code)) return ["🌤️", "Partly Cloudy"];
    if (code === 3) return ["☁️", "Cloudy"];
    if ([45, 48].includes(code)) return ["🌫️", "Foggy"];
    if ([51, 53, 55, 56, 57].includes(code)) return ["🌦️", "Drizzle"];
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return ["🌧️", "Rainy"];
    if ([71, 73, 75, 77, 85, 86].includes(code)) return ["❄️", "Snowy"];
    if ([95, 96, 99].includes(code)) return ["⛈️", "Thunderstorm"];
    return ["🌍", "Current Weather"];
  };

  const condition = weather ? getCondition(weather.code) : null;

  const travelTip = weather
    ? weather.rain > 0
      ? "Rain is reported. Carry an umbrella for your trip."
      : weather.temp >= 32
      ? "It is hot! Carry water and avoid peak afternoon heat."
      : weather.temp <= 10
      ? "It is cold! Pack warm clothes for your journey."
      : "Check the local forecast before starting your adventure."
    : "";

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <div>
          <span style={styles.tag}>🌤️ SMART TRAVEL PLANNER</span>
          <h1 style={styles.heading}>
            Explore <span style={{ color: "#ff7547" }}>Weather</span>
          </h1>
          <p style={styles.subtitle}>
            Discover the weather before your next adventure.
            Check current conditions and plan your journey smartly!
          </p>
        </div>
        <div style={styles.heroIcon}>🌦️</div>
      </div>

      <div style={styles.container}>
        <div style={styles.searchCard}>
          <h2 style={styles.title}>🌍 Check City Weather</h2>
          <p style={styles.description}>
            Enter a destination to see its current weather conditions.
          </p>

          <form onSubmit={getWeather} style={styles.searchForm}>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter city e.g. Patiala, Goa, Manali"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-label="City name"
            />

            <button style={styles.button} type="submit" disabled={loading}>
              {loading ? "Checking..." : "🔍 Check Weather"}
            </button>
          </form>

          {error && (
            <div style={styles.error}>
              ⚠️ {error}
            </div>
          )}

          {loading && (
            <div style={styles.emptyState}>
              <div style={{ fontSize: "50px" }}>🌍</div>
              <h3>Getting weather details...</h3>
              <p>Please wait while we check the city weather.</p>
            </div>
          )}

          {!weather && !loading && !error && (
            <div style={styles.emptyState}>
              <div style={{ fontSize: "75px" }}>🌍</div>
              <h2>Your Next Destination Awaits!</h2>
              <p>Enter a city name to discover its current weather.</p>
            </div>
          )}

          {weather && condition && (
            <div style={styles.result}>
              <div style={styles.location}>
                📍 {weather.city}, {weather.country}
              </div>

              <div style={styles.currentWeather}>
                <div style={styles.weatherIcon}>{condition[0]}</div>
                <div style={{ textAlign: "center" }}>
                  <h2 style={styles.temperature}>{weather.temp}°C</h2>
                  <h3 style={styles.condition}>{condition[1]}</h3>
                  <p style={styles.feels}>
                    Feels like {weather.feels}°C
                  </p>
                </div>
              </div>

              <div style={styles.stats}>
                <div style={styles.stat}>
                  <span style={styles.statIcon}>💧</span>
                  <p>Humidity</p>
                  <h3>{weather.humidity}%</h3>
                </div>

                <div style={styles.stat}>
                  <span style={styles.statIcon}>🌬️</span>
                  <p>Wind Speed</p>
                  <h3>{weather.wind} km/h</h3>
                </div>

                <div style={styles.stat}>
                  <span style={styles.statIcon}>🌧️</span>
                  <p>Precipitation</p>
                  <h3>{weather.rain} mm</h3>
                </div>
              </div>

              <div style={styles.tip}>
                ✈️ <strong>Travel Tip:</strong> {travelTip}
              </div>
            </div>
          )}

          <p style={styles.footer}>
            Weather data powered by Open-Meteo
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "85vh",
    padding: "35px 5%",
    background: "linear-gradient(135deg, #fff8f2, #edf9fa)"
  },
  hero: {
    maxWidth: "1150px",
    margin: "0 auto 30px",
    padding: "30px",
    borderRadius: "22px",
    background: "linear-gradient(120deg, #102a43, #176b78)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px"
  },
  tag: {
    color: "#ffd1b9",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "1.5px"
  },
  heading: {
    color: "white",
    fontSize: "clamp(28px, 4vw, 40px)",
    margin: "12px 0"
  },
  subtitle: {
    color: "#e0edf3",
    maxWidth: "580px",
    lineHeight: 1.7
  },
  heroIcon: { fontSize: "80px" },
  container: {
    maxWidth: "850px",
    margin: "auto"
  },
  searchCard: {
    background: "white",
    padding: "30px",
    borderRadius: "22px",
    boxShadow: "0 10px 35px rgba(16,42,67,0.09)"
  },
  title: {
    color: "#102a43",
    fontSize: "24px"
  },
  description: {
    color: "#627d98",
    margin: "6px 0 22px"
  },
  searchForm: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap"
  },
  input: {
    flex: "1 1 220px",
    minWidth: "0",
    padding: "14px",
    border: "1px solid #dce5ed",
    borderRadius: "11px",
    fontSize: "15px",
    outlineColor: "#ff6b35"
  },
  button: {
    padding: "14px 20px",
    background: "linear-gradient(90deg, #ff6b35, #ff915f)",
    color: "white",
    borderRadius: "11px",
    fontWeight: "bold",
    fontSize: "15px"
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 10px",
    marginTop: "20px",
    background: "#f7fafc",
    borderRadius: "18px"
  },
  error: {
    background: "#fff0ef",
    color: "#c53030",
    padding: "14px",
    borderRadius: "12px",
    marginTop: "18px",
    textAlign: "center"
  },
  result: {
    marginTop: "30px",
    padding: "25px",
    background: "linear-gradient(145deg, #fff8f2, #edf9fa)",
    borderRadius: "20px"
  },
  location: {
    color: "#52677a",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "17px"
  },
  currentWeather: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    padding: "25px 0"
  },
  weatherIcon: { fontSize: "80px" },
  temperature: {
    fontSize: "clamp(45px, 7vw, 62px)",
    color: "#102a43",
    lineHeight: 1.1
  },
  condition: {
    color: "#ff6b35",
    margin: "8px 0"
  },
  feels: { color: "#627d98" },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
    gap: "13px"
  },
  stat: {
    padding: "20px 10px",
    borderRadius: "15px",
    background: "white",
    textAlign: "center",
    border: "1px solid #e6eaf0"
  },
  statIcon: { fontSize: "30px" },
  tip: {
    marginTop: "22px",
    padding: "17px",
    borderRadius: "14px",
    background: "#eaf8ef",
    color: "#166534",
    lineHeight: 1.7
  },
  footer: {
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "12px",
    marginTop: "25px"
  }
};
