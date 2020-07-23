import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logo from '../../../static/assets/images/logo/class-cash-logo.png'

const NavigationBar = props => {
   const [user, setUser] = useState({})
   const [error, setError] = useState("")

   const handleLogout = () => {
      setUser({})
      Cookies.remove("_sb%_user%_session")
   }

   const getUser = () => {
      let userCookie = Cookies.get("_sb%_user%_session")
      let temp = 0
      let userIdArr = []

      for (var i = 0; i < userCookie.length; i++) {
         if (userCookie[i] == "%") {
            temp += 1
         }

         if (temp === 2) {
            if (userCookie[i] !== "%") {
               userIdArr.push(userCookie[i])
            }
         }
      }

      let userId = userIdArr.join('')

      axios.get(`http://localhost:5000/user/${userId}`)
         .then(response => {
            console.log('response navbar', response.data);

            setUser(
               response.data[0]
            )

         }).catch(error => {
            setError(
               "An error ocurred"
            )
         });
   }

   useEffect(() => {
      getUser()
   }, [])


   return (
      <div className="nav-wrapper">
         <div className="left-column">
            <NavLink to="/teachers-home">
               <img src={Logo} alt='Logo' />
            </NavLink>
         </div>

         <div className="center-column">
            <div className="nav-link-wrapper">
               <NavLink exact to="/teachers-home" activeClassName="nav-link-active">Teachers Groups</NavLink>
            </div>

            <div className="nav-link-wrapper">
               <NavLink to="/dashboard" activeClassName="nav-link-active">Dashboard</NavLink>
            </div>
         </div>

         <div className="right-column">
            <div className="grade">
               {user.grades_name}
            </div>

            <div className="username">
               {user.Username}
            </div>

            <div className="logout-icon">
               <NavLink to="/">
                  <FontAwesomeIcon onClick={handleLogout} icon="sign-out-alt" />
               </NavLink>
            </div>
         </div>
      </div>
   )
}

export default NavigationBar;