import { LOGIN_USER } from "../actions/types";

const initialState = {
    user: {}, // single user
    validToken: false
}

const booleanActionPayload = (payload) => {
    if(payload) {
        return true;
    }
    return false;
}

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_USER:
            return {
                ...state,
                validToken: booleanActionPayload(action.payload),
                user: action.payload
            };
        // case GET_PROJECT:
        //     return {
        //         ...state,
        //         project: action.payload
        //     };
        // case DELETE_PROJECT:
        //     return {
        //         ...state,
        //         projects: state.projects.filter((project) => 
        //             project.projectIdentifier !== action.payload
        //         )
        //     };
        default:
            return state;
    }
}