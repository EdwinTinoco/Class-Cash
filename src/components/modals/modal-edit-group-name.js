import React, { Component } from "react";
import ReactModal from "react-modal";

import EditGroupName from "./edit-group-name"

ReactModal.setAppElement(".app-wrapper");

export default class ModalEditGroupName extends Component {
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

      this.handleModalEditGroupNameClose = this.handleModalEditGroupNameClose.bind(this)
      this.handleEditGroupName = this.handleEditGroupName.bind(this)
   }

   handleEditGroupName(item) {
      this.props.handleEditGroupName(item)
   }

   handleModalEditGroupNameClose() {
      this.props.handleModalEditGroupNameClose()
   }

   render() {
      return (
         <ReactModal
            style={this.customStyles}
            onRequestClose={() => {
               this.props.handleModalEditGroupNameClose();
            }}
            isOpen={this.props.modalIsOpen}
         >

            <EditGroupName
               handleModalEditGroupNameClose={this.handleModalEditGroupNameClose}
               handleEditGroupName={this.handleEditGroupName}
               groupId={this.props.groupId}
               groupName={this.props.groupName}
            />
         </ReactModal>
      )
   }
}