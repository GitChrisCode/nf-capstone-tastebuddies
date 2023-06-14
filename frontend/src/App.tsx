import React, {useState} from 'react';
import './App.css';
import RegisterForm from "./components/RegisterForm"
import useUser from "./components/UserHooks"
import {Route, Routes} from "react-router-dom";
import LoginPage from "./components/LoginPage";

function App() {

    const {login} = useUser();

  return (
      <div>
          <header>
              <h1>TasteBuddies</h1>
          </header>
          <Routes>
              <Route path="/login" element={<LoginPage login={login}/>}/>
              <Route path="/register" element={<RegisterForm/>}
              />
          </Routes>
      </div>
  );
}

export default App;
