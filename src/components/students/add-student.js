import React, { useState } from "react"
import axios from 'axios';

import NavigationBar from "../navigation/navigation-bar"
import Footer from "../footer/footer"

export default function AddStudent(props) {
   const [studentFirstName, setStudentFirstName] = useState('')
   const [studentMiddleName, setStudentMiddleName] = useState('')
   const [studentLastName, setStudentLastName] = useState('')
   const [studentImageUrl, setStudentImageUrl] = useState("")
   const [studentBirthDate, setStudentBirthDate] = useState('')
   const [studentAddress, setStudentAddress] = useState('')
   const [studentContactPhoneNumber, setStudentContactPhoneNumber] = useState('')
   const [studentParentsId, setStudentParentsId] = useState(1)
   const [studentGradesId, setStudentGradesId] = useState("")
   const [studentGradesGroupsId, setStudentGradesGroupsId] = useState("")
   const [groups, setGroups] = useState([])
   const [selectedOption, setSelectedOption] = useState("")
   const [message, setMessage] = useState("")

   const handleChange = ({ target }) => {
      console.log('studentGradesId', target.value);

      if (target.value !== "") {
         axios.get(`https://class-cash-api-ejlt.herokuapp.com/groups/${target.value}`)
            .then(response => {
               console.log('groups options', response.data);

               setGroups(
                  response.data
               )
            })
            .catch(error => {
               console.log('GetOptions error', error)
            })
      }

      setStudentGradesId(target.value)
   }

   const handleSubmitAddStudent = () => {
      event.preventDefault();
      console.log('new student');

      if (studentGradesId === "" || studentGradesGroupsId === "") {
         setMessage(
            "You need to select an option for grade or group"
         )
      } else if (selectedOption === "") {
         setMessage(
            "You need to select a cash amount for the student"
         )
      } else {
         axios
            .post(
               'https://class-cash-api-ejlt.herokuapp.com/add-student',
               {
                  students_first_name: studentFirstName,
                  students_middle_name: studentMiddleName,
                  students_last_name: studentLastName,
                  students_image_url: studentImageUrl,
                  students_birth_date: studentBirthDate,
                  students_address: studentAddress,
                  students_contact_phone_number: studentContactPhoneNumber,
                  students_parents_id: parseInt(studentParentsId),
                  students_grades_id: parseInt(studentGradesId),
                  students_grades_groups_id: parseInt(studentGradesGroupsId),
                  bank_current_total: parseInt(selectedOption)
               },
            )
            .then(response => {
               console.log("new user", response.data)

               setStudentFirstName('')
               setStudentMiddleName('')
               setStudentLastName('')
               setStudentImageUrl('')
               setStudentBirthDate('')
               setStudentAddress('')
               setStudentContactPhoneNumber('')
               setStudentParentsId(1)
               setStudentGradesId('')
               setStudentGradesGroupsId('')
               setGroups([])
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

         <form onSubmit={handleSubmitAddStudent} className="add-student-form">
            <div className="student-info">
               <div className="text-inputs">
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

                  <label htmlFor="smn">Middle Name</label>
                  <input type='text'
                     value={studentMiddleName}
                     onChange={({ target }) => { setStudentMiddleName(target.value) }}
                     className='new-entry-input'
                     placeholder='Middle Name'
                     id="smn"
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

                  <label htmlFor="siu">Student Image</label>
                  <input type='text'
                     className='new-entry-input'
                     value={studentImageUrl}
                     onChange={({ target }) => { setStudentImageUrl(target.value) }}
                     placeholder='Student Image'
                     id="siu"
                  >
                  </input>

                  <label htmlFor="bd">Birthdate</label>
                  <input type='text'
                     className='new-entry-input'
                     value={studentBirthDate}
                     onChange={({ target }) => { setStudentBirthDate(target.value) }}
                     placeholder='YYYY-MM-DD'
                     id="bd"
                     required
                  >
                  </input>

                  <label htmlFor="ad">Address</label>
                  <input type='text'
                     className='new-entry-input'
                     value={studentAddress}
                     onChange={({ target }) => { setStudentAddress(target.value) }}
                     placeholder='Address'
                     id="ad"
                     required
                  >
                  </input>

                  <label htmlFor="cpn">Contact Phone Number</label>
                  <input type='text'
                     className='new-entry-input'
                     value={studentContactPhoneNumber}
                     onChange={({ target }) => { setStudentContactPhoneNumber(target.value) }}
                     placeholder='Contact Phone Number'
                     id="cpn"
                     required
                  >
                  </input>

                  <label htmlFor="gi">Grade</label>
                  <select className='new-entry-input new-entry-select'
                     value={studentGradesId}
                     onChange={handleChange}
                     id="gi"
                  >
                     <option value=''>Select an option</option>
                     <option value={1}>First Grade</option>
                     <option value={11}>Second Grade</option>
                     <option value={21}>Third Grade</option>
                     <option value={31}>Fourth Grade</option>
                     <option value={41}>Fifth Grade</option>
                  </select>

                  <label htmlFor="gg">Group</label>
                  <select className='new-entry-input new-entry-select'
                     value={studentGradesGroupsId}
                     onChange={({ target }) => { setStudentGradesGroupsId(target.value) }}
                     id="gg"
                  >
                     <option value=''>Select an option</option>
                     {studentGradesId !== "" ?
                        (groups.map((item, index) =>
                           <option value={item.grades_groups_id} key={index}>{item.grades_groups_name}</option>))
                        :
                        <option value=''></option>
                     }
                  </select>
               </div>

               <div className="radio-inputs">
                  <p>Select cash for the student:</p>
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

            <div className="btn-message">
               <p>{message}</p>
               <button type='submit' className='add-button'>Add Student</button>
            </div>
         </form>

         <Footer />
      </div>
   )
}