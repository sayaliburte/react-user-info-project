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
    hobbyArray: ["ABC", "other", "asas"],
  },
  {
    id: 2,
    gender: "female",
    address: "Pune",
    date: "12/2/2022",
    collegeName: "PVG",
    name: "Sayali",
    hobbyArray: ["Reading", "other", "asas", "Travelling"],
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
  const onUserDataAdd = (obj) => {
    userData.push(obj);
  };
  const onUpdateData = (obj) => {
    console.log(obj);
  };
  return (
    <AppBarComponent>
      <Routes>
        <Route path="/" element={<HomeScreen addUser={onUserDataAdd} />} />
        <Route
          path="/UserInfo"
          element={
            <UserInformationScreen
              userData={userData}
              onDelete={ondeleteUserData}
              onUpdateData={onUpdateData}
            />
          }
        />
      </Routes>
    </AppBarComponent>
  );
}

export default App;
