import React, { useState, useEffect, useContext } from 'react';
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NavigationBar from "../navigation/navigation-bar"
import Footer from "../footer/footer"

export default function StudentDetail(props) {
   const [studentItem, setStudentItem] = useState({})
   const [message, setMessage] = useState("")

   const handleDeleteStudent = (studentId) => {
      fetch(`https://class-cash-api-ejlt.herokuapp.com/delete-student/${studentId}`, {
         method: "DELETE"
      })
         .then(response => {
            console.log('response delete student', response.data);

            setMessage(
               "Student deleted succesfully!"
            )
         })
         .catch(error => {
            console.log('handleDeleteStudent error', error);
         })
   }

   const getStudentItem = () => {
      axios.get(`https://class-cash-api-ejlt.herokuapp.com/student/${props.match.params.slug}`)
         .then(response => {
            setStudentItem(response.data[0])
         }).catch(error => {
            console.log('getStudentItem error', error);
         })
   }

   useEffect(() => {
      getStudentItem();
   }, [])

   const {
      students_id,
      students_first_name,
      students_last_name,
      students_image_url,
      students_gender,
      grades_name,
      grades_groups_name,
      bank_current_total
   } = studentItem

   return (
      <div className="student-detail-main-wrapper">

         <NavigationBar />

         <div className="edit-delete">
            <div className="icon-edit">
               <p><FontAwesomeIcon icon="edit" /> Edit student info</p>
            </div>

            <div className="icon-delete">
               <p>Delete student <FontAwesomeIcon icon="trash" onClick={() => handleDeleteStudent(students_id)} /></p>
            </div>
         </div>

         <div className="student-detail-wrapper">
            <div className="image">
               <img src={students_image_url} alt="student image" />
            </div>

            <div className="details">
               <div className="title">
                  <p>Student Info</p>
               </div>

               <div className="first-name">
                  <p>First name: {students_first_name}</p>
               </div>

               <div className="last-name">
                  <p>Last name: {students_last_name}</p>
               </div>

               <div className="gender">
                  <p>Gender: {students_gender}</p>
               </div>

               <div className="student-info">
                  <p>Grade: {grades_name}</p>
               </div>

               <div className="student-info">
                  <p>Group: {grades_groups_name}</p>
               </div>

               <div className="bank-total">
                  <p>Bank: ${bank_current_total}</p>
               </div>

               <div className="message">
                  <p>{message}</p>
               </div>
            </div>
         </div>

         <Footer />
      </div>
   )
}