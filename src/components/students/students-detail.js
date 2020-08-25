import React, { useState, useEffect, useContext } from 'react';
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NavigationBar from "../navigation/navigation-bar"
import ModalEditStudent from "../modals/modal-edit-student"
import ModalDeleteStudent from "../modals/modal-delete-student"

export default function StudentDetail(props) {
   const [studentItem, setStudentItem] = useState({})
   const [studentDelete, setStudentDelete] = useState(false)
   const [componentModalIsOpen, setComponentModalIsOpen] = useState(false)
   const [componentModalDeleteStudentIsOpen, setComponentModalDeleteStudentIsOpen] = useState(false)

   const handleModalClose = () => {
      setComponentModalIsOpen(
         false
      )
   }

   const handleModalOpen = () => {
      setComponentModalIsOpen(
         true
      )
   }

   const handleModalDeleteStudentClose = () => {
      setComponentModalDeleteStudentIsOpen(
         false
      )
   }

   const handleModalDeleteStudentOpen = () => {
      setComponentModalDeleteStudentIsOpen(
         true
      )
   }

   const handleDeleteStudent = (studentId) => {
      fetch(`https://class-cash-api-ejlt.herokuapp.com/delete-student/${studentId}`, {
         method: "DELETE"
      })
         .then(response => {
            console.log('response delete student', response.data);

            window.location.reload(false);
         })
         .catch(error => {
            console.log('handleDeleteStudent error', error);
         })
   }

   const handleSubmitEditStudent = (item) => {
      console.log('item student from modal', item);

      axios.put(`https://class-cash-api-ejlt.herokuapp.com/student-update/${item.students_id}`,
         {
            students_first_name: item.students_first_name,
            students_last_name: item.students_last_name,
            students_image_url: item.students_image_url,
            students_gender: item.students_gender,
            bank_current_total: item.bank_current_total
         }
      )
         .then(response => {
            console.log('respnse update student', response.data);

            window.location.reload(false);
         })
         .catch(error => {
            console.log('handleSubmitEditStudent error', error);
         })
   }

   const getStudentItem = () => {
      axios.get(`https://class-cash-api-ejlt.herokuapp.com/student/${props.match.params.slug}`)
         .then(response => {
            console.log('student', response.data);

            if (response.data.length > 0) {
               setStudentItem(response.data[0])
            } else {
               setStudentDelete(true)
            }
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

         {!studentDelete ? (
            <div className="student-info">
               <ModalEditStudent
                  handleModalClose={handleModalClose}
                  modalIsOpen={componentModalIsOpen}
                  handleSubmitEditStudent={handleSubmitEditStudent}
                  item={studentItem}
               />

               <ModalDeleteStudent
                  handleModalDeleteStudentClose={handleModalDeleteStudentClose}
                  modalIsOpen={componentModalDeleteStudentIsOpen}
                  handleDeleteStudent={handleDeleteStudent}
                  studentId={students_id}
                  studentName={`${students_first_name} ${students_last_name}`}
               />

               <div className="edit-delete">
                  <div className="icon-edit">
                     <p><FontAwesomeIcon icon="edit" onClick={handleModalOpen} /> Edit student info</p>
                  </div>

                  <div className="icon-delete">
                     <p>Delete student <FontAwesomeIcon icon="trash" onClick={handleModalDeleteStudentOpen} /></p>
                  </div>
               </div>

               <div className="student-detail-wrapper">
                  <div className="image">
                     <p>Profile Image</p>
                     <img src={students_image_url} alt="student image" />
                  </div>

                  <div className="details">
                     <div className="title">
                        <p>Student Info</p>
                     </div>

                     <div className="name">
                        <div className="first-name">
                           <label htmlFor="firstname">First name</label>
                           <p name="firstname">{students_first_name}</p>
                        </div>

                        <div className="last-name">
                           <label htmlFor="lastname">Last name</label>
                           <p name="lastname">{students_last_name}</p>
                        </div>
                     </div>

                     <div className="gender">
                        <label htmlFor="gen">Gender</label>
                        <p name="gen">{students_gender}</p>
                     </div>

                     <div className="grade-group">
                        <p>{grades_name}</p>
                        <p>Group: {grades_groups_name}</p>
                     </div>

                     <div className="bank-total">
                        <p>Cash: ${bank_current_total}</p>
                     </div>
                  </div>
               </div>
            </div>
         ) :
            (
               <div className="message">
                  <p>The student doesn't exist anymore</p>
               </div>
            )
         }
      </div>
   )
}