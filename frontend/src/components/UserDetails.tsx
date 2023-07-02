import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import axios from 'axios';
import { Guest } from '../model/Guest';

function UserDetails() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [guestName, setGuestName] = useState('');
    const [includeIngredients, setIncludeIngredients] = useState<string[]>([]);
    const [excludeIngredients, setExcludeIngredients] = useState<string[]>([]);

    useEffect(() => {
        const storedUserName = localStorage.getItem('user');
        if (storedUserName !== null) {
            setUserName(storedUserName);
        }
    }, []);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleGuestNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGuestName(event.target.value);
    };

    const handleIncludeIngredientsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIncludeIngredients(event.target.value.split(','));
    };

    const handleExcludeIngredientsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExcludeIngredients(event.target.value.split(','));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newGuest = {
            userName: userName || '',
            guestName: guestName,
            includeIngredients: includeIngredients,
            excludeIngredients: excludeIngredients,
        };

        createGuest(newGuest);
    };

    function createGuest(newGuest: Guest) {
        axios
            .post('/tb/user/guest', newGuest)
            .then((response) => {
                const guestID = response.data;
                localStorage.setItem('guestID', guestID);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function deleteGuest(guestID: string) {
        axios
            .delete(`/tb/user/guest/${guestID}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div>
            <h3>User Details:</h3>
            <p>Aktueller Benutzername: {userName}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Neues Passwort:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <label>
                    Gastname:
                    <input type="text" value={guestName} onChange={handleGuestNameChange} />
                </label>
                <br />
                <label>
                    Inkludierte Zutaten (durch Komma getrennt):
                    <input
                        type="text"
                        value={includeIngredients.join(',')}
                        onChange={handleIncludeIngredientsChange}
                    />
                </label>
                <br />
                <label>
                    Ausgeschlossene Zutaten (durch Komma getrennt):
                    <input
                        type="text"
                        value={excludeIngredients.join(',')}
                        onChange={handleExcludeIngredientsChange}
                    />
                </label>
                <br />
                <button type="submit">Save</button>
            </form>
            <button onClick={() => navigate('/recipesearch')}>Search for Recipes</button>
            <LogoutButton />
        </div>
    );
}

export default UserDetails;
