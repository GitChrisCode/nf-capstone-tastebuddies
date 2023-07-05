import React from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Button} from "@material-tailwind/react";

function LogoutButton() {

    const navigate = useNavigate();

    function logoutOnSubmit() {
        axios.get('/tb/user/logout')
            .then(response => {
                // Erfolgreiche Antwort verarbeiten
                console.log(response.data); // "logged out" anzeigen oder entsprechend handhaben
            })
            .then(() => navigate( '/'))
            .catch(error => {
                // Fehler verarbeiten
                console.error(error);
            });
        localStorage.removeItem('user');
    }
    return (
        <div >
        <button
            type="submit"
            className="px-4 py-1 text-sm text-Blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-bule-800 focus:ring-offset-2"
            data-te-ripple-color="light"
            onClick={logoutOnSubmit}>
            Sign Out
        </button>
        </div>
    );
}

export default LogoutButton;