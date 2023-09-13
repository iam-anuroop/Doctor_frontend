import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import './Update.scss'
import { useNavigate } from 'react-router-dom'


function Update() {
  const navigate = useNavigate()
  const {deletehandle,user,authTokens} = useContext(AuthContext)
 console.log(user.user);
  const EditProfile = async (e) =>{
    console.log({
      username: e.target.username.value,
      email: e.target.email.value,          
      ...(e.target.firstname.value && { first_name: e.target.firstname.value }),
      ...(e.target.lastname.value && {last_name: e.target.lastname.value}),
      doctors: user.doctors? {
        ...(e.target.hospital.value && { hospital: e.target.hospital.value }),
        ...(e.target.department.value && { department: e.target.department.value }),
      }:undefined,
    });
    e.preventDefault()     
          const response = await axios(`http://127.0.0.1:8000/profile/`,{
              method:'PATCH',
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':`Bearer ${authTokens.access}`
              },
              data: {
                  username: e.target.username.value,
                  email: e.target.email.value,          
                  ...(e.target.firstname.value && { first_name: e.target.firstname.value }),
                  ...(e.target.lastname.value && {last_name: e.target.lastname.value}),
                  doctors: user.user.doctors? {
                    ...(e.target.hospital.value && { hospital: e.target.hospital.value }),
                    ...(e.target.department.value && { department: e.target.department.value }),
                  }:undefined,
                }
          
      })
      
        let data = await response.data
        console.log(data);
        console.log(response.status);
        if (response.status==200){
            localStorage.setItem('data',data.Profile)
            let getUserdata= localStorage.getItem('data')
            navigate('/')

        }
        }
      console.log(user);
      return (
        <div className="update-container">
          <form onSubmit={EditProfile} className="form update-form">
            <div className="segment">
            <h1 style={{ color: 'white' }}>Update</h1>
            </div>
            <label className="label">
            <input className='input' name="username" placeholder="Username" required type="text" />
            </label>
            <label className="label">
            <input className='input' name="firstname" placeholder="First Name" required type="text" />
            </label>
            <label className="label">
            <input className='input' name="lastname" placeholder="Last Name" required type="text" />
            </label>
            <label className="label">
            <input className='input' name="email" placeholder="Email" required type="email" />
            </label>
            {user.user && user.user.doctors != null ? (
              <>
                <label className='label'>
                <input className='input' name="hospital" placeholder="Hospital" required type="text" />
                </label>
                <label className="label">
                <input className='input' name="department" placeholder="Department" required type="text" />
                </label>
              </>
            ) : null}
            <button className='button' type="submit" value="Update" >Update</button>
            <button  onClick={deletehandle} className="button delete-button">Delete Account</button>
          </form>
        </div>
      );
}

export default Update 