import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import GradeAndGroupsItem from "./teachers-item"
import ModalInsertNewGroup from "../modals/modal-insert-new-group"

export default function TeachersContainer() {
   const [user, setUser] = useState({})
   const [gradesGroups, setGradesGroups] = useState([])
   const [componentModalIsOpen, setComponentModalIsOpen] = useState(false)

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

   const handleLogout = () => {
      console.log('logout');
      setUser({})
      setGradesGroups([])
      setOneItem({})
      Cookies.remove("_sb%_user%_session")
      window.location.reload(false);
   }

   const handleSubmitInsertNewGroup = (nameClass) => {
      console.log('nameClass', nameClass);
      console.log('user', user);

      axios.post('https://class-cash-api-ejlt.herokuapp.com/grades-groups/add-group',
         {
            grades_groups_name: nameClass,
            grades_groups_grades_id: parseInt(user.grades_id),
            grades_groups_users_id: parseInt(user.users_id)
         })
         .then(response => {
            console.log('response insert new class', response.data);

            window.location.reload(false);
         })
         .catch(error => {
            console.log("handleSubmitInsertNewGroup error: ", error);
         })
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
                  setUser(
                     response.data[0]
                  )

                  axios.get(`https://class-cash-api-ejlt.herokuapp.com/grades-groups/${userId}`)
                     .then(response => {
                        console.log('response groups', response.data);

                        setGradesGroups(
                           response.data
                        )

                     }).catch(error => {
                        console.log('getGradesGroups error', error);
                     });

               } else {
                  handleLogout()
               }

            }).catch(error => {
               console.log('getUser error', error);
            });
      }
   }

   const teachersGradesGroupsItems = () => {
      return gradesGroups.map(item => {
         return (
            <GradeAndGroupsItem
               key={item.grades_groups_id}
               item={item}
            />
         )
      })
   }

   useEffect(() => {
      getTeachersGradesGroups()
   }, [])


   return (
      <div className="grade-groups-main-wrapper">
         <div className="teacher-info-add-group">
            {/* <div className="teacher-info">
               <p className="teacher-name">Teacher: {user.Username}</p>
               <p className="grade">Grade: {user.grades_name}</p>
            </div> */}

            <div className="title">
               <p>Groups</p>
            </div>

            <div className="add-class">
               <p>Add Group</p>
               <FontAwesomeIcon icon="plus-circle" onClick={handleModalOpen} />
            </div>
         </div>

         <ModalInsertNewGroup
            handleModalClose={handleModalClose}
            modalIsOpen={componentModalIsOpen}
            handleSubmitInsertNewGroup={handleSubmitInsertNewGroup}
         />

         <div className="grade-groups-items-wrapper">
            {teachersGradesGroupsItems()}
         </div>
      </div>
   )
}