import Location from "./Location";

export default class Weather{

    /**
     * Constructor creating Weather instance
     * @param {number} temperatureCelsius temperature (degrees Celsius)
     * @param {number} cloudCover cloud cover (0-100 percent)
     * @param {Weather.PRECIPITATION_TYPE.*} precipitationType precipitation type
     * @param {number} precipitation precipitation amount (0+ milimeters per hour)
     * @param {number} windDirectionDegrees wind direction (0-360 degrees clockwise from North)
     * @param {number} windSpeed wind speed (0+ meters per second)
     * @param {[Weather.SPECIAL_WEATHER.*]} specialWeather (special weather conditions)
     * @param {Location} location coordinates for which the weather is provided
     */
    constructor(temperatureCelsius = 0,
                cloudCover = 0,
                precipitationType = Weather.PRECIPITATION_TYPE.RAIN,
                precipitation = 0,
                windDirectionDegrees = 0,
                windSpeed = 0,
                specialWeather = [],
                location = undefined){
        this.temperature = temperatureCelsius;
        this.cloudCover = cloudCover;
        this.precipitation = precipitation;
        this.precipitationType = precipitationType;
        this.windDirection = windDirectionDegrees;
        this.windSpeed = windSpeed;
        this.specialWeather = specialWeather;
        this.location = location;
    }

    /**
     * derived cloudinessRating variable, see Weather.CLOUDINESS
     */
    get cloudinessRating(){
        return this._cloudinessRating;
    }
    /**
     * derived precipitationRating variable, see Weather.PRECIPITATION
     */
    get precipitationRating(){
        return this._precipitationRating;
    }
    /**
     * derived precipitationRating variable, see Weather.WIND
     */
    get windStrengthRating(){
        return this._windStrengthRating;
    }

    get temperature(){
        return this._temperature;
    }
    get cloudCover(){
        return this._cloudCover;
    }
    get precipitation(){
        return this._precipitation;
    }
    get precipitationType(){
        return this._precipitationType;
    }
    get windDirection(){
        return this._windDirection;
    }
    get windSpeed(){
        return this._windSpeed;
    }
    get specialWeather(){
        return this._specialWeather;
    }

    get location(){
        return this._location;
    }

    set temperature(temperature){
        if(typeof temperature === "number"){                
                this._temperature = temperature;
        }
        else{
            throw new Error("Invalid temperature value: "+temperature);
        }
    }

    /**
     * setter for cloudCover (percent) and derived CloudinessRating
     */
    set cloudCover(cloudCover){
        if(typeof cloudCover === "number"
            && cloudCover >= 0
            && cloudCover <=100){
                
                this._cloudCover = cloudCover;
                this._cloudinessRating = Weather.cloudinessFromCloudCoveragePercent(cloudCover);
        }
        else{
            throw new Error("Invalid cloud cover percent: "+cloudCover);
        }
    }
    
    /**
     * setter for precipitation (mm per hour) and derived precipitationRating
     */
    set precipitation(precipitation){
        if(typeof precipitation === "number"
            && precipitation >= 0){
                
                this._precipitation = precipitation;
                this._precipitationRating = Weather.precipitationRatingFromPrecipitationPerHour(precipitation);
        }
        else{
            throw new Error("Invalid precipitation amount: "+precipitation);
        }
    }

    /**
     * setter for precipitationType (see Weather.PRECIPITATION_TYPE)
     */
    set precipitationType(precipitationType){
        switch (precipitationType) {
            case Weather.PRECIPITATION_TYPE.RAIN:
            case Weather.PRECIPITATION_TYPE.SNOW:
                this._precipitationType = precipitationType;
                break;
            default: throw new Error("Invalid precipitation type: "+precipitationType);
        }
    }

    /**
     * setter for windDirection (degrees)
     */
    set windDirection(windDirection){
        if(typeof windDirection === "number"
            && windDirection >= 0
            && windDirection <=360){
                
                this._windDirection = windDirection;
        }
        else{
            throw new Error("Invalid wind direction: "+windDirection);
        }
    }

    /**
     * setter for windSpeed (meters per second) and derived windStrengthRating
     */
    set windSpeed(windSpeed){
        if(typeof windSpeed === "number"
            && windSpeed >= 0){
                
                this._windSpeed = windSpeed;
                this._windStrengthRating = Weather.windStrengthFromSpeed(windSpeed)
        }
        else{
            throw new Error("Invalid wind speed: "+windSpeed);
        }
    }

    /**
     * setter for specialWeather (array of Weather.SPECIAL_WEATHER.* strings) 
     */
    set specialWeather(specialWeather){
        if(Array.isArray(specialWeather)){
            let keys = Object.keys(Weather.SPECIAL_WEATHER);
            for(let i=0;i<specialWeather.length;i++){
                let j = 0;
                let legalValue = false;
                while(!legalValue && j<keys.length){
                    legalValue = Weather.SPECIAL_WEATHER[keys[j]]===specialWeather[i];
                    j++;
                }
                if(!legalValue) throw new Error("Illegal special weather condition: "+specialWeather[i]);
            }
            this._specialWeather = specialWeather;
        }
        else{
            throw new Error("Illegal special weather conditions provided (not an array)");
        }
    }

    set location(location){
        if(typeof location === "undefined" || Location.validateCoordinates(location)){
            this._location = location;
        }
        else {
            throw new Error("Invalid coordinates");
        }
    }

    /**
     * Static constant: cloudiness levels
     */
    static get CLOUDINESS(){
        return {
            NONE: 0,
            LIGHT: 1,
            MODERATE: 2,
            HEAVY: 3,
            FULL: 4
        };
    }

    /**
     * Static constant: precipitation amount ratings
     */
    static get PRECIPITATION(){
        return {
            NONE: 0,
            LIGHT: 1,
            MODERATE: 2,
            STRONG: 3,
            EXTREME: 4
        };
    }

    /**
     * Static constant: precipitation types
     */
    static get PRECIPITATION_TYPE(){
        return {
            RAIN: "rain",
            SNOW: "snow"
        };
    }

    /**
     * Static constant: wind strengths
     */
    static get WIND(){
        return {
            CALM: 0,
            LIGHT_BREEZE: 1,
            MODERATE_BREEZE: 2,
            STRONG_BREEZE: 3,
            GALE: 4,
            STORM: 5
        };
    }

    /**
     * Static constant: special weather conditions
     */
    static get SPECIAL_WEATHER(){
        return {
            STORM: "storm",
            HAIL: "hail"
        };
    }

    /**
     * Static method calculating cloudiness level based on % of cloud cover,
     * whare 0% means completely clear sky and 100% means that clouds cover the sky completely
     * @param {number} coverage fraction of the sky covered by clouds in % (0-100)
     */
    static cloudinessFromCloudCoveragePercent(coverage){
        if(typeof coverage !== "number" || coverage<0 || coverage>100){
            throw new Error("Illegal coverage percent: "+coverage);
        }

        let result;

        switch(true){
            case coverage < 10: result = Weather.CLOUDINESS.NONE; break;
            case coverage >= 10: result = Weather.CLOUDINESS.LIGHT; break;
            case coverage >= 40: result = Weather.CLOUDINESS.MODERATE; break;
            case coverage >= 60: result = Weather.CLOUDINESS.HEAVY; break;
            case coverage >= 80: result = Weather.CLOUDINESS.FULL; break;
        }
        
        return result;
    }

    /**
     * Static method calculating precipitation rating
     * @param {number} precipitationPerHour amount of precipitation per hour in milimeters
     */
    static precipitationRatingFromPrecipitationPerHour(precipitationPerHour){
        if(typeof precipitationPerHour !== "number" || precipitationPerHour < 0){
            throw new Error("Illegal argument");
        }
        let result;

        switch(true){
            case precipitationPerHour == 0: result = Weather.PRECIPITATION.NONE; break;
            case precipitationPerHour < 2.5: result = Weather.PRECIPITATION.LIGHT; break;
            case precipitationPerHour >= 2.5: result = Weather.PRECIPITATION.MODERATE; break;
            case precipitationPerHour >= 10: result = Weather.PRECIPITATION.STRONG; break;
            case precipitationPerHour >= 40: result = Weather.PRECIPITATION.EXTREME; break;
        }

        return result;
    }

    /**
     * Static method calculating wind strength rating.
     * Thresholds based on Beaufort scale but chosen categories merged as deemed appropriate.
     * @param {number} windSpeedMPS wind speed in meters per second 
     */
    static windStrengthFromSpeed(windSpeedMPS){
        if(typeof windSpeedMPS !== "number" || windSpeedMPS < 0 ){
            throw new Error("Illegal argument");
        }

        let result = 0;

        switch(true){
            case windSpeedMPS < 1.5: result = Weather.WIND.CALM; break;
            case windSpeedMPS >= 1.5: result = Weather.WIND.LIGHT_BREEZE; break;
            case windSpeedMPS >= 5.5: result = Weather.WIND.MODERATE_BREEZE; break;
            case windSpeedMPS >= 10.8: result = Weather.WIND.STRONG_BREEZE; break;
            case windSpeedMPS >= 13.9: result = Weather.WIND.GALE; break;
            case windSpeedMPS >= 20.8: result = Weather.WIND.STORM; break;
        }
        return result;
    }
}