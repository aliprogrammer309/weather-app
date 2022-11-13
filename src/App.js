// import logo from './logo.svg';
import "./App.css";
import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import {WEATHER_API_KEY, WEATHER_API_URL} from './api'
import { useState } from "react";
import Forecast from "./components/forecast/Forecast";

function App() {
  const [current_weather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {    
    const [lat, lon] = searchData.value.split(" ");

    const CurrentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    
    Promise.all([CurrentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({city: searchData.label, ...weatherResponse});
        setForecast({city: searchData.label, ...forecastResponse});
      })
      .catch((err)=>{console.log(err)});
  };

  console.log(current_weather);
  console.log(forecast);
  return (
    <div className="container">
      <h1 style={{textAlign: "center", marginBottom: "10px"}}>Weather-App</h1>
      <Search onSearchChange={handleOnSearchChange} />
    {current_weather && <CurrentWeather data={current_weather}/>}
    {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
