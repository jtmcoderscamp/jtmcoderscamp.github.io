export default class GpsApiLocationSource {
    async checkLocation() {
        let {coords} = await this._getCurrentPosition();
        let {latitude, longitude} = coords;

        if (latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180)
            return {latitude, longitude};
        else
            throw "Illegal coordinates were encountered";
    }

    _getCurrentPosition() {
        if (navigator.geolocation) {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            });
        } else {
            throw "Geolocation is not supported by this browser";
        }
    }
}