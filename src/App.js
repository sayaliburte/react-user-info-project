import React, { useEffect, useState } from "react";
import "./App.css";
import { Grid } from "@material-ui/core";
import { Route, Routes } from "react-router-dom";
import UserInformationScreen from "./screens/UserInformationScreen";
import HomeScreen from "./screens/HomeScreen";
import AppBarComponent from "./components/AppBarComponent";
const data = [
  {
    id: 1,
    name: "Mehmet",
    surname: "Baran",
    birthYear: 1987,
    birthCity: 63,
  },
  {
    id: 2,
    name: "Zerya Betül",
    surname: "Baran",
    birthYear: 2017,
    birthCity: 34,
  },
  {
    id: 3,
    name: "Mehmet",
    surname: "Baran",
    birthYear: 1987,
    birthCity: 63,
  },
  {
    id: 4,
    name: "Zerya Betül",
    surname: "Baran",
    birthYear: 2017,
    birthCity: 34,
  },
  {
    id: 5,
    name: "Mehmet",
    surname: "Baran",
    birthYear: 1987,
    birthCity: 63,
  },
  {
    id: 6,
    name: "Zerya Betül",
    surname: "Baran",
    birthYear: 2017,
    birthCity: 34,
  },
];
function App() {
  const [userData, setUserData] = useState(data);
  const ondeleteUserData = (id) => {
   
    let filteredData = userData.filter((user) => {
      return user.id !== id;
    });
    setUserData(filteredData);
  };
  useEffect(()=>{

  },[userData]);
  return (
    <AppBarComponent>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route
          path="/UserInfo"
          element={
            <UserInformationScreen
              userData={userData}
              onDelete={ondeleteUserData}
            />
          }
        />
      </Routes>
    </AppBarComponent>
  );
}

export default App;
