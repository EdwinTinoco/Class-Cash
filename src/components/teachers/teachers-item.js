import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class GradeAndGroupsItem extends Component {
   constructor(props) {
      super(props);

   }
   // console.log('group in items', props.item.grades_groups_id);
   render() {

      return (
         <div className="grades-groups-item-wrapper">
            <div className='grades-groups-links-wrapper'>
               <Link to={`/students-home/${this.props.item.grades_groups_id}`}>
                  {this.props.item.grades_groups_id}
                  {this.props.item.grades_groups_name}
               </Link>
            </div>
         </div>
      )
   }
}