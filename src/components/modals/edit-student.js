import React, { useState } from "react"
import StudentProfileImage from "../students/student-profile-image";

export default function EditStudentForm(props) {
   const [studentId, setStudentId] = useState(props.item.students_id)
   const [studentFirstName, setStudentFirstName] = useState(props.item.students_first_name)
   const [studentLastName, setStudentLastName] = useState(props.item.students_last_name)
   const [studentUrlProfileImage, setStudentUrlProfileImage] = useState("")
   const [studentGender, setStudentGender] = useState(props.item.students_gender)
   const [selectedOption, setSelectedOption] = useState("")
   const [message, setMessage] = useState("")

   const handleProfileImage = (urlProfileImage) => {
      setStudentUrlProfileImage(
         urlProfileImage
      )
   }

   const handleModalClose = () => {
      props.handleModalClose()
   }

   const handleSubmitEditStudent = (e) => {
      e.preventDefault()

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

         const item = {
            students_id: studentId,
            students_first_name: studentFirstName,
            students_last_name: studentLastName,
            students_image_url: studentUrlProfileImage,
            students_gender: studentGender,
            bank_current_total: parseInt(selectedOption)
         }

         console.log('item student edit', item);


         // props.handleSubmitEditStudent(item)
         // setMessage('Student added successfully!')
      }
   }


   return (
      <div className="class-form-main-wrapper">
         <div className="title">
            <p>Edit Student info</p>
         </div>

         <form onSubmit={handleSubmitEditStudent} className="edit-student-form">
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
                  <select className='new-entry-input new-entry-select'
                     value={studentGender}
                     onChange={({ target }) => { setStudentGender(target.value) }}
                     id="gn"
                  >
                     <option value=''>Select a gender</option>
                     <option value="M">Male</option>
                     <option value="F">Female</option>
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

               <button type='submit' className='add-button'>Save Changes</button>
               <button type="button" onClick={handleModalClose}>Close</button>
            </div>
         </form>

      </div>
   )

}