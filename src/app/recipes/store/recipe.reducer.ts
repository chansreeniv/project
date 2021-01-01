import { Recipe } from "../recipe.model";
import * as RecipeActions  from './recipe.actions';

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: null
}

export function recipeReducer(state, action: RecipeActions.RecipeActions){
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        default:
            return state;
    }
}