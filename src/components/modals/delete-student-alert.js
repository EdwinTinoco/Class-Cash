import React, { Component } from "react"

export default class DeleteStudentAlert extends Component {
   constructor(props) {
      super(props);

      this.handleDeleteStudent = this.handleDeleteStudent.bind(this)
      this.handleModalDeleteStudentClose = this.handleModalDeleteStudentClose.bind(this)
   }

   handleModalDeleteStudentClose() {
      this.props.handleModalDeleteStudentClose()
   }

   handleDeleteStudent() {
      this.props.handleDeleteStudent(this.props.studentId)
   }

   render() {
      return (
         <div className="delete-group-main-wrapper">
            <div className="title">
               <p>Remove Student</p>
            </div>

            <div className="delete-group-question">
               <p>Do you want to remove the student: {this.props.studentName}?</p>
            </div>

            <div className="buttons">
               <button type='button' onClick={this.handleDeleteStudent}>Remove</button>
               <button type="button" onClick={this.handleModalDeleteStudentClose}>Cancel</button>
            </div>
         </div>
      )
   }
}