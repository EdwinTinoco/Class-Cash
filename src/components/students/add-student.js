import React, { useState } from "react"
import axios from 'axios';

import NavigationBar from "../navigation/navigation-bar"
import StudentProfileImage from "./student-profile-image";

export default function AddStudent(props) {
   const [gradeName, setGradeName] = useState(props.location.state.gradeName)
   const [groupName, setGroupName] = useState(props.location.state.groupName)
   const [studentFirstName, setStudentFirstName] = useState('')
   const [studentLastName, setStudentLastName] = useState('')
   const [studentUrlProfileImage, setStudentUrlProfileImage] = useState('')
   const [studentGender, setStudentGender] = useState("")
   const [studentGradesId, setStudentGradesId] = useState(props.location.state.gradeId)
   const [studentGradesGroupsId, setStudentGradesGroupsId] = useState(props.location.state.groupId)
   const [selectedOption, setSelectedOption] = useState("")
   const [message, setMessage] = useState("")

   const handleProfileImage = (urlProfileImage) => {
      setStudentUrlProfileImage(
         urlProfileImage
      )
   }

   const handleSubmitAddStudent = () => {
      event.preventDefault();
      console.log('new student');
      console.log('gradeId, groupId', studentGradesId, studentGradesGroupsId);


      if (studentGender === "") {
         setMessage(
            "You need to select the gender"
         )
      } else if (studentUrlProfileImage === "") {
         setMessage(
            "You need to select a profile image"
         )
      } else if (selectedOption === "") {
         setMessage(
            "You need to select a cash amount"
         )
      } else {
         axios
            .post(
               'https://class-cash-api-ejlt.herokuapp.com/add-student',
               {
                  students_first_name: studentFirstName,
                  students_last_name: studentLastName,
                  students_image_url: studentUrlProfileImage,
                  students_gender: studentGender,
                  students_grades_id: parseInt(studentGradesId),
                  students_grades_groups_id: parseInt(studentGradesGroupsId),
                  bank_current_total: parseInt(selectedOption)
               },
            )
            .then(response => {
               console.log("new user", response.data)

               setStudentFirstName('')
               setStudentLastName('')
               setStudentUrlProfileImage('')
               setStudentGender('')
               setStudentGradesId('')
               setStudentGradesGroupsId('')
               setSelectedOption("")
               setMessage('Student added successfully!')
            })
            .catch(error => {
               console.log('handleSubmitAddStudent error', error)
            })
      }
   }

   return (
      <div className="add-student-main-wrapper">
         <NavigationBar />

         <div className="grade-group">
            <p>Grade: {gradeName}</p>
            <p>Group: {groupName}</p>
         </div>

         <form onSubmit={handleSubmitAddStudent} className="add-student-form">
            <div className="student-info">
               <div className="text-inputs">
                  <p className="title">Add Student Info</p>

                  <label htmlFor="sfn">First Name</label>
                  <input type='text'
                     value={studentFirstName}
                     onChange={({ target }) => { setStudentFirstName(target.value) }}
                     className='new-entry-input'
                     placeholder='First Name'
                     id="sfn"
                     required
                  >
                  </input>

                  <label htmlFor="sln">Last Name</label>
                  <input type='text'
                     className='new-entry-input'
                     value={studentLastName}
                     onChange={({ target }) => { setStudentLastName(target.value) }}
                     placeholder='Last Name'
                     id="sln"
                     required
                  >
                  </input>

                  <label htmlFor="gn">Gender</label>
                  <select className='new-entry-select'
                     value={studentGender}
                     onChange={({ target }) => { setStudentGender(target.value) }}
                     id="gn"
                  >
                     <option value=''>Select a gender</option>
                     <option value="M">Girl</option>
                     <option value="F">Boy</option>
                  </select>
               </div>

               <div className="profiles-images-wrapper">
                  <p className="title">Select Student Profile Image</p>

                  <div className="profiles-images-items">
                     <StudentProfileImage handleProfileImage={handleProfileImage} />
                  </div>
               </div>

               <div className="radio-inputs">
                  <p className="title">Select Cash Amount</p>

                  <div className="radios">
                     <div className="left-side">
                        <div className="radio">
                           <input
                              type="radio"
                              value="0"
                              id="op0"
                              checked={selectedOption === '0'}
                              onChange={({ target }) => { setSelectedOption(target.value) }}
                           />
                           <label htmlFor="op0">$0</label>
                        </div>

                        <div className="radio">
                           <input
                              type="radio"
                              value="1"
                              id="op1"
                              checked={selectedOption === '1'}
                              onChange={({ target }) => { setSelectedOption(target.value) }}
                           />
                           <label htmlFor="op1">$1</label>
                        </div>

                        <div className="radio">
                           <input
                              type="radio"
                              value="5"
                              id="op5"
                              checked={selectedOption === '5'}
                              onChange={({ target }) => { setSelectedOption(target.value) }}
                           />
                           <label htmlFor="op5">$5</label>
                        </div>

                        <div className="radio">
                           <input
                              type="radio"
                              value="10"
                              id="op10"
                              checked={selectedOption === '10'}
                              onChange={({ target }) => { setSelectedOption(target.value) }}
                           />
                           <label htmlFor="op10">$10</label>
                        </div>
                     </div>

                     <div className="right-side">
                        <div className="radio">
                           <input
                              type="radio"
                              value="20"
                              id="op20"
                              checked={selectedOption === '20'}
                              onChange={({ target }) => { setSelectedOption(target.value) }}
                           />
                           <label htmlFor="op20">$20</label>
                        </div>

                        <div className="radio">
                           <input
                              type="radio"
                              value="50"
                              id="op50"
                              checked={selectedOption === '50'}
                              onChange={({ target }) => { setSelectedOption(target.value) }}
                           />
                           <label htmlFor="op50">$50</label>
                        </div>

                        <div className="radio">
                           <input
                              type="radio"
                              value="100"
                              id="op100"
                              checked={selectedOption === '100'}
                              onChange={({ target }) => { setSelectedOption(target.value) }}
                           />
                           <label htmlFor="op100">$100</label>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="btn-message">
               <div className="message">
                  <p>{message}</p>
               </div>

               <button type='submit' className='add-button'>Add Student</button>
            </div>
         </form>
      </div>
   )
}