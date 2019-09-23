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
        // CODE_REVIEW Myślę, że łatwiej byłoby całość zapakować w form
        // i do tego form dać listener na submit.
        submitButton.addEventListener('click', (e) => {
            this._changeWeatherOnUserInputHandler(e)
        })

        inputField.addEventListener('keyup', (e) => {
            if(e.key === 'Enter'){
                
                this._changeWeatherOnUserInputHandler(e);
            }
        })
    }
    // CODE_REVIEW zamiast bawić sie then i catch można użyć funkcji async
    _changeWeatherOnUserInputHandler(e) {
        let userRequestedCity = CityInputForm.INPUT_FIELD.value;
        
        this._weatherApi.getCurrentWeather({ city: userRequestedCity })
            .then(receivedWeather => {
                this._weatherPresentation.changeWeather(receivedWeather)
            })
            .catch(response => {
                switch (response.status) {
                    // CODE_REVIEW myślę, że dla statusu 400 odpali się default, bo:
                    // operator || jeżeli lewa strona jest prawdą (tzn. po zmianie w boolean)
                    // to zwraca lewą stronę, a jeśli jest fałszem to zwraca prawą stronę
                    // w tym przypadku 404 jest prawdą (!!404 === true) więc zawsze będzie 404
                    // Jednak rozumiem o co ci chodziło. Powinieneś był zrobić tak:
                    // case 404:
                    // case 400:
                    //     alert("No city was found. Please try typing once again!")
                    //     break;
                    case 404 || 400:
                            alert("No city was found. Please try typing once again!")
                        break;
                    default:
                        break;
                }
            });
    }
}