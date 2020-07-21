import React from "react";

import NavigationBar from "../navigation/navigation-bar"
import StudentsContainer from './students-container';
import Footer from "../footer/footer"

export default function (props) {
   return (
      <div className="students-home-wrapper">
         <NavigationBar />
         <StudentsContainer groupId={props.match.params.slug} />
         <Footer />
      </div>
   )
}