export default class Weather{

    constructor(){

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
     * Static constant: precipitation ratings
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
            SNOW: "snow",
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
     * @param {number} precipitationMilimeters amount of precipitation per square meter in set period
     * @param {number} periodHours set period in hours
     */
    static precipitationRatingFromPrecipitationAmount(precipitationMilimeters, periodHours){
        if(typeof precipitationMilimeters !== "number" || precipitationMilimeters < 0 || typeof periodHours !== "number" || periodHours <= 0){
            throw new Error("Illegal argument");
        }

        let precipitationPerHour = precipitationMilimeters/periodHours;
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
    }
}