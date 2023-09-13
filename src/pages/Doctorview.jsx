import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Doctorview.css'

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
        <div className="card">
        <i className="fa-solid fa-stethoscope"></i>
        <h4 className="card-title">{doctor.username}</h4>
        <p className="card-text">Specialisation : {doctor.doctors.department}</p>
        <p className="card-text">Hospital : {doctor.doctors.hospital}</p>
        <div className="btn-holder">
          <a className="btn btn-outline-primary" href="#" title="">Button Text</a>
          </div>
      </div>      
      ))}
    </div>
    
  )
}

export default Doctorview