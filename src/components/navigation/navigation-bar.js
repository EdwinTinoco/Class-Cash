import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logo from '../../../static/assets/images/logo/class-cash-logo.png'

const NavigationBar = () => {
   const [user, setUser] = useState({})
   const [error, setError] = useState("")

   const handleLogout = () => {
      console.log('logout');

      setUser({})
      Cookies.remove("_sb%_user%_session")
      window.location.reload(false);
   }

   const getUser = () => {
      let userCookie = Cookies.get("_sb%_user%_session")
      let temp = 0
      let userIdArr = []

      if (userCookie !== undefined) {
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

         axios.get(`https://class-cash-api-ejlt.herokuapp.com/user/${userId}`)
            .then(response => {
               console.log('response navbar', response.data);

               if (response.data.length > 0) {
                  setUser(
                     response.data[0]
                  )
               } else {
                  handleLogout()
               }

            }).catch(error => {
               setError(
                  "An error ocurred"
               )
            });
      }
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
               <NavLink exact to="/teachers-home" activeClassName="nav-link-active">Teacher Groups</NavLink>
            </div>
         </div>

         <div className="right-column">
            <div className="grade">
               {user.grades_name}
            </div>

            <div className="separator" style={{ display: "block" }}>
               |
            </div>

            <div className="username">
               {user.Username}
            </div>

            <div className="logout-icon">
               <FontAwesomeIcon onClick={handleLogout} icon="sign-out-alt" />
            </div>
         </div>
      </div>
   )
}

export default NavigationBar;