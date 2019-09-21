import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Question extends Component {
    state = { showUnanswered: true }
    toggleShowed = (condition) => {//this state decides showing the answered or unanwered questions. 
        this.setState({ showUnanswered: condition })
    }

    render() {

        let { questions, users, authUser } = this.props;
        console.log("ques", questions, users, authUser);

        return (questions && users && authUser) ? (
            <div className="questionlist">
                <div className="pickbutton">
                    <span onClick={e => this.toggleShowed(true)} className={this.state.showUnanswered ? "activeTab" : ""}>UNANSWERED QUESTIONS</span>
                    <span onClick={e => this.toggleShowed(false)} className={this.state.showUnanswered ? "" : "activeTab"}>ANSWERED QUESTIONS</span>
                </div>
                {Object.keys(questions).map(qkey => (users[authUser].answers.hasOwnProperty(questions[qkey].id) !== this.state.showUnanswered && <div className="questioncard">
                    <div className="username"><p>{users[questions[qkey].author].name} asks</p></div>
                    <div className="img-container">
                        <div style={{ backgroundImage: `url(${users[questions[qkey].author].avatarURL})` }} ></div>
                    </div>
                    <div className="questiontext">
                        <h4>WOULD YOU RATHER...</h4>
                        <br />
                        <p>...{questions[qkey].optionOne.text.slice(Math.random() * (questions[qkey].optionOne.text.length / 2), (Math.random() + 1) * questions[qkey].optionOne.text.length / 2)}...</p>{/*only showing a small portion of the question, randomly */}
                        <br />
                        <Link to={`/question/${questions[qkey].id}`}>
                            <button > View Poll</button>
                        </Link>
                    </div>

                </div>))}
                <div style={{ textAlign: "center" }}>
                    <Link to="/create">
                        <button>create a new question</button>

                    </Link>
                </div>
            </div>
        ) : (<Redirect to="/" />)// if the user hasn't logged in OR the intial data hasn't been loaded, send them to the login page. 
    }
}


const mapStateToProps = (state) => {
    let { questions, users, authUser } = state;
    return { questions, users, authUser };
}

export default connect(mapStateToProps, null)(Question);