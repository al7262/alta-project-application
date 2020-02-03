import React from 'react';
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import logo from '../images/logo-dark.svg';
import '../styles/login.css'

class LoginPage extends React.Component {
    render(){
        return (
            <React.Fragment>
                <div className="container-login">
                    <div className="login-box">
                        <div className="logo">
                            <img src={logo} alt="application-logo"/>
                            <h1>EasyKachin'</h1>
                        </div>
                        <form action="" onSubmit={e=>e.preventDefault()}>
                            <input type="text" name="username" placeholder="Username/Email"/>
                            <div className="password">
                                <input type="password" name="password" id="password" placeholder="Password"/>
                                <span onClick={this.props.handleVisibilityPassword}>
                                    <i className="material-icons" id="visibilityPassword">visibility</i>
                                </span>
                            </div>
                        </form>
                        <Link className="btn btn-login">Masuk</Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect('', actions)(withRouter(LoginPage));