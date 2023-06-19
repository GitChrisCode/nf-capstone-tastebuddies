import React, {FormEvent, useState} from 'react';
import LogoutButton from "./LogoutButton";
import axios from "axios";

type Recipes = {
    id: number,
    title: string,
    image: string,
    imageType: string

}

function RecipeSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const [recipesSearchResult, setRecipesSearchResult] = useState<Recipes[]>([]);
    function searchSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios.get("/tb/user/recipes/complexSearch?query=" + searchQuery)
            .then(response => response.data)
            .catch(console.error)
            .then((data) => setRecipesSearchResult(data.results))
    }

        return (
            <div>
             <h1>Search Recipe:</h1>
                <form onSubmit={searchSubmit}>
                    <p>Enter Ingredients:</p>
                    <input type="text" onChange={(e)=> setSearchQuery(e.target.value)}/>
                </form>
                <LogoutButton/>
            </div>
        );

}

export default RecipeSearch;