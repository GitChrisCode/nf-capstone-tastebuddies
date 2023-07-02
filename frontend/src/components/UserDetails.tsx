import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import axios from 'axios';
import { Guest } from '../model/Guest';
import IngredientsList from "./Ingredients";
import Autocomplete from "./Autocomplete";

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

    const handleIncludeChange = (value: string) => {
        setIncludeIngredients([...includeIngredients, value]);
    };

    const handleExcludeChange = (value: string) => {
        setExcludeIngredients([...excludeIngredients, value]);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleGuestNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGuestName(event.target.value);
    };

    const onIncludeIngredientRemove = (value: string) => {
        const updatedIngredients = includeIngredients.filter((ingredient) => ingredient !== value);
        setIncludeIngredients(updatedIngredients);
    };

    const onExcludeIngredientRemove = (value: string) => {
        const updatedIngredients = excludeIngredients.filter((ingredient) => ingredient !== value);
        setExcludeIngredients(updatedIngredients);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newGuest: Guest = {
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
                <br/>
                <label>
                    Gastname:
                    <input type="text" value={guestName} onChange={handleGuestNameChange} />
                </label>
                <br/>
                <label>
                    <p>Enter Ingredient:</p>
                    <Autocomplete onIncludeChange={handleIncludeChange} onExcludeChange={handleExcludeChange} />
                </label>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div>
                        <IngredientsList
                            ingredients={includeIngredients}
                            onIngredientRemove={onIncludeIngredientRemove}
                            title="Include Ingredients"
                        />
                    </div>
                    <div>
                        <IngredientsList
                            ingredients={excludeIngredients}
                            onIngredientRemove={onExcludeIngredientRemove}
                            title="Exclude Ingredients"
                        />
                    </div>
                </div>
                <br/>
                <button type="submit">Save</button>
            </form>
            <button onClick={() => navigate('/recipesearch')}>Search for Recipes</button>
            <LogoutButton />
        </div>
    );
}

export default UserDetails;
