import Image from "next/image";
import Link from "next/link";
import ProductCard from "../../components/ProductCard";
import Search from "../../components/search";

interface latLong {
  latitude: string;
  longitude: string;
}

let temperature: string;
var text = "abcde";

export async function create(data: string) {
  console.log(data);
  if (data != "") {
    const apiKey = "e955815ab3dfe6264aea41611bd607ec";
    const geoLocationRes = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${data}&appid=${apiKey}`
    );
    const geoLocation = await geoLocationRes.json();
    console.log(geoLocation);

    const getLocation: latLong = {
      latitude: geoLocation[0].lat,
      longitude: geoLocation[0].lat,
    };
    const currentWeatherRes = await fetch(
      ` https://api.openweathermap.org/data/2.5/weather?lat=${getLocation.latitude}&lon=${getLocation.longitude}&appid=${apiKey}&units={metric}`
    );
    const currentWeather = await currentWeatherRes.json();
    console.log(currentWeather);

    temperature = currentWeather.main.temp;
    console.log(temperature);
    console.log("input!!");
    text = data;
    return temperature;
  } else {
    console.log("no input");
  }
}
export default async function Home() {
  const temp = await create("new york");
  return (
    <>
      <h1>{temp}</h1>

      <Search />
    </>
  );
}
