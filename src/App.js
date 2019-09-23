import React, { Component } from 'react';
import './App.css';
import Question from "./components/Question";
import Login from "./components/Login";
import QuestionDetail from "./components/QuestionDetail";
import Create from "./components/Create";
import User from "./components/User";
import { connect } from "react-redux";
import { initialSetQuestion } from "./actions/questionActions";
import { initiateSetUsers } from "./actions/userAction";
import { logout } from "./actions/authUserActions";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import NoMatch from './components/NoMatch';

class App extends Component {
  componentDidMount() {
    this.props.initiateSetUsers() // fetch users' info frome backend when the app was first loaded
    this.props.initialSetQuestion()// fetch questions' info frome backend when the app was first loaded
  }


  render() {
    let { questions, users, authUser } = this.props
    return (
      <div className="App">
        {(questions && users) &&
          <BrowserRouter>
            <div className="header">
              <nav>
                <NavLink to="/questions" exact>Questions</NavLink>
                <NavLink to="/add" exact>Create New Question</NavLink>
                <NavLink to="/leaderboard" exact>Leader Board</NavLink>
              </nav>
              {authUser && (<div className="user-profile"> {/* logout page is only visible for logged user */}
                <span>Hello, {users[authUser].name}</span>
                <span><img src={`${users[authUser].avatarURL}`} alt="" /></span>
                <span className="logout" onClick={this.props.logout} style={{ fontWeight: "700" }}>Log Out</span>
              </div>)}

            </div>

            <Switch>
              <Route path="/" exact component={Login} />
              <PrivateRoute path="/questions" component={Question} authUser={this.props.authUser} />
              <PrivateRoute path="/question/:id" component={QuestionDetail} authUser={this.props.authUser} />
              <PrivateRoute path="/add" component={Create} authUser={this.props.authUser} />
              <PrivateRoute path="/leaderboard" component={User} authUser={this.props.authUser} />
              <Route component={NoMatch} />
            </Switch>
          </BrowserRouter>}
      </div>
    );
  }
}

const mapDispatchToProps = {
  initialSetQuestion,
  initiateSetUsers,
  logout
}

const mapStateToProps = (state) => {
  let { questions, users, authUser } = state;
  return { questions, users, authUser }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
