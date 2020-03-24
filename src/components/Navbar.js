import React, { Component } from 'react'
import * as AuthActionType from '../actions/auth';
import * as AuthConst from '../constants/auth';
import { connect } from 'react-redux';

class Navbar extends Component {

    render(){
        console.log(this.props.authStatus)
    return (
        <nav>
            <div className="nav-wrapper red">
            <a href="#" className="brand-logo center">Auth API</a>
                <ul className="right hide-on-med-and-down">
                    {this.props.authStatus === AuthConst.AUTHENTICATED ? (<a href="#"><li onClick={this.props.logout}>Logout</li></a>):('')}
                </ul>
            </div>
        </nav>
    )
}
}

const mapStateToProps = state =>{
    return {
        authStatus:state.authStatus
    }
}


const mapDispatchToProps = dispatch => {
    return {
        logout:()=> dispatch({ type:AuthActionType.AUTH_FAILURE })
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
