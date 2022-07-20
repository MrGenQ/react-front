import {
    ADD_USER,
    ADD_ERRORS, GET_USERS, SET_UPDATE,
} from "../actions/types";
const AppReducer = (state, action)=>{
    switch(action.type){
        case ADD_USER:
            return {
                ...state,
                user: action.payload,
            }
        case ADD_ERRORS:
            return {
                ...state,
                errors: action.payload
            }
        case GET_USERS:
            return {
                ...state,
                allUsers: action.payload
            }
        case SET_UPDATE:
            return {
                ...state,
                update: action.payload
            }
        default:
            return state;
    }
}
export default AppReducer