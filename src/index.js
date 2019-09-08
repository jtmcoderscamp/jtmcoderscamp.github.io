import GpsApiLocationSource from "./locationSource/GpsApiLocationSource";
import OpenWeatherMapApi from './weatherSource/WeatherSource'
import WeatherPresentation from "./userInterface/WeatherPresentation";
import Weather from "./model/Weather";
import LocationSource from "./locationSource/LocationSource";
import IpBasedLocationSource from "./locationSource/IpBasedLocationSource";

console.log("...");

var weatherAPI = new OpenWeatherMapApi('http://api.openweathermap.org/data/2.5/','953349aaa2569f9cd4821f8c2ffda23a')
let locationSource = new IpBasedLocationSource();
let node = document.getElementById("root");

let displayLocalWeather = async function() {
    //let location = await locationSource.checkLocation();
    let location = {latitude: 1.0, longitude: 1.0};
    console.log(location);
    //await weatherAPI.getCurrentWeather(location);
    let weather = new Weather(25.13);
    console.log(weather);
    let test = new WeatherPresentation(node,weather);
}

displayLocalWeather();
    
    

//let test = new WeatherPresentation(node, new Weather(10,20,Weather.PRECIPITATION_TYPE.SNOW,5,0,3,[]));