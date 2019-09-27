import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/authUserActions';
import loginimg from "../login.jpg";


export class Login extends Component {

    state = { userid: "unselected" }
    pickUser = (e) => {
        this.setState({ userid: e.target.value })
    }
    onClick = e => {
        e.preventDefault();
        if (this.state.userid === "unselected") {
            return// if user hasn't selected the loging name, then do nothing
        }
        this.props.login(this.state.userid); //when user select the login name and confirm, set the the login name 
        const { state = {} } = this.props.location;
        const { from = "/questions" } = state;
        this.props.history.push(from) //redirect user to the questions page
    }
    render() {
        let { users } = this.props
        return Object.keys(this.props.users).length > 0 && ( //this page will only be available after the users has been fetched from backend.
            <div className="loginpage">
                <img src={loginimg} alt="" />
                <select name="" id="" defaultValue={this.state.userid} onChange={this.pickUser}>
                    <option value="unselected" disabled >PLEASE PICK A USER</option>
                    {Object.keys(users).map(userID => (<option key={userID} value={userID}>{users[userID].name}</option>))}
                </select>
                <button onClick={this.onClick}>LOG IN</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.users
})

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
