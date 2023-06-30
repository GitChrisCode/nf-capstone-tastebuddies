import React from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

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
        <div>
            <button onClick={logoutOnSubmit}>Logout</button>
        </div>
    );
}

export default LogoutButton;