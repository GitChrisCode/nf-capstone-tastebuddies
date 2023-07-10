import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Guest} from '../model/Guest';
import {Typography} from "@material-tailwind/react";


type Props = {
    onCopyIngredients: (includeIngredients: string [], excludeIngredients: string[]) => void;
    uniqueIncludeIngredients: string[];
    uniqueExcludeIngredients: string[];
}

function GuestHandling({onCopyIngredients}: Props) {
    const [guestList, setGuestList] = useState<Guest[]>([]);
    const [checkboxState, setCheckboxState] = useState<{ [key: string]: boolean }>({});
    const filteredGuestList = guestList.filter((guest) => localStorage.getItem('user') === guest.userName);

    useEffect(() => {
        fetchGuestList();
    }, []);

    const fetchGuestList = () => {
        axios
            .get<Guest[]>('/tb/user/guest')
            .then((response) => {
                setGuestList(response.data);
                // Set initial checkbox state based on the guest list
                const initialCheckboxState: { [key: string]: boolean } = {};
                response.data.forEach((guest) => {
                    initialCheckboxState[guest.guestID] = false; // Set all checkboxes initially unchecked
                });
                setCheckboxState(initialCheckboxState);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const guestID = event.target.value;
        const isChecked = event.target.checked;
        console.log("GuestID: ",guestID, "Status: ", isChecked)
        setCheckboxState((prevState) => ({
            ...prevState,
            [guestID]: isChecked,
        }));
    };


    const handleCopyIngredients = () => {
        const includeIngredientsList: string[] = [];
        const excludeIngredientsList: string[] = [];

        filteredGuestList.forEach((guest) => {
            if (checkboxState[guest.guestID]) {
                includeIngredientsList.push(...guest.includeIngredients);
                excludeIngredientsList.push(...guest.excludeIngredients);
            }
        });

        // @ts-ignore
        const uniqueIncludeIngredients = [...new Set(includeIngredientsList)];
        // @ts-ignore
        const uniqueExcludeIngredients = [...new Set(excludeIngredientsList)];

        // Do something with the unique ingredient lists
        console.log('Unique Include Ingredients:', uniqueIncludeIngredients);
        console.log('Unique Exclude Ingredients:', uniqueExcludeIngredients);
        onCopyIngredients(uniqueIncludeIngredients, uniqueExcludeIngredients);
    };

    return (
        <>
            <div>
                <Typography
                    className="text-lg">
                    Select your buddies:
                </Typography>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">

                {filteredGuestList.map((guest) => (
                    <div className="m-4" key={guest.guestID}>
                        <div className="inline-flex items-center">
                            <div className="relative flex cursor-pointer items-center rounded-full p-3">
                                <input
                                    id={guest.guestID}
                                    type="checkbox"
                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-700 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                                    value={guest.guestID}
                                    checked={checkboxState[guest.guestID] || false}
                                    onChange={handleCheckboxChange}
                                />
                                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3.5 w-3.5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            <label
                                htmlFor={guest.guestID}
                                className="mt-px cursor-pointer select-none font-light text-gray-700"
                            >
                                {guest.guestName}
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="mb-5 px-4 py-1 text-sm text-Blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-bule-800 focus:ring-offset-2"
                data-te-ripple-color="light"
                onClick={handleCopyIngredients}>Copy Ingredients</button>
        </>
    );
}

export default GuestHandling;