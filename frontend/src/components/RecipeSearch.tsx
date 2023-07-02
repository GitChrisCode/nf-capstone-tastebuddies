import React, {FormEvent, useState} from 'react';
import LogoutButton from './LogoutButton';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Autocomplete from './Autocomplete';
import IngredientsList from "./Ingredients";
import '../css/RecipeSearch.css';

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

    function searchSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const queryParams = new URLSearchParams();
        queryParams.append('includeIngredients', includeIngredients.join(','));
        queryParams.append('excludeIngredients', excludeIngredients.join(','));
        const searchQuery = queryParams.toString();

        axios
            .get('/tb/user/recipesearch?' + searchQuery)
            .then(response => response.data)
            .catch(console.error)
            .then((data: RecipesResponse) => {
                setRecipesSearchResult(data.results);
                setTotalResults(data.totalResults);
            });
    }

    return (
        <div>
            <h1>Search Recipe:</h1>
            <form onSubmit={searchSubmit}>
                <p>Enter Ingredients:</p>
                <Autocomplete onIncludeChange={handleIncludeChange} onExcludeChange={handleExcludeChange}/>
                <button type="submit">Search</button>
            </form>
            <div>
                <IngredientsList
                    ingredients={includeIngredients}
                    onIngredientRemove={onIncludeIngredientRemove}
                    title="Include Ingredients"
                />
                <IngredientsList
                    ingredients={excludeIngredients}
                    onIngredientRemove={onExcludeIngredientRemove}
                    title="Exclude Ingredients"
                />
            </div>
            <LogoutButton/>
            <h2>Search Results:</h2>
            <p>Total Results: {totalResults}</p>
            {recipesSearchResult.length > 0 ? (
                <div className="grid-container">
                    {recipesSearchResult.map(recipe => (
                        <div key={recipe.id} className="grid-item">
                            <Link to={`/recipe/${recipe.id}`}>
                                <img src={recipe.image} alt={recipe.title}/>
                                <h3>{recipe.title}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No recipes found.</p>
            )}
        </div>
    );
}

export default RecipeSearch;
