import React,{Component} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Auth from './components/Auth/Auth';
import Home from './components/Home';
import {connect} from 'react-redux';
import * as AuthConst from './constants/auth';
import * as AuthActionType from './actions/auth';
import axios from 'axios';


class App extends Component {

  componentDidMount(){
    if(!localStorage.getItem("token")){
      this.props.authFailure();
    } else {
      const token = localStorage.getItem("token");
      axios.post('http://localhost:5000/api/auth/check_auth',{
        token
      })
      .then(({data})=>{
        if(data.success){
          this.props.authSuccess(token);
        } else {
          this.props.authFailure();
        }
      })
      .catch(()=>{
        this.props.authFailure();
      });
    }
  }

  render(){
    let toRender = null;
    if(this.props.authStatus === AuthConst.AUTH_LOADING)
      toRender = <h1 style={{color:"white"}}>Loading...</h1>
    else if(this.props.authStatus === AuthConst.AUTHENTICATED)
      toRender = <Home/>
    else toRender = <Auth/>;
    // return toRender;
    return(
      <> 
          <Navbar/>
          {toRender}
      </>
    )
  }
}

const mapStateToProps = state =>{
  return {
    authStatus:state.authStatus
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    authSuccess:token =>
    dispatch({
      type:AuthActionType.AUTH_SUCCESS,
      payload:token
    }),
    authFailure:()=>
      dispatch({
        type:AuthActionType.AUTH_FAILURE
      })
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(App);
