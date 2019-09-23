import "./userInterface/weather-presentation.css";
import LocationSource from "./locationSource/LocationSource";
import WeatherSource from "./weatherSource/WeatherSource";
import WeatherPresentation from "./userInterface/WeatherPresentation";
import CityInputForm from "./userInterface/CityInputForm";

export default class App {
    // CODE_REVIEW czasem dobrą opcją jest używanie stałych, które są w scopie klasy (const powyżej lub poniżej klasy)
    static get WEATHER_CONTAINER() {
        return document.querySelector('.weather-presentation-container');
    }

    start() {
        this._addEventListenerOnDocumentReady(this._onDocumentReady);
    }

    _addEventListenerOnDocumentReady(callback) {
        // CODE_REVIEW Dobry pomysł z tym ifem Damian
        if (document.readyState === "complete" || document.readyState === "interactive") {
            // CODE_REVIEW Taka asynchronicznego wywołania "od razu" jest przestarzała.
            // Znacznie lepiej użyć Promise.resolve().then(callback.bind(this));
            setTimeout(callback.bind(this), 1);
        } else {
            document.addEventListener("DOMContentLoaded", callback.bind(this));
        }
    }

    async _onDocumentReady() {
        // CODE_REVIEW używajcie const tak często jak to możliwę - tak jest znacznie bezpieczniej
        let weatherPresentation = WeatherPresentation.placeholderWeatherPresentation(App.WEATHER_CONTAINER);
        let weather = await this._checkWeather();
        weatherPresentation.changeWeather(weather);

        let cityInputForm = new CityInputForm(weatherPresentation);
    }

    async _checkWeather() {
        // CODE_REVIEW Te dwie wartości w nawiasie zapisałbym do jakichś stałych i dopiero wpisał
        // do new WeatherSource - to dokumentuje kod i poprawia czytelność i zrozumienia.
        const weatherAPI = new WeatherSource('https://api.openweathermap.org/data/2.5/', '953349aaa2569f9cd4821f8c2ffda23a');
        const location = await this._checkLocation();
        
        return weatherAPI.getCurrentWeather(location);
    }
// CODE_REVIEW Dlaczego ta metoda jest asynchroniczna? Wewnątrz nie ma żadnego await? Bug czy niepotrzebne async?
// Czy też komuś zależało na wrzuceniu metody na koniec kolejki jobs?
    async _checkLocation() {
        const locationSource = new LocationSource();

        return locationSource.checkLocation();
    }
}