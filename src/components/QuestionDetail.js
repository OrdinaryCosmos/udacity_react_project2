import React, { Component } from 'react'
import { connect } from 'react-redux'
import { answerQuestion } from "../actions/questionActions";

export class QuestionDetail extends Component {

    state = { option: "" }
    submitResult = (e) => {
        e.preventDefault();
        this.props.answerQuestion(this.props.authUser, this.props.match.params.id, this.state.option)
    }
    changeRadio = (e) => {
        this.setState({ option: e.target.value })// set the state according to user's selection.
    }
    render() {
        let { users } = this.props;
        let authUser = users[this.props.authUser];
        let question = this.props.questions[this.props.match.params.id]//define which question to be shown on this page
        let optionOneVotes = question.optionOne.votes.length;
        let optionTwoVotes = question.optionTwo.votes.length;//how many votes for eath option
        let totalVotes = optionOneVotes + optionTwoVotes;
        let optionOnePercentage = (optionOneVotes / totalVotes * 100).toFixed(2)
        let optionTwoPercentage = (optionTwoVotes / totalVotes * 100).toFixed(2)//get each option's votes percentage
        return (authUser.answers.hasOwnProperty(question.id) ? (<div className="questioncard">{/* if the user hasn't answered this question yet, show  the question to let the user anwere it, otherwise, show the poll result */}
            <div className="username"><p>asked by {users[question.author].name}</p></div>
            <div className="img-container">
                <div style={{ backgroundImage: `url(${users[question.author].avatarURL})` }} ></div>
            </div>
            <div className="questiontext">
                <h4>Results</h4>
                <br />
                <div className={`result-breakdown ${authUser.answers[question.id] === "optionOne" ? "active" : ""}`}>
                    <p>
                        Would you rather {question.optionOne.text}?
                        </p>
                    <br />
                    <div className="progress-bar">
                        <div className="progress-percentage" style={{ width: `${optionOnePercentage}%` }}>{optionOnePercentage}&#37;</div>
                    </div>
                    <p className="result-detail">
                        {optionOneVotes} out of {totalVotes}
                    </p>
                </div>
                <div className={`result-breakdown ${authUser.answers[question.id] === "optionTwo" ? "active" : ""}`}>
                    <p>
                        Would you rather {question.optionTwo.text}?
                        </p>
                    <br />
                    <div className="progress-bar">
                        <div className="progress-percentage" style={{ width: `${optionTwoPercentage}%` }}>{optionTwoPercentage}&#37;</div>
                    </div>
                    <p className="result-detail">
                        {optionTwoVotes} out of {totalVotes}
                    </p>
                </div>

            </div>
        </div>) : (
                <div className="questioncard">
                    <div className="username"><p>{users[question.author].name} asks</p></div>
                    <div className="img-container">
                        <div style={{ backgroundImage: `url(${users[question.author].avatarURL})` }} ></div>
                    </div>
                    <div className="questiontext">
                        <h4>WOULD YOU RATHER...</h4>
                        <br />
                        <br />
                        <div className="radio">
                            <label>
                                <input type="radio" value="optionOne" name="option" onChange={this.changeRadio} checked={this.state.option === "optionOne"} />
                                {question.optionOne.text}
                            </label>
                        </div>
                        <br />
                        <div className="radio">
                            <label>
                                <input type="radio" value="optionTwo" name="option" checked={this.state.option === "optionTwo"} onChange={this.changeRadio} />
                                {question.optionTwo.text}
                            </label>
                        </div>
                        <br />
                        <button onClick={this.submitResult}> submit</button>
                    </div>
                </div>)
        )
    }
}

const mapStateToProps = (state) => ({
    authUser: state.authUser,
    questions: state.questions,
    users: state.users

})

const mapDispatchToProps = {
    answerQuestion
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail)
