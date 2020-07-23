import React, { Component } from "react";
import { Link } from "react-router-dom";

import Logo from '../../../static/assets/images/logo/class-cash-logo.png'
import Footer from "../footer/footer"

export default class Home extends Component {
   constructor(props) {
      super(props)
   }


   render() {
      return (
         <div className="home-main-wrapper">
            <div className="navbar">
               <div className="left-column">
                  <Link to="/">
                     <img src={Logo} alt='Logo' />
                  </Link>
               </div>

               <div className="right-column">
                  <div className="auth">
                     <Link to="/auth">Log in</Link>
                  </div>

                  <p>or</p>

                  <Link to="/signup">
                     <div className="sign-up">
                        Sign Up
                  </div>
                  </Link>
               </div>
            </div>

            <div className="content">
               <div className="logo">
                  <img src={Logo} alt='Logo' />
               </div>
            </div>


            <Footer />
         </div>
      )
   }
}