import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';


@Injectable({ providedIn: 'root' })
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService,
    private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://chansreenivrecipebook.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
    .get<Recipe[]>(
        'https://chansreenivrecipebook.firebaseio.com/recipes.json'
      )
      .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return { //returning the ingredient as empty data to firebase, (firebase requirement)
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
    
  } 
  
}
