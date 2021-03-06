import React, { Component, useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import StudentsItem from "./students-item"


export default function Students(props) {
   const [user, setUser] = useState({})
   const [students, setStudents] = useState([])
   const [totalStudents, setTotalStudents] = useState(0)
   const [totalBoys, setTotalBoys] = useState(0)
   const [totalGirls, setTotalGirls] = useState(0)
   const [noStudentsInGroup, setNoStudentsInGroup] = useState(false)
   const [studentsFilter, setStudentsFilter] = useState([])
   const [groupName, setGroupName] = useState(props.groupName)

   const clearFilter = () => {
      setStudents(studentsFilter)
   }

   const handleFilter = filter => {
      clearFilter()
      setStudents(studentsFilter.filter((item) => {
         return item.students_gender === filter
      }))
   }

   const getUser = () => {
      let userCookie = Cookies.get("_sb%_user%_session")
      let temp = 0
      let userIdArr = []

      if (userCookie !== undefined) {
         for (var i = 0; i < userCookie.length; i++) {
            if (userCookie[i] == "%") {
               temp += 1
            }

            if (temp === 2) {
               if (userCookie[i] !== "%") {
                  userIdArr.push(userCookie[i])
               }
            }
         }

         let userId = userIdArr.join('')

         axios.get(`https://class-cash-api-ed.herokuapp.com/user/${userId}`)
            .then(response => {
               if (response.data.length > 0) {
                  setUser(
                     response.data[0]
                  )
               } else {
                  handleLogout()
               }

            }).catch(error => {
               setError(
                  "An error ocurred"
               )
            });
      }
   }

   const getStudentsItems = () => {
      axios.get(`https://class-cash-api-ed.herokuapp.com/students/${props.groupId}`)
         .then(response => {
            if (response.data.length > 0) {
               setStudents(
                  response.data
               )

               setStudentsFilter(
                  response.data
               )

               setNoStudentsInGroup(false)

               setTotalStudents(response.data.length)

               let boys = 0
               let girls = 0
               response.data.map(student => {
                  if (student.students_gender === "F") {
                     girls += 1
                     setTotalGirls(girls)
                  } else if (student.students_gender === "M") {
                     boys += 1
                     setTotalBoys(boys)
                  }
               })

            } else {
               setNoStudentsInGroup(true)
            }

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
      getUser()
   }, [])


   return (
      <div className="students-main-wrapper">
         <div className="group-name-title">
            <div className="add-student">
               <Link to={{
                  pathname: '/add-student',
                  state: { gradeId: user.grades_id, gradeName: user.grades_name, groupId: props.groupId, groupName: groupName }
               }}>
                  <FontAwesomeIcon icon="plus-circle" />
               </Link>

               <p>Add student</p>
            </div>

            <p className="group-name">Group: {groupName}</p>

            <div className="total-students">
               <div className="total">
                  <p>Total: {totalStudents}</p>
               </div>

               <div className="total-boys">
                  <p>Boys: {totalBoys}</p>
               </div>

               <div className="total-girls">
                  <p>Girls: {totalGirls}</p>
               </div>
            </div>

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

         {!noStudentsInGroup ? (
            <div className="students-items-wrapper">
               {studentsItems()}
            </div>
         ) :
            (
               <div className="message-no-students">
                  <p>There's no students in this group yet.</p>
               </div>
            )
         }
      </div>
   )
}