import GpsApiLocationSource from "./locationSource/GpsApiLocationSource";

// plik inicjalizacyjny aplikacji

async function foo() {
    let x = new GpsApiLocationSource();
    let y = await x.getLocation();

    console.log(y);
}

foo();