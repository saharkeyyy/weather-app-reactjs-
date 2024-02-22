import React, { useState } from "react";
import "./App.css";
const api = {
  key: "674e8c9643edd3730a4bc7d5ac6cc0b6",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");
  const search = (evt) => {
    if (evt.key === "Enter" && query.length !== 0) {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          console.log(res);
          return res.json();
        })
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        })
        .catch((err) => {
          console.error("An error occurred:", err);
          setError("Error searching in fetching data");
        });
    }
  };
  const dataBuilder = (d) => {
    let months = [
      "januray",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "saturday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ];
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let date = d.getDate();
    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        Object.keys(weather).length !== 0
          ? weather.main.temp > 16
            ? "app-warm"
            : "app-cold"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar "
            placeholder="search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
          />
        </div>
        {Object.keys(weather).length !== 0 ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name},{weather.sys.country}
              </div>
              <div className="date"> {dataBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)} C</div>
              <div className="weather">{weather.weather.main}</div>
            </div>
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <p>Search for the weather!</p>
        )}
      </main>
    </div>
  );
}

export default App;
