import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import axios from 'axios';
import { Guest } from '../model/Guest';
import IngredientsList from "./Ingredients";
import Autocomplete from "./Autocomplete";

function GuestManagement() {
    const navigate = useNavigate();

    const [guestList, setGuestList] = useState<Guest[]>([]);
    const [newGuestName, setNewGuestName] = useState('');
    const [editGuest, setEditGuest] = useState<Guest | null>(null);

    useEffect(() => {
        fetchGuestList();
    }, []);

    const fetchGuestList = () => {
        axios.get<Guest[]>('/tb/user/guest')
            .then((response) => {
                setGuestList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleNewGuestNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewGuestName(event.target.value);
    };

    const handleEditGuestNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (editGuest) {
            setEditGuest({ ...editGuest, guestName: event.target.value });
        }
    };

    const handleIncludeChange = (value: string) => {
        if (editGuest) {
            setEditGuest({ ...editGuest, includeIngredients: [...editGuest.includeIngredients, value] });
        }
    };

    const handleExcludeChange = (value: string) => {
        if (editGuest) {
            setEditGuest({ ...editGuest, excludeIngredients: [...editGuest.excludeIngredients, value] });
        }
    };

    const handleIncludeIngredientRemove = (value: string) => {
        if (editGuest) {
            const updatedIngredients = editGuest.includeIngredients.filter((ingredient) => ingredient !== value);
            setEditGuest({ ...editGuest, includeIngredients: updatedIngredients });
        }
    };

    const handleExcludeIngredientRemove = (value: string) => {
        if (editGuest) {
            const updatedIngredients = editGuest.excludeIngredients.filter((ingredient) => ingredient !== value);
            setEditGuest({ ...editGuest, excludeIngredients: updatedIngredients });
        }
    };

    const handleCreateGuest = () => {
        const loggedInUser: string | null = localStorage.getItem("user");
        let newGuest: Guest | null = null;

        if (loggedInUser !== null) {
            newGuest = {
                guestID: "",
                userName: loggedInUser,
                guestName: newGuestName,
                includeIngredients: [],
                excludeIngredients: [],
            };
        }

        if (newGuest !== null) {
            axios
                .post<string>("/tb/user/guest", newGuest)
                .then((response) => {
                    fetchGuestList();
                    setNewGuestName("");
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };


    const handleEditGuest = () => {
        if (editGuest) {
            axios.put<Guest>(`/tb/user/guest/${editGuest.guestID}`, editGuest)
                .then((response) => {
                    fetchGuestList();
                    setEditGuest(null);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleDeleteGuest = (guestID: string) => {
        axios.delete(`/tb/user/guest/${guestID}`)
            .then((response) => {
                fetchGuestList();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <h3>Guest Management:</h3>
            <p>Guest List:</p>
            <ul>
                {guestList.map((guest) => (
                    <li key={guest.guestID}>
                        {guest.guestName}
                        <button onClick={() => setEditGuest(guest)}>Edit</button>
                        <button onClick={() => handleDeleteGuest(guest.guestID)}>Delete</button>
                    </li>
                ))}
            </ul>

            {editGuest ? (
                <>
                    <h4>Edit Guest:</h4>
                    <form>
                        <label>
                            Guest Name:
                            <input type="text" value={editGuest.guestName} onChange={handleEditGuestNameChange} />
                        </label>
                        <br />
                        <label>
                            <p>Enter Ingredient:</p>
                            <Autocomplete onIncludeChange={handleIncludeChange} onExcludeChange={handleExcludeChange} />
                        </label>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div>
                                <IngredientsList
                                    ingredients={editGuest.includeIngredients}
                                    onIngredientRemove={handleIncludeIngredientRemove}
                                    title="Include Ingredients"
                                />
                            </div>
                            <div>
                                <IngredientsList
                                    ingredients={editGuest.excludeIngredients}
                                    onIngredientRemove={handleExcludeIngredientRemove}
                                    title="Exclude Ingredients"
                                />
                            </div>
                        </div>
                        <br />
                        <button type="button" onClick={handleEditGuest}>Save</button>
                        <button type="button" onClick={() => setEditGuest(null)}>Cancel</button>
                    </form>
                </>
            ) : (
                <>
                    <h4>Create New Guest:</h4>
                    <form>
                        <label>
                            Guest Name:
                            <input type="text" value={newGuestName} onChange={handleNewGuestNameChange} />
                        </label>
                        <br />
                        <button type="button" onClick={handleCreateGuest}>Create</button>
                    </form>
                </>
            )}

            <button onClick={() => navigate('/recipesearch')}>Search for Recipes</button>
            <LogoutButton />
        </div>
    );
}

export default GuestManagement;
