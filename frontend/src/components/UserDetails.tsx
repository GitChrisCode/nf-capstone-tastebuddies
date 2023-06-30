import React, {useEffect} from 'react';
import { Guest } from "../model/Guest";
import {useNavigate} from "react-router-dom";
import LogoutButton from "./LogoutButton";
import axios from "axios";

function UserDetails() {
       const navigate = useNavigate();

    const actualUser: Guest = {
        userName: "",
        guestName: "",
        includeIngredients: [],
        excludeIngredients: [],
    };

    const storedUserName = localStorage.getItem('user');
    if (storedUserName !== null) {
        actualUser.userName = storedUserName;
    }

    actualUser.guestName = "Edelvin";
    actualUser.excludeIngredients = ["Apple", "Sugar", "Cinnamon"];
    actualUser.includeIngredients = ["Onions"];

    function createGuest(newGuest:Guest) {
        axios.post('/tb/user/guest', newGuest)
            .then(r =>{
                console.log(r.data);
                const guestID: string = r.data;
                console.log("G U E S T I D: ", guestID);
                localStorage.setItem('guestID', guestID);
            })
            .catch(error => {
                // Hier können Sie mit dem Fehler umgehen
                console.error(error);
            });
    }

    function deleteGuest(guestID:string){
        axios.delete(`/tb/user/guest/${guestID}`)
        .then(response => {
            // Erfolgreich gelöscht
            console.log(response.data);
        })
        .catch(error => {
            // Fehler beim Löschen des Gastes
            console.error(error);
        });
}

    useEffect(() => {
        createGuest(actualUser);
        const guestID = localStorage.getItem('guestID');
        if (guestID !== null) {
            deleteGuest(guestID);
        }
        localStorage.removeItem('guestID');
    }, []);

    return (
        <div>
            <h3>User Details:</h3>
            <p>Aktuelle User: {localStorage.getItem('user')}</p>
            <button onClick={() => navigate('/')}>Zurück zur Startseite</button>
            <LogoutButton/>
        </div>
    );
}

export default UserDetails;
