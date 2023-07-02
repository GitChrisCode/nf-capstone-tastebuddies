import React, { useState } from 'react';
import ingredientsV2 from '../data/ingredientsV2.json';
import '../css/Autocomplete.css';

interface Ingredient {
    FIELD1: string;
    FIELD2: number;
}

interface AutocompleteProps {
    onIncludeChange: (value: string) => void;
    onExcludeChange: (value: string) => void;
}

const Autocomplete = ({ onIncludeChange, onExcludeChange }: AutocompleteProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Ingredient[]>([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState<Ingredient | null>(null);
    const [ingredientType, setIngredientType] = useState<'include' | 'exclude'>('include');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchTerm(value);

        const filteredSuggestions = ingredientsV2.filter((item) =>
            item.FIELD1.toLowerCase().includes(value.toLowerCase())
        );

        setSuggestions(filteredSuggestions);
    };

    const handleSuggestionClick = (suggestion: Ingredient) => {
        setSelectedSuggestion(suggestion);
        setSearchTerm(suggestion.FIELD1);

        if (ingredientType === 'include') {
            onIncludeChange(suggestion.FIELD1);
        } else {
            onExcludeChange(suggestion.FIELD1);
        }
    };

    const handleIncludeButtonClick = () => {
        setIngredientType('include');
        setSuggestions(ingredientsV2); // Reset suggestions to show all ingredients
    };

    const handleExcludeButtonClick = () => {
        setIngredientType('exclude');
        setSuggestions(ingredientsV2); // Reset suggestions to show all ingredients
    };

    return (
        <div>
            <input type="text" value={searchTerm} onChange={handleChange} />
            <div className="suggestion-grid">
                {suggestions.map((item) => (
                    <div key={item.FIELD2} className="suggestion-item" onClick={() => handleSuggestionClick(item)}>
                        {item.FIELD1}
                    </div>
                ))}
            </div>
            {selectedSuggestion && (
                <div>
                    Ausgewählter Vorschlag: {selectedSuggestion.FIELD1} (ID: {selectedSuggestion.FIELD2})
                </div>
            )}
            <div>
                <button
                    onClick={handleIncludeButtonClick}
                    disabled={ingredientType === 'include'} // Disable button if already selected
                >
                    Include Ingredient
                </button>
                <button
                    onClick={handleExcludeButtonClick}
                    disabled={ingredientType === 'exclude'} // Disable button if already selected
                >
                    Exclude Ingredient
                </button>
            </div>
        </div>
    );
};

export default Autocomplete;
