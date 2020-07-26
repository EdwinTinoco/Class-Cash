import React, { Component } from "react";
import ReactModal from "react-modal";

import StudentsBank from "../students/students-bank"

ReactModal.setAppElement(".app-wrapper");

export default class BankModal extends Component {
   constructor(props) {
      super(props);

      this.state = {
         studentId: this.props.studentId,
         studentName: this.props.studentName,
         studentImage: this.props.studentImage,
         studentBankTotal: this.props.studentBankTotal
      }

      this.customStyles = {
         content: {
            top: "50%",
            left: "50%",
            rigth: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "390px",
            height: "485px"
         },
         overlay: {
            backgroundColor: "rgba(1, 1, 1, 0.75)"
         }
      }

      this.handleDecrementBankTotal = this.handleDecrementBankTotal.bind(this);
      this.handleIncrementBankTotal = this.handleIncrementBankTotal.bind(this);
      this.handleModalClose = this.handleModalClose.bind(this)
   }

   handleModalClose() {
      this.props.handleModalClose()
   }


   handleDecrementBankTotal = (selectedOption) => {
      let newBankTotal = parseInt(this.state.studentBankTotal) - parseInt(selectedOption)
      console.log(newBankTotal, this.state.studentId);

      fetch
         (`https://class-cash-api-ejlt.herokuapp.com/update-bank/${this.state.studentId}`,
            {
               method: "PATCH",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                  bank_current_total: newBankTotal
               })
            })
         .then(res => {
            this.setState({
               selectedOption: "",
               studentBankTotal: newBankTotal
            })

            this.props.handleBankTotal(this.state.studentBankTotal)
         })
         .catch(err => console.log("handleDecrementBankTotal Error: ", err))
   }

   handleIncrementBankTotal = (selectedOption) => {
      let newBankTotal = parseInt(this.state.studentBankTotal) + parseInt(selectedOption)
      console.log(newBankTotal, this.state.studentId);

      fetch
         (`https://class-cash-api-ejlt.herokuapp.com/update-bank/${this.state.studentId}`,
            {
               method: "PATCH",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                  bank_current_total: newBankTotal
               })
            })
         .then(res => {
            this.setState({
               selectedOption: "",
               studentBankTotal: newBankTotal
            })

            this.props.handleBankTotal(this.state.studentBankTotal)
         })
         .catch(err => console.log("handleIncrementBankTotal Error: ", err))
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

            <StudentsBank
               studentName={this.state.studentName}
               studentImage={this.state.studentImage}
               studentBankTotal={this.state.studentBankTotal}
               handleDecrementBankTotal={this.handleDecrementBankTotal}
               handleIncrementBankTotal={this.handleIncrementBankTotal}
               handleModalClose={this.handleModalClose}
            />

         </ReactModal>
      )
   }
}