

import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';

const WeatherCard = styled(Card)({
  minWidth: 275,
  maxWidth: 400,
  margin: 'auto',
  backgroundColor: '#1976d2',
  color: '#fff',
  borderRadius: '8px',
  padding: '5px',

  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

const CurrentWeather = ({ data }) => {
  return (
    <Grid container justifyContent="flex-start"> 
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <WeatherCard>
          <CardContent>
            <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              {data.name} <img src='https://hawaayein.netlify.app/assets/04n.svg' alt='Icon City' style={{ height: 50, marginLeft: 8 }} />
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <img src='https://www.svgrepo.com/show/236207/thermometer-temperature.svg' alt='Temperature icon' style={{ height: 50, marginBottom: -5, marginRight: 8 }} />
                <Typography variant="body1" style={{ marginTop: "10px", color: "#0f172a", fontSize: "16px" }}>
                  Temp: {(data.main.temp - 273.15).toFixed(2)}°C
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <img src="https://weather-pekkiriscim.vercel.app/assets/wind-speed-2842a89a.svg" alt="Wind Speed Icon" style={{ height: 50, marginBottom: -5, marginRight: 8 }} />
                <Typography variant="body1" style={{ marginTop: "10px", color: "#0f172a", fontSize: "16px" }}>
                  Wind Speed: {data.wind.speed} m/s
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <img src="https://weather-pekkiriscim.vercel.app/assets/humidity-9967a3ee.svg" alt="Humidity Icon" style={{ height: 50, marginBottom: -5, marginRight: 8 }} />
                <Typography variant="body1" style={{ marginTop: "10px", color: "#0f172a", fontSize: "16px" }}>
                  Humidity: {data.main.humidity}%
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <img src="https://weather-pekkiriscim.vercel.app/assets/visibility-4640ec89.svg" alt="Haze Icon" style={{ height: 50, marginBottom: -5, marginRight: 8 }} />
                <Typography variant="body1" style={{ marginTop: "10px", color: "#0f172a", fontSize: "16px" }}>
                  Visibility: {data.visibility} meters
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </WeatherCard>
      </Grid>
    </Grid>
  );
};

export default CurrentWeather;













