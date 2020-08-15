import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../../static/assets/images/logo/class-cash-logo.png'
import Footer from "../footer/footer"

export default class Login extends Component {
   constructor(props) {
      super(props);

      this.state = {
         user: {},
         email: "",
         password: "",
         errorsMessage: {},
         message: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(event) {
      this.setState({
         [event.target.name]: event.target.value,
         message: ""
      });
   }

   handleSubmit(event) {
      event.preventDefault();

      if (this.validate()) {
         axios.post("https://class-cash-api-ejlt.herokuapp.com/user",
            {
               email: this.state.email,
               password: this.state.password
            }
         ).then(response => {
            if (response.data.length > 0) {
               this.setState({
                  user: response.data[0]
               })

               console.log('You can come in', this.state.user);
               Cookies.set("_sb%_user%_session", `%encript%${this.state.user.users_id}`, { expires: 15 })

               this.props.handleSuccessfulAuth();
            } else {
               this.setState({
                  message: "Email or password is wrong"
               })
            }
         }).catch(error => {
            this.setState({
               message: "An error ocurred"
            })
         });
      }
   }

   validate() {
      let errors = {};
      let isValid = true;

      if (!this.state.email) {
         isValid = false;
         errors["email"] = "Please enter your email";
      }

      if (typeof this.state.email !== "undefined") {
         var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

         if (!pattern.test(this.state.email)) {
            isValid = false;
            errors["email"] = "Please enter valid email address";
         }
      }

      if (!this.state.password) {
         isValid = false;
         errors["password"] = "Please enter your password";
      }

      this.setState({
         errorsMessage: errors
      })

      return isValid;
   }

   render() {
      return (
         <div className="login-main-wrapper">
            <div className="login-form-center">
               <div className="login-container">

                  <div className="logo">
                     <Link to="/">
                        <img src={Logo} alt='Logo' />
                     </Link>
                  </div>
                  <div className="title">
                     <p>Log in to your account</p>
                  </div>

                  <div className="message">
                     {this.state.message}
                  </div>

                  <form onSubmit={this.handleSubmit} className="login-form">
                     <div className="form-group">
                        <label htmlFor="email"><b>Email address</b></label>
                        <input
                           type="text"
                           name="email"
                           placeholder="Email address"
                           value={this.state.email}
                           onChange={this.handleChange}
                        />
                        <div className="error-message">{this.state.errorsMessage.email}</div>
                     </div>

                     <div className="form-group">
                        <label htmlFor="password"><b>Password</b></label>
                        <input
                           type="password"
                           name="password"
                           placeholder="Password"
                           value={this.state.password}
                           onChange={this.handleChange}
                        />
                        <div className="error-message">{this.state.errorsMessage.password}</div>
                     </div>

                     <button className="btn" type="submit">Log In</button>
                  </form>

                  <div className="sign-up">
                     <Link to="/signup">Don't have an account? Sign up</Link>
                  </div>
               </div>

            </div>

            <Footer />
         </div>
      );
   }
}