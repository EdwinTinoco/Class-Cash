import React, { Component } from "react";
import ReactModal from "react-modal";

import ClassForm from "./class-form"

ReactModal.setAppElement(".app-wrapper");

export default class ModalInsertNewClass extends Component {
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
            height: "350px"
         },
         overlay: {
            backgroundColor: "rgba(1, 1, 1, 0.75)"
         }
      }

      this.handleModalClose = this.handleModalClose.bind(this)
      this.handleSubmitInsertNewClass = this.handleSubmitInsertNewClass.bind(this)
   }

   handleSubmitInsertNewClass(nameClass) {
      this.props.handleSubmitInsertNewClass(nameClass)
   }

   handleModalClose() {
      this.props.handleModalClose()
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

            <ClassForm
               handleModalClose={this.handleModalClose}
               handleSubmitInsertNewClass={this.handleSubmitInsertNewClass}
            />
         </ReactModal>
      )
   }
}