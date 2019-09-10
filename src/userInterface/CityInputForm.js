import WeatherSource from "../weatherSource/WeatherSource";

export default class CityInputForm {
    static get SUBMIT_BUTTON() {
        return document.querySelector('.search-btn')
    }

    static get INPUT_FIELD() {
        return document.querySelector('.search-text');
    }

    static addInputHandler(weatherPresentation) {
        let submitButton = CityInputForm.SUBMIT_BUTTON;

        submitButton.addEventListener('OnClick', CityInputForm._changeWeatherOnUserInputHandler(weatherPresentation))
    }

    static _changeWeatherOnUserInputHandler(weatherPresentation) {
        let userRequestedCity = CityInputForm.INPUT_FIELD.innerText;
        let weatherAPI = new WeatherSource();

        weatherAPI.getCurrentWeather({ city: userRequestedCity })
            .then(receivedWeather => weatherPresentation.changeWeather(receivedWeather))
            .catch(error => console.log(error));

        console.log("code went this far so I guess it works");
    }
}