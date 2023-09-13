import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Header.css'; // Create a CSS file for styling
import $ from 'jquery';

function Header() {
  const { user, logout } = useContext(AuthContext);
console.log(user);

  function test(){
    var tabsNewAnim = $('#navbarSupportedContent');
    var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      "top":itemPosNewAnimTop.top + "px", 
      "left":itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click","li",function(e){
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        "top":itemPosNewAnimTop.top + "px", 
        "left":itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
    });
  }
  $(document).ready(function(){
    setTimeout(function(){ test(); });
  });
  $(window).on('resize', function(){
    setTimeout(function(){ test(); }, 500);
  });
  $(".navbar-toggler").click(function(){
    $(".navbar-collapse").slideToggle(300);
    setTimeout(function(){ test(); });
  });
  
  
  
  // --------------add active class-on another-page move----------
  jQuery(document).ready(function($){
    // Get current path and find target link
    var path = window.location.pathname.split("/").pop();
  
    // Account for home page with empty path
    if ( path == '' ) {
      path = 'index.html';
    }
  
    var target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
    // Add active class to target link
    target.parent().addClass('active');
  });
  
  

  return (

    <nav className="navbar navbar-expand-custom navbar-mainbg">
        <button className="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
        </button>
        <div className="navdiv collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                <div className="hori-selector"><div className="left"></div><div className="right"></div></div>
                <li className="nav-item active">
                <Link to="/" className="nav-link">
                Home
                </Link>
                </li>
                <li className="nav-item">
                {user ? (
                    <>
                      <Link className="nav-link" to='/login' onClick={logout}>
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
                </li>
                <li className="nav-item ">
                {user ?
                (
                  null
                ):(
                  <Link to="/register" className="nav-link">
                  Register
                  </Link>
                )
              }
                
                </li>
                <li className="nav-item">
                {user&&user?<Link to="/update" className="nav-link">
                Update
                </Link>:null}
                </li>
                <li className="nav-item">

                {user&&user?<Link to="/doc" className="nav-link">
                Doctors
                </Link>:null}
                </li>
                <li className="nav-item">
                {user&&user.is_admin?<Link to="/adminpanel" className="nav-link">
                Adminpanel
                </Link>:null}
                </li>
            </ul>
            <ul className="navadmin navbar-nav ml-auto">
              <li>
              <h3 className="user-greeting">Hello {user ? user.user.username : 'Guest'}</h3>
              </li>
            </ul>
        </div>
    </nav>

  );
}

export default Header;
