import {Action} from './action';

export interface TokenState {
    tokens: string;
}
const inicialState = {
    tokens: ""
};

export const tokensReducer = (state: TokenState = inicialState, action: Action) => {
    switch (action.type) {
        case "ADD_TOKEN": {
            return { tokens: action.payload }
        }
        default:
            return state;
    }
}