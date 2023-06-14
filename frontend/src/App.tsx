import React, {useState} from 'react';
import './App.css';
import RegisterForm from "./components/RegisterForm"

import {Route, Routes} from "react-router-dom";
import axios from "axios";
import LoginPage from "./components/LoginPage";

function App() {

    export default function useUser() {

        const [user, setUser] = useState<string>()

        function login(username: string, password: string) {
            // Rückgabewert ist ein Promise weil die Funktion asynchron ist
            return axios.post("/user/login", undefined, {auth: {username, password}})
                .then((r) => setUser(r.data))
        }

        return {login, user}

    }

  return (
      <div>
          <header>
              <h1>TasteBuddies</h1>
          </header>
          <Routes>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/register" element={<RegisterForm/>}
              />
          </Routes>
      </div>
  );
}

export default App;
