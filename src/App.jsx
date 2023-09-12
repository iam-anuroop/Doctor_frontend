import { useState } from 'react'
import './App.css'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import { Route,Routes, useNavigate } from 'react-router-dom'
// import Privateroute from './utils/Privateroute'
import Header from './components/Header'
import AuthContext from './context/AuthContext'
import Register from './pages/Register'
import Update from './pages/Update'
import Adminpanel from './pages/Adminpanel'



function App() {
  const [authTokens, setAuthTokens] = useState(() =>
  localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null
);
    console.log(authTokens,'first');
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const logout = () => {
      setAuthTokens(null)
      setUser(null)
      localStorage.removeItem('authTokens')
      navigate('/login')
    }




    const deletehandle=async()=>{
      const response = await fetch ('http://127.0.0.1:8000/profile/',{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${authTokens.access}`
        }
      })
      let data = await response.json()
      console.log('response',response)
      console.log('msg',data.msg)
      console.log(data.data);
      setUser(data.data)
      if(response.status===200){
        logout()
        alert(data.msg)
      }
    }







    const context = {
      authTokens:authTokens,
      setAuthTokens:setAuthTokens,
      user:user,
      setUser:setUser,
      logout:logout,
      deletehandle:deletehandle,
    }


  return (
    <div className='App'>
  
        <AuthContext.Provider value={context} >

          <Header/>

          <Routes>
            <Route Component={Login} path='login/'/>
            <Route Component={Homepage} path="/" />  
            <Route Component={Register} path='register/'/>
            <Route Component={Update} path='update/'/>
            <Route Component={Adminpanel} path='adminpanel/'/>
          </Routes>

        </AuthContext.Provider>

    </div>
  )
}

export default App;
