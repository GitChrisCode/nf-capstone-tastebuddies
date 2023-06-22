import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from "./LogoutButton";

type Props = {
    id: string;
};

type RecipeDetail = {
    id: number;
    title: string;
    image: string;
    imageType: string;
    instructions: string;

};

function RecipeDetail() {
    const { id } = useParams<Props>();
    const [recipe, setRecipe] = useState<RecipeDetail | null>(null);

    useEffect(() => {
        axios
            .get(`/tb/user/recipe/${id}`)
            .then(response => response.data)
            .catch(console.error)
            .then((data: RecipeDetail) => setRecipe(data));
    }, [id]);

    if (!recipe) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <LogoutButton/>
            <h1>{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} />
            <p>{recipe.instructions}</p>

        </div>
    );
}
export default RecipeDetail;