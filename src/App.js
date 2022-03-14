import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserInformationScreen from "./screens/UserInformationScreen";
import HomeScreen from "./screens/HomeScreen";
import AppBarComponent from "./components/AppBarComponent";
/*Here,In App Component is used AppBarComponent is imported for appbar and next routes are set for moving to the pages
1)First Route is set for HomeScreen where user can add information by clicking on add new user button
2)Second Route is set for UserInformationScreen for displaying user information table.*/
function App() {return (
    <AppBarComponent>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/UserInfo" element={<UserInformationScreen />} />
      </Routes>
    </AppBarComponent>
  );
}
export default App;
