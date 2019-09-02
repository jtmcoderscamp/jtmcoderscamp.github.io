import GpsApiLocationSource from "./locationSource/GpsApiLocationSource";
import WeatherAPI from './weatherSource/WeatherSource'
// plik inicjalizacyjny aplikacji

console.log("...");

// Metoda z użyciem współrzędnych
// Pobieranie i obłsługa wyjątków
WeatherAPI.getWeatherByObject({lat:51.5,lon:-0.12})
    .then((res) => {
        console.log(res)
    })
    .catch((e) => {
        console.log(e);
    })

// Metoda z użyciem Miasta i Państwa
// Pobieranie i obłsługa wyjątków
WeatherAPI.getWeatherByObject({city:'london',country:'uk'})
    .then((res) => {
        console.log(res)
    })
    .catch((e) => {
        console.log(e);
    })

// Metoda z użyciem TYLKO Miasta
// Pobieranie i obłsługa wyjątków
WeatherAPI.getWeatherByObject()
.then((res) => {
    console.log(res)
})
.catch((e) => {
    console.log(e);
})