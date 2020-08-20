import React, { Component } from "react";
import ReactModal from "react-modal";

import DeleteGroupAlert from "./delete-group-alert"

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
            height: "250px"
         },
         overlay: {
            backgroundColor: "rgba(1, 1, 1, 0.75)"
         }
      }

      this.handleModalDeleteGroupClose = this.handleModalDeleteGroupClose.bind(this)
      this.handleDeleteGroup = this.handleDeleteGroup.bind(this)
   }

   handleDeleteGroup(id) {
      this.props.handleDeleteGroup(id)
   }

   handleModalDeleteGroupClose() {
      this.props.handleModalDeleteGroupClose()
   }

   render() {
      return (
         <ReactModal
            style={this.customStyles}
            onRequestClose={() => {
               this.props.handleModalDeleteGroupClose();
            }}
            isOpen={this.props.modalIsOpen}
         >

            <DeleteGroupAlert
               handleModalDeleteGroupClose={this.handleModalDeleteGroupClose}
               handleDeleteGroup={this.handleDeleteGroup}
               groupId={this.props.groupId}
               groupName={this.props.groupName}
            />
         </ReactModal>
      )
   }
}