import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
    {auth.isLoggedIn && (
      <li>
        <NavLink to="/auth">
          Sign Up Employee
        </NavLink>
      </li>
      )}
      {auth.isLoggedIn && (
      <li>
        <NavLink to="/places" exact>
          All Employees
        </NavLink>
      </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>Products Added</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add Product</NavLink>
        </li>
      )}
        <li>
          <NavLink to="/auth">Admin Log In</NavLink>
        </li>
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Employee Log In</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>Log Out</button>
        </li>
      )}
    
    </ul>
  );
};

export default NavLinks;
