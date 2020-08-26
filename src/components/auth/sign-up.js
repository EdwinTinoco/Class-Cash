import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom";

import Logo from '../../../static/assets/images/content/school-3.jpg'

export default function Register(props) {
   const [userFirstName, setUserFirstName] = useState('')
   const [userLastName, setUserLastName] = useState('')
   const [userPhoneNumber, setUserPhoneNumber] = useState('')
   const [userGrade, setUserGrade] = useState("")
   const [grades, setGrades] = useState([])
   const [userEmail, setUserEmail] = useState('')
   const [userPassword, setUserPassword] = useState("")
   const [userConfirmPassword, setUserConfirmPassword] = useState("")
   const [errorsMessage, setErrorsMessage] = useState({})
   const [messageUser, setMessageUser] = useState("")

   const handleSubmitRegisterNewUser = () => {
      event.preventDefault();

      if (validate()) {
         axios
            .post(
               'https://class-cash-api-ed.herokuapp.com/register',
               {
                  users_first_name: userFirstName,
                  users_last_name: userLastName,
                  users_phone_number: userPhoneNumber,
                  users_grades_id: parseInt(userGrade),
                  users_email: userEmail.toLowerCase(),
                  users_password: userPassword,
                  users_active: "Y"
               },
            )
            .then(response => {
               if (response.data === "A user with that email already exist") {
                  setMessageUser(`${response.data}. Try it with another email`)
               } else {
                  setUserFirstName('')
                  setUserLastName('')
                  setUserPhoneNumber('')
                  setUserGrade("")
                  setUserEmail('')
                  setUserPassword('')
                  setUserConfirmPassword('')
                  setMessageUser(`${response.data}. You can login now!`)
               }
            })
            .catch(error => {
               console.log('handleSubmitRegisterNewUser error', error)
            })
      }
   }

   const getGrades = () => {
      axios.get('https://class-cash-api-ed.herokuapp.com/grades')
         .then(response => {
            setGrades(response.data)
         })
         .catch(error => {
            console.log('getGrades error', error);
         })
   }

   const validate = () => {
      let errors = {};
      let isValid = true;

      if (!userFirstName) {
         isValid = false;
         errors["userFirstName"] = "Please enter your first name";
      }

      if (!userLastName) {
         isValid = false;
         errors["userLastName"] = "Please enter your last name";
      }

      if (!userGrade) {
         isValid = false;
         errors["userGrade"] = "Please select a grade";
      }

      if (!userEmail) {
         isValid = false;
         errors["userEmail"] = "Please enter your email";
      }

      if (typeof userEmail !== "undefined") {
         var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

         if (!pattern.test(userEmail)) {
            isValid = false;
            errors["userEmail"] = "Please enter valid email address.";
         }
      }

      if (!userPassword) {
         isValid = false;
         errors["userPassword"] = "Please enter your password";
      }

      if (!userConfirmPassword) {
         isValid = false;
         errors["userConfirmPassword"] = "Please enter your confirm password";
      }

      if (typeof userPassword !== "undefined" && typeof userConfirmPassword !== "undefined") {

         if (userPassword != userConfirmPassword) {
            isValid = false;
            errors["userPassword"] = "Passwords don't match";
         }
      }

      setErrorsMessage(
         errors
      )

      return isValid;
   }

   useEffect(() => {
      getGrades()
   }, [])


   return (
      <div className="signup-main-wrapper">
         <div className="have-an-account">
            <div className="title">
               <p>Already have an account?</p>
            </div>

            <Link to="/auth">
               <div className="login-button">
                  Login
               </div>
            </Link>
         </div>

         <div className="signup-form-wrapper">
            <div className="left-side">
               <div className="image">
                  <img src={Logo} alt='Logo' />
               </div>
            </div>
            <div className="right-side">
               <p>Sign up</p>

               <form onSubmit={handleSubmitRegisterNewUser} className="signup-form">
                  <div className="form-group">
                     <label htmlFor="firstName"><b>*First Name</b></label>
                     <input type='text'
                        value={userFirstName}
                        onChange={({ target }) => { setUserFirstName(target.value) }}
                        className='new-entry-input'
                        name="firstName"
                        placeholder='First Name'
                     >
                     </input>
                     <div className="error-message">{errorsMessage.userFirstName}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="lastName"><b>*Last Name</b></label>
                     <input type='text'
                        value={userLastName}
                        onChange={({ target }) => { setUserLastName(target.value) }}
                        className='new-entry-input'
                        name="lastName"
                        placeholder='Last Name'
                     >
                     </input>
                     <div className="error-message">{errorsMessage.userLastName}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="phone"><b>Phone Number</b></label>
                     <input type='text'
                        value={userPhoneNumber}
                        onChange={({ target }) => { setUserPhoneNumber(target.value) }}
                        className='new-entry-input'
                        name="phone"
                        placeholder='Phone number'
                     >
                     </input>
                  </div>

                  <div className="form-group">
                     <label htmlFor="grade"><b>*Grade</b></label>
                     <select
                        value={userGrade}
                        onChange={({ target }) => { setUserGrade(target.value) }}
                        className='new-entry-select'
                        name="grade"
                     >
                        <option value=''>Select a grade</option>
                        {grades.map((item, index) =>
                           <option
                              value={item.grades_id}
                              key={index}
                           >
                              {item.grades_name}
                           </option>
                        )}
                     </select>
                     <div className="error-message">{errorsMessage.userGrade}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="email"><b>*Email</b></label>
                     <input type='text'
                        value={userEmail}
                        onChange={({ target }) => { setUserEmail(target.value) }}
                        className='new-entry-input'
                        name="email"
                        placeholder='Email'
                     >
                     </input>
                     <div className="error-message">{errorsMessage.userEmail}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="password"><b>*Password</b></label>
                     <input type='password'
                        value={userPassword}
                        onChange={({ target }) => { setUserPassword(target.value) }}
                        className='new-entry-input'
                        name="password"
                        placeholder='Password'
                     >
                     </input>
                     <div className="error-message">{errorsMessage.userPassword}</div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="confirmPassword"><b>*Confirm Password</b></label>
                     <input type='password'
                        value={userConfirmPassword}
                        onChange={({ target }) => { setUserConfirmPassword(target.value) }}
                        className='new-entry-input'
                        name="confirmPassword"
                        placeholder='Confirm Password'
                     >
                     </input>
                     <div className="error-message">{errorsMessage.userConfirmPassword}</div>
                  </div>

                  <div className="message">
                     <p>{messageUser}</p>
                  </div>

                  <button type='submit' className='add-button'>Sign up</button>

                  <p className="required">*Required</p>
               </form>
            </div>
         </div>
      </div>
   )
}