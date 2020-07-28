import React, { Component } from "react"

export default class StudentProfileImage extends Component {
   constructor(props) {
      super(props);

      this.handleProfileImage = this.handleProfileImage.bind(this)
   }

   handleProfileImage() {
      this.props.handleProfileImage(this.props.item.profile_image_url)
   }

   render() {
      return (
         <div className="images">
            <div className="image-name">
               <p>{this.props.item.profile_image_name}</p>
            </div>

            <div className="image">
               <img src={this.props.item.profile_image_url} onClick={this.handleProfileImage} alt="profile-image" />
            </div>
         </div>
      )
   }
}