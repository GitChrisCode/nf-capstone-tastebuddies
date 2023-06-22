package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecipeInformation {
    private Integer id;
    private String title;
    private String image;
    private String imageType;
    private Integer servings;
    private Integer readyInMinutes;
    private String license;
    private String sourceName;
    private String sourceURL;
    private String spoonacularSourceURL;
    private Integer aggregateLikes;
    private Double healthScore;
    private Double spoonacularScore;
    private Double pricePerServing;
    private Boolean cheap;
    private String creditsText;
    private String[] cuisines;
    private Boolean dairyFree;
    private String[] diets;
    private String gaps;
    private Boolean glutenFree;
    private String instructions;
    private AnalyzedInstructions[] analyzedInstructions;
    private Boolean ketogenic;
    private Boolean lowFodmap;
    private String[] occasions;
    private Boolean sustainable;
    private Boolean vegan;
    private Boolean vegetarian;
    private Boolean veryHealthy;
    private Boolean veryPopular;
    private Boolean whole30;
    private Integer weightWatcherSmartPoints;
    private String[] dishTypes;
}
