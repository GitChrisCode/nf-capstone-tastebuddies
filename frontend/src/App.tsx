import React, {useState} from 'react';
import './App.css';
import RegisterForm from "./components/RegisterForm"
import useUser from "./components/UserHooks"
import {Route, Routes} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RecipeSearch from "./components/RecipeSearch";
import ProtectedRoutes from "./components/Protected Routes";

function App() {

    const {login, user} = useUser();

  return (
      <div>
          <header>
              <h1>TasteBuddies</h1>
          </header>
          <Routes>
              <Route path="/login" element={<LoginPage login={login}/>}/>
              <Route path="/register" element={<RegisterForm/>}/>
              <Route element={<ProtectedRoutes user={user}/>}>
                <Route path="/recipesearch" element={<RecipeSearch/>}
                />
              </Route>
          </Routes>
      </div>
  );
}

export default App;
