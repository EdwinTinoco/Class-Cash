import React, { Component } from "react";
import ReactModal from "react-modal";

import NewGroupForm from "./new-group-form"

ReactModal.setAppElement(".app-wrapper");

export default class ModalInsertNewGroup extends Component {
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
            height: "300px"
         },
         overlay: {
            backgroundColor: "rgba(1, 1, 1, 0.75)"
         }
      }

      this.handleModalClose = this.handleModalClose.bind(this)
      this.handleSubmitInsertNewGroup = this.handleSubmitInsertNewGroup.bind(this)
   }

   handleSubmitInsertNewGroup(nameClass) {
      this.props.handleSubmitInsertNewGroup(nameClass)
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

            <NewGroupForm
               handleModalClose={this.handleModalClose}
               handleSubmitInsertNewGroup={this.handleSubmitInsertNewGroup}
            />
         </ReactModal>
      )
   }
}