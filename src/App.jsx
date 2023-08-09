import React, { useState } from 'react'
import { Box, Container, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from "axios";

const API_WEATHER = `api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=`

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
    condition: "",
    icon: "",
    conditionText: ""
  })

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true)
    setError({
      error: false,
      message: ""
    })

    try {
      if(!city.trim()) throw {message: "City is required"}

      const { data } = await axios.get(`${API_WEATHER}${city}`)
      console.log("response", data)
      
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
        onSubmit={onSubmit}
      >

        <TextField
          id="city"
          label="City"
          variant='outlined'
          size='small'
          fullWidth
          required
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