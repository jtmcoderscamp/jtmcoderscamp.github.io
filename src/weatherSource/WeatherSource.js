import { relative } from "path";

const API_KEY = '953349aaa2569f9cd4821f8c2ffda23a'

function _throw(text){
    throw text;
}

class WeatherAPI{

    // zwraca obiekt pogodowy
    // w parametrach należy podać dwie wartości string:
    // pierwszą 'miasto' i drugą 'państwo'
    static async getWeatherByPlace(city, country) {
        
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
    // latitude(szerokośc geo.) i longitude(długość geo.) 
    static async getWeatherByCoordinates(coords){

        let dataUnparsed = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&APPID=${API_KEY}`)
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
    // np. dla współrzędnych: {latitude: 123.00, longitude: 0.03}
    static async getWeatherByObject(params){
        let constructUrl;

        if(params){
            params.latitude && params.longitude ? constructUrl = `lat=${params.latitude}&lon=${params.longitude}` :
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