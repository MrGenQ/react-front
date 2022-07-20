import React, { useContext, useReducer } from "react";
import {
    addUser,
    addErrors,
    getUsers, setUpdate,
} from "../actions/AppActions";
import AppReducer from "../reducers/AppReducer";
import {
    userStorage,
    allUsersStorage,
} from "./constants";
let initialState = {
    user: "",
    errors: "",
    allUsers: "",
    update: "",
};

if (userStorage !== null) {
    initialState = {
        user: userStorage,
        errors: "",
        allUsers: allUsersStorage,
        update: "",
    };
}

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const handleAddUser = (token) => {
        dispatch(addUser(token));
    };
    const handleErrors = (data) => {
        dispatch(addErrors(data));
    };
    const handleGetUsers = (data) => {
        dispatch(getUsers(data))
    }
    const handleSetUpdate = (data) => {
        dispatch(setUpdate(data))
    }
    return (
        <AppContext.Provider
            value={{
                ...state,
                handleAddUser,
                handleErrors,
                handleGetUsers,
                handleSetUpdate,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };