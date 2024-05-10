import React from "react";
import { MdDarkMode } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { AppContext } from "./AppContextProvider";
import { MdLightMode } from "react-icons/md";

function Header() {
  const [getInputCity, setInputCity] = React.useState("");
  function handleInput(event) {
    setInputCity(event.target.value);
  }
  function handleKeyPress(event)
  {
    if(event.key==='Enter')
    handleSearch();
  }
  const { setCity,darkMode ,setDarkMode, setLon ,setLat, getWeatherLongLat} = React.useContext(AppContext);
  function handleSearch() {
    setCity(getInputCity);
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLat(latitude);
      setLon(longitude);
    })

    function handleCurrentLocation()
    {
      getWeatherLongLat();
    }

  return (
    <div className="flex justify-around pt-5 px-2 items-baseline w-screen w-[412px] md:w-[768px] lg:w-screen">
      <div onClick={()=>setDarkMode((prev)=>!prev)} className="text-2xl">
      { darkMode ?<MdDarkMode />  : <p className="h-full flex items-center"><MdLightMode/></p>   }
      </div>
      {/* SearchBar code */}
      <div className="relative ">
        <input
          type="text"
          placeholder="Search by city name"
          className=" rounded-[20px] indent-2  md:w-[400px] lg:w-[500px] p-2 text-sm lg:p-4"
          value={getInputCity}
          name="getCity"
          onChange={handleInput}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch} className="absolute right-2 top-[10px] lg:top-[40%] lg:right-4">
          <FaSearch />
        </button>
      </div>
      {/* currentLocation     */}
      <button className="bg-[#4CBB17] flex items-baseline gap-2 rounded-[20px] px-4 py-2 text-white text-sm font-bold " onClick={handleCurrentLocation}>
        <FaLocationCrosshairs />{window.innerWidth>412 && "Current Location"} 
      </button>
    </div>
  );
}

export default Header;
