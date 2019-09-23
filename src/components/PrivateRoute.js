import React from 'react'
import { Route, Redirect } from "react-router-dom";

export default function (props) {
    if (!props.authUser) {
        return <Route path={props.path} render={() => (<Redirect to={{
            pathname: "/",
            state: { from: props.location }
        }} />)} />
    }
    return <Route exact path={props.path} component={props.component} />
}
