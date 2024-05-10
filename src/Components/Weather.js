import React from "react";
import { AppContext } from "./AppContextProvider";
import Loading from "./Loading";
import { LuSunset } from "react-icons/lu";
import { LuSunrise } from "react-icons/lu";
import { FaWind } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";


function Weather() {
  function calculateLocalTime(offsetInSeconds) {
    const now = new Date();
    const utcMilliseconds = now.getTime() + now.getTimezoneOffset() * 60000;
    const localMilliseconds = utcMilliseconds + offsetInSeconds * 1000;
    const localTime = new Date(localMilliseconds);
    return localTime;
  }
  const indiaTime = calculateLocalTime(19800);

  const [minutes, setMinutes] = React.useState(indiaTime.getMinutes());
  const [hour, setHours] = React.useState(indiaTime.getHours());
  const {
    getWeatherData,
    city,
    Day,
    Month,
    Weekday,
    windSpeed,
    humidity,
    temperature,
    loading,
    feelsLike,
    sunSet,
    sunRise,
    pressure,
    weatherImg,
    darkMode
  } = React.useContext(AppContext);
  React.useEffect(() => {
    getWeatherData();
  }, [city]);
  React.useEffect(() => {
    const interval = setInterval(() => {
      const Time = calculateLocalTime(19800);
      const m = Time.getMinutes();
      const h = Time.getHours();
      setMinutes(m);
      setHours(h);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [city]);
 
  const minute = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return loading ? (
    <div className="w-screen h-screen ">
      <Loading />
    </div>
    
  ) : (
    <div className={`${ darkMode?' text-black' :' text-white '  } w-screen`}>
      <div className="flex flex-col w-screen  mt-10 items-center lg:flex-row lg:justify-evenly" >
        <div className={`${ darkMode?'bg-[#c1c1c6] text-black' :'bg-[#3e3c3c] '} p-8 px-12 bg-[#3e3c3c] rounded-2xl text-center shadow-black shadow-2xl  `}>
          <p className=" font-bold text-xl">{city}</p>
          <p className="text-6xl font-extrabold mt-6">{`${hour} :  ${minute}`}</p>
          <p className="text-[14px] mt-2">{`${Weekday}, ${Day} ${Month}`}</p>
        </div>
        <div className={` ${ darkMode?'bg-[#c1c1c6] ' :'bg-[#3e3c3c] text-white'}flex flex-col mt-4 shadow-black shadow-2xl  p-4 pb-10 w-[350px] rounded-2xl `}>
          {/* //fist section */}
          <div className="">
            <div className="text-center">
              <p className="mx-auto text-6xl font-bold">
                {(temperature - 273).toFixed(1)}° C
              </p>
              <p className="mx-auto text-sm font-bold">
                Feels Like:{" "}
                <span className="text-2xl">
                  {(feelsLike - 273).toFixed(2)}° C
                </span>
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2 justify-center">
                <LuSunset/>
                <p>sunset: <span>{`${sunSet.getHours()} : ${sunSet.getMinutes()}`}</span></p>
              </div>
              <div className="flex gap-2 items-baseline justify-center">
                <LuSunrise/>
                <p>sunrise: <span>{`${sunRise.getHours()} : ${sunRise.getMinutes()}`}</span></p>
              </div>
            </div>
          </div>
          {/* second section */}
          <div>
            <img
              className="mx-auto w-[50%] mt-5"
              src={weatherImg}
              alt="unable to load pic"
            />
          </div>
          {/* third section */}
          <div className="flex flex-col gap-5">
            <div className="flex justify-around">
              <div className="flex-col flex  items-center">
                <img src="humidity.png" width="30px"/>
                <p className="text-2xl font-bold">{humidity}%</p>
                <p>humidity</p>
              </div>
              <div className="flex-col flex  items-center">
                <span className="text-2xl "><FaWind/></span>
                <p className="font-bold text-2xl">{windSpeed} <span className="text-sm">km/h</span></p>
                <p>wind</p>
              </div>
            </div>
            <div className="flex justify-around">
              <div className="flex-col flex  items-center">
                <img src="pressure.jpeg" width="30px"/>
                <p className="text-2xl font-bold">{pressure}</p>
                <p>pressure</p>
              </div>
              <div className="flex-col flex items-center">
              <span className="text-2xl"><MdVisibility /></span>
                <p className="text-2xl font-bold">{humidity}%</p>
                <p>Visibility</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Weather;
