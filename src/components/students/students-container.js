import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

import StudentsItem from "./students-item"

export default function Students(props) {
   const [students, setStudents] = useState([])
   const [group, setGroup] = useState("")

   const getStudentsItems = () => {
      // console.log('params', props.match.params.slug);


      axios.get(`http://localhost:5000/students/${2}`)
         .then(response => {
            console.log("hola", response.data)

            setStudents(
               response.data
            )

            setGroup(
               response.data[0].grades_groups_name
            )
         })
         .catch(error => {
            console.log("getStudentsItems error: ", error);
         })
   }

   const studentsItems = () => {
      return students.map(item => {
         return (
            <StudentsItem key={item.students_id} item={item} />
         )
      })
   }

   useEffect(() => {
      getStudentsItems()
   }, [])


   return (
      <div className="students-main-wrapper">
         {group}
         <div className="students-items-wrapper">
            {studentsItems()}
         </div>
      </div>
   )
}