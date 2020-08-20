import React, { Component } from "react";
import ReactModal from "react-modal";

import DeleteStudentAlert from "./delete-student-alert"

ReactModal.setAppElement(".app-wrapper");

export default class ModalDeleteGroup extends Component {
   constructor(props) {
      super(props);

      this.customStyles = {
         content: {
            top: "50%",
            left: "50%",
            rigth: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "200px"
         },
         overlay: {
            backgroundColor: "rgba(1, 1, 1, 0.75)"
         }
      }

      this.handleModalDeleteStudentClose = this.handleModalDeleteStudentClose.bind(this)
      this.handleDeleteStudent = this.handleDeleteStudent.bind(this)
   }

   handleDeleteStudent(id) {
      this.props.handleDeleteStudent(id)
   }

   handleModalDeleteStudentClose() {
      this.props.handleModalDeleteStudentClose()
   }

   render() {
      return (
         <ReactModal
            style={this.customStyles}
            onRequestClose={() => {
               this.props.handleModalDeleteStudentClose();
            }}
            isOpen={this.props.modalIsOpen}
         >

            <DeleteStudentAlert
               handleModalDeleteStudentClose={this.handleModalDeleteStudentClose}
               handleDeleteStudent={this.handleDeleteStudent}
               studentId={this.props.studentId}
               studentName={this.props.studentName}
            />
         </ReactModal>
      )
   }
}