import React, { Component } from "react"

export default class NewGroupForm extends Component {
   constructor(props) {
      super(props);

      this.state = {
         nameClass: "",
         errorsMessage: {}
      }

      this.handleSubmitInsertNewGroup = this.handleSubmitInsertNewGroup.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleModalClose = this.handleModalClose.bind(this)
   }

   handleChange(event) {
      this.setState({
         [event.target.name]: event.target.value
      });
   }

   handleModalClose() {
      this.props.handleModalClose()
   }

   handleSubmitInsertNewGroup(e) {
      e.preventDefault()

      if (this.validate()) {
         this.props.handleSubmitInsertNewGroup(this.state.nameClass)

         // this.setState({
         //    nameClass: "",
         //    errorsMessage: {}
         // })
      }
   }

   validate() {
      let errors = {};
      let isValid = true;

      if (!this.state.nameClass) {
         isValid = false;
         errors["nameClass"] = "Please enter the name of the group";
      }

      this.setState({
         errorsMessage: errors
      })

      return isValid;
   }

   render() {
      return (
         <div className="class-form-main-wrapper">
            <div className="title">
               <p>Add New Group</p>
            </div>

            <form onSubmit={this.handleSubmitInsertNewGroup} className="class-form">
               <div className="form-group">
                  <label htmlFor="nameClass"><b>Group Name</b></label>
                  <input type="text"
                     value={this.state.nameClass}
                     onChange={this.handleChange}
                     name="nameClass"
                     placeholder="Group Name"
                  />
                  <div className="error-message">{this.state.errorsMessage.nameClass}</div>
               </div>

               <div className="buttons-form">
                  <button type="submit">Add</button>
                  <button type="button" onClick={this.handleModalClose}>Close</button>
               </div>
            </form>

         </div>
      )
   }
}