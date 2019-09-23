import Weather from '../model/Weather'
import Location from '../model/Location'

class OpenWeatherMapApi {
    constructor(apiUrlAddress = 'https://api.openweathermap.org/data/2.5/', apiKey='953349aaa2569f9cd4821f8c2ffda23a') {
        this.API_URL_ADDRESS = apiUrlAddress
        this.API_KEY = apiKey
    }

    // metoda prywatna wyryfikująca parametry
    // i na ich podstawie tworzy tekst URL, który następnie
    // będzie umieszczany w polu adresu url metody `fetch`
    _analizeParamethersAndConstructUrlAddress(params) {
        let constructUrl;
        
        if (params && Object.keys(params).length >= 1) {
            // CODE_REVIEW Czy te typeof były konieczne? Czy nie wystarczyłoby użyć sprawdzenia
            // Czy latitude lub longitute istnieją?
            // Swoją drogą uważam, że lepiej byłoby zrobić metody każda dla róznych rodzajów parametrów.
            // Np. _constructUrlAddressFromCoords albo _construcrUrlAdressFromCityAndCountry
            // Albo prościej _urlFromCoord i _urlFromCityAndCountry.
            // Nawet gdybyś chciał obsłużyć w jednej metodzie wszystkie parametry
            // To wówczas miałbyś wewnątrz ifów wywołania funkcji z ładnymi nazwami
            // zamiast niewiele mówiącego template stringa
            if (typeof params.latitude == 'number' && typeof params.longitude == 'number') {
                constructUrl = `lat=${params.latitude}&lon=${params.longitude}`

            } else if (typeof params.city == 'string' && typeof params.country == 'string') {
                constructUrl = `q=${params.city},${params.country}`

            } else if (typeof params.city == 'string') {
                constructUrl = `q=${params.city}`

            } else {
                throw ('Wrong parameters')
            }

        } else {
            throw 'No parameters were given'

        }
        return constructUrl + `&APPID=${this.API_KEY}&units=metric`;
    }

    // metoda prywatna do transformacji obiektu rain z obiektu data
    // do obiektu dataPrecipitaionObject
    // CODE_REVIEW Zamiast słówka get dałbym tutaj map.
    _getPrecipitationFromDataModel(dataModel) {
        let dataPrecipitationObject = {
            precipitation:0,
            precipitationType: Weather.PRECIPITATION_TYPE.RAIN
        }

        if (dataModel.rain) {
            if (dataModel.rain['1h']) 
                dataPrecipitationObject.precipitation = dataModel.rain['1h'];
            else
                dataPrecipitationObject.precipitation = dataModel.rain['3h'];

        } else if (dataModel.snow) {
            dataPrecipitationObject.precipitationType = Weather.PRECIPITATION_TYPE.SNOW;

            if (dataModel.snow['1h']) 
                dataPrecipitationObject.precipitation = dataModel.snow['1h'];
            else
                dataPrecipitationObject.precipitation = dataModel.snow['3h'];
        }

        return dataPrecipitationObject;
    }

    // metoda prywatna zwracająca potrzebne dane o 
    // obecnej pogodzie z otrzymanego obiektu API
    _constructCurrentWeatherObject(data) {
        let dataPrecipitationObject = this._getPrecipitationFromDataModel(data)
        let dataLocation = new Location(
            data.coord.lat, 
            data.coord.lon, 
            data.name, 
            data.sys.country
        )
        
        return new Weather(
            data.main.temp,
            data.clouds.all,
            dataPrecipitationObject.precipitationType,
            dataPrecipitationObject.precipitation,
            data.wind.deg,
            data.wind.speed,
            [],
            dataLocation
        )
    }

    //TODO zrobić model prognozy
    _constructForecastWeatherObject(data) {
        return data;
    }

    // metoda prywatna odpowiadająca za główną mechanikę pobierania danych z Api
    async _getWeather(params, weatherType, dataContructorFunction) {
        let constructedUrl = this._analizeParamethersAndConstructUrlAddress(params)
        // CODE_REVIEW fetch czasami rzuca wyjątkami, warto to obsłużyć za pomocą try...catch
        let dataUnparsed = await fetch(this.API_URL_ADDRESS + weatherType + '?' + constructedUrl)
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
    // CODE_REVIEW Zamiast używać callback function lepiej jest skorzystać z promise.
    // Funkcja _getWeather jest i tak asynchroniczna, więc gdyby zwracała po prostu obiekt data,
    // to wówczas można ją awaitować i samemu wywołać funkcję _constructCurrentWeatherObject.
    // Mieszanie promise z callbackami nie jeste dobrą praktyką, lepiej trzymać się tylko promise,
    // a gdzie napotkasz funkcje oczekujące callbacku to twórz nowy promise, którego resolve
    //  i reject przekażesz jako callbacki do tej funkcji.
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