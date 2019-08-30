export default class GpsApiLocationSource {
    async getLocation() {
        try {
            return await this._safeGetLocation();
        } catch (e) {
            this._logError(e);
        }

        return {};
    }

    async _safeGetLocation() {
        let {coords} = await this._getCurrentPosition();
        let {latitude, longitude} = coords;

        return {latitude, longitude};
    }

    _getCurrentPosition() {
        const expr = (resolve, reject) => {
            navigator.geolocation ? 
                navigator.geolocation.getCurrentPosition(resolve, reject) : 
                resolve({});
        }
        
        return new Promise(expr);
    }

    _logError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                console.error("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                console.error("An unknown error occurred.");
                break;
        }
    }
}