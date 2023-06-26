import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import LogoutButton from "./LogoutButton";
import {Steps} from "../model/Steps";
import {RecipeDetailInformation} from "../model/RecipeDetailInformation";

type Props = {
    id: string;
};

function StepList({steps}: { steps: Steps[] }) {
    return (
        <ol>
            {steps.map((step) => (
                <li key={step.number}>{step.step}</li>
            ))}
        </ol>
    );
}

function RecipeDetail() {
    const {id} = useParams<Props>();
    const [recipe, setRecipe] = useState<RecipeDetailInformation | null>(null);

    useEffect(() => {
        axios
            .get(`/tb/user/recipe/${id}`)
            .then(response => response.data)
            .catch(console.error)
            .then((data: RecipeDetailInformation) => setRecipe(data));
    }, [id]);

    if (!recipe) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <LogoutButton/>
            <h1>{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title}/>
            <h2>Ingredients:</h2>
            <ul>
                {recipe.extendedIngredients.map((ingredients, index) => (
                    <li key={`ingredient-${index}`}>
                        {Math.ceil(ingredients.measures.metric.amount)} {ingredients.measures.metric.unitShort} {ingredients.name}
                    </li>
                ))}
            </ul>
            <h2>Instructions:</h2>
                {recipe.analyzedInstructions.map((instruction) => (
                    <div key={instruction.name}>
                        <h3>{instruction.name}</h3>
                        <StepList steps={instruction.steps}/>
                    </div>
                ))}
            <h2>Nutrients:</h2>
            <table>
                <thead>
                <tr>
                    <th align="left">Name</th>
                    <th align="left">Amount</th>
                    <th align="left">Percent of Daily Needs</th>
                </tr>
                </thead>
                <tbody>
                {recipe.nutrition.nutrients.map((nutrient) => (
                    <tr key={nutrient.name.toString()}>
                        <td>{nutrient.name}</td>
                        <td>{`${nutrient.amount} ${nutrient.unit}`}</td>
                        <td>{nutrient.percentOfDailyNeeds}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecipeDetail;