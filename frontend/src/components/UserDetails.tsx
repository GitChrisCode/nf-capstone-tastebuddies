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
    const [newUserName, setNewUserName] = useState('');
    const [password, setPassword] = useState('');
    const [includeIngredients, setIncludeIngredients] = useState<string[]>([]);
    const [excludeIngredients, setExcludeIngredients] = useState<string[]>([]);
    const [foundGuest, setFoundGuest] = useState<Guest>();
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

    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserName(event.target.value);
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
            guestID: '',
            userName: userName || '',
            guestName: userName,
            includeIngredients: includeIngredients,
            excludeIngredients: excludeIngredients,
        };

        if (userName !== newUserName || password) {
            updateUser(userName, newUserName, password);
            localStorage.setItem('user', newUserName);
            console.log("user: ", userName, " Old: ", newUserName, " PW: ", password)
            if (userName !== newUserName) {
                let guestList: Guest[] = [];
                axios
                    .get('tb/user/guest')
                    .then((response) => {
                        guestList = response.data;
                        guestList.forEach((guest) => {
                            if (guest.userName === userName) {
                                guest.userName = newUserName;
                                updateGuest(guest.guestID, guest);
                            }
                        }
                        )
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }

        findGuest(userName);
        if(foundGuest?.guestName === userName) {
            updateGuest(foundGuest.guestID, newGuest);
        } else {
            createGuest(newGuest);
        }
    };

    function createGuest(newGuest: Guest) {
        axios
            .post('/tb/user/guest', newGuest)
            .then((response) => {
                const guestID = response.data;
                console.log("Guest created: ", guestID);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function updateUser(oldUsername: string, newUsername: string, newUserPassword: string) {
        axios
            .post(
                '/tb/user/details',
                undefined,
                {
                    params: {
                        oldUserName: oldUsername,
                        newUserName: newUsername,
                        newUserPassword: newUserPassword,
                    },
                }
                )
            .then((response) => {
                console.log("Updated User: ", response.data)
            })
            .catch((error) => {
                console.log(error);
        });
    }

    function updateGuest(guestID: string, updatedGuest: Guest) {
        axios
            .put(`/tb/user/guest/${guestID}`, updatedGuest)
            .then((response) => {
                const editedGuest = response.data;
                // Handle the edited guest object
                console.log(editedGuest);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function findGuest(guestName: string) {
        axios
            .get(`/tb/user/guest/${guestName}`)
            .then((response)=> {
                setFoundGuest(response.data);
            })
            .catch((error) => {
                console.error(error)
            });
    }

    return (
        <div>
            <h3>User Details:</h3>
            <p>Aktueller Benutzername: {userName}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    New Username:
                    <input type="text" value={newUserName} onChange={handleUserNameChange}/>
                </label>
                <br/>
                <label>
                    New Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
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
