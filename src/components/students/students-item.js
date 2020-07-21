import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      console.log('entrando al handleBankTotal', studentBankTotal);

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
               <Link to={`/student/${students_id}`}>
                  <img src={Image} alt='students-pic' />
               </Link>
            </div>

            <div className='students-info-wrapper'>
               <div className='student-name'>
                  <Link to={`/student/${students_id}`}>
                     <p>{Nombre}</p>
                  </Link>
               </div>

               <div className='student-bank-amount'>
                  <p>${this.state.bankTotal}</p>
               </div>
            </div>

            <div className="modal">
               <BankModal
                  handleModalClose={this.handleModalClose}
                  modalIsOpen={this.state.bankModalIsOpen}
                  handleBankTotal={this.handleBankTotal}
                  studentId={students_id}
                  studentName={Nombre}
                  studentBankTotal={this.state.bankTotal}
               />

               <div className="button-modal">
                  <a onClick={this.handleNewBankClick}>
                     <FontAwesomeIcon icon="plus-circle" />
                  </a>
               </div>
            </div>
         </div>
      )
   }
}