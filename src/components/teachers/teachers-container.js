import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'

import GradeAndGroupsItem from "./teachers-item"

export default function TeachersContainer() {
   const [user, setUser] = useState({})
   const [gradesGroups, setGradesGroups] = useState([])
   const [oneItem, setOneItem] = useState({})
   const [error, setError] = useState("")

   const handleLogout = () => {
      console.log('logout');
      setUser({})
      setGradesGroups([])
      setOneItem({})
      Cookies.remove("_sb%_user%_session")
      window.location.reload(false);
   }


   const getTeachersGradesGroups = () => {
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

         axios.get(`https://class-cash-api-ejlt.herokuapp.com/user/${userId}`)
            .then(response => {
               console.log('response navbar', response.data);

               if (response.data.length > 0) {
                  axios.get(`https://class-cash-api-ejlt.herokuapp.com/grades-groups/${userId}`)
                     .then(response => {
                        console.log('response groups', response.data);

                        setGradesGroups(
                           response.data
                        )

                        setOneItem(
                           response.data[0]
                        )

                     }).catch(error => {
                        setError(
                           "An error ocurred"
                        )
                     });

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

   const teachersGradesGroupsItems = () => {
      return gradesGroups.map(item => {
         return (
            <GradeAndGroupsItem key={item.grades_groups_id} item={item} />
         )
      })
   }

   useEffect(() => {
      getTeachersGradesGroups()
   }, [])


   return (
      <div className="grade-groups-main-wrapper">
         <div className="teacher-info">
            <p className="teacher-name">Teacher: {oneItem.Username}</p>
            <p className="grade">Grade: {oneItem.grades_name}</p>
         </div>

         <div className="title">
            <p>Groups</p>
         </div>

         <div className="grade-groups-items-wrapper">
            {teachersGradesGroupsItems()}
         </div>
      </div>
   )
}