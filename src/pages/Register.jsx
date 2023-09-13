import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './register.scss'


function Register() {

    const navigate = useNavigate()




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
        console.log(data.data,response)

        if (response.status===201){
            navigate('/login')
           }else{
            alert('something went wrong')
           }

        
    }

    return (
        <div className="mainregister">
        <div className="regcont register-container">
          <form className='form' onSubmit={register}>
              <div className='segment'>
                <h1>Register</h1>
              </div>

              <label className='label'>Username</label>
              <input
                className='input'
                type="text"
                name="username"
                placeholder="Enter a username"
              />
          
            
              <label className='label'>Email</label>
              <input
                className='input'
                type="email"
                name="email"
                placeholder="Enter an email"
              />
            
            
              <label className='label'>Password</label>
              <input
                className='input'
                type="password"
                name="password"
                placeholder="Enter a password"
              />
            
            
              <label className='label'>Confirm Password</label>
              <input
                className='input'
                type="password"
                name="password2"
                placeholder="Confirm password"
              />
            
              <label className='label'>
                <input  type="checkbox" name="is_doctor" /> Are you a doctor?
              </label>
            
            <button className='button' type="submit" value="Register">Submit</button>

          </form>
        </div>
        </div>
      );
}

export default Register