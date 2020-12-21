import * as AuthAction from './auth.actions'
import { User } from "../user.model";

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialstate: State = {
    user: null,
    authError: null,
    loading: false
}

export function AuthReducer(state = initialstate, action: AuthAction.AuthAction){
    console.log(state);
    
    switch (action.type) {
        case AuthAction.LOGIN:
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
            );
            return{
                ...state,
                user: user,
                authError: null,
                loading: false
            };
        case AuthAction.LOGIN_START:
            return{
                ...state,
                authError: null
            }
            
        case AuthAction.LOGOUT:
            return {
                ...state,
                user: null
            };    
        case AuthAction.LOGIN_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            }    
        default:
            return state;
    }
}