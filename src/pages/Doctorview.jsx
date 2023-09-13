import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Doctorview() {


  const navigate = useNavigate()
  const [doctors, setDoctors] = useState([]);
  const { authTokens } = useContext(AuthContext);

  const fetchDoctors = async () => {
    console.log(authTokens);
    console.log(authTokens.access);
    try {
      const response = await fetch('http://127.0.0.1:8000/doc/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`,
        },
      });
      console.log('response:',response);
      
      if (response.status === 200) {
        const data = await response.json();
        setDoctors(data);
        console.log(data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error( error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);



  return (
    <div>
      <h3>Doctors</h3>
      {doctors.map((doctor)=>(
        <div>
          <h1>{doctor.username}</h1>
        </div>
      ))}
    </div>
    
  )
}

export default Doctorview