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
        console.log(this._apiUrl);
        let response = await fetch(this._apiUrl);
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        let coordinates = [];
        console.log(this._coordinatesFieldMode);
        if(this._coordinatesFieldMode==="singleField"){
            let location = resolvePath(jsonResponse, this._locationFieldPath);
            coordinates = location.split(this._locationFieldSeparator);
        }
        else if(this._coordinatesFieldMode==="doubleField"){
            coordinates[0] = resolvePath(jsonResponse, this._latitudeFieldPath);
            coordinates[1] = resolvePath(jsonResponse, this._longitudeFieldPath);
        }
        else throw "Invalid object state";
        return coordinates;
    }
}