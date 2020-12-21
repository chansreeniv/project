import * as AuthAction from './auth.actions'
import { User } from "../user.model";

export interface State {
    user: User;
}

const initialstate: State = {
    user: null
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
                user: user
            };
        case AuthAction.LOGOUT:
            return {
                ...state,
                user: null
            };    
    
        default:
            return state;
    }
}