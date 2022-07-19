import {
    ADD_USER,
    ADD_ERRORS, GET_USERS, SET_UPDATE,
} from "./types";

export const addUser = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    return {
        type: ADD_USER,
        payload: data,
    };
};
export const addErrors = (data) => {
    return{
        type: ADD_ERRORS,
        payload: data,
    }
}
export const getUsers = (data) => {
    localStorage.setItem("allUsers", JSON.stringify(data));
    return{
        type: GET_USERS,
        payload: data,
    }
}
export const setUpdate = (data) => {
    return{
        type: SET_UPDATE,
        payload: data,
    }
}