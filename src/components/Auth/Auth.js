import React, { Component } from 'react'
import Login from './Login';
import Signup from './Signup';

class Auth extends Component {

    state = {   
        showLogin:true
    };
    
    toggleAuthForm = ()=>{
        this.setState({
            showLogin:!this.state.showLogin
        });
    }

    render() {
        return (
            <>
                {this.state.showLogin? (
                    <Login toggleAuthForm={this.toggleAuthForm}/>
                ): (
                    <Signup toggleAuthForm={this.toggleAuthForm}/>
                )}
            </>
        )
    }
}

export default Auth;