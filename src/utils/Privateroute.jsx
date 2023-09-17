import { Children, useContext } from "react";
import { Route, Navigate } from "react-router-dom"; 
import AuthContext from "../context/AuthContext";

const Privateroute = ({ Component, ...rest }) => {
  // Check if the user is authenticated here
const {user} = useContext(AuthContext) 
  console.log('user',user);
  console.log('user',Component);
return (
    <>{user? Component:<Navigate  to='login/' />}</>
  );
}; 

export default Privateroute;
