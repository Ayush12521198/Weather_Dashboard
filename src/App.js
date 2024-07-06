

import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import WeatherChart from './components/WeatherChart';
import axios from 'axios';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    try {
      const apiKey = 'a0aca8a89948154a4182dcecc780b513'; // Replace with your OpenWeatherMap API key

      // Fetch current weather to get coordinates
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const { coord } = weatherResponse.data;
      setWeatherData(weatherResponse.data);

      // Fetch 7-day forecast using coordinates
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`
      );
      setForecastData(forecastResponse.data);
      setError(null);
    } catch (err) {
      setError('City not found. Please try again.');
    }
  };

  return (
    <Container>
       <Typography variant="h3" gutterBottom style={{ textAlign: 'center' }}>
      Weather Dashboard
    </Typography>
      <SearchBar fetchWeatherData={fetchWeatherData} />
      {error && <Typography color="error">{error}</Typography>}
      {weatherData && <CurrentWeather data={weatherData} />}
      {forecastData && <Forecast data={forecastData} />}
      {forecastData && <WeatherChart data={forecastData} />}
    </Container>
  );
};

export default App;
