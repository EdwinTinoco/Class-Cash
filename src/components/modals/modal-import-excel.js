import React, { Component } from "react";
import ReactModal from "react-modal";

import ImportExcel from "./import-excel"

ReactModal.setAppElement(".app-wrapper");

export default class ModalImportExcel extends Component {
   constructor(props) {
      super(props);

      this.customStyles = {
         content: {
            top: "50%",
            left: "50%",
            rigth: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "500px"
         },
         overlay: {
            backgroundColor: "rgba(1, 1, 1, 0.75)"
         }
      }

      this.handleModalClose = this.handleModalClose.bind(this)
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

            <ImportExcel
               handleModalClose={this.handleModalClose}
               item={this.props.item}
            />
         </ReactModal>
      )
   }
}