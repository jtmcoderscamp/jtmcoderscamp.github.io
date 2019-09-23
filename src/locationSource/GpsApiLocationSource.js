export default class GpsApiLocationSource {
    async checkLocation() {
        //CODE_REVIEW Tak łatwiej: const { latitude, longitude } = await this._getCurrentPosition().coords
        // A tak to w ogóle:  const { coords: { latitude, longitude }} = await this.getCurrentPosition();
        let {coords} = await this._getCurrentPosition();
        let {latitude, longitude} = coords;

        if (latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180)
            return {latitude, longitude};
        else
        //CODE_REVIEW throw Error("Illegal cordinates were encountered")
            throw "Illegal coordinates were encountered";
    }

    _getCurrentPosition() {
        if (navigator.geolocation) {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            });
        } else {
            // CODE_REVIEW Chciałbym dodatkowo zwrócić uwagę, że czasem zamiast rzucać
            // wyjątkiem można po prostu użyć console.error();
            // Ale to tylko, gdy nie chcemy używać try ... catch
            throw "Geolocation is not supported by this browser";
        }
    }
}
