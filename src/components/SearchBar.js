

import React, { useState } from 'react';
import { TextField, Button, Grid, Autocomplete, InputAdornment, Snackbar, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash.debounce';

const SearchBar = ({ fetchWeatherData }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  // Debounce the API call to avoid too many requests
  const fetchSuggestions = debounce(async (value) => {
    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${value}&type=like&sort=population&cnt=10&appid=a0aca8a89948154a4182dcecc780b513`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const citySuggestions = data.list.map((city) => ({
        name: `${city.name}, ${city.sys.country}`, // Format city name with country
        id: city.id, // Optionally include other properties
      }));
      setSuggestions(citySuggestions);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      setError('Error fetching city suggestions');
      setSuggestions([]);
    }
  }, 300); // Adjust debounce time as needed

  // Handle input change in the autocomplete field
  const handleInputChange = (e, value) => {
    setCity(value);
    fetchSuggestions(value);
  };

  // Handle search button click
  const handleSearch = () => {
    fetchWeatherData(city);
  };

  // Handle closing of the error message
  const handleCloseError = () => {
    setError(null);
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center" marginBottom="30px">
        <Grid item xs={12} sm={6}>
          <Autocomplete
            freeSolo
            options={suggestions.map((option) => option.name)}
            value={city}
            onChange={(e, value) => setCity(value)}
            onInputChange={handleInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search City"
                variant="outlined"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  style: { paddingRight: 0 },
                }}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={!city} // Disable button if no city is selected
            sx={{ height: '100%', borderRadius: 0 }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      {error && (
        <Snackbar open autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default SearchBar;
