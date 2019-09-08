export default class Location{
    constructor(latitude, longitude, cityName, country){
        this.latitude = latitude;
            this.longitude = longitude;
            this.cityName = cityName;
            this.country = country;


        if(!Location.validateCoordinates(this)){
            throw new Error(`Invalid coordinates`);
        }
    }

    static validateCoordinates(coordinates){
        let result = 
                    coordinates
                    && typeof coordinates.latitude === "number"
                    && typeof coordinates.longitude === "number"
                    && coordinates.latitude <= 90
                    && coordinates.latitude >= -90
                    && coordinates.longitude <= 180
                    && coordinates.longitude >= -180;

        return result;
    }
}