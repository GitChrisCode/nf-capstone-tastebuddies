import {ExtendedIngredients} from "./ExtendedIngredients";
import {AnalyzedInstructions} from "./AnalyzedInstructions";
import {Nutrition} from "./Nutrition";

export type RecipeDetailInformation = {
    id: number;
    title: string;
    image: string;
    imageType: string;
    nutrition: Nutrition;
    instructions: string;
    extendedIngredients: ExtendedIngredients[];
    analyzedInstructions: AnalyzedInstructions[]
};