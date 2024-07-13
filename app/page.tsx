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

interface fiveDayData {
  list: any;

  lat: number;
  lon: number;
  // temperature: number;
  // cityName: string;
  // country: string;
  // date: string;
  //cod: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const city = searchParams.city;

  if (typeof city == "string") {
    const apiKey = "e955815ab3dfe6264aea41611bd607ec";
    const geoLocationRes = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
    );
    const geoLocation = await geoLocationRes.json();

    const getLocation: latLong = {
      latitude: geoLocation[0].lat,
      longitude: geoLocation[0].lon,
      state: geoLocation[0].state,
    };
    const currentWeatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${getLocation.latitude}&lon=${getLocation.longitude}&appid=${apiKey}&units=metric`
    );
    const currentWeather = await currentWeatherRes.json();

    const fiveDayWeatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${getLocation.latitude}&lon=${getLocation.longitude}&appid=${apiKey}&units=metric`
    );
    const fiveDayWeather = await fiveDayWeatherRes.json();

    const getWeatherData: weatherData = {
      temperature: currentWeather.main.temp,
      cityName: currentWeather.name,
      country: currentWeather.sys.country,
    };

    const getFiveDayWeatherData: fiveDayData = {
      list: fiveDayWeather.list,
      lat: fiveDayWeather.city.coord.lat,
      lon: fiveDayWeather.city.coord.lon,
    };

    return (
      <>
        <Search />
        <h1>{getWeatherData.temperature}</h1>
        <h1>{getWeatherData.cityName}</h1>
        <h1>{getWeatherData.country}</h1>
        <h1>{getLocation.state}</h1>

        <h1>five hour forecast</h1>

        {getFiveDayWeatherData.list.map((item: any) => (
          <>
            <li>
              {/* {console.log("here")}
              {console.log(item.city.coord.lat)} */}
              {item.main.temp},{item.dt_txt}
              <Image
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={`${item.weather.description} icon`}
                width={40}
                height={40}
              />
            </li>
          </>
        ))}
      </>
    );
  } else {
    return (
      <>
        Please Search for city
        <Search />
      </>
    );
  }
}
