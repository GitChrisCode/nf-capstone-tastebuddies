import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {TrashIcon} from "@heroicons/react/24/solid";
import {Card, CardBody, Typography} from '@material-tailwind/react';


type IngredientsListProps = {
    ingredients: string[];
    onIngredientRemove: (value: string) => void;
    title: string;
};

const IngredientsList: React.FC<IngredientsListProps> = ({
                                                             ingredients,
                                                             onIngredientRemove,
                                                             title,
                                                         }) => {
    return (

        <div>
            <Card>
                <Typography
                    className="ml-2 mb-1 bg-gray-200 border-gray-300 rounded-[7px] divide-solid divide-blue-400">
                    {title}
                </Typography>
                <CardBody key={uuidv4()} className="mt-6 w-60">
                    {ingredients.map((ingredient) => (
                        <Typography size="lg" className="-ml-10 justify-center items-center">
                            <button onClick={() => onIngredientRemove(ingredient)}><TrashIcon className="h-5 w-5 ml-10"
                                                                                              color="black"/></button>
                            {ingredient}
                        </Typography>
                    ))}
                </CardBody>

            </Card>
        </div>

    );
}
export default IngredientsList;
