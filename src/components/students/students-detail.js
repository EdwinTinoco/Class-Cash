import React, { useState, useEffect, useContext } from 'react';
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NavigationBar from "../navigation/navigation-bar"
import Footer from "../footer/footer"

export default function StudentDetail(props) {
   const [studentItem, setStudentItem] = useState({})

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
      StudentName,
      students_image_url,
      grades_name,
      bank_current_total,
      ParentsName,
      parents_address,
      parents_phone_number,
      parents_email
   } = studentItem

   return (
      <div className="student-detail-main-wrapper">

         <NavigationBar />

         <div className="student-detail-wrapper">
            <div className="image">
               <img src={students_image_url} alt="student image" />
            </div>
            <div className="details">
               <div className="student-name">
                  <p>{StudentName}</p>
               </div>

               <div className="bank-total">
                  <p>Bank: ${bank_current_total}</p>
               </div>

               <div className="student-info">
                  <p>School Grade: {grades_name}</p>
               </div>

               <div className="parents-info">
                  <h2>Parents Info</h2>
                  <p>Name: {ParentsName}</p>
                  <p>Address: {parents_address}</p>
                  <p>Phone: {parents_phone_number}</p>
                  <p>Email: {parents_email}</p>
               </div>
            </div>
         </div>

         <Footer />
      </div>
   )
}