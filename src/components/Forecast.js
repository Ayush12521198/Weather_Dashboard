
import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import CloudIcon from '@mui/icons-material/Cloud';

// Custom styled Card component with hover effect
const StyledCard = styled(Card)({
  backgroundColor: '#f5f5f5',
  borderRadius: '15px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

// Custom styled Typography component for general use
const StyledTypography = styled(Typography)({
  fontFamily: "'Roboto', sans-serif",
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
});

// Custom styled Typography component for temperature
const TemperatureTypography = styled(StyledTypography)({
  fontSize: '1.2rem',
  fontWeight: 'bold',
});

// Custom styled Typography component for weather description
const WeatherDescriptionTypography = styled(StyledTypography)({
  fontStyle: 'italic',
  textTransform: 'capitalize',
});

// Wrapper for icons to add margin
const IconWrapper = styled('span')({
  marginRight: '8px',
});

// Define the Forecast component
const Forecast = ({ data }) => {
  return (
    <Grid container spacing={3} style={{ marginTop: "20px" }}>
      {data.daily.slice(0, 7).map((forecast, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <StyledCard>
            <CardContent>
              {/* Date of the forecast */}
              <StyledTypography variant="h6" style={{ color: "blueviolet" }}>
                {new Date(forecast.dt * 1000).toLocaleDateString()}
              </StyledTypography>
              {/* Temperature */}
              <TemperatureTypography variant="body1">
                <IconWrapper><WbSunnyIcon /></IconWrapper>
                Temperature: {(forecast.temp.day - 273.15).toFixed(2)}°C
              </TemperatureTypography>
              {/* Humidity */}
              <StyledTypography variant="body1">
                <IconWrapper><OpacityIcon /></IconWrapper>
                Humidity: {forecast.humidity}%
              </StyledTypography>
              {/* Wind Speed */}
              <StyledTypography variant="body1">
                <IconWrapper><AirIcon /></IconWrapper>
                Wind: {forecast.wind_speed} m/s
              </StyledTypography>
              {/* Weather Description */}
              <WeatherDescriptionTypography variant="body1">
                <IconWrapper><CloudIcon /></IconWrapper>
                Weather: {forecast.weather[0].description}
              </WeatherDescriptionTypography>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Forecast;
