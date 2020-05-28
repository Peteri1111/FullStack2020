import React, {useEffect, useState} from "react";
import Language from "./Language"
import axios from 'axios'


const Country = ({capital,population,languages,flag,name}) => {
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

        const [weather, setWeather] = useState({});

        useEffect(() => {
                
                axios.get('http://api.openweathermap.org/data/2.5/weather?q='+ capital + '&appid=' + API_KEY)
                .then(response => {
                        let data = response.data;
                        let temperature = Math.round(data.main.temp - 273.15); //convert kelvin -> celcius
                        let wind = data.wind.speed; //Not quite sure which unit it is.
                        let weatherType = data.weather[0].description;
                        setWeather({temperature,wind,weatherType});
                  
                })
              }, [])



return (
        <>
            <h2>{name}</h2>
           
            <p>Capital {capital}</p>
            <p>Population {population}</p>
           
           <h3>Languages</h3>


           <ul>
           {languages.map(({name}, i) => <Language name={name} key={i}/>)}

           </ul>


           <img src={flag} alt={"Flag of " + name} width="200vw"/>


           <h3>Weather in {capital}</h3>

<p><b>Temperature:</b> {weather.temperature} Celsius</p>
<p><b>Wind speed:</b> {weather.wind}m/s</p>
<p><b>Weather looks outside:</b> {weather.weatherType}</p>


           


        </>
              )


}

export default Country;