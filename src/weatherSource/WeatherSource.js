//do własnego użytku udostępniam klucz api
//API_KEY: 953349aaa2569f9cd4821f8c2ffda23a

// przykładowa inicjalizacja obiektu:
// var WeatherAPI = new OpenWeatherMapApi('http://api.openweathermap.org/data/2.5/','953349aaa2569f9cd4821f8c2ffda23a')

class OpenWeatherMapApi {

    constructor(apiUrlAddress, apiKey) {
        this.API_URL_ADDRESS = apiUrlAddress
        this.API_KEY = apiKey
    }

    // metoda prywatna wyryfikująca parametry
    // i na ich podstawie tworzy tekst URL, który następnie
    // będzie umieszczany w polu adresu url metody `fetch`
    _verify(params) {
        let constructUrl;
        
        if (params && Object.keys(params).length >= 1) {
            if (params.latitude && params.longitude) {
                constructUrl = `lat=${params.latitude}&lon=${params.longitude}`

            } else if (params.city && params.country) {
                constructUrl = `q=${params.city},${params.country}`

            } else if (params.city) {
                constructUrl = `q=${params.city}`

            } else {
                throw ('Wrong parameters')
            }

        } else {
            throw 'No parameters were given'

        }
        return constructUrl + `&APPID=${this.API_KEY}&units=metric`;
    }

    // metoda prywatna zwracająca potrzebne dane o 
    // obecnej pogodzie z otrzymanego obiektu API
    _constructCurrentWeatherObject(data) {
        return {
            main: data.main,
            clouds: data.clouds,
            weather: data.weather,
            wind: data.wind,
            place: data.name,
            coords: data.coord
        }
    }

    //TODO zrobić model prognozy
    _constructForecastWeatherObject(data) {
        return data;
    }
    
    // metoda prywatna odpowiadająca za główną mechanikę pobierania danych z Api
    async _getWeather(params, weatherType, dataContructorFunction) {
        let constructUrl = this._verify(params)
        
        let dataUnparsed = await fetch(this.API_URL_ADDRESS + weatherType + '?' + constructUrl)
        if (dataUnparsed.ok) {
            let data = await dataUnparsed.json();
            return dataContructorFunction(data)
        }
        throw dataUnparsed;
    }

    // metoda zwraca obiekt pogodowy
    // W parametrach należy umieśić obiekt, w którym będa pola dla konkretnego sposobu poboru pogody
    // np. dla podanego wyłacznie miasta, obiekt wygląda nastepująco: {city: 'cityExample'}
    // np. dla współrzędnych: {latitude: 123.00, longitude: 0.03}
    async getCurrentWeather(params) {
        return this._getWeather(params, 'weather', (data) => {
            return this._constructCurrentWeatherObject(data)
        })
    }

    // Metoda zwracająca prognozę na nabliże 5 dni w interwałach 3 godzinnych
    // W parametrze podać obiekt posiadający odpowiednio opisane pola
    async getForecast(params) {
        return this._getWeather(params, 'forecast', (data) => {
            return this._constructForecastWeatherObject(data)
        })
    }
}

export default OpenWeatherMapApi;