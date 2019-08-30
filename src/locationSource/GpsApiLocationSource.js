export default class GpsApiLocationSource {
    async getLocation() {
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
}