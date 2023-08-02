import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@material-ui/core';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const getWeatherData = () => {
    const apiKey = '0eb75fbb260fe905c23785f0c50f02ba';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setWeatherData(null);
      });
  };

  return (
    <Box m={2}>
      <Typography variant="h4" gutterBottom>
        Weather App
      </Typography>
      <TextField
        label="Enter City Name"
        value={city}
        onChange={handleCityChange}
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={getWeatherData}>
        Get Weather
      </Button>
      {weatherData && (
        <Box mt={2}>
          <Typography variant="h6">{weatherData.name}</Typography>
          <Typography variant="body1">{weatherData.weather[0].description}</Typography>
          <Typography variant="body1">{`Temperature: ${weatherData.main.temp}°C`}</Typography>
          <Typography variant="body1">{`Humidity: ${weatherData.main.humidity}%`}</Typography>
          <Typography variant="body1">{`Wind Speed: ${weatherData.wind.speed} m/s`}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default WeatherApp;
