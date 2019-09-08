import LocationSource from "./locationSource/LocationSource";
import WeatherSource from "./weatherSource/WeatherSource";
import WeatherPresentation from "./userInterface/WeatherPresentation";

export default class App {
    static get WEATHER_CONTAINER() {
        return document.querySelector('.weather-presentation-container');
    }

    static get INPUT_FIELD() {
        return document.querySelector(
            // TODO:: podpiąć jakoś formularz
        );
    }

    async start() {
        const weather = await this._checkWeather();

        this._addEventListenerAtDocumentReady(weather, this._onDocumentReady);
    }

    _addEventListenerOnDocumentReady(weather, callback) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            setTimeout(callback(weather), 1);
        } else {
            document.addEventListener("DOMContentLoaded", callback(weather));
        }
    }

    _onDocumentReady(weather) {
        const weatherPresentation = new WeatherPresentation(App.WEATHER_CONTAINER, weather);

        this._addInputHandler(weatherPresentation);
    }

    _addInputHandler(weatherPresentation) {
        // TODO:: ogarnąć jakoś pobieranie miasta z tego co zostało wpisane
        // TODO:: a potem zaktualizować pogodę przekazując aktualną pogodę
        // TODO:: (obiekt typu Weather) do weatherPresentation, np.:
        
        // let weather = {};
        // weatherPresentation.changeWeather(weather);
    }

    async _checkWeather() {
        const weatherAPI = new WeatherSource('http://api.openweathermap.org/data/2.5/','953349aaa2569f9cd4821f8c2ffda23a');
        const location = await this._checkLocation();

        return weatherAPI.getCurrentWeather(location);
    }

    async _checkLocation() {
        const locationSource = new LocationSource();

        return locationSource.checkLocation();
    }
}