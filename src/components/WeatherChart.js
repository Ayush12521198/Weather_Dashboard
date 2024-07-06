

import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, Typography, Grid } from '@mui/material';

// Register necessary components for ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Define the WeatherChart component
const WeatherChart = ({ data }) => {
  // Extract labels (dates) and data (temperatures and humidity) from the input data
  const labels = data.daily.map((forecast) => new Date(forecast.dt * 1000).toLocaleDateString());
  const temperatures = data.daily.map((forecast) => (forecast.temp.day - 273.15).toFixed(2)); // Convert from Kelvin to Celsius
  const humidity = data.daily.map((forecast) => forecast.humidity);

  // Define data for the temperature line chart
  const lineChartData = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
        borderColor: 'rgba(75,192,192,1)', 
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true, 
        tension: 0.4, 
        pointRadius: 5, 
        pointHoverRadius: 8, 
      },
    ],
  };

  // Define data for the humidity bar chart
  const barChartData = {
    labels,
    datasets: [
      {
        label: 'Humidity (%)',
        data: humidity,
        backgroundColor: 'rgba(153,102,255,0.6)', // Bar color
        borderColor: 'rgba(153,102,255,1)', // Border color of bars
        borderWidth: 1, // Border width of bars
        hoverBackgroundColor: 'rgba(153,102,255,0.8)', // Bar color on hover
      },
    ],
  };

  // Chart options to customize the appearance and behavior of the charts
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Weather Trends (Next 7 Days)',
        font: {
          size: 18,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
        backgroundColor: 'rgba(0,0,0,0.7)',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 16,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
          font: {
            size: 16,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
          beginAtZero: true, // Start the y-axis at zero
        },
      },
    },
  };

  // Custom styles for the cards and their content
  const cardStyle = {
    marginTop: 20,
    marginBottom: 20,
    boxShadow: '0 3px 5px 2px rgba(105, 105, 105, .3)',
  };

  const cardContentStyle = {
    padding: '16px 12px',
  };

  const titleStyle = {
    marginBottom: 12,
    textAlign: 'center',
    fontSize: '1.5rem', 
  };

  const subtitleStyle = {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: '1rem', 
  };

  // Render the component with a Grid layout
  return (
    <Grid container spacing={4} justifyContent="center" marginTop="2px">
      <Grid item xs={12} md={6}>
        <Card style={cardStyle}>
          <CardContent style={cardContentStyle}>
            <Typography variant="h6" style={titleStyle}>Temperature Trend</Typography>
            <Typography variant="subtitle1" style={subtitleStyle}>Temperature (°C)</Typography>
            <Line data={lineChartData} options={options} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card style={cardStyle}>
          <CardContent style={cardContentStyle}>
            <Typography variant="h6" style={titleStyle}>Humidity Trend</Typography>
            <Typography variant="subtitle1" style={subtitleStyle}>Humidity (%)</Typography>
            <Bar data={barChartData} options={options} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default WeatherChart;
