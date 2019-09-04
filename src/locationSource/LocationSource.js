import GpsApiLocationSource from "./GpsApiLocationSource";
import IpBasedLocationSource from "./IpBasedLocationSource";

export default class LocationSource {
    static get IP_PROMISES_ARRAY() {
        return [{
            apiUrl: "https://api.ipdata.co?api-key=5102d8d1676795d31695bc82a1fb00c8c51ad6d0d03326b039f39f60",
            latitudeFieldPath: "latitude",
            longitudeFieldPath: "longitude",
            locationFieldSeparator: null
        }]
    }

    static get GPS_TIMEOUT() {
        return 4000;
    }

    static get IP_TIMEOUT() {
        return 20000;
    }

    async checkLocation() {
        try {
            return await this._getGpsLocation();
        } catch (e) {
            return await this._getIPLocation();
        }
    }

    async _getGpsLocation() {
        return this._raceWithoutRejection([
            new GpsApiLocationSource().checkLocation(),
            this._timeout(LocationSource.GPS_TIMEOUT)
        ]);
    }

    async _getIPLocation() {
        return this._raceWithoutRejection([
            new IpBasedLocationSource().checkLocation(),
            ...this._mapToPromises(),
            this._timeout(LocationSource.IP_TIMEOUT)
        ]);
    }

    _timeout(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    _mapToPromises() {
        return LocationSource.IP_PROMISES_ARRAY.map(obj => {
            return new IpBasedLocationSource(
                obj.apiUrl,
                obj.latitudeFieldPath,
                obj.longitudeFieldPath,
                obj.locationFieldSeparator
            ).checkLocation();
        });
    }

    _raceWithoutRejection(promises) {
        if (promises.length <= 1) {
            return Promise.reject("IP based location failed to determine location");
        }

        let indexPromises = promises.map((p, index) => p.catch(() => {
            throw index;
        }));

        return Promise.race(indexPromises).catch(index => {
            promises.splice(index, 1);

            return this._raceWithoutRejection(promises);
        });
    }
}