import React, { Component } from "react";
import { Link } from "react-router-dom";

import Logo from '../../../static/assets/images/logo/class-cash-logo.png'

export default class Home extends Component {
   constructor(props) {
      super(props)
   }

   render() {
      return (
         <div className="home-main-wrapper">
            <div className="navbar">
               <div className="left-column">
                  <img src={Logo} alt='Logo' />
               </div>

               <div className="right-column">
                  <div className="auth">
                     <Link to="/auth">Log in</Link>
                  </div>

                  <p className="or">or</p>

                  <Link to="/signup">
                     <div className="sign-up">
                        <p>Sign up</p>
                     </div>
                  </Link>
               </div>
            </div>

            <div className="content">
               <div className="title-image">
                  <div className="title">
                     {/* <h1>Class Cash</h1> */}
                  </div>
               </div>

               <div className="info-app">

                  <h3>Class Cash App</h3>

                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a felis
                  non sem elementum tempor in at urna. Suspendisse auctor libero ut nibh
                  consequat sed sagittis dolor iaculis. Donec condimentum mauris nec eros
                  auctor sed vestibulum tellus consequat.
                  </p>
               </div>

               <div className="logo-image">
                  <img src={Logo} alt='Logo' />
               </div>
            </div>
         </div>
      )
   }
}