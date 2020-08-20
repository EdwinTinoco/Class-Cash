import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalImportExcel from "../modals/modal-import-excel"
import ModalDeleteGroup from "../modals/modal-delete-group"
import ModalEditGroupName from "../modals/modal-edit-group-name"

export default function GradeAndGroupsItem(props) {
   const [componentModalIsOpen, setComponentModalIsOpen] = useState(false)
   const [componentModalDeleteGroupIsOpen, setComponentModalDeleteGroupIsOpen] = useState(false)
   const [componentModalEditGroupNameIsOpen, setComponentModalEditGroupNameIsOpen] = useState(false)

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

   const handleModalDeleteGroupClose = () => {
      setComponentModalDeleteGroupIsOpen(
         false
      )
   }

   const handleModalDeleteGroupOpen = () => {
      setComponentModalDeleteGroupIsOpen(
         true
      )
   }

   const handleModalEditGroupNameClose = () => {
      setComponentModalEditGroupNameIsOpen(
         false
      )
   }

   const handleModalEditGroupNameOpen = () => {
      setComponentModalEditGroupNameIsOpen(
         true
      )
   }

   const handleEditGroupName = item => {
      axios.patch(`https://class-cash-api-ejlt.herokuapp.com/update-group/${item.groupId}`,
         {
            grades_groups_name: item.nameGroup
         }
      ).then(response => {
         console.log('response update group name', response.data);
         window.location.reload(false);
      })
         .catch(error => {
            console.log('handleEditGroupName error', error);
         })
   }

   const handleDeleteGroup = id => {
      fetch(`https://class-cash-api-ejlt.herokuapp.com/delete-group/${id}`, {
         method: "DELETE"
      })
         .then(response => {
            window.location.reload(false);
         })
         .catch(error => {
            console.log('handleDeleteGroup error', error);
         })
   }

   return (
      <div className="grades-groups-item-wrapper">
         <ModalEditGroupName
            handleModalEditGroupNameClose={handleModalEditGroupNameClose}
            modalIsOpen={componentModalEditGroupNameIsOpen}
            handleEditGroupName={handleEditGroupName}
            groupId={props.item.grades_groups_id}
            groupName={props.item.grades_groups_name}
         />

         <ModalImportExcel
            handleModalClose={handleModalClose}
            modalIsOpen={componentModalIsOpen}
            item={props.item}
         />

         <ModalDeleteGroup
            handleModalDeleteGroupClose={handleModalDeleteGroupClose}
            modalIsOpen={componentModalDeleteGroupIsOpen}
            handleDeleteGroup={handleDeleteGroup}
            groupId={props.item.grades_groups_id}
            groupName={props.item.grades_groups_name}
         />

         <div className='grades-groups-links-wrapper'>
            <Link to={`/students-home/${props.item.grades_groups_id}`}>
               {props.item.grades_groups_name}
            </Link>
         </div>

         <div className="icons-buttons">
            <div className="icon-edit">
               <FontAwesomeIcon icon="edit" onClick={handleModalEditGroupNameOpen} />
            </div>

            {/* <div className="separation">
                  |
               </div> */}

            <div className="import-excel">
               <div className="icon-import-excel">
                  <FontAwesomeIcon icon="file-excel" onClick={handleModalOpen} />
               </div>

               <div className="title">
                  Import excel
                  </div>
            </div>

            {/* <div className="separation">
                  |
               </div> */}

            <div className="icon-delete">
               <FontAwesomeIcon icon="trash" onClick={handleModalDeleteGroupOpen} />
            </div>
         </div>
      </div>
   )
}