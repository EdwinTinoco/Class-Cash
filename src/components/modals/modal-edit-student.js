import React, { Component } from "react";
import ReactModal from "react-modal";

import EditStudentForm from "./edit-student"

ReactModal.setAppElement(".app-wrapper");

export default class ModalEditStudent extends Component {
   constructor(props) {
      super(props);

      this.customStyles = {
         content: {
            top: "50%",
            left: "50%",
            rigth: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "580px",
            height: "635px"
         },
         overlay: {
            backgroundColor: "rgba(1, 1, 1, 0.75)"
         }
      }

      this.handleModalClose = this.handleModalClose.bind(this)
      this.handleSubmitEditStudent = this.handleSubmitEditStudent.bind(this)
   }

   handleModalClose() {
      this.props.handleModalClose()
   }

   handleSubmitEditStudent(item) {
      this.props.handleSubmitEditStudent(item)
   }

   render() {
      return (
         <ReactModal
            style={this.customStyles}
            onRequestClose={() => {
               this.props.handleModalClose();
            }}
            isOpen={this.props.modalIsOpen}
         >

            <EditStudentForm
               handleModalClose={this.handleModalClose}
               handleSubmitEditStudent={this.handleSubmitEditStudent}
               item={this.props.item}
            />
         </ReactModal>
      )
   }
}