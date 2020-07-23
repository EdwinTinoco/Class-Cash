import React, { useState, useContext, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom";

import Logo from '../../../static/assets/images/logo/class-cash-logo.png'
import Footer from "../footer/footer"


export default function Register(props) {
   const [userFirstName, setUserFirstName] = useState('')
   const [userLastName, setUserLastName] = useState('')
   const [userAddress, setUserAddress] = useState("")
   const [userZipCode, setUserZipCode] = useState('')
   const [userPhoneNumber, setUserPhoneNumber] = useState('')
   const [userGrade, setUserGrade] = useState(2)
   const [userEmail, setUserEmail] = useState('')
   const [userPassword, setUserPassword] = useState("")
   const [messageUser, setMessageUser] = useState("")

   const handleSubmitRegisterNewUser = () => {
      event.preventDefault();

      axios
         .post(
            'http://localhost:5000/add-user',
            {
               users_first_name: userFirstName,
               users_last_name: userLastName,
               users_address: userAddress,
               users_zip_code: userZipCode,
               users_phone_number: userPhoneNumber,
               users_grades_id: parseInt(userGrade),
               users_email: userEmail,
               users_password: userPassword,
               users_active: "yes"
            },
         )
         .then(response => {
            console.log("new user", response.data)

            setUserFirstName('')
            setUserLastName('')
            setUserAddress('')
            setUserZipCode('')
            setUserPhoneNumber('')
            setUserGrade(2)
            setUserEmail('')
            setUserPassword('')
            setMessageUser("User Added Succesfully!")
         })
         .catch(error => {
            console.log('handleSubmitRegisterNewUser error', error)
         })
   }


   return (
      <div className="signup-main-wrapper">
         <div className="have-an-account">
            <p>Already have an account?</p>

            <Link to="/auth">
               <div className="login-button">
                  Login
               </div>
            </Link>
         </div>

         <div className="signup-form-wrapper">
            <div className="left-side">
               <div className="logo">
                  <img src={Logo} alt='Logo' />
               </div>
            </div>
            <div className="right-side">
               <p>Sign up</p>

               <form onSubmit={handleSubmitRegisterNewUser} className="signup-form">
                  <input type='text'
                     value={userFirstName}
                     onChange={({ target }) => { setUserFirstName(target.value) }}
                     className='new-entry-input'
                     placeholder='First Name'>
                  </input>

                  <input type='text'
                     value={userLastName}
                     onChange={({ target }) => { setUserLastName(target.value) }}
                     className='new-entry-input'
                     placeholder='Last Name'>
                  </input>

                  <input type='text'
                     className='new-entry-input'
                     value={userAddress}
                     onChange={({ target }) => { setUserAddress(target.value) }}
                     placeholder='Address'>
                  </input>

                  <input type='text'
                     className='new-entry-input'
                     value={userZipCode}
                     onChange={({ target }) => { setUserZipCode(target.value) }}
                     placeholder='Zip Code'>
                  </input>

                  <input type='text'
                     className='new-entry-input'
                     value={userPhoneNumber}
                     onChange={({ target }) => { setUserPhoneNumber(target.value) }}
                     placeholder='Phone number'>
                  </input>

                  <select className='new-entry-input new-entry-select'
                     value={userGrade}
                     onChange={({ target }) => { setUserGrade(target.value) }}>
                     <option value={1}>First Grade</option>
                     <option value={2}>Second Grade</option>
                     <option value={3}>Third Grade</option>
                  </select>

                  <input type='email'
                     className='new-entry-input'
                     value={userEmail}
                     onChange={({ target }) => { setUserEmail(target.value) }}
                     placeholder='Email'>
                  </input>

                  <input type='password'
                     className='new-entry-input'
                     value={userPassword}
                     onChange={({ target }) => { setUserPassword(target.value) }}
                     placeholder='Password'>
                  </input>

                  <button type='submit' className='add-button'>Sign up</button>
               </form>
            </div>

         </div>


         <Footer />
      </div>
   )
}