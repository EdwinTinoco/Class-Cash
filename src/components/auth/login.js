import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../../static/assets/images/logo/Students-Bank-transparent.png'
import Footer from "../footer/footer"

export default class Login extends Component {
   constructor(props) {
      super(props);

      this.state = {
         user: [],
         email: "",
         password: "",
         errorText: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(event) {
      this.setState({
         [event.target.name]: event.target.value,
         errorText: ""
      });
   }

   handleSubmit(event) {
      event.preventDefault();

      axios.post("http://localhost:5000/user",
         {
            email: this.state.email,
            password: this.state.password
         }
      ).then(response => {
         if (response.data.length > 0) {
            this.setState({
               user: response.data
            })

            console.log('You can come in', this.state.user);
            Cookies.set("_sb%_user%_session", `%encript%${this.state.user[0].users_id}`, { expires: 15 })

            this.props.handleSuccessfulAuth();
         } else {
            this.setState({
               errorText: "Wrong email or password"
            })
         }
      }).catch(error => {
         this.setState({
            errorText: "An error ocurred"
         })
      });
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
                     <h1>Log in to your account</h1>
                  </div>


                  <form onSubmit={this.handleSubmit} className="login-form">
                     <div>{this.state.errorText}</div>

                     <div className="form-group">
                        <label htmlFor="email"><b>Email address</b></label>

                        <div className="inputs">
                           <FontAwesomeIcon icon="envelope" />
                           <input
                              type="email"
                              name="email"
                              placeholder="Email address"
                              value={this.state.email}
                              onChange={this.handleChange}
                           />
                        </div>
                     </div>

                     <div className="form-group">
                        <label htmlFor="password"><b>Password</b></label>

                        <div className="inputs">
                           <FontAwesomeIcon icon="lock" />
                           <input
                              type="password"
                              name="password"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={this.handleChange}
                           />
                        </div>
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