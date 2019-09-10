import LocationSource from "./locationSource/LocationSource";
import WeatherSource from "./weatherSource/WeatherSource";
import WeatherPresentation from "./userInterface/WeatherPresentation";

export default class App {
    static get WEATHER_CONTAINER() {
        return document.querySelector('.weather-presentation-container');
    }

    static get SUBMIT_BUTTON() {
        return document.querySelector('.search-btn')
    }

    static get INPUT_FIELD() {
        return document.querySelector('.search-text');
    }

    async start() {
        const weather = await this._checkWeather();

        this._addEventListenerOnDocumentReady(weather, this._onDocumentReady);
    }

    _addEventListenerOnDocumentReady(weather, callback) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            setTimeout(callback(weather), 1);
        } else {
            document.addEventListener("DOMContentLoaded", callback(weather));
        }
    }

    _onDocumentReady(weather) {
        this.weatherPresentation = new WeatherPresentation(App.WEATHER_CONTAINER, weather);

        this._addInputHandler(weatherPresentation);
    }

    _addInputHandler() {
        let submitButton = App.SUBMIT_BUTTON;

        submitButton.addEventListener('OnClick', this._changeWeatherOnUserInputHandler)
    }

    _changeWeatherOnUserInputHandler() {
        let userRequestedCity = INPUT_FIELD.innerText;

        weatherAPI.getCurrentWeather({ city: userRequestedCity })
            .then(receivedWeather => this.weatherPresentation.changeWeather(receivedWeather))
            .catch(error => console.log(error));
    }

    async _checkWeather() {
        const weatherAPI = new WeatherSource('http://api.openweathermap.org/data/2.5/', '953349aaa2569f9cd4821f8c2ffda23a');
        const location = await this._checkLocation();

        return weatherAPI.getCurrentWeather(location);
    }

    async _checkLocation() {
        const locationSource = new LocationSource();

        return locationSource.checkLocation();
    }
}