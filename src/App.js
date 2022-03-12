import React, { useState } from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import UserInformationScreen from "./screens/UserInformationScreen";
import HomeScreen from "./screens/HomeScreen";
import AppBarComponent from "./components/AppBarComponent";
function App() {
  return (
    <AppBarComponent>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/UserInfo" element={<UserInformationScreen />} />
      </Routes>
    </AppBarComponent>
  );
}

export default App;
