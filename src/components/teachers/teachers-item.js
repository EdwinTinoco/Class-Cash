import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalImportExcel from "../modals/modal-import-excel"

export default function GradeAndGroupsItem(props) {
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

   return (
      <div className="grades-groups-item-wrapper">
         <ModalImportExcel
            handleModalClose={handleModalClose}
            modalIsOpen={componentModalIsOpen}
            item={props.item}
         />

         <div className='grades-groups-links-wrapper'>
            <Link to={`/students-home/${props.item.grades_groups_id}`}>
               {props.item.grades_groups_name}
            </Link>
         </div>

         <div className="icons-buttons">
            <div className="icon-edit">
               <FontAwesomeIcon icon="edit" />
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
               <FontAwesomeIcon icon="trash" onClick={() => props.handleDeleteGroup(props.item.grades_groups_id)} />
            </div>
         </div>
      </div>
   )
}