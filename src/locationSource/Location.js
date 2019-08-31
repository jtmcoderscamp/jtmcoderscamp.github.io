import GpsApiLocationSource from "./GpsApiLocationSource";
import IpBasedLocationSource from "./IpBasedLocationSource";

export default class Location {
    async checkLocation(apiUrl = "https://json.geoiplookup.io/", latitudeFieldPath = "latitude", longitudeFieldPath = "longitude", locationFieldSeparator = null) {

    }

    async _getGpsLocation() {
        let gps = new GpsApiLocationSource();

        return await gps.checkLocation();
    }

    async _getIPLocation(apiUrl, latitudeFieldPath, longitudeFieldPath, locationFieldSeparator) {
        let ip = new IpBasedLocationSource(apiUrl, latitudeFieldPath, longitudeFieldPath, locationFieldSeparator);

        return await ip.checkLocation();
    }
}