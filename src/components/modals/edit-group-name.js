import React, { Component } from "react"

export default class NewGroupForm extends Component {
   constructor(props) {
      super(props);

      this.state = {
         nameGroup: this.props.groupName,
         errorsMessage: {}
      }

      this.handleEditGroupName = this.handleEditGroupName.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleModalEditGroupNameClose = this.handleModalEditGroupNameClose.bind(this)
   }

   handleChange(event) {
      this.setState({
         [event.target.name]: event.target.value
      });
   }

   handleModalEditGroupNameClose() {
      this.props.handleModalEditGroupNameClose()
   }

   handleEditGroupName(e) {
      e.preventDefault()

      if (this.validate()) {
         const item = {
            nameGroup: this.state.nameGroup,
            groupId: this.props.groupId
         }

         this.props.handleEditGroupName(item)
      }
   }

   validate() {
      let errors = {};
      let isValid = true;

      if (!this.state.nameGroup) {
         isValid = false;
         errors["nameGroup"] = "Please enter the name of the group";
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
               <p>Edit Group Name</p>
            </div>

            <form onSubmit={this.handleEditGroupName} className="class-form">
               <div className="form-group">
                  <label htmlFor="nameGroup"><b>Group Name</b></label>
                  <input type="text"
                     value={this.state.nameGroup}
                     onChange={this.handleChange}
                     name="nameGroup"
                     placeholder="Group Name"
                  />
                  <div className="error-message">{this.state.errorsMessage.nameGroup}</div>
               </div>

               <div className="buttons-form">
                  <button type="submit">Save Changes</button>
                  <button type="button" onClick={this.handleModalEditGroupNameClose}>Cancel</button>
               </div>
            </form>

         </div>
      )
   }
}