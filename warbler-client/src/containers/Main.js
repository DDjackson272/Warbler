import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import {authUser} from "../store/actions/auth";
import {removeError} from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import MessageForm from "../containers/MessageForm";

const Main = props => {
    const {authUser, error, removeError, currentUser} = props; // don't forget to map removeError from props
    return (
        <div className={"container"}>
            <Switch>
                /*pass along some parameters via props*/
                <Route
                    exact path = "/"
                    render={props =>
                        <Homepage
                            currentUser={currentUser}
                            {...props}/>
                    } />
                <Route exact path={"/signin"} render={props =>
                    <AuthForm onAuth={authUser}
                              removeError={removeError}
                              error={error}
                              buttonText={"Login"}
                              heading={"Welcome Back."}
                              signUp={false} {...props}/>} />
                <Route exact path={"/signup"} render={props =>
                    <AuthForm onAuth={authUser}
                              removeError={removeError}
                              error={error}
                              buttonText={"Sign up"}
                              heading={"Join Warbler Today."}
                              signUp={true} {...props}/>} />

                <Route path={"/users/:id/messages/new"}
                       component={withAuth(MessageForm)} />
            </Switch>
        </div>
    )
};

function mapStateToProps(state){
    //console.log(state);
    return {
        currentUser: state.currentUser,
        error: state.error
    };
}

export default withRouter(connect(mapStateToProps, {authUser, removeError})(Main));// withRouter should include main
