import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from "./LogoutButton";

type Props = {
    id: string;
};

type Steps = {
    number: number;
    step: string;
}

type analyzedInstructions = {
    name: string;
    steps: Steps[];
}

type RecipeDetail = {
    id: number;
    title: string;
    image: string;
    imageType: string;
    instructions: string;
    analyzedInstructions: analyzedInstructions[]

};
function StepList({ steps }: { steps: Steps[] }) {
    return (
        <ul>
            {steps.map((step) => (
                <li key={step.number}>{step.step}</li>
            ))}
        </ul>
    );
}
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
            <h2>Instructions:</h2>
            {recipe.analyzedInstructions.map((instruction, index) => (
                <div key={index}>
                    <h3>{instruction.name}</h3>
                    <StepList steps={instruction.steps} />
                </div>
            ))}

        </div>
    );
}
export default RecipeDetail;