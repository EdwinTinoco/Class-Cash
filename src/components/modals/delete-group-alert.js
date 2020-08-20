import React, { Component } from "react"

export default class DeleteGroupAlert extends Component {
   constructor(props) {
      super(props);

      this.handleDeleteGroup = this.handleDeleteGroup.bind(this)
      this.handleModalDeleteGroupClose = this.handleModalDeleteGroupClose.bind(this)
   }

   handleModalDeleteGroupClose() {
      this.props.handleModalDeleteGroupClose()
   }

   handleDeleteGroup() {
      this.props.handleDeleteGroup(this.props.groupId)
   }

   render() {
      return (
         <div className="delete-group-main-wrapper">
            <div className="title">
               <p>Remove Group</p>
            </div>

            <div className="delete-group-question">
               <p>Do you want to remove the group: {this.props.groupName}?</p>
               <p>If you remove the group, all the students in the group will be remove as well</p>
            </div>

            <div className="buttons">
               <button type='button' onClick={this.handleDeleteGroup}>Remove</button>
               <button type="button" onClick={this.handleModalDeleteGroupClose}>Cancel</button>
            </div>
         </div>
      )
   }
}