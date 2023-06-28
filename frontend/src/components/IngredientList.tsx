import React from 'react';
import '../css/IngredientList.css';

interface IngredientsListProps {
    includeIngredients: string[];
    excludeIngredients: string[];
}

const IngredientsList: React.FC<IngredientsListProps> = ({
                                                             includeIngredients,
                                                             excludeIngredients,
                                                         }) => {
    return (
        <div className="ingredients-list-container">
            <div className="ingredients-list">
                <h2>Include Ingredients:</h2>
                <ul>
                    {includeIngredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>
            <div className="ingredients-list">
                <h2>Exclude Ingredients:</h2>
                <ul>
                    {excludeIngredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default IngredientsList;
