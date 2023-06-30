import React from 'react';
import '../css/IngredientsList.css';
import { v4 as uuidv4 } from 'uuid';

interface IngredientsListProps {
    includeIngredients: string[];
    excludeIngredients: string[];
    onIncludeIngredientRemove: (ingredient: string) => void;
    onExcludeIngredientRemove: (ingredient: string) => void;
}

const IngredientsList: React.FC<IngredientsListProps> = ({
                                                             includeIngredients,
                                                             excludeIngredients,
                                                             onIncludeIngredientRemove,
                                                             onExcludeIngredientRemove,
                                                         }) => {
    const handleIncludeIngredientRemove = (ingredient: string) => {
        onIncludeIngredientRemove(ingredient);
    };

    const handleExcludeIngredientRemove = (ingredient: string) => {
        onExcludeIngredientRemove(ingredient);
    };

    return (
        <div className="ingredients-list-container">
            <div className="ingredients-list">
                <h2>Include Ingredients:</h2>
                <ul>
                    {includeIngredients.map((ingredient)=> (
                        <li key={uuidv4()} onClick={() => handleIncludeIngredientRemove(ingredient)}>
                            {ingredient}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="ingredients-list">
                <h2>Exclude Ingredients:</h2>
                <ul>
                    {excludeIngredients.map((ingredient) => (
                        <li key={uuidv4()} onClick={() => handleExcludeIngredientRemove(ingredient)}>
                            {ingredient}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default IngredientsList;
