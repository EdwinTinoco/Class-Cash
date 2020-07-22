import React, { Component } from "react";
import axios from 'axios';

export default class StudentsBank extends Component {
   constructor(props) {
      super(props);

      this.state = {
         studentBankTotal: this.props.studentBankTotal,
         selectedOption: ""
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

   handleDecrementBankTotal() {
      this.setState({
         studentBankTotal: parseInt(this.state.studentBankTotal) - parseInt(this.state.selectedOption)
      })

      this.props.handleDecrementBankTotal(this.state.selectedOption)
   }

   handleIncrementBankTotal() {
      this.setState({
         studentBankTotal: parseInt(this.state.studentBankTotal) + parseInt(this.state.selectedOption)
      })

      this.props.handleIncrementBankTotal(this.state.selectedOption)
   }

   render() {
      return (
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
      )
   }
}