import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Search from "./components/Search";

interface latLong {
  latitude: string;
  longitude: string;
  state: string;
}

let weatherData: string;

interface weatherData {
  temperature: number;
  cityName: string;
  country: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const city = searchParams.city;
  console.log("value below:");
  console.log(city);
  const apiKey = "e955815ab3dfe6264aea41611bd607ec";
  const geoLocationRes = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
  );
  const geoLocation = await geoLocationRes.json();
  console.log(geoLocation);

  const getLocation: latLong = {
    latitude: geoLocation[0].lat,
    longitude: geoLocation[0].lon,
    state: geoLocation[0].state,
  };
  const currentWeatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${getLocation.latitude}&lon=${getLocation.longitude}&appid=${apiKey}&units=metric`
  );
  const currentWeather = await currentWeatherRes.json();
  console.log(currentWeather);

  const getWeatherData: weatherData = {
    temperature: currentWeather.main.temp,
    cityName: currentWeather.name,
    country: currentWeather.sys.country,
  };

  return (
    <>
      <h1>{getWeatherData.temperature}</h1>
      <h1>{getWeatherData.cityName}</h1>
      <h1>{getWeatherData.country}</h1>
      <h1>{getLocation.state}</h1>

      <Search />
    </>
  );
}
