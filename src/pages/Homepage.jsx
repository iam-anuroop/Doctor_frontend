import React, { useContext,useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import './Homepage.css'



function Homepage() {
const [userdata,setUserdata] = useState([])
const {authTokens,setUser,user} =  useContext(AuthContext)

const HomePage=async(e)=>{
//   const response = await fetch ('http://127.0.0.1:8000/profile/',{
//     method:'GET',
//     headers:{
//       'Content-Type':'application/json',
//       'Authorization':`Bearer ${authTokens.access}`
//     }
//   })
//   let data = await response.json()
//   console.log('response',response)
//   console.log('msg',data.msg)
//   console.log(data.data);
//   setUser(data.data)
//   if(response.status===200){
//     setUserdata(data.data)
//     // alert(data.msg)

//   }

}



useEffect(() => {
  HomePage()
}, [])

  return (
    <div>

    <div name='dhgsjsdn' className="container">
        <h1>Welcome to Our Website</h1>
        <p>Hello {user && user.user.username}!</p>
        {user ?<p className="email">Your Email: {user &&user.user.email}</p>: <p></p> }
    </div>
    </div>
  )
}

export default Homepage