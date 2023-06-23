import {ExtendedIngredients} from "./ExtendedIngredients";
import {AnalyzedInstructions} from "./AnalyzedInstructions";

export type RecipeDetailInformation = {
    id: number;
    title: string;
    image: string;
    imageType: string;
    instructions: string;
    extendedIngredients: ExtendedIngredients[];
    analyzedInstructions: AnalyzedInstructions[]
};