import { relative } from "path";

const API_KEY = '953349aaa2569f9cd4821f8c2ffda23a'
const API_EXP = 'b6907d289e10d714a6e88b30761fae22'

function _throw(text){
    throw text;
}

class WeatherAPI{

    // zwraca obiekt pogodowy
    // w parametrach należy podać dwie wartości string:
    // pierwszą 'miasto' i drugą 'państwo'
    static async getWeather(city, country) {
        
        let dataUnparsed;
        
        country 
            ? dataUnparsed = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=metric`)
            : dataUnparsed = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`)

        if( dataUnparsed.ok ){
            let data = await dataUnparsed.json();
            // wyświetlenie całej zawartości odpowiedzi 
            // console.log(data);
            
            const dataModel = {
                main: data.main,
                clouds: data.clouds,
                weather: data.weather,
                wind: data.wind,
                place: data.name,
                coords: data.coord
            }

            return dataModel
        }

        throw dataUnparsed;
    }

    // zwraca obiekt pogodowy
    // W parametrach należy przekazać obiekt z polami:
    // lat(szerokośc geo.) i lon(długość geo.) 
    static async getWeatherByCoordinates(coords){

        let dataUnparsed = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&APPID=${API_KEY}`)
        if( dataUnparsed.ok ){
            let data = await dataUnparsed.json();
            // console.log(data);
            
            const dataModel = {
                main: data.main,
                clouds: data.clouds,
                weather: data.weather,
                wind: data.wind,
                place: data.name,
                coords: data.coord
            }

            return dataModel
        }

        throw dataUnparsed;

    }

    // METODA TESTOWA !
    // W parametrach należy umieśić obiekt, w którym będa pola 
    // dla konkretnego sposobu poboru pogody
    // np. dla podanego wyłacznie miasta, obiekt wygląda nastepująco: {city: 'cityExample'}
    // np. dla współrzędnych: {lat: 123.00, lon: 0.03}
    static async getWeatherByObject(params){
        let constructUrl;

        if(params){
            params.lat && params.lon ? constructUrl = `lat=${params.lat}&lon=${params.lon}` :
                params.city && params.country ? constructUrl = `q=${params.city},${params.country}` :
                    params.city ? constructUrl = `q=${params.city}` : _throw('Wrong parameters')
             
        }
        else{
            throw 'No parameters were given'
        }
        
        let dataUnparsed = await fetch(`http://api.openweathermap.org/data/2.5/weather?` + constructUrl + `&APPID=${API_KEY}`)
        if( dataUnparsed.ok ){
            let data = await dataUnparsed.json();
            // console.log(data);
            
            const dataModel = {
                main: data.main,
                clouds: data.clouds,
                weather: data.weather,
                wind: data.wind,
                place: data.name,
                coords: data.coord
            }

            return dataModel
        }

        throw dataUnparsed;

    }
}

export default WeatherAPI;