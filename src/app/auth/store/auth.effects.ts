import { HttpClient } from "@angular/common/http";
import { Actions, ofType } from "@ngrx/effects";
import { of, pipe } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { AuthResponseData } from "../auth.service";
import * as AuthActions from './auth.actions';

export class AuthEffects {
    constructor(private actions$: Actions, private http: HttpClient){}
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http
            .post<AuthResponseData>(
              'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDi4bf2xmjzbh21q2buzNdYPqJKyG6t46E',
              {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true,
              }
            ).pipe(map(
                resData => {
                    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                    return of(new AuthActions.Login({
                        email: resData.email,
                        userId: resData.localId,
                        token: resData.idToken,
                        expirationDate: expirationDate
                    }))
                }
            ),
                catchError(error => {return of();}),
            )     
        })
        )
}