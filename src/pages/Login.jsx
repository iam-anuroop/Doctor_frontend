import React,{ useContext, useState} from "react"
import AuthContext from "../context/AuthContext"
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom"
import './Login.scss'



const Login = () => {

  const{user,setUser,setAuthTokens} = useContext(AuthContext)

  const navigate = useNavigate()


  // style=================================
  // const [emailFocused, setEmailFocused] = useState(false);
  // const [passwordFocused, setPasswordFocused] = useState(false);

  // const handleEmailFocus = () => {
  //   setEmailFocused(true);
  // };

  // const handleEmailBlur = () => {
  //   setEmailFocused(false);
  // };

  // const handlePasswordFocus = () => {
  //   setPasswordFocused(true);
  // };

  // const handlePasswordBlur = () => {
  //   setPasswordFocused(false);
  // };

  // style---------------------------end

  
 
     let loginuser = async(e)=>{
         e.preventDefault()
         console.log('form submitted');
         let response = await fetch("http://127.0.0.1:8000/login/",{
             method:'POST',
             headers:{
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({'email':e.target.email.value,'password':e.target.password.value})
         })
         let data = await response.json()
         console.log(data);
         console.log(response.status);

         if (response.status===200){
          setAuthTokens(data)
          setUser(jwt_decode(data.access))
          console.log(user);
          localStorage.setItem('authTokens',JSON.stringify(data))
          
          navigate('/')
         }else{
          alert('something went wrong')
         }
     }
 

     return (
      <div className="mainlogin">
        <form className="form" onSubmit={loginuser}>
  
        <div className="segment">
          <h1>Login</h1>
        </div>
  
        <label className="label">
        <input className="input" type="email" name="email" placeholder="Email Address"/>
        </label>
        <label className="label">
        <input className="input" type="password" name="password" placeholder="Password"/>
        </label>
        <button className="red button" value="Login" type="submit"><i className="icon ion-md-lock"></i> Log in</button>
        </form>
      </div>
    );

}

export default Login