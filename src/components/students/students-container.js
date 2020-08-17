import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import StudentsItem from "./students-item"


export default function Students(props) {
   const [students, setStudents] = useState([])
   const [studentsFilter, setStudentsFilter] = useState([])
   const [groupName, setGroupName] = useState("")

   const clearFilter = () => {
      setStudents(studentsFilter)
   }

   const handleFilter = filter => {
      clearFilter()
      setStudents(studentsFilter.filter((item) => {
         return item.students_gender === filter
      }))
   }

   const getStudentsItems = () => {
      axios.get(`https://class-cash-api-ejlt.herokuapp.com/students/${props.groupId}`)
         .then(response => {
            console.log("class", response.data)

            setStudents(
               response.data
            )

            setStudentsFilter(
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
         <div className="group-name-title">
            <p >Group: {groupName}</p>

            <div className="filter-buttons">
               <p>Filter by: </p>

               <button className='boy-filter' onClick={() => handleFilter('M')}>
                  Boys
               </button>

               <button className='girl-filter' onClick={() => handleFilter('F')}>
                  Girls
               </button>

               <button className='clear-filter' onClick={() => clearFilter()}>
                  Clear Filter
               </button>
            </div>
         </div>

         <div className="students-items-wrapper">
            {studentsItems()}
         </div>
      </div>
   )
}