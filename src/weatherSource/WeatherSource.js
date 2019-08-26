import { relative } from "path";

const API_KEY = '953349aaa2569f9cd4821f8c2ffda23a'

class WeatherAPI{

    static async getWeather(city, country) {
        
        let dataUnparsed = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=metric`)
        if( dataUnparsed.ok ){
            let data = await dataUnparsed.json();
            console.log(data);
            
            const dataModel = {
                main: data.main,
                clouds: data.clouds,
                weather: data.weather,
                wind: data.wind
            }

            return dataModel
        }

        throw dataUnparsed;
    }
}

export default WeatherAPI;