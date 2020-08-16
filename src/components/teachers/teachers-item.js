import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class GradeAndGroupsItem extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div className="grades-groups-item-wrapper">
            <div className='grades-groups-links-wrapper'>
               <Link to={`/students-home/${this.props.item.grades_groups_id}`}>
                  {this.props.item.grades_groups_name}
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
                     <FontAwesomeIcon icon="file-excel" />
                  </div>

                  <div className="title">
                     Import excel
                  </div>
               </div>

               {/* <div className="separation">
                  |
               </div> */}

               <div className="icon-delete">
                  <FontAwesomeIcon icon="trash" onClick={() => this.props.handleDeleteGroup(this.props.item.grades_groups_id)} />
               </div>
            </div>
         </div>
      )
   }
}