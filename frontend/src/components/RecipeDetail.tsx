import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import LogoutButton from "./LogoutButton";
import {Steps} from "../model/Steps";
import {RecipeDetailInformation} from "../model/RecipeDetailInformation";
import {Typography} from "@material-tailwind/react";

type Props = {
    id: string;
};

function StepList({steps}: { steps: Steps[] }) {
    return (
        <ol className="list-decimal">
            {steps.map((step) => (
                <li key={step.number}>{step.step}</li>
            ))}
        </ol>
    );
}

function RecipeDetail() {
    const {id} = useParams<Props>();
    const [recipe, setRecipe] = useState<RecipeDetailInformation | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/tb/user/recipe/${id}`)
            .then(response => response.data)
            .catch(console.error)
            .then((data: RecipeDetailInformation) => setRecipe(data));
    }, [id]);

    const handleGoBack = () => {
        navigate(-1);
    };

    if (!recipe) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="flex">
                <LogoutButton/>
                <button
                    onClick={handleGoBack}
                    className="px-4 py-1 w-fit text-sm text-Blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-bule-800 focus:ring-offset-2"
                    data-te-ripple-color="light"
                >Go Back
                </button>
            </div>
            <Typography
                className="m-4 block font-sans text-4xl font-semibold leading-tight tracking-normal text-inherit antialiased"
            > {recipe.title}
            </Typography>
            <img className="place-content-center" src={recipe.image} alt={recipe.title}/>
            <Typography
                class="ml-8 m-4 block font-sans text-2xl font-semibold leading-snug tracking-normal text-inherit antialiased"
            >Ingredients:
            </Typography>
            <div className="ml-16">
                <ul className="list-disc">
                    {recipe.extendedIngredients.map((ingredients, index) => (
                        <li key={`ingredient-${index}`}>
                            {Math.ceil(ingredients.measures.metric.amount)} {ingredients.measures.metric.unitShort} {ingredients.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="ml-4">
                <Typography
                    className="m-4 block font-sans text-2xl font-semibold leading-snug tracking-normal text-inherit antialiased">Instructions:</Typography>

                {recipe.analyzedInstructions.map((instruction) => (
                    <div
                        key={instruction.name}
                        className="ml-8">
                        <h3>{instruction.name}</h3>
                        <StepList steps={instruction.steps}/>
                    </div>
                ))}

            </div>
            <div className="ml-4">
                <Typography
                    className="m-4 block font-sans text-2xl font-semibold leading-snug tracking-normal text-inherit antialiased">Nutrients:</Typography>
                <table className="ml-8">
                    <thead>
                    <tr className="">
                        <th align="left">Name</th>
                        <th align="left">Amount</th>
                        <th align="left">Percent of Daily Needs</th>
                    </tr>
                    </thead>
                    <tbody>
                    {recipe.nutrition.nutrients.map((nutrient) => (
                        <tr
                            className=""
                            key={nutrient.name.toString()}>
                            <td>{nutrient.name}</td>
                            <td>{`${nutrient.amount} ${nutrient.unit}`}</td>
                            <td>{nutrient.percentOfDailyNeeds}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RecipeDetail;