import React, { Component } from 'react'
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux';
import * as AuthActionType from '../../actions/auth';


const style = {
    textDecoration: "underline",
    color: "blue",
    cursor: "pointer"
}

class Signup extends Component {
    
    state = {
        username:null,
        password:null
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    handleSuccess = (data) =>{
        if(data.success){
            this.props.authSuccess(data.token);
            return (
                toast.success('User added successfully!')
            );
        } else {
            this.props.authFailure();
        }
    }

    handleError = () =>{
        this.props.authFailure();
        return(
            toast.error('Failed to add User')
        );
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/signup',{
            username:this.state.username,
            password:this.state.password
        })
        .then(({data})=> (this.handleSuccess(data)))
        .catch(this.handleError)
    }

    render() {
        return (
            <>
            <ToastContainer/>
            <form className="container card form-card">
                <h3>Sign Up</h3>
                <input type="text" placeholder="Username" name="username" onChange={this.handleChange}/>
                <input type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                <button onClick={this.handleSubmit} className="btn red lighten-1">Sign up</button>
                <p>Already have an account?  <span style={style} onClick={this.props.toggleAuthForm}> Login </span> </p>
            </form>
            </>
        )
    }
}


const mapDispatchToProps = dispatch =>{
    return {
        authSuccess: token =>
            dispatch({
                type:AuthActionType.AUTH_SUCCESS,
                payload:token
            }),
        authFailure:token =>
            dispatch({
                type:AuthActionType.AUTH_FAILURE
            })
    };
};

export default connect(null,mapDispatchToProps)(Signup);