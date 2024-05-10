import { AppContext } from "./Components/AppContextProvider";
import Header from "./Components/Header";
import Weather from "./Components/Weather";
import React from "react";
import {ToastContainer} from 'react-toastify'

function App() {
  const {darkMode}=React.useContext(AppContext);
  return (
    <div  className={`${
      darkMode ? 'bg-gradient-to-r from-[#fefefe] to-[#b2b1be]' : 'bg-gradient-to-r from-[#444444] to-[#443c3c]'
    } w-screen pb-14 `}>
      <Header/>
      <Weather/>
      <ToastContainer/>
    </div>
  );
}
export default App;
