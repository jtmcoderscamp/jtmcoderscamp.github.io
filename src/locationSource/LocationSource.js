import GpsApiLocationSource from "./GpsApiLocationSource";
import IpBasedLocationSource from "./IpBasedLocationSource";

export default class LocationSource {
    async checkLocation() {
        let location = await this._getGpsLocation();

        if (!location) location = await this._getIPLocation();

        if (location) return location;
        else throw "Unable to determine the location"
    }

    async _getGpsLocation() {
        let location;

        try {
            location = await this._getGpsLocationWithTimeout();
        } catch (e) {
            console.error(e);
        }

        return location;
    }

    async _getGpsLocationWithTimeout() {
        let gps = new GpsApiLocationSource();

        return await Promise.race([
            gps.checkLocation(),
            this._timeout(4000)
        ]);
    }

    async _getIPLocation() {
        let location;

        try {
            location = await this._getIPLocationWithTimeout();
        } catch (e) {
            console.error(e);
        }

        return location;
    }

    async _getIPLocationWithTimeout() {
        return await Promise.race([
            new IpBasedLocationSource().checkLocation(),
            new IpBasedLocationSource("https://api.ipdata.co?api-key=5102d8d1676795d31695bc82a1fb00c8c51ad6d0d03326b039f39f60").checkLocation()
        ]);
    }

    async _timeout(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}