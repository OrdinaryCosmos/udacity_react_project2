import { LOGIN, LOGOUT } from "../actions/authUserActions";
import { ANSWER, CREATE, INITIATE } from "../actions/questionActions";
import { INITIATEUSER } from "../actions/userAction";
import { combineReducers } from "redux";

const authUserReducer = (state = null, action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload;
        case LOGOUT:
            return null // if no one logged in,then the state is null. 
        default:
            return state;
    }
}

const questionReducer = (state = {}, action) => {
    switch (action.type) {
        case INITIATE:
            state = action.payload;
            return state;
        case ANSWER:
            let { questionID: qid, userID: authedUser, answer } = action.payload;
            state = {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authedUser])
                    }
                }
            }
            return state;

        case CREATE:
            return { ...state, [action.payload.id]: action.payload }

        default:
            return state
    }
}


const userReducer = (state = {}, action) => {
    switch (action.type) {
        case INITIATEUSER:
            return action.payload;

        case ANSWER:
            let { questionID: qid, userID: authedUser, answer } = action.payload;
            state = {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }
            }
            return state;

        case CREATE:
            let authUser = action.payload.author;
            state = {
                ...state,
                [authUser]: {
                    ...state[authUser],
                    questions: state[authUser].questions.concat([action.payload.id])
                }
            }
            return state;

        default:
            return state
    }
}


export default combineReducers({ authUser: authUserReducer, questions: questionReducer, users: userReducer });