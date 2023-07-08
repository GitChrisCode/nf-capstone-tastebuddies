import React, {FormEvent, useEffect, useState} from 'react';
import LogoutButton from './LogoutButton';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Autocomplete from './Autocomplete';
import IngredientsList from "./Ingredients";
import '../css/RecipeSearch.css';
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import GuestHandling from "./GuestHandling";

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

    const handleCopyIngredients = (includeIngredients: string[], excludeIngredients: string[]) => {
        setUniqueIncludeIngredients(includeIngredients);
        setUniqueExcludeIngredients(excludeIngredients);
        handleMergeIngredients();
    };
    const handleIncludeChange = (value: string) => {
        setIncludeIngredients([...includeIngredients, value]);
    };

    const handleExcludeChange = (value: string) => {
        setExcludeIngredients([...excludeIngredients, value]);
    };
    const onIncludeIngredientRemove = (value: string) => {
        const updatedIngredients = includeIngredients.filter((ingredient) => ingredient !== value);
        setIncludeIngredients(updatedIngredients);
    };

    const onExcludeIngredientRemove = (value: string) => {
        const updatedIngredients = excludeIngredients.filter((ingredient) => ingredient !== value);
        setExcludeIngredients(updatedIngredients);
    };
    const handleMergeIngredients = () => {
        const mergedIncludeIngredients = [...includeIngredients, ...uniqueIncludeIngredients].filter(
            (ingredient, index, self) => self.indexOf(ingredient) === index
        );
        const mergedExcludeIngredients = [...excludeIngredients, ...uniqueExcludeIngredients].filter(
            (ingredient, index, self) => self.indexOf(ingredient) === index
        );
        setMergedIncludeIngredients(mergedIncludeIngredients);
        setMergedExcludeIngredients(mergedExcludeIngredients);
    }

    function searchSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const queryParams = new URLSearchParams();
        queryParams.append('includeIngredients', includeIngredients.join(','));
        queryParams.append('excludeIngredients', excludeIngredients.join(','));
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
        handleMergeIngredients();
    }, [includeIngredients, excludeIngredients, uniqueIncludeIngredients, uniqueExcludeIngredients]);

    return (
        <div>
            <h1>Search Recipe:</h1>
            <form onSubmit={searchSubmit}>
                <GuestHandling
                    onCopyIngredients={handleCopyIngredients}
                    uniqueIncludeIngredients={uniqueIncludeIngredients}
                    uniqueExcludeIngredients={uniqueIncludeIngredients}/>
                <p>Enter Ingredients:</p>
                <Autocomplete onIncludeChange={handleIncludeChange} onExcludeChange={handleExcludeChange}/>
                <button type="submit">Search</button>
            </form>
            <div className="flex flex-wrap flex-row">
                <div>
                    <IngredientsList
                        ingredients={mergedIncludeIngredients}
                        onIngredientRemove={onIncludeIngredientRemove}
                        title="Include Ingredients"
                    />
                </div>
                <div>
                    <IngredientsList
                        ingredients={mergedExcludeIngredients}
                        onIngredientRemove={onExcludeIngredientRemove}
                        title="Exclude Ingredients"
                    />
                </div>
            </div>

            <Typography variant="h3">Search Results:</Typography>
            <p>Total Results: {totalResults}</p>
            {recipesSearchResult.length > 0 ? (
                    <div className="grid-container">
                        {recipesSearchResult.map(recipe => (
                                <div className="grid-item"                                >
                                    <Card className="mt-6 w-96">
                                        <CardHeader color="blue-gray" className="relative h-56">
                                            <Link to={`/recipe/${recipe.id}`}>
                                            <img src={recipe.image} alt={recipe.title} className="h-full w-full rounded-lg" />
                                            </Link>
                                        </CardHeader>
                                        <CardBody>
                                            <Typography variant="h5" color="blue-gray" className="mb-2">
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
                    <p>No recipes found.</p>
                )
            }

            <LogoutButton/>

        </div>
    );
}

export default RecipeSearch;