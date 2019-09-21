export const LOGIN = "login";
export const LOGOUT = "logout";

export const login = (userID) => {
    return {
        type: LOGIN,
        payload: userID
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

