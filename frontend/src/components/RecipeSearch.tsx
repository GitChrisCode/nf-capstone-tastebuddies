import React, { FormEvent, useState } from 'react';
import LogoutButton from './LogoutButton';
import axios from 'axios';
import { Link } from 'react-router-dom'
import '../css/RecipeSearch.css'

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
}

function RecipeSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [recipesSearchResult, setRecipesSearchResult] = useState<Recipes[]>([]);
    const [totalResults, setTotalResults] = useState<number>(0);

    function searchSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios
            .get('/tb/user/recipesearch?query=' + searchQuery)
            .then(response => response.data)
            .catch(console.error)
            .then((data: RecipesResponse) => {
                setRecipesSearchResult(data.results);
                setTotalResults(data.totalResults)
            });
    }

    return (
        <div>
            <h1>Search Recipe:</h1>
            <form onSubmit={searchSubmit}>
                <p>Enter Ingredients:</p>
                <input type="text" onChange={e => setSearchQuery(e.target.value)} />
                <button>Search</button>
            </form>
            <LogoutButton />
            <h2>Search Results:</h2>
            <p>Total Results: {totalResults}</p>
            {recipesSearchResult.length > 0 ? (
                <div className="grid-container">
                    {recipesSearchResult.map(recipe => (
                        <div key={recipe.id} className="grid-item">
                            <Link to={`/recipe/${recipe.id}`}>
                                <img src={recipe.image} alt={recipe.title} />
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
