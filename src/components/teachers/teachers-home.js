import React from "react"

import NavigationBar from "../navigation/navigation-bar"
import TeachersContainer from './teachers-container';

export default function () {
   return (
      <div className="teachers-home-wrapper">
         <NavigationBar />

         <TeachersContainer />
      </div>
   )
}