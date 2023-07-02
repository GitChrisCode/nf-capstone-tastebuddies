import React from 'react';
import { v4 as uuidv4 } from 'uuid';

type IngredientsListProps = {
    ingredients: string[];
    onIngredientRemove: (value: string) => void;
    title: string;
};

const IngredientsList: React.FC<IngredientsListProps> = ({
                                                             ingredients,
                                                             onIngredientRemove,
                                                             title,
                                                         }) => (
    <div>
        <h3>{title}</h3>
        {ingredients.map((ingredient) => (
            <div key={uuidv4()}>
                {ingredient}
                <button onClick={() => onIngredientRemove(ingredient)}>Remove</button>
            </div>
        ))}
    </div>
);

export default IngredientsList;
