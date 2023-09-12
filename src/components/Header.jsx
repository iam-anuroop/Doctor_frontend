import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Header.css'; // Create a CSS file for styling

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        Home
      </Link>

      <div className="nav-links">
        {user ? (
          <>
            <Link className="nav-link" onClick={logout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </>
        )}

        <Link to="/register" className="nav-link">
          Register
        </Link>
        <Link to="/update" className="nav-link">
          Update
        </Link>
        <Link to="/adminpanel" className="nav-link">
          Adminpanel
        </Link>
      </div>

      <h3 className="user-greeting">Hello {user ? user.username : 'Guest'}</h3>
    </nav>
  );
}

export default Header;
