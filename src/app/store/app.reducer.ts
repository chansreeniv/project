import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";
import * as fromAuth from "../auth/store/auth.reducer"

import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
    shoppinglist: fromShoppingList.State;
    auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppinglist: fromShoppingList.ShoppingListReducer,
    auth: fromAuth.AuthReducer
}