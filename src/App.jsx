import React, { useState } from 'react'
import { Box, Container, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from "axios";

const API_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=`

// const options = {        
//   headers: {
//       'Access-Control-Allow-Origin':'*',
//       'Access-Control-Allow-Methods': 'GET',
//       'Access-Control-Allow-Headers':'*',
//       'cache-control': 'no-cache'
//   }
// }

function App() {

  const [city, setCity] = useState("")

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState({
    error: false,
    message: ""
  })

  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temp: "",
    condition: "",
    icon: "",
    conditionText: ""
  })

  const handleInputChange = (event) => {
    const value = event.target.value;
    setCity(value)

    setWeather({
      city: "",
      country: "",
      temp: "",
      condition: "",
      icon: "",
      conditionText: ""
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true)
    setError({
      error: false,
      message: ""
    })

    try {
      if(!city.trim()) throw { message: "City is required" }

      const response = await fetch(`${API_WEATHER}${city}`)
      const data = await response.json()

      if (data.error) throw { message: data.error.message }

      setCity("")

      setWeather({
        city: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.code,
        icon: data.current.condition.icon,
        conditionText: data.current.condition.text
      })
      
    } catch (error) {
      setError({
        error: true,
        message: error.message
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container
      maxWidth="xs"
      sx={{mt:2}}
    >

      <Typography
        variant="h3"
        component="h1"
        align="center"
      >
        Weather App
      </Typography>

      <Box
        sx={{display: "grid", gap: 2}}
        component="form"
        autoComplete="off"
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      >

        <TextField
          id="city"
          label="City"
          variant='outlined'
          size='small'
          fullWidth
          required
          name='city'
          value={city}
          onChange={(event) => setCity(event.target.value)}
          error={error.error}
          helperText={error.message}
        />

        <LoadingButton
          type='submit'
          variant='contained'
          loading={loading}
          loadingIndicator="Loading..."
        >
          Search
        </LoadingButton>

      </Box>

      {weather.city && (
        <Box
          sx = {{
            mt:'2',
            display: "grid",
            gap: 2,
            textAlign: "center"
          }}
        >

          <Typography variant='h4' component="h2">
            {weather.city}, {weather.country}
          </Typography>

          <Box
            component="img"
            alt={weather.conditionText}
            src={weather.icon}
            sx={{margin: "0 auto"}}
          />

          <Typography variant='h5' component="h3">
            {weather.temp} °C
          </Typography>

          <Typography variant='h6' component="h4">
            {weather.conditionText}
          </Typography>

        </Box>
      )}

      <Typography
        textAlign="center"
        sx={{mt:2, fontSize:"10px"}}
      >
        Powered By: {" "}
        <a
          href='https://www.weatherapi.com/'
          title='Weather API'
          target='_blank'
        >
          WeatherAPI.com
        </a>
      </Typography>

    </Container>
  )
}

export default App