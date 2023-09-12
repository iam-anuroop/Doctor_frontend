import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function Update() {
  const {deletehandle} = useContext(AuthContext)
  return (
    <div>
      <h1 style={{color:'white'}}>Update</h1>
      <button onClick={deletehandle} className="delete-button">Delete Account</button>
    </div> 

  )
}

export default Update 