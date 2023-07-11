import React from 'react';
import RegisterForm from "./components/RegisterForm"
import useUser from "./hooks/UserHooks"
import {Route, Routes} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RecipeSearch from "./components/RecipeSearch";
import ProtectedRoutes from "./components/Protected Routes";
import Test from "./components/Test";
import RecipeDetail from "./components/RecipeDetail";
import UserDetails from "./components/UserDetails";
import GuestManagement from "./components/GuestManagement";
import "./App.css"

function App() {

    const {login, user} = useUser();

    async function handleLogin(username: string, password: string) {
        await login(username, password);
    }

    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginPage login={handleLogin}/>}/>
                <Route path="/login" element={<LoginPage login={handleLogin}/>}/>
                <Route path="/test" element={<Test/>}/>
                <Route path="/register" element={<RegisterForm/>}/>
                <Route element={<ProtectedRoutes user={user}/>}>
                    <Route path="/recipesearch" element={<RecipeSearch/>}/>
                    <Route path="/recipe/:id" element={<RecipeDetail/>}/>
                    <Route path="/userDetails" element={<UserDetails/>}/>
                    <Route path="/guestManagement" element={<GuestManagement/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;