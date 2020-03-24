import React, { Component } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import {connect} from 'react-redux';
import * as AuthActionTypes from '../../actions/auth';

const style = {
    textDecoration: "underline",
    color: "blue",
    cursor: "pointer"
}

class Login extends Component {

    state = {
        username:null,
        password:null
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    handleError = e =>{
        this.props.authFailure();
        return (
            toast.error('Invalid Username or password')
        );
    }

    checkStatus = data =>{
        if(data.success){
            this.props.authSuccess(data.token);
        } else {
            this.props.authFailure();
            this.handleError();
        }
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/login',{
            username:this.state.username,
            password:this.state.password
        })
        .then(({data})=> this.checkStatus(data))
        .catch(this.handleError);
    }

    render() {
        return (
            <>
            <ToastContainer/>
            <form className="container card form-card">
                <h3>Login</h3>
                <input type="text" placeholder="Username" name="username" required onChange={this.handleChange}/>
                <input type="password" placeholder="Password" name="password" required onChange={this.handleChange}/>
                <button className="btn red lighten-1" onClick={this.handleSubmit}>Login</button>
                <p>Don't have an account ?<span style={style} onClick={this.props.toggleAuthForm}> Signup </span> </p>
            </form>
            </>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        authSuccess: token =>
            dispatch({
                type:AuthActionTypes.AUTH_SUCCESS,
                payload:token
            }),
            authFailure:()=>
                dispatch({
                    type:AuthActionTypes.AUTH_FAILURE
                })
    };
};

export default connect(null,mapDispatchToProps)(Login);