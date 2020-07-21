import React from "react";

import NavigationBar from "../navigation/navigation-bar"
import StudentsContainer from './students-container';
import Footer from "../footer/footer"

export default function () {
   return (
      <div className="students-home-wrapper">
         <NavigationBar />
         <StudentsContainer />
         <Footer />
      </div>
   )
}