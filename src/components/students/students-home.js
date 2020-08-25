import React from "react";

import NavigationBar from "../navigation/navigation-bar"
import StudentsContainer from './students-container';

export default function (props) {
   return (
      <div className="students-home-wrapper">
         <NavigationBar />

         <StudentsContainer groupId={props.match.params.slug} groupName={props.location.state.groupName} />
      </div>
   )
}