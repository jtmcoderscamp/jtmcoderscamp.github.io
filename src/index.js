import GpsApiLocationSource from "./locationSource/GpsApiLocationSource";

// plik inicjalizacyjny aplikacji

console.log("...");

WeatherAPI.getWeather('London','England')
    .then((res) => {
        console.log(res)
    })
    .catch((e) => {
        console.log('This is an error!')
        console.log(e);
    })

