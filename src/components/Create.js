import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createQuestion } from "../actions/questionActions";
import { Redirect } from "react-router-dom";

class Create extends Component {

    componentDidUpdate(prevProps) {
        if (Object.keys(this.props.questions).length - Object.keys(prevProps.questions).length === 1) {
            this.props.history.push("/questions")
        }
    }
    optionOne = React.createRef()
    optionTwo = React.createRef()//could've used state to track the input value, but I just want to try "React.ref"

    onClick = (e) => {
        this.props.createQuestion({ optionOneText: this.optionOne.current.value, optionTwoText: this.optionTwo.current.value, author: this.props.authUser })
    }

    render() {
        return (this.props.authUser ? <div className="createform">
            <div style={{ textAlign: "center", borderBottom: "1px grey solid" }}><h3>Create New Question</h3></div>
            <div>
                <p>complete the question</p>
                <br />
                <h3 style={{ color: "red" }}>Would you rather...</h3>
                <br />
                <input type="text" ref={this.optionOne} />

                <p style={{ textAlign: "center" }}>OR</p>

                <input type="text" ref={this.optionTwo} />

                <div className="submitbutton" style={{ textAlign: "center" }}><button onClick={this.onClick}>submit</button></div>

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
