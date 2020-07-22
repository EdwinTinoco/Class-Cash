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
         studentBankTotal: this.props.studentBankTotal,
         selectedOption: ""
      }

      this.customStyles = {
         content: {
            top: "50%",
            left: "50%",
            rigth: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "800px"
         },
         overlay: {
            backgroundColor: "rgba(1, 1, 1, 0.75)"
         }
      }

      // this.handleChange = this.handleChange.bind(this);
      this.handleDecrementBankTotal = this.handleDecrementBankTotal.bind(this);
      this.handleIncrementBankTotal = this.handleIncrementBankTotal.bind(this);
   }

   handleChange(e) {
      this.setState({
         selectedOption: e.target.value
      })
   }

   handleDecrementBankTotal = () => {
      let newBankTotal = parseInt(this.state.studentBankTotal) - parseInt(this.state.selectedOption)
      console.log(newBankTotal, this.state.studentId);

      fetch
         (`http://localhost:5000/update-bank/${this.state.studentId}`,
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

   handleIncrementBankTotal = () => {
      let newBankTotal = parseInt(this.state.studentBankTotal) + parseInt(this.state.selectedOption)
      console.log(newBankTotal, this.state.studentId);

      fetch
         (`http://localhost:5000/update-bank/${this.state.studentId}`,
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
               studentId={this.state.studentId}
               studentName={this.state.studentName}
               studentBankTotal={this.state.studentBankTotal}
            />

         </ReactModal>
      )
   }
}