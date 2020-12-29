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
};

export function authReducer(
	state = initialstate,
	action: AuthAction.AuthAction
) {
    switch (action.type) {
        case AuthAction.AUTHENTICATE_SUCCESS:
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
        case AuthAction.SIGNUP_START:    
            return{
                ...state,
                authError: null,
                loading: true
            };
            
        case AuthAction.LOGOUT:
            return {
                ...state,
                user: null
            };    
        case AuthAction.AUTHENTICATE_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            };   
        case AuthAction.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            }   
        default:
            return state;
    }
}
