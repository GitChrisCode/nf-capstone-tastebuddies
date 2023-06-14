import React from 'react';
import './App.css';
import RegisterForm from "./components/RegisterForm"
import {Route, Routes} from "react-router-dom";

function App() {
  return (
      <div>
          <header>
              <h1>TasteBuddies</h1>

          </header>
          <Routes>
              <Route
                  path="/"
                  element={<RegisterForm/>}
              />
          </Routes>
      </div>
  );
}

export default App;
