export default class CityInputForm {
    static get SUBMIT_BUTTON() {
        return document.querySelector('.search-btn')
    }

    static get INPUT_FIELD() {
        return document.querySelector('.search-text');
    }

    constructor(weatherPresentation) {
        this._weatherPresentation = weatherPresentation; 

        this._addInputHandler();
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
}