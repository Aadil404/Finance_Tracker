import React from "react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { Navigate, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="app-name">Finance Tracker</Link>
      <div className="user-button">
        <div >
        <Link to="/">Dashboard</Link>
        </div>
        <div>
          <UserButton />
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
