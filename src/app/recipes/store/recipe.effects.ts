import { HttpClient } from '@angular/common/http';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import * as RecipesActions from './recipe.actions';
import { Recipe} from '../recipe.model';

@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(()=> {
            return this.http
            .get<Recipe[]>(
              'https://chansreenivrecipebook.firebaseio.com/recipes.json'
            )
        }),map((recipes) => {
            return recipes.map((recipe) => {
              return {
                //returning the ingredient as empty data to firebase, (firebase requirement)
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : [],
              };
            });
          }),
          map(recipes => {
            return new RecipesActions.SetRecipes(recipes);  
          })
        );


    constructor(private actions$: Actions, private http: HttpClient){}
}