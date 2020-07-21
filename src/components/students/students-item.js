import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class StudentsItem extends Component {
   constructor(props) {
      super(props);

      this.state = {
         amountToChange: "",
         bankTotal: this.props.item.Total
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleDecrementBankTotal = this.handleDecrementBankTotal.bind(this);
      this.handleIncrementBankTotal = this.handleIncrementBankTotal.bind(this);
   }

   handleChange(e) {
      this.setState({
         [e.target.name]: e.target.value
      })
   }

   handleDecrementBankTotal = () => {
      let newBankTotal = parseInt(this.state.bankTotal) - parseInt(this.state.amountToChange)
      console.log(newBankTotal, this.props.item.students_id);

      fetch
         (`http://localhost:5000/update-bank/${this.props.item.students_id}`,
            {
               method: "PATCH",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                  bank_current_total: newBankTotal
               })
            })
         .then(res => {
            this.setState({
               amountToChange: "",
               bankTotal: newBankTotal
            })
         })
         .catch(err => console.log("handleDecrementBankTotal Error: ", err))
   }

   handleIncrementBankTotal = () => {
      let newBankTotal = parseInt(this.state.bankTotal) + parseInt(this.state.amountToChange)
      console.log(newBankTotal, this.props.item.students_id);

      fetch
         (`http://localhost:5000/update-bank/${this.props.item.students_id}`,
            {
               method: "PATCH",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                  bank_current_total: newBankTotal
               })
            })
         .then(res => {
            this.setState({
               amountToChange: "",
               bankTotal: newBankTotal
            })
         })
         .catch(err => console.log("handleIncrementBankTotal Error: ", err))
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

            <div className="input">
               <input
                  type="text"
                  placeholder="Type amount"
                  name="amountToChange"
                  value={this.state.amountToChange}
                  onChange={this.handleChange}
               />
            </div>

            <div className="buttons">
               <button type="button" onClick={this.handleDecrementBankTotal}>-</button>
               <button type="button" onClick={this.handleIncrementBankTotal}>+</button>
            </div>

         </div>
      )
   }
}