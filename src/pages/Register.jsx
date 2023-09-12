import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './register.css'


function Register() {

    const navigate = useNavigate()


    // style =====================================
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [password2Focused, setPassword2Focused] = useState(false);

  const handleUsernameFocus = () => {
    setUsernameFocused(true);
  };

  const handleUsernameBlur = () => {
    setUsernameFocused(false);
  };

  const handleEmailFocus = () => {
    setEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setEmailFocused(false);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };

  const handlePassword2Focus = () => {
    setPassword2Focused(true);
  };

  const handlePassword2Blur = () => {
    setPassword2Focused(false);
  };


//   style ================================ end



    let register = async(e) => {
        e.preventDefault()
        console.log('submitted');
        let response = await fetch("http://127.0.0.1:8000/",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value,'email':e.target.email.value,
                                'password':e.target.password.value,'password2':e.target.password2.value,
                                'is_doctor':e.target.is_doctor.value})
        })

        let data = await response.json()
        console.log(data,response)

        if (response.status===201){
            navigate('login/')
           }else{
            alert('something went wrong')
           }

        
    }

    return (
        <div className="mainregister">
        <div className="register-container">
          <h1>Register</h1>
          <form onSubmit={register}>
            <div className={`input-group ${usernameFocused ? 'focused' : ''}`}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter a username"
                onFocus={handleUsernameFocus}
                onBlur={handleUsernameBlur}
              />
            </div>
            <div className={`input-group ${emailFocused ? 'focused' : ''}`}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter an email"
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
              />
            </div>
            <div className={`input-group ${passwordFocused ? 'focused' : ''}`}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter a password"
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
              />
            </div>
            <div className={`input-group ${password2Focused ? 'focused' : ''}`}>
              <label>Confirm Password</label>
              <input
                type="password"
                name="password2"
                placeholder="Confirm password"
                onFocus={handlePassword2Focus}
                onBlur={handlePassword2Blur}
              />
            </div>
            <div className="input-group">
              <label>
                <input type="checkbox" name="is_doctor" /> Are you a doctor?
              </label>
            </div>
            <input type="submit" value="Register" />
          </form>
        </div>
        </div>
      );
}

export default Register