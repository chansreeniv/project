import { HttpClient } from '@angular/common/http';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import * as RecipesActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => this.http.get<Recipe[]>('https://chansreenivrecipebook.firebaseio.com/recipes.json')),
    map(recipes => new RecipesActions.SetRecipes(
      recipes
        ? recipes.map(recipes => ({ingredients: [], ...recipes}))
        :[]
    ))
  );
    
  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(ofType(RecipesActions.STORE_RECIPES), 
  withLatestFrom(this.store.select('recipes')),
    switchMap( ([actionData, recipesState]) =>{
      return this.http
      .put('https://chansreenivrecipebook.firebaseio.com/recipes.json', recipesState.recipes)
    }))

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}
