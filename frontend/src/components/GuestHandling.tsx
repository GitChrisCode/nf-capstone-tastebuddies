import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Guest } from '../model/Guest';
import { Checkbox } from '@material-tailwind/react';

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
            {filteredGuestList.map((guest) => (
                <div className="m-4" key={guest.guestID}>
                    <Checkbox
                        label={guest.guestName}
                        value={guest.guestID}
                        checked={checkboxState[guest.guestID]}
                        onChange={handleCheckboxChange}
                    />
                </div>
            ))}
            <button onClick={handleCopyIngredients}>Copy Ingredients</button>
        </>
    );
}

export default GuestHandling;
