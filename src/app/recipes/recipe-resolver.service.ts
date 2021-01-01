import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Actions, ofType} from '@ngrx/effects';

import { Recipe } from "../recipes/recipe.model";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as RecipesActions from "./store/recipe.actions";
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private store: Store<fromApp.AppState>, private actions$: Actions){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        this.store.dispatch(new RecipesActions.FetchRecipes());
        return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
    };
}