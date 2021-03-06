import React, { Component } from 'react';
import { Link } from "react-router-dom";

import BankModal from "../modals/modal-bank"

export default class StudentsItem extends Component {
   constructor(props) {
      super(props);

      this.state = {
         bankTotal: this.props.item.Total,
         bankModalIsOpen: false
      }

      this.handleNewBankClick = this.handleNewBankClick.bind(this)
      this.handleModalClose = this.handleModalClose.bind(this)
      this.handleBankTotal = this.handleBankTotal.bind(this)
   }

   handleModalClose() {
      this.setState({
         bankModalIsOpen: false
      })
   }

   handleNewBankClick() {
      this.setState({
         bankModalIsOpen: true
      })
   }

   handleBankTotal(studentBankTotal) {
      this.setState({
         bankTotal: studentBankTotal
      })
   }


   render() {
      const {
         students_id,
         Nombre,
         Image,
         Total
      } = this.props.item;

      return (

         <div className="students-item-wrapper">
            <div className='student-image'>
               <div className="modal">
                  <BankModal
                     handleModalClose={this.handleModalClose}
                     modalIsOpen={this.state.bankModalIsOpen}
                     handleBankTotal={this.handleBankTotal}
                     studentId={students_id}
                     studentName={Nombre}
                     studentImage={Image}
                     studentBankTotal={this.state.bankTotal}
                  />

                  <div className="button-modal">
                     <a onClick={this.handleNewBankClick}>
                        <img src={Image} alt='students-pic' />
                     </a>
                  </div>
               </div>
            </div>

            <div className='students-info-wrapper'>
               <div className='student-name'>
                  <p>{Nombre}</p>
               </div>

               <div className='student-bank-amount'>
                  <p>${this.state.bankTotal}</p>
               </div>

               <div className='student-info-link'>
                  <Link to={`/student/${students_id}`}>
                     <p>Student detail</p>
                  </Link>
               </div>
            </div>
         </div>
      )
   }
}