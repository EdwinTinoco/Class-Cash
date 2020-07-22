import React, { Component } from "react";
import ReactModal from "react-modal";

// import BlogForm from "../blog/blog-form"

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

      this.handleChange = this.handleChange.bind(this);
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
            <div className="modal-main-wrapper">
               <div className="student-info">
                  <div className='student-name'>
                     <p>{this.props.studentName}</p>
                  </div>

                  <div className='student-bank-amount'>
                     <p>${this.state.studentBankTotal}</p>
                  </div>
               </div>

               <div className="radio-inputs">
                  <div className="radio">
                     <label>
                        <input
                           type="radio"
                           value="1"
                           checked={this.state.selectedOption === '1'}
                           onChange={this.handleChange}
                        />
                        $1
                     </label>
                  </div>

                  <div className="radio">
                     <label>
                        <input
                           type="radio"
                           value="5"
                           checked={this.state.selectedOption === '5'}
                           onChange={this.handleChange}
                        />
                        $5
                     </label>
                  </div>

                  <div className="radio">
                     <label>
                        <input
                           type="radio"
                           value="10"
                           checked={this.state.selectedOption === '10'}
                           onChange={this.handleChange}
                        />
                        $10
                     </label>
                  </div>

                  <div className="radio">
                     <label>
                        <input
                           type="radio"
                           value="20"
                           checked={this.state.selectedOption === '20'}
                           onChange={this.handleChange}
                        />
                        $20
                     </label>
                  </div>

                  <div className="radio">
                     <label>
                        <input
                           type="radio"
                           value="50"
                           checked={this.state.selectedOption === '50'}
                           onChange={this.handleChange}
                        />
                        $50
                     </label>
                  </div>

                  <div className="radio">
                     <label>
                        <input
                           type="radio"
                           value="100"
                           checked={this.state.selectedOption === '100'}
                           onChange={this.handleChange}
                        />
                        $100
                     </label>
                  </div>
               </div>

               <div className="buttons-inc-dec">
                  <button type="button" onClick={this.handleDecrementBankTotal}>-</button>
                  <button type="button" onClick={this.handleIncrementBankTotal}>+</button>
               </div>

               <div className="button-close-modal">
                  <button type="button" onClick={this.props.handleModalClose}>Close</button>
               </div>
            </div>
         </ReactModal>
      )
   }
}