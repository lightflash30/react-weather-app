import './App.css';
import Search from "./components/search/search";
import CurrentWeather from './components/current-waether/current-weather';
import { weatherapikey,weatherapiurl } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecast';
function App() {

  const [currweather,setcurrweather]=useState(null);
  const [currforecast,setcurrforecast]=useState(null);

  const handleonsearchchange=(searchdata)=>{
    const [lat,lon]=searchdata.value.split(" ");

    const currentweatherFetch=fetch(`${weatherapiurl}/weather?lat=${lat}&lon=${lon}&appid=${weatherapikey}&units=metric`)
    const currentforecastFetch=fetch(`${weatherapiurl}/forecast?lat=${lat}&lon=${lon}&appid=${weatherapikey}&units=metric`)

    Promise.all([currentweatherFetch,currentforecastFetch])
      .then(async (response)=>{
        const weatherresponse = await response[0].json();
        const forecastresponse = await response[1].json();

        setcurrweather({city:searchdata.label , ...weatherresponse});
        setcurrforecast({city:searchdata.label , ...forecastresponse});
      })
      .catch((err=> console.log(err)))
  }

  console.log(currforecast)

  return (
    <div className="Container">
     <Search onsearchchange={handleonsearchchange}/>
     {currweather && <CurrentWeather data={currweather}/>}
     {currforecast&&<Forecast data={currforecast}/>}
    </div>
  );
}

export default App;
