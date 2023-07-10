import React, {FormEvent, useEffect, useState} from 'react';
import LogoutButton from './LogoutButton';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Autocomplete from './Autocomplete';
import IngredientsList from "./Ingredients";
import '../css/RecipeSearch.css';
import { v4 as uuidv4 } from 'uuid';
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import GuestHandling from "./GuestHandling";
import NavigationBar from "./NavigationBar";


type Recipes = {
    id: number;
    title: string;
    image: string;
    imageType: string;
};

type RecipesResponse = {
    results: Recipes[];
    offset: number;
    number: number;
    totalResults: number;
};

function RecipeSearch() {
    const [includeIngredients, setIncludeIngredients] = useState<string[]>([]);
    const [excludeIngredients, setExcludeIngredients] = useState<string[]>([]);
    const [recipesSearchResult, setRecipesSearchResult] = useState<Recipes[]>([]);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [uniqueIncludeIngredients, setUniqueIncludeIngredients] = useState<string[]>([]);
    const [uniqueExcludeIngredients, setUniqueExcludeIngredients] = useState<string[]>([]);
    const [mergedIncludeIngredients, setMergedIncludeIngredients] = useState<string[]>([]);
    const [mergedExcludeIngredients, setMergedExcludeIngredients] = useState<string[]>([]);

    const handleCopyIngredients = (copyIncludeIngredients: string[], copyExcludeIngredients: string[]) => {
        setUniqueIncludeIngredients(copyIncludeIngredients);
        setUniqueExcludeIngredients(copyExcludeIngredients);
    };
    const handleIncludeChange = (value: string) => {
        setIncludeIngredients([...includeIngredients, value]);
    };

    const handleExcludeChange = (value: string) => {
        setExcludeIngredients([...excludeIngredients, value]);
    };
    const onIncludeIngredientRemove = (value: string) => {
        const updatedIngredients = includeIngredients.filter((ingredient) => ingredient !== value);
        setIncludeIngredients([...updatedIngredients]);
        const updatedUniqueIncludeIngredients = uniqueIncludeIngredients.filter((ingredient) => ingredient !== value);
        setUniqueIncludeIngredients([...updatedUniqueIncludeIngredients]);
        setUniqueIncludeIngredients(updatedUniqueIncludeIngredients);
    };

    const onExcludeIngredientRemove = (value: string) => {
        const updatedIngredients = excludeIngredients.filter(ingredient => ingredient !== value);
        setExcludeIngredients(updatedIngredients);

        const updatedUniqueExcludeIngredients = uniqueExcludeIngredients.filter(
            ingredient => ingredient !== value
        );
        setUniqueExcludeIngredients(updatedUniqueExcludeIngredients);
    };


    function searchSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const queryParams = new URLSearchParams();
        queryParams.append('includeIngredients', mergedIncludeIngredients.join(','));
        queryParams.append('excludeIngredients', mergedExcludeIngredients.join(','));
        const searchQuery = queryParams.toString();

        const maxRetryAttempts = 2;
        let retryCount = 0;

        const executeGetRequest = () => {
            axios
                .get('/tb/user/recipesearch?' + searchQuery)
                .then(response => response.data)
                .then((data: RecipesResponse) => {
                    setRecipesSearchResult(data.results);
                    setTotalResults(data.totalResults);
                })
                .catch(error => {
                    if (error.response && error.response.status === 500) {
                        if (retryCount < maxRetryAttempts) {
                            retryCount++;
                            setTimeout(() => {
                                executeGetRequest();
                            }, 1000);
                        } else {
                            console.error('Max retry attempts reached. Unable to retrieve data.');
                        }
                    } else {
                        console.error(error);
                    }
                });
        };
        executeGetRequest();
    }
    useEffect(() => {
        const mergedIncludeIngredients = [...includeIngredients, ...uniqueIncludeIngredients];
        const mergedExcludeIngredients = [...excludeIngredients, ...uniqueExcludeIngredients];
        setMergedIncludeIngredients(mergedIncludeIngredients);
        setMergedExcludeIngredients(mergedExcludeIngredients);
    }, [includeIngredients, excludeIngredients, uniqueIncludeIngredients, uniqueExcludeIngredients]);

    return (
        <section className="h-screen">
            <div className="flex h-full justify-center">
                <div className="grid">
                    <div>
                        <NavigationBar/>
                    </div>
                    <div>
                        <Typography variant="h4" className="mt-3 text-gray-500 mb-2">Recipe Search</Typography>
                    </div>
                    <div>
                        <GuestHandling
                            onCopyIngredients={handleCopyIngredients}
                            uniqueIncludeIngredients={uniqueIncludeIngredients}
                            uniqueExcludeIngredients={uniqueExcludeIngredients}/>
                    </div>
                    <div>
                        <form onSubmit={searchSubmit} className="w-96">
                            <Autocomplete onIncludeChange={handleIncludeChange} onExcludeChange={handleExcludeChange}/>
                            <button
                                type="submit"
                                className="px-4 py-1 w-fit text-sm text-Blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-bule-800 focus:ring-offset-2"
                                data-te-ripple-color="light"
                            >Recipe Search
                            </button>
                        </form>
                    </div>
                    <div className="flex flex-wrap flex-row columns-2 items-start">
                        <div className="mr-2">
                            <IngredientsList
                                ingredients={mergedIncludeIngredients}
                                onIngredientRemove={onIncludeIngredientRemove}
                                title="Include Ingredients"
                            />
                        </div>
                        <div className="">
                            <IngredientsList
                                ingredients={mergedExcludeIngredients}
                                onIngredientRemove={onExcludeIngredientRemove}
                                title="Exclude Ingredients"
                            />
                        </div>
                    </div>

                    <Typography className="text-gray-500 text-xl">Search Results:</Typography>
                    <p>Total Results: {totalResults}</p>
                    {recipesSearchResult.length > 0 ? (
                            <div className="flex flex-wrap flex-row m-2">
                                {recipesSearchResult.map(recipe => (
                                        <div key={uuidv4()} className="">
                                            <Card className="mt-6 mr-1 w-96">
                                                <CardHeader color="blue-gray" className="relative h-56">
                                                    <Link to={`/recipe/${recipe.id}`}>
                                                        <img src={recipe.image} alt={recipe.title}
                                                             className="h-full w-full rounded-lg"/>
                                                    </Link>
                                                </CardHeader>
                                                <CardBody>
                                                    <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
                                                        {recipe.title}
                                                    </Typography>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    )
                                )
                                }
                            </div>
                        )
                        : (
                            <p className="mb-2">No recipes found.</p>
                        )
                    }
                    <LogoutButton/>
                </div>
            </div>
        </section>
    );
}

export default RecipeSearch;