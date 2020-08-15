import React, { Component } from "react"

export default class ClassForm extends Component {
   constructor(props) {
      super(props);

      this.state = {
         nameClass: "",
         errorsMessage: {},
         message: ""
      }

      this.handleSubmitInsertNewClass = this.handleSubmitInsertNewClass.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleModalClose = this.handleModalClose.bind(this)
   }

   handleChange(event) {
      this.setState({
         [event.target.name]: event.target.value,
         message: ""
      });
   }

   handleModalClose() {
      this.props.handleModalClose()
   }

   handleSubmitInsertNewClass(e) {
      e.preventDefault()

      if (this.validate()) {
         this.props.handleSubmitInsertNewClass(this.state.nameClass)

         this.setState({
            nameClass: "",
            errorsMessage: {},
            message: "Class added succesfully!"
         })
      }
   }

   validate() {
      let errors = {};
      let isValid = true;

      if (!this.state.nameClass) {
         isValid = false;
         errors["nameClass"] = "Please enter the name of the class";
      }

      this.setState({
         errorsMessage: errors
      })

      return isValid;
   }

   render() {
      return (
         <div className="class-form-main-wrapper">
            <p>Add new Class</p>

            <form onSubmit={this.handleSubmitInsertNewClass} className="class-form">
               <div className="form-group">
                  <label htmlFor="name-class"><b>Name Class</b></label>
                  <input type="text"
                     value={this.state.nameClass}
                     onChange={this.handleChange}
                     name="name-class"
                     placeholder="Name Class"
                  />
                  <div className="error-message">{this.state.errorsMessage.nameClass}</div>
               </div>

               <div className="message">
                  <p>{this.state.message}</p>
               </div>

               <div className="buttons-form">
                  <button className="btn" type="submit">Add</button>
                  <button type="button" onClick={this.handleModalClose}>Close</button>
               </div>
            </form>

         </div>
      )
   }
}