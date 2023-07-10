import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Guest} from '../model/Guest';
import IngredientsList from "./Ingredients";
import Autocomplete from "./Autocomplete";
import {Button, Card, Input, Typography} from "@material-tailwind/react";
import NavigationBar from "./NavigationBar";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {TrashIcon} from "@heroicons/react/24/solid";

function GuestManagement() {

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
        event.preventDefault()
        setNewGuestName(event.target.value);
        console.log("handleNewGuestNameChange ... triggered");
    };

    const handleEditGuestNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (editGuest) {
            setEditGuest({...editGuest, guestName: event.target.value});
        }
    };

    const handleIncludeChange = (value: string) => {
        if (editGuest) {
            setEditGuest({...editGuest, includeIngredients: [...editGuest.includeIngredients, value]});
        }
    };

    const handleExcludeChange = (value: string) => {
        if (editGuest) {
            setEditGuest({...editGuest, excludeIngredients: [...editGuest.excludeIngredients, value]});
        }
    };

    const handleIncludeIngredientRemove = (value: string) => {
        if (editGuest) {
            const updatedIngredients = editGuest.includeIngredients.filter((ingredient) => ingredient !== value);
            setEditGuest({...editGuest, includeIngredients: updatedIngredients});
        }
    };

    const handleExcludeIngredientRemove = (value: string) => {
        if (editGuest) {
            const updatedIngredients = editGuest.excludeIngredients.filter((ingredient) => ingredient !== value);
            setEditGuest({...editGuest, excludeIngredients: updatedIngredients});
        }
    };

    const handleCreateGuest = (event: React.FormEvent) => {
        event.preventDefault();
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

        if (newGuest?.guestName !== '' && guestList.filter((guest) => guest.guestName === newGuest?.guestName).length === 0) {
            axios
                .post<string>("/tb/user/guest", newGuest)
                .then((response) => {
                    fetchGuestList();
                    setNewGuestName("");
                })
                .catch((error) => {
                    console.error(error);
                });
        } else console.log("newGuest === null!!!!");
    };

    const handleEditGuest = (event: React.FormEvent) => {
        event.preventDefault();
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

    const filteredGuestList = guestList.filter((guest) => guest.guestName !== guest.userName);

    return (
        <section className="h-screen">
            <div className="flex h-full justify-center">
                <div className="grid">
                    <div className="flex flex-wrap flex-col justify-items-center ">
                        <div><NavigationBar/></div>
                        <Card color="transparent" shadow={false}>
                            <Typography variant="h4" className="mt-3 text-gray-500 mb-2">Buddie Management</Typography>
                            <div>
                                <section className="py-1 bg-blueGray-50 -ml-4 -mt-10">
                                    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                                        <div
                                            className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                                                <div className="flex flex-wrap items-center">
                                                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                                        <h3 className="font-semibold text-base text-blueGray-700">Buddie
                                                            List</h3>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="block w-full overflow-x-auto">
                                                <table className="items-center bg-transparent w-full border-collapse ">
                                                    <thead>
                                                    <tr>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                            Buddy Name
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                        </th>
                                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>

                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {filteredGuestList.map((guest) => (
                                                        <tr>
                                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                                {guest.guestName}
                                                            </th>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                                <Button
                                                                    onClick={() => setEditGuest(guest)}
                                                                >
                                                                    <PencilSquareIcon className="h-5 w-5"
                                                                                      color="black"/>
                                                                </Button>
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                                <Button
                                                                    onClick={() => handleDeleteGuest(guest.guestID)}
                                                                >
                                                                    <TrashIcon className="h-5 w-5" color="black"/>
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            {editGuest ? (
                                <>
                                    <Typography>Edit Guest:</Typography>
                                    <form
                                        className="mt-8 mb-2 p-2 w-80 max-w-screen-lg sm:w-96"
                                        onSubmit={handleEditGuest}>
                                        <div className="mb-4 gap-6">
                                            <Input
                                                size="lg"
                                                label="Guest Name"
                                                className="mb-4 peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-800 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                labelProps={{
                                                    className: "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-800 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-800 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-800 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                                }}
                                                value={editGuest.guestName}
                                                onChange={handleEditGuestNameChange}/>
                                            <label>
                                                <Autocomplete onIncludeChange={handleIncludeChange}
                                                              onExcludeChange={handleExcludeChange}/>
                                            </label>
                                            <div className="flex flex-wrap flex-row mb-4">
                                                <div >
                                                    <IngredientsList
                                                        ingredients={editGuest.includeIngredients}
                                                        onIngredientRemove={handleIncludeIngredientRemove}
                                                        title="Include Ingredients"
                                                    />
                                                </div>
                                                <div >
                                                    <IngredientsList
                                                        ingredients={editGuest.excludeIngredients}
                                                        onIngredientRemove={handleExcludeIngredientRemove}
                                                        title="Exclude Ingredients"
                                                    />
                                                </div>
                                            </div>

                                            <button type="submit"
                                                    className="px-4 py-1 text-sm text-Blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-bule-800 focus:ring-offset-2"
                                                    onClick={handleEditGuest}>Save
                                            </button>
                                            <button type="button"
                                                    className="px-4 py-1 text-sm text-Blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-bule-800 focus:ring-offset-2"
                                                    onClick={() => setEditGuest(null)}>Cancel
                                            </button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <Typography className="text-lg mb-4">Create New Guest</Typography>
                                    <form onSubmit={handleCreateGuest}>
                                        <label>
                                            <Input
                                                size="lg"
                                                label="Guest Name"
                                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-800 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                labelProps={{
                                                    className: "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-800 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-800 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-800 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                                }}
                                                value={newGuestName}
                                                onChange={handleNewGuestNameChange}/>
                                        </label>
                                        <br/>
                                        <button
                                            type="submit"
                                            className="px-4 py-1 text-sm text-Blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-bule-800 focus:ring-offset-2"
                                            onClick={handleCreateGuest}>Create
                                        </button>
                                    </form>
                                </>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default GuestManagement;
