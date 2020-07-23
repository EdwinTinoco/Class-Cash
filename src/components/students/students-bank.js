import React, { Component } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class StudentsBank extends Component {
   constructor(props) {
      super(props);

      this.state = {
         studentBankTotal: this.props.studentBankTotal,
         selectedOption: "",
         message: ""
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleDecrementBankTotal = this.handleDecrementBankTotal.bind(this);
      this.handleIncrementBankTotal = this.handleIncrementBankTotal.bind(this);
      this.handleModalClose = this.handleModalClose.bind(this)
   }

   handleChange(e) {
      this.setState({
         selectedOption: e.target.value,
         message: ""
      })
   }

   handleModalClose() {
      this.props.handleModalClose()
   }

   handleDecrementBankTotal() {
      this.setState({
         studentBankTotal: parseInt(this.state.studentBankTotal) - parseInt(this.state.selectedOption),
         selectedOption: "",
         message: `You subtracted $${this.state.selectedOption}`
      })

      this.props.handleDecrementBankTotal(this.state.selectedOption)
   }

   handleIncrementBankTotal() {
      this.setState({
         studentBankTotal: parseInt(this.state.studentBankTotal) + parseInt(this.state.selectedOption),
         selectedOption: "",
         message: `You added $${this.state.selectedOption}`
      })

      this.props.handleIncrementBankTotal(this.state.selectedOption)
   }

   render() {
      return (
         <div className="modal-main-wrapper">
            <div className="student-info">
               <div className="student-name-image">
                  <div className="student-image">
                     <img src={this.props.studentImage} alt='students-pic' />
                  </div>

                  <div className='student-name'>
                     <p>{this.props.studentName}</p>
                  </div>
               </div>

               <div className='student-bank-amount'>
                  <p>${this.state.studentBankTotal}</p>
               </div>
            </div>

            <div className="select-title">
               <p>Select one option</p>
            </div>

            <div className="radio-inputs">
               <div className="left-column">
                  <div className="radio">
                     <input
                        type="radio"
                        value="1"
                        id="op1"
                        checked={this.state.selectedOption === '1'}
                        onChange={this.handleChange}
                     />
                     <label htmlFor="op1">$1</label>
                  </div>

                  <div className="radio">
                     <input
                        type="radio"
                        value="5"
                        id="op5"
                        checked={this.state.selectedOption === '5'}
                        onChange={this.handleChange}
                     />
                     <label htmlFor="op5">$5</label>
                  </div>

                  <div className="radio">
                     <input
                        type="radio"
                        value="10"
                        id="op10"
                        checked={this.state.selectedOption === '10'}
                        onChange={this.handleChange}
                     />
                     <label htmlFor="op10">$10</label>
                  </div>
               </div>

               <div className="right-column">
                  <div className="radio">
                     <input
                        type="radio"
                        value="20"
                        id="op20"
                        checked={this.state.selectedOption === '20'}
                        onChange={this.handleChange}
                     />
                     <label htmlFor="op20">$20</label>
                  </div>

                  <div className="radio">
                     <input
                        type="radio"
                        value="50"
                        id="op50"
                        checked={this.state.selectedOption === '50'}
                        onChange={this.handleChange}
                     />
                     <label htmlFor="op50">$50</label>
                  </div>

                  <div className="radio">
                     <input
                        type="radio"
                        value="100"
                        id="op100"
                        checked={this.state.selectedOption === '100'}
                        onChange={this.handleChange}
                     />
                     <label htmlFor="op100">$100</label>
                  </div>
               </div>
            </div>

            <div className="buttons-inc-dec">
               <button type="button" onClick={this.handleDecrementBankTotal}>
                  <div className="icon">
                     <FontAwesomeIcon icon="minus-circle" />
                  </div>
               </button>

               <button type="button" onClick={this.handleIncrementBankTotal}>
                  <div className="icon">
                     <FontAwesomeIcon icon="plus-circle" />
                  </div>
               </button>


               <div className="message">
                  <p>{this.state.message}</p>
               </div>
            </div>

            <hr />

            <div className="button-close-modal">
               <button type="button" onClick={this.handleModalClose}>Close</button>
            </div>
         </div>
      )
   }
}