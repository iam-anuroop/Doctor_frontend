import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import './Adminpanel.css'

function Adminpanel() {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const { authTokens } = useContext(AuthContext);

  const fetchUsersAndDoctors = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/adminpanel/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`,
        },
      });

      if (response.status === 200) {
        console.log('hereeeeeeeeeeee');
        const data = await response.json();
        console.log(data,'data');
        const usersData = data.data.filter((item) => item.doctors === null);
        console.log('user',usersData);
        const doctorsData = data.data.filter((item) => item.doctors !== null);
        setUsers(usersData);
        setDoctors(doctorsData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUsersAndDoctors();
  }, []);

  return (
    <div className="admin-panel">
      <div className="user-list">
        <h2>Users</h2>
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.username}</h3>
            <h4>{user.email}</h4>
            {/* Add other user details here */}
            <button>View</button>
          </div>
        ))}
      </div>
      <div className="doctor-list">
        <h2>Doctors</h2>
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <h3>{doctor.username}</h3>
            <h4>{doctor.email}</h4>
            {/* Add other doctor details here */}
            <button>View</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Adminpanel;
