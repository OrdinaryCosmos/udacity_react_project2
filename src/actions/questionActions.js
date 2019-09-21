import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../_DATA';

export const ANSWER = "answer";
export const CREATE = "add";
export const INITIATE = "initiate";


export const answerQuestion = (userID, questionID, answer) => {
    return (dispatch) => {
        _saveQuestionAnswer({ authedUser: userID, qid: questionID, answer: answer }).then(() => {// the backend uses a different name for each field, so a little modification is needed. 
            dispatch({ type: ANSWER, payload: { userID, questionID, answer } })
        })
    }
}

export const createQuestion = (newquestion) => {// createquesiton is an asynchrounous function for backend, so I need to wrap it in a function.
    return (dispatch) => {
        _saveQuestion(newquestion).then((newQ) => {
            dispatch({ type: CREATE, payload: newQ })
        })
    }
}


export const initialSetQuestion = () => {
    return (dispatch) => {
        _getQuestions().then((quesitons) => { dispatch({ type: INITIATE, payload: quesitons }) })
    }
}
