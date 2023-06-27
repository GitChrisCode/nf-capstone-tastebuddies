import React, {useState} from 'react';
import ingredientsV2 from '../data/ingredientsV2.json'
import '../css/Autocomplete.css';
interface Ingredient {
    FIELD1: string;
    FIELD2: number;
}

const Autocomplete = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Ingredient[]>([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState<Ingredient | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchTerm(value);

        // Filtere die Vorschläge basierend auf dem eingegebenen Suchbegriff
        const filteredSuggestions = ingredientsV2.filter((item) =>
            item.FIELD1.toLowerCase().includes(value.toLowerCase())
        );

        setSuggestions(filteredSuggestions);
    };

    const handleSuggestionClick = (suggestion: Ingredient) => {
        setSelectedSuggestion(suggestion);
        setSearchTerm(suggestion.FIELD1); // Setze den ausgewählten Vorschlag als Suchbegriff
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
        </div>
    );
};

export default Autocomplete;
