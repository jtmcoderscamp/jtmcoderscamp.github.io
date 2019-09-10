import WeatherApi from '../weatherSource/WeatherSource'
import Weather from '../model/Weather';

export default class CityInputForm {
    static get SUBMIT_BUTTON() {
        return document.querySelector('.search-btn')
    }

    static get INPUT_FIELD() {
        return document.querySelector('input.search-txt');
    }

    constructor(weatherPresentation) {
        this._weatherPresentation = weatherPresentation; 
        this._weatherApi = new WeatherApi();
        this._addInputHandler();
    }

    _addInputHandler() {
        let submitButton = CityInputForm.SUBMIT_BUTTON;
        let inputField = CityInputForm.INPUT_FIELD;

        submitButton.addEventListener('click', (e) => {
            this._changeWeatherOnUserInputHandler(e)
        })

        inputField.addEventListener('keyup', (e) => {
            if(e.key === 'Enter'){
                
                this._changeWeatherOnUserInputHandler(e);
            }
        })
    }

    _changeWeatherOnUserInputHandler(e) {
        let userRequestedCity = CityInputForm.INPUT_FIELD.value;
        
        this._weatherApi.getCurrentWeather({ city: userRequestedCity })
            .then(receivedWeather => {
                this._weatherPresentation.changeWeather(receivedWeather)
            })
            .catch(error => {
                console.log(error);
            });
    }
}