import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {Steps} from "../model/Steps";
import {RecipeDetailInformation} from "../model/RecipeDetailInformation";
import {Typography} from "@material-tailwind/react";
import LogoutButton from "./LogoutButton";

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
        <div className="flex flex-col">
            <div className="self-start mt-8">
                <button
                    onClick={handleGoBack}
                    className="mb-2 px-4 py-1 w-fit text-sm text-Blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-bule-800 focus:ring-offset-2"
                    data-te-ripple-color="light"
                >Go Back
                </button>
                <LogoutButton/>
            </div>
            <Typography
                className="text-center block font-sans text-4xl font-semibold leading-tight tracking-normal text-inherit antialiased"
            > {recipe.title}
            </Typography>

            <img className="-mt-40 -mb-40 scale-50" src={recipe.image} alt={recipe.title}/>

            <div className="grid grid-cols-3">
                <div className="ml-10">
                    <p
                        className="text-2xl "
                    >Ingredients:
                    </p>
                    <div className="pl-4">
                        <ul className="list-disc">
                            {recipe.extendedIngredients.map((ingredients, index) => (
                                <li key={`ingredient-${index}`}>
                                    {Math.ceil(ingredients.measures.metric.amount)} {ingredients.measures.metric.unitShort} {ingredients.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="">
                    <table className="border border-fixed table-auto border-slate-500  ml-4">
                        <thead>
                        <tr className="">
                            <th align="left">Nutritional Values</th>
                            <th align="left"></th>
                        </tr>
                        </thead>
                        <tbody >
                        <tr >
                            <td className="border border-slate-600">Calories</td>
                            <td className="border border-slate-600">{recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Calories')?.amount} {recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Calories')?.unit}</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-600">Fat</td>
                            <td  className="border border-slate-600">{recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Fat')?.amount} {recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Fat')?.unit}</td>
                        </tr>
                        <tr className="text-sm">
                            <td  >of which are saturated Fat</td>
                            <td  >{recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Saturated Fat')?.amount} {recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Saturated Fat')?.unit}</td>
                        </tr>
                        <tr>
                            <td  className="border border-slate-600">Carbohydrates</td>
                            <td  className="border border-slate-600">{recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Carbohydrates')?.amount} {recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Carbohydrates')?.unit}</td>
                        </tr>
                        <tr className="text-sm">
                            <td  >of which are sugar</td>
                            <td  >{recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Sugar')?.amount} {recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Sugar')?.unit}</td>
                        </tr>
                        <tr>
                            <td  className="border border-slate-600">Protein</td>
                            <td  className="border border-slate-600">{recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Protein')?.amount} {recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Protein')?.unit}</td>
                        </tr>
                        <tr>
                            <td  className="border border-slate-600">Sodium</td>
                            <td  className="border border-slate-600">{recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Sodium')?.amount} {recipe.nutrition.nutrients.find(nutrient => nutrient.name === 'Sodium')?.unit}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="ml-4">
                <p
                    className="mt-4 ml-4 text-2xl "
                >Instructions:
                </p>

                {recipe.analyzedInstructions.map((instruction) => (
                    <div
                        key={instruction.name}
                        className="ml-10">
                        <h3>{instruction.name}</h3>
                        <StepList steps={instruction.steps}/>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default RecipeDetail;