import "./weather-presentation.css";
import Weather from "../model/Weather";

export default class WeatherPresentation {
    /**
     * 
     * @param {Element} parentNode the node the display will be nested in
     * @param {Weather} weather weater to be displayed
     */
    constructor(parentNode, weather) {
        this._weather = weather;

        this._node = this._setUpWeatherContainer();
        parentNode.appendChild(this._node);
    }

    /**
     * removes the display from DOM
     */
    remove(){
        this._node.remove;
    }

    /**
     * re-sets the display with new weather
     * @param {Weather} weather 
     */
    changeWeather(weather){
        this._weather = weather;

        this._node.remove;
        this._node = this._setUpWeatherContainer();
        parentNode.appendChild(this._node);
    }

    _addCloudinessClass(node) {
        switch (this._weather.cloudinessRating) {
            case Weather.CLOUDINESS.NONE:
                node.classList.add("clouds-none");
                break;
            case Weather.CLOUDINESS.LIGHT:
            case Weather.CLOUDINESS.MODERATE:
                node.classList.add("clouds-light");
                break;
            case Weather.CLOUDINESS.HEAVY:
            case Weather.CLOUDINESS.FULL:
                node.classList.add("clouds-full");
                break;
        }
    }

    _addSpecialWeatherClass(node) {
        let specialWeather = this._weather.specialWeather;
        for(let i = 0; i < specialWeather.length; i++){
            switch (specialWeather[i]) {
                case Weather.SPECIAL_WEATHER.STORM:
                    node.classList.add("storm");
                    break;
                case Weather.SPECIAL_WEATHER.HAIL:
                    node.classList.add("hail");
                    break;
            }
        }
    }

    _addPrecipitationClasses(node) {
        if (this._weather.precipitationRating !== Weather.PRECIPITATION.NONE) {
            switch (this._weather.precipitationType) {
                case Weather.PRECIPITATION_TYPE.RAIN:
                    node.classList.add("rain");
                    break;
                case Weather.PRECIPITATION_TYPE.SNOW:
                    node.classList.add("snow");
                    break;
            }
        }

        switch (this._weather.precipitationRating) {
            case Weather.PRECIPITATION.NONE:
                node.classList.add("precipitation-none");
                break;
            case Weather.PRECIPITATION.LIGHT:
                node.classList.add("precipitation-light");
                break;
            case Weather.PRECIPITATION.MODERATE:
            case Weather.PRECIPITATION.STRONG:
            case Weather.PRECIPITATION.EXTREME:
                node.classList.add("precipitation-strong");
                break;
        }
    }

    _setUpWeatherContainer(){
        let weatherContainerNode = document.createElement("div");

        weatherContainerNode.classList.add("weather-container");
        this._addCloudinessClass(weatherContainerNode);
        this._addPrecipitationClasses(weatherContainerNode);
        this._addSpecialWeatherClass(weatherContainerNode);

        weatherContainerNode.appendChild(this._setUpWeatherIcon());
        weatherContainerNode.appendChild(this._setUpTemperatureDisplay());

        return weatherContainerNode;
    }

    _setUpWeatherIcon(){
        let weatherIconNode = document.createElement("div");
        weatherIconNode.classList.add("weather-icon");

        return weatherIconNode;
    }

    _setUpTemperatureDisplay(){
        let temperatureNode = document.createElement("div");
        temperatureNode.classList.add("temperature");

        let temperatureDisplay = document.createElement("h3");
        temperatureDisplay.innerText = Math.floor(this._weather.temperature)+"°C";
        temperatureNode.appendChild(temperatureDisplay);

        return temperatureNode;
    }
}