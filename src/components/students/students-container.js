import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

import StudentsItem from "./students-item"

export default function Students(props) {
   const [students, setStudents] = useState([])
   const [groupName, setGroupName] = useState("")

   const getStudentsItems = () => {
      axios.get(`http://localhost:5000/students/${props.groupId}`)
         .then(response => {
            console.log("class", response.data)

            setStudents(
               response.data
            )
            let tempGroupName = ""
            if (response.data.length > 0) {
               tempGroupName = response.data[0].grades_groups_name
            } else {
               tempGroupName = response.data.grades_groups_name
            }
            console.log('groupName', tempGroupName);

            setGroupName(
               tempGroupName
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
         {groupName}

         <div className="students-items-wrapper">
            {studentsItems()}
         </div>
      </div>
   )
}