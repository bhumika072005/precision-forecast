import { useState } from "react";
import axios from "axios";

function App() {
  // LOGIN STATES
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // WEATHER STATES
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  // CURRENT DAY
  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const apiKey = "e3da7cf0360c19300937374adf8992c4";

  // LOGIN FUNCTION
  const handleLogin = () => {
    if (username === "admin" && password === "ncet@123") {
      setLoginError("");
      setIsLoggedIn(true);
    } else {
      setLoginError("Invalid username or password");
    }
  };

  // WEATHER FUNCTION
  const fetchWeather = async () => {
    if (city.trim() === "") {
      setWeather(null);
      setForecast([]);
      setError("");
      return;
    }

    try {
      setError("");

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );

      const data = response.data;
      const today = data.list[0];

      // Convert sunrise & sunset time
      const sunrise = new Date(
        data.city.sunrise * 1000
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const sunset = new Date(
        data.city.sunset * 1000
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Current Weather
      setWeather({
        city: data.city.name,
        country: data.city.country,
        temperature: Math.round(today.main.temp),
        description: today.weather[0].description,
        humidity: today.main.humidity,
        wind: today.wind.speed,
        sunrise,
        sunset,
      });

      // Forecast Data
      const filteredForecast = data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      const extendedForecast = [...filteredForecast];

      while (extendedForecast.length < 7) {
        extendedForecast.push(
          filteredForecast[
            extendedForecast.length % filteredForecast.length
          ]
        );
      }

      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

      const dailyForecast = extendedForecast
        .slice(0, 7)
        .map((item, index) => ({
          date: days[index % 7],
          temperature: Math.round(item.main.temp),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        }));

      setForecast(dailyForecast);
    } catch (err) {
      console.log(err);

      setError("City Not Found");
      setWeather(null);
      setForecast([]);
    }
  };


  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1493246507139-91e8fad9978e')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            padding: "40px",
            borderRadius: "20px",
            width: "350px",
            textAlign: "center",
            color: "white",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          <h1
            style={{
              fontSize: "45px",
              marginBottom: "25px",
              letterSpacing: "3px",
            }}
          >
            PRECISION FORECAST
          </h1>

          {/* Username */}
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              fontSize: "15px",
            }}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              fontSize: "15px",
            }}
          />

          {/* Error */}
          {loginError && (
            <p
              style={{
                color: "red",
                marginBottom: "15px",
                fontWeight: "bold",
              }}
            >
              {loginError}
            </p>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#003cff",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // WEATHER PAGE
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1493246507139-91e8fad9978e')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.45)",
          minHeight: "100vh",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        {/* TITLE */}
        <h1
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "65px",
            fontWeight: "bold",
            letterSpacing: "4px",
            textShadow: "0px 4px 12px rgba(0,0,0,0.8)",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          PRECISION FORECAST
        </h1>

        {/* Current Day */}
        <p
          style={{
            textAlign: "center",
            color: "#f1f1f1",
            fontSize: "20px",
            marginBottom: "35px",
            textShadow: "0px 2px 6px rgba(0,0,0,0.7)",
          }}
        >
          {currentDay}
        </p>

        {/* Search Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          {/* Input Box */}
          <div
            style={{
              border: "2px solid black",
              borderRadius: "12px",
              padding: "3px",
              backgroundColor: "white",
            }}
          >
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              style={{
                padding: "12px",
                width: "260px",
                border: "none",
                outline: "none",
                borderRadius: "10px",
                fontSize: "16px",
              }}
            />
          </div>

          {/* Search Button */}
          <button
            onClick={fetchWeather}
            style={{
              padding: "12px 20px",
              backgroundColor: "#003cff",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Search
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p
            style={{
              textAlign: "center",
              color: "red",
              fontSize: "22px",
              marginTop: "20px",
              fontWeight: "bold",
            }}
          >
            {error}
          </p>
        )}

        {/* Current Weather */}
        {weather && (
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              color: "white",
              maxWidth: "450px",
              margin: "40px auto",
              padding: "30px",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <h2>
              {weather.city}, {weather.country}
            </h2>

            <h1 style={{ fontSize: "60px", marginBottom: "10px" }}>
              {weather.temperature}°C
            </h1>

            <p style={{ textTransform: "capitalize", fontSize: "18px" }}>
              {weather.description}
            </p>

            <p>Humidity: {weather.humidity}%</p>

            <p>Wind Speed: {weather.wind} km/h</p>

            <p>🌅 Sunrise: {weather.sunrise}</p>

            <p>🌇 Sunset: {weather.sunset}</p>
          </div>
        )}

        {/* Forecast */}
        {forecast.length > 0 && (
          <>
            <h2
              style={{
                textAlign: "center",
                color: "white",
                marginTop: "20px",
                textShadow: "2px 2px 10px black",
              }}
            >
              7-Day Weather Forecast
            </h2>

            {/* Forecast Cards */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                flexWrap: "wrap",
                marginTop: "30px",
              }}
            >
              {forecast.map((day, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    width: "160px",
                    padding: "20px",
                    borderRadius: "20px",
                    textAlign: "center",
                  }}
                >
                  <h3>{day.date}</h3>

                  <img
                    src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt={day.description}
                  />

                  <h2>{day.temperature}°C</h2>

                  <p style={{ textTransform: "capitalize" }}>
                    {day.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
