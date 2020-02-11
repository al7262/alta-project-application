import React from 'react';
import swal from 'sweetalert2';
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../stores/MainStore";
import logo from '../images/logo-dark.svg';
import '../styles/login.css'

class LoginPage extends React.Component {
    state = {
        username: undefined,
        password: undefined,
    }

    handleOnChange = async (event)=>{
        const name = event.target.name, warning = document.getElementById('warning')
        let value = event.target.value
        if(name==='username'){
            if(value===''){
                warning.innerHTML='Tolong masukkan username/email'
            } 
        } else if(name==='password'){
            if(value===''){
                warning.innerHTML='Tolong masukkan password'
            }
        }
        await this.setState({[name]:value})
        if(this.state.username===''){
            warning.innerHTML='Tolong masukkan username/email'
        } else if(this.state.password===''){
            warning.innerHTML='Tolong masukkan password'
        } else{
            warning.innerHTML=''
        }
    }

    handleLogin = async () => {
        const input = {
            method: "post",
            url: await this.props.baseUrl+"login/apps",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                username: await this.state.username.toLowerCase(),
                password: await this.state.password
            },
            validateStatus: (status) => {
                return status<500
            }
        };
        swal.showLoading()
        await this.props.handleApi(input)
        this.props.handleError()
        const data = await this.props.data
        if(data!==undefined){
            if(data.hasOwnProperty('token')){
                localStorage.setItem('token', this.props.data.token)
                await this.props.handleInput('isLogin', true)
                this.props.history.push('/')
                swal.fire({
                    title: 'Welcome!',
                    text: 'You have successfully logged in!',
                    icon: 'success',
                    timer: 3000,
                    confirmButtonText: 'okay'
                  })
            }
        }
    }

    render(){
        return (
            <React.Fragment>
                <div className="container-login">
                    <div className="login-box">
                        <div className="logo">
                            <img src={logo} alt="application-logo"/>
                            <h1>EasyKachin'</h1>
                        </div>
                        <form onSubmit={e=>e.preventDefault()}>
                            <label id="warning"></label>
                            <input type="text" name="username" placeholder="Username/Email" onChange={this.handleOnChange} onClick={this.handleOnChange}/>
                            <div className="password">
                                <input type="password" name="password" id="password" placeholder="Password" onChange={this.handleOnChange} onClick={this.handleOnChange}/>
                                <span onClick={this.props.handleVisibilityPassword}>
                                    <i className="material-icons" id="visibilityPassword">visibility</i>
                                </span>
                            </div>
                        </form>
                        <Link className="btn btn-login" onClick={this.handleLogin}>Masuk</Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect('baseUrl, data', actions)(withRouter(LoginPage));