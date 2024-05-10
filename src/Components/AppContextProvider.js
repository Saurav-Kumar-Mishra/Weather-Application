import React, { createContext } from "react";
import ErrorPage from "./ErrorPage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppContext = createContext();
export default function AppContextProvider({ children }) {
  const [darkMode, setDarkMode] = React.useState(false);
  const [city, setCity] = React.useState("Delhi");
  const [Data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [weatherImg, setWeatherImg] = React.useState("./sun.png");
  const [lat ,setLat]=React.useState(0);
  const [lon ,setLon]=React.useState(0);
  const [sunrise, setSunrise]=React.useState(0);
  const [sunset, setSunset]=React.useState(0);
  const [windSpeed ,setwindSpeed]=React.useState(0);
  const [humidity,setHumidity]=React.useState(0);
  const[temperature, setTemeperature]=React.useState(0);
  const[feelsLike,setFeelsLike]=React.useState(0);
  const[pressure,setPressure]=React.useState(0)
  

  const colorMode = {
    color: darkMode ? "white" : "black",
    backgroundColor: darkMode ? "#1e272e" : "white",
  };
  let response = "";
  async function getWeatherData() {
    setLoading(true);
    try {
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bdb93d29ded9ecd9a096d1c2d0b1717c`
      );
      const data = await response.json();
      if(data.message)
        toast.error("city not found")
  
      setData(data);
      setSunrise(data.sys.sunrise);
      setSunset(data.sys.sunset)
      setwindSpeed( data.wind.speed)
      setHumidity(data.main.humidity)
      setTemeperature(data.main.temp)
      setFeelsLike(data.main.feels_like)
      setPressure(data.main.pressure)
      data.message && <ErrorPage/>
     
    } catch (error) {

      console.error("Error occured while fetching data: ", error);
      
    }
    setLoading(false);
  }
  async function getWeatherLongLat()
  {
    setLoading(true);
    try {
      
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bdb93d29ded9ecd9a096d1c2d0b1717c`
      );
      const data = await response.json();
      setData(data);
      setCity(data.name)
      setSunrise(Data.sys.sunrise);
      setSunset(Data.sys.sunset)
      setwindSpeed( data.wind.speed)
      setHumidity(data.main.humidity)
      setTemeperature(data.main.temp)
      setFeelsLike(data.main.feels_like)
      setPressure(data.main.pressure)
      if(data.message)
      toast.error("city not found")
    data.message && <ErrorPage/>

    } catch (error) {

      <ErrorPage/>
      console.error("Error occured while fetching data: ", error);
      
    }
    setLoading(false);
  }
  
  let Weekday = "";
  switch (new Date().getDay()) {
    case 0:
      Weekday = "Sunday";
      break;
    case 1:
      Weekday = "Monday";
      break;
    case 2:
      Weekday = "Tuesday";
      break;
    case 3:
      Weekday = "Wednesday";
      break;
    case 4:
      Weekday = "Thursday";
      break;
    case 5:
      Weekday = "Friday";
      break;
    case 6:
      Weekday = "Saturday";
      break;
    default:
      Weekday = "something went wrong";
  }
  const Day = new Date().getDate();
  let Month = "";
  switch (new Date().getMonth()) {
    case 0:
      Month = "Jan";
      break;
    case 1:
      Month = "Feb";
      break;
    case 2:
      Month = "Mar";
      break;
    case 3:
      Month = "April";
      break;
    case 4:
      Month = "May";
      break;
    case 5:
      Month = "June";
      break;
    case 6:
      Month = "July";
      break;
    case 7:
      Month = "Aug";
      break;
    case 8:
      Month = "Sept";
      break;
    case 9:
      Month = "Oct";
      break;
    case 10:
      Month = "Nov";
      break;
    case 11:
      Month = "Dec";
      break;
    default:
      Month = "something went wrong";
  }
//   // let windSpeed="";
//   // let humidity="";
//   // let temperature="";
//   // let feelsLike="";
//   // let sunsetTime="";
//   // let sunriseTime="";
//   // let pressure="";
// try{
//   //  windSpeed = Data && Data.wind && Data.wind.speed;
//   //  humidity = Data && Data.main.humidity;
//   //  temperature = Data && Data.main.temp;
//   //  feelsLike = Data && Data.main.feels_like;
//   //  sunsetTime = Data && Data.sys.sunset;
//   //  sunriseTime = Data && Data.sys.sunrise;
//   //  pressure = Data && Data.main.pressure;
// }
// catch(error)
// {
//   console.log("some error occured ",error)
// }
  function getSunsetAndSunriseTime(val) {
    const unixTimestamp = val;

    const milliseconds = unixTimestamp * 1000;

    return new Date(milliseconds);
  }
  
  React.useEffect(() => {
    try{ const getWeatherImg = Data && Data.weather[0].main;
      if (getWeatherImg === "Haze") setWeatherImg("./sun.png");
      else if (getWeatherImg === "Thunderstorm") setWeatherImg("./storm.png");
      else if(getWeatherImg==="Clouds") setWeatherImg("./cloudy.png")
    }
  catch(error){
    console.log(error)
  }
       
      }, [Data,city]); 
      
  const sunSet = getSunsetAndSunriseTime(sunset);
  const sunRise = getSunsetAndSunriseTime(sunrise);

  const value = {
    getWeatherData,
    darkMode,
    setDarkMode,
    colorMode,
    response,
    city,
    setCity,
    Weekday,
    Day,
    Month,
    windSpeed,
    humidity,
    temperature,
    loading,
    feelsLike,
    sunSet,
    sunRise,
    pressure,
    weatherImg,
    setLat,
    setLon,
    getWeatherLongLat
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
