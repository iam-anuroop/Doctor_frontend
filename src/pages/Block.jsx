import React, { useContext ,useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios'
import './Block.css'

function Block() {
const [view,setView]= useState([])
const {authTokens} = useContext(AuthContext)
    const {id} = useParams()
    console.log(id);
const fetchsingleuser = async(e) => {
        // e?.preventDefault()
    const response = await axios(`http://127.0.0.1:8000/adminpanel/${parseInt(id)}/`, {
        method: e==undefined?'GET':'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`,
        },
        data:
         e != undefined?{is_active:e}:undefined
        

      });
      let data = await response.data
      if (response.status === 200){
          e == undefined ? setView(data.data):setView(prevView => ({...prevView,is_active:e}));
      }else{
        e !=undefined ? alert(data.msg):null
        
      }
      console.log('data',data.data);
      console.log('response',response);


    }

useEffect(() => {
  fetchsingleuser()
}, [])


  return (
    <div className='mainmain'>
      <div className="card">
      <i className="fa-solid fa-user"></i>
      <h4 className="card-title">{view.username}</h4>
      <p className="card-text">{view.email}</p>
      <div className="btn-holder">
      {
      view.is_active ? 
      (<button className="btn btn-outline-primary" type="submit" name='blocked' onClick={(e)=>fetchsingleuser(false)} >block</button>)
        :
      (<button className="btn btn-outline-primary" type="submit" name='blocked' onClick={(e)=>fetchsingleuser(true)} >unblock</button>)
    }
      </div>
      </div>

    </div>

  )
}

export default Block