const resolvePath = require("object-resolve-path");

export default class IpBasedLocationSource{
    constructor(apiUrl = "https://json.geoiplookup.io/", latitudeFieldPath = "latitude", longitudeFieldPath = "longitude", locationFieldSeparator = null){
        this._apiUrl = apiUrl;
        if(latitudeFieldPath===longitudeFieldPath && typeof latitudeFieldPath === "string" && locationFieldSeparator){
            this._coordinatesFieldMode = "singleField";
            this._locationFieldPath = longitudeFieldPath;
            this._locationFieldSeparator = locationFieldSeparator;
        }
        else if (typeof latitudeFieldPath === "string" && typeof longitudeFieldPath === "string") {
            this._coordinatesFieldMode = "doubleField";
            this._latitudeFieldPath = latitudeFieldPath;
            this._longitudeFieldPath = longitudeFieldPath;
        }
        else {
            throw "Invalid constructor arguments.";
        }
    }

    async checkLocation(){
        let response = {};
        try{
            response = await fetch(this._apiUrl);
        }catch (err){
            throw new Error(`Error when trying to access ${this._apiUrl}: ${err}`)
        }

        if(!response.ok){
            throw new Error(`${this._apiUrl} responded with ${response.status}: ${response.statusText}`);
        }

        let jsonResponse = await response.json();

        let coordinates = {};

        if(this._coordinatesFieldMode==="singleField"){
            let location = resolvePath(jsonResponse, this._locationFieldPath);
            let coordinatesArray = location.split(this._locationFieldSeparator);
            if(coordinatesArray.length===2){
                coordinates = {latitude: coordinatesArray[0], longitude: coordinatesArray[1]};
            }
        }
        else if(this._coordinatesFieldMode==="doubleField"){
            coordinates.latitude = resolvePath(jsonResponse, this._latitudeFieldPath);
            coordinates.longitude = resolvePath(jsonResponse, this._longitudeFieldPath);
        }
        else throw new Error("Invalid coordinate interpreter mode");

        if(coordinates 
            && typeof coordinates.latitude === "number" 
            && typeof coordinates.longitude === "number"
            && coordinates.latitude <= 90
            && coordinates.latitude >= -90
            && coordinates.longitude <= 180
            && coordinates.longitude >= -180){

            return coordinates;
        }
        else throw new Error(`Invalid coordinates received from ${this._apiUrl} or parsing error occured`);
    }
}