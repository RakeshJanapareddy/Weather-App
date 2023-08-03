import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Card, CardContent } from '@material-ui/core';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [showWeatherCard, setShowWeatherCard] = useState(false);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const getWeatherData = () => {
    const apiKey = '0eb75fbb260fe905c23785f0c50f02ba';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data)
        setWeatherData(response.data);
        setShowWeatherCard(true);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setWeatherData(null);
        setShowWeatherCard(false);
      });
  };

  const backgroundImageUrl = 'url("https://images.pexels.com/photos/2114014/pexels-photo-2114014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")';
  const cardBackGroundImgUrl = 'url("https://images.pexels.com/photos/2909083/pexels-photo-2909083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")';
  return (
    <Box
      m={2}
      style={{
        backgroundImage: backgroundImageUrl,
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex', // Use flex display for horizontal alignment
        alignItems: 'center', // Center vertically
        justifyContent: 'space-around', // Space evenly
      }}
    >
      <Box>
        <Typography variant="h4" gutterBottom style={{ color: 'White',textAlign:"center"}}>
          Weather by city
        </Typography>
        <p style={{ color: 'White',textAlign:"center" }}>please enter the city name</p>
        <TextField
          label="Enter City Name"
          value={city}
          onChange={handleCityChange}
          variant="outlined"
        />
        <div>
        <Button variant="contained" color="primary" onClick={getWeatherData} style={{marginTop:"11px"}}>
          Get Weather
        </Button>
        </div>
      </Box>
      {showWeatherCard && weatherData && (
        <Card
        
          variant="outlined"
          style={{
            // backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backgroundImage: cardBackGroundImgUrl,
            width: 500,
            height: 400,
          }}
        >
          <CardContent>
            <p style={{ color: 'White',textAlign:"center"}}>Clouds </p>
            <Typography variant="h6"><span>Weather Details for city: </span>{weatherData.name}</Typography>
            <Typography variant="body1"><span>Summary: </span>{weatherData.weather[0].description}</Typography>
            <Typography variant="body1">{`Temperature: ${weatherData.main.temp}°C`}</Typography>
            <Typography variant="body1">{`Humidity: ${weatherData.main.humidity}%`}</Typography>
            <Typography variant="body1">{`Wind Speed: ${weatherData.wind.speed} m/s`}</Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default WeatherApp;
