import GpsApiLocationSource from "./locationSource/GpsApiLocationSource";
import OpenWeatherMapApi from './weatherSource/WeatherSource'

var WeatherAPI = new OpenWeatherMapApi('http://api.openweathermap.org/data/2.5/','953349aaa2569f9cd4821f8c2ffda23a')

WeatherAPI.getForecast({
    city:'london'
})
    .then((res) => {
        console.log(res)
    })
    .catch((e) => {
        console.log(e);
    })
