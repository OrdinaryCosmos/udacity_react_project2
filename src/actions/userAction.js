import { _getUsers } from "../_DATA";

export const USERANSWER = "USERanswer";
export const USERCREATE = "USERadd";
export const INITIATEUSER = "setUSER"


export const initiateSetUsers = () => {
    return (dispatch) => {
        _getUsers().then((users) => {
            dispatch({ type: INITIATEUSER, payload: users })
        })
    }
}

export const userAnswer = (userID) => {
    return {
        type: USERANSWER,
        payload: userID
    }
}



