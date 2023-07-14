import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Guest} from '../model/Guest';
import IngredientsList from "./Ingredients";
import Autocomplete from "./Autocomplete";
import {Button, Card, Input, Typography} from "@material-tailwind/react";

import NavigationBar from './NavigationBar';


function UserDetails() {

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
            findGuest(storedUserName);
            console.log("Stored User: ", storedUserName)
        }
    }, []);

    useEffect(() => {
        console.log("foundGuest: ", foundGuest);
        if (foundGuest) {
            setIncludeIngredients(foundGuest.includeIngredients);
            setExcludeIngredients(foundGuest.excludeIngredients);
        }
    }, [foundGuest]);

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
            if (userName !== newUserName) {
                findGuest(newUserName);
                if (foundGuest?.guestName === newUserName) {
                    updateGuest(foundGuest.guestID, newGuest);
                } else {
                    createGuest(newGuest);
                }
            }
        } else {
            findGuest(userName);
            if (foundGuest?.guestName === userName) {
                updateGuest(foundGuest.guestID, newGuest);
            } else {
                createGuest(newGuest);
            }
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
            .get(`/tb/user/guest/find/${guestName}`)
            .then((response) => {
                setFoundGuest(response.data);
            })
            .catch((error) => {
                console.error(error)
            });
    }

    return (
        <section className="h-screen">
            <div className="flex h-full w-auto justify-center">
                <div className="grid">
                    <div><NavigationBar/></div>
                    <main className="shadow-lg rounded">
                        <div className="ml-2">
                            <Card color="transparent" shadow={false}>
                                <Typography variant="h4" className="mt-3 text-gray-500 mb-2">User Details:</Typography>
                                <Typography className="p-2">Hi {userName}, you are logged in!</Typography>
                                <form className="mt-8 mb-2 p-2 w-auto max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                                    <div className="mb-4 flex flex-col gap-6">
                                        <Input
                                            size="lg"
                                            label="Change User Name"
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-800 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            labelProps={{
                                                className: "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-800 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-800 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-800 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                            }}
                                            value={newUserName}
                                            onChange={handleUserNameChange}/>
                                        <Input
                                            type="password"
                                            size="lg"
                                            label="New Password"
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-800 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            labelProps={{
                                                className: "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-800 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-800 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-800 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                            }}
                                            value={password}
                                            onChange={handlePasswordChange}/>
                                        <label>
                                            <Autocomplete onIncludeChange={handleIncludeChange}
                                                          onExcludeChange={handleExcludeChange}/>
                                        </label>
                                        <div className="flex flex-row columns-2 items-start">
                                            <div className="mr-2">
                                                <IngredientsList
                                                    ingredients={includeIngredients}
                                                    onIngredientRemove={onIncludeIngredientRemove}
                                                    title="Include Ingredient"
                                                />
                                            </div>
                                            <div className="">
                                                <IngredientsList
                                                    ingredients={excludeIngredients}
                                                    onIngredientRemove={onExcludeIngredientRemove}
                                                    title="Exclude Ingredient"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="px-4 py-1 text-sm text-Blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-bule-800 focus:ring-offset-2"
                                    >
                                        Save
                                    </Button>
                                </form>
                            </Card>
                        </div>
                    </main>
                </div>
            </div>
        </section>
    );
}

export default UserDetails;