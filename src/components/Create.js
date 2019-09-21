import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createQuestion } from "../actions/questionActions";
import { Redirect } from "react-router-dom";

class Create extends Component {

    state = { hasCreated: false }// state decides if the "has created"message shows up

    componentDidUpdate(prevProps) {

        if (Object.keys(this.props.questions).length - Object.keys(prevProps.questions).length === 1) {
            this.setState({ hasCreated: true })// the flow of application is as follows: send the new question to backend=>backend execute the asynchrounous process to save the new question and send back the new question list=> the props gets updated, so the only way to find out if the new question is updated is through comparision of question numbers
        }
    }
    optionOne = React.createRef()
    optionTwo = React.createRef()//could've used state to track the input value, but I just want to try "react.ref"

    onClick = (e) => {
        this.props.createQuestion({ optionOneText: this.optionOne.current.value, optionTwoText: this.optionTwo.current.value, author: this.props.authUser })
    }

    render() {
        return (this.props.authUser ? <div className="createform">
            <div style={{ textAlign: "center", borderBottom: "1px grey solid" }}><h3>Create New Question</h3></div>
            <div>
                <p>complete the question</p>
                <br />
                <h4>Would you rather...</h4>
                <br />
                <input type="text" ref={this.optionOne} />

                <p style={{ textAlign: "center" }}>OR</p>

                <input type="text" ref={this.optionTwo} />

                <div className="submitbutton" style={{ textAlign: "center" }}><button onClick={this.onClick}>submit</button></div>

            </div>
            <div className="create-result">
                {this.state.hasCreated && <p>A new question has been created</p>}
            </div>
        </div> : <Redirect to="/" />// if user hasn't logged in yet, redirect him to the login page
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authUser: state.authUser,
        questions: state.questions
    }
}

const mapDispatchToProps = {
    createQuestion
}

export default connect(mapStateToProps, mapDispatchToProps)(Create)
