import React, {useState} from 'react';
import ingredientsV2 from '../data/ingredientsV2.json';
import '../css/Autocomplete.css';
import {
    Card,
    Input,
    List,
    ListItem,
    Button, Typography,
} from "@material-tailwind/react";
import {v4 as uuidv4} from 'uuid';
import {MinusIcon, PlusIcon} from "@heroicons/react/24/solid"

interface Ingredient {
    FIELD1: string;
    FIELD2: number;
}

interface AutocompleteProps {
    onIncludeChange: (value: string) => void;
    onExcludeChange: (value: string) => void;
}

const Autocomplete = ({onIncludeChange, onExcludeChange}: AutocompleteProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Ingredient[]>([]);
    const [includeIngredients, setIncludeIngredients] = useState<string[]>([]);
    const [excludeIngredients, setExcludeIngredients] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setSearchTerm(value);

        const filteredSuggestions = ingredientsV2.filter((item) =>
            item.FIELD1.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const handleSuggestionClick = (type: string, suggestion: Ingredient) => {
        setSearchTerm(suggestion.FIELD1);
        if (type === 'include') {
            setIncludeIngredients([...includeIngredients, suggestion.FIELD1]);
            onIncludeChange(suggestion.FIELD1); // Pass the information to the parent component
        } else {
            setExcludeIngredients([...excludeIngredients, suggestion.FIELD1]);
            onExcludeChange(suggestion.FIELD1); // Pass the information to the parent component
        }
    };
    return (
        <div>
            <Input
                size="lg"
                label="Enter Ingredient"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-800 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                labelProps={{
                    className: "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-800 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-800 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-800 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                }}
                value={searchTerm}
                onChange={handleChange}/>
            <Card className="">
                <List className="grid grid-flow-row auto-rows-max">
                    {suggestions.map((item) => (
                        <ListItem key={uuidv4()} className="rounded-[7px] bg-gray-100 w-auto px-3 py-0.5 pl-4 m-2">
                            <div className="flex flex.auto justify-center items-center">
                                <Button onClick={() => handleSuggestionClick('include', item)}><PlusIcon
                                    className="h-5 w-5 text-green-700 -ml-2"/> </Button>
                                <Button onClick={() => handleSuggestionClick('exclude', item)}><MinusIcon
                                    className="h-5 w-5 text-red-600 -ml-2"/></Button>
                                <Typography size="lg" classsName="">
                                    {item.FIELD1}
                                </Typography>
                            </div>
                        </ListItem>

                    ))}
                </List>
            </Card>
        </div>
    );
};

export default Autocomplete;
