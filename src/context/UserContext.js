import React, { useContext, useReducer } from "react";
import {
    addUser,
    addErrors,
    getUsers, setUpdate,
} from "../actions/UserActions";
import UserReducer from "../reducers/UserReducer";
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

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);

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
        <UserContext.Provider
            value={{
                ...state,
                handleAddUser,
                handleErrors,
                handleGetUsers,
                handleSetUpdate,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};

export { UserContext, UserProvider };