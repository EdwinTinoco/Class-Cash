import React, { Component } from "react"

export default class StudentProfileImage extends Component {
   constructor(props) {
      super(props);

      this.state = {
         imgUrlEdit: this.props.imgUrlEdit,
         backgroungColorImg1: '#fff',
         backgroungColorImg2: '#fff',
         backgroungColorImg3: '#fff',
         backgroungColorImg4: '#fff',
         backgroungColorImg5: '#fff',
         backgroungColorImg6: '#fff',
         imgUrl1: "https://toppng.com/uploads/preview/mickey-mouse-images-mickey-minnie-mouse-disney-mickey-minnie-mouse-mickey-mouse-11562862996vg9j2zhxdg.png",
         imgUrl2: "https://toppng.com/uploads/preview/resultado-de-imagen-para-free-wonderwoman-logo-printables-wonder-woman-baby-11562864866k4bhfrcob8.png",
         imgUrl3: "https://toppng.com/uploads/preview/disney-cartoon-baby-princesses-clip-art-images-cute-cartoon-disney-princess-115629882112mbeafdlnp.png",
         imgUrl4: "https://toppng.com/uploads/preview/mickey-mouse-11549813294phgckvoyy5.png",
         imgUrl5: "https://toppng.com/uploads/preview/batman-baby-kid-clipart-vector-royalty-free-download-big-brother-shirts-and-big-brother-tshirts-11562898136wsgafrmmch.png",
         imgUrl6: "https://toppng.com/uploads/preview/baby-vector-avengers-spider-man-baby-115628937139qbwqfiznj.png",
         imgUrl: ''

      }

      this.handleProfileImage = this.handleProfileImage.bind(this)
      this.handleBackgroundColorAndImageUrl = this.handleBackgroundColorAndImageUrl.bind(this)
   }

   handleBackgroundColorAndImageUrl(val) {
      if (val === 1) {
         console.log('val', val);

         let tempImgUrl1 = this.state.imgUrl1
         console.log('tempimgurl', tempImgUrl1);

         this.setState({
            backgroungColorImg1: '#aeebf3',
            backgroungColorImg2: '#fff',
            backgroungColorImg3: '#fff',
            backgroungColorImg4: '#fff',
            backgroungColorImg5: '#fff',
            backgroungColorImg6: '#fff',
            imgUrl: tempImgUrl1
         })

         this.handleProfileImage(tempImgUrl1)
      }
      if (val === 2) {
         console.log('val', val);

         let tempImgUrl2 = this.state.imgUrl2
         console.log('tempimgurl', tempImgUrl2);

         this.setState({
            backgroungColorImg1: '#fff',
            backgroungColorImg2: '#aeebf3',
            backgroungColorImg3: '#fff',
            backgroungColorImg4: '#fff',
            backgroungColorImg5: '#fff',
            backgroungColorImg6: '#fff',
            imgUrl: tempImgUrl2
         })

         this.handleProfileImage(tempImgUrl2)
      }
      if (val === 3) {
         console.log('val', val);

         let tempImgUrl3 = this.state.imgUrl3
         console.log('tempimgurl', tempImgUrl3);

         this.setState({
            backgroungColorImg1: '#fff',
            backgroungColorImg2: '#fff',
            backgroungColorImg3: '#aeebf3',
            backgroungColorImg4: '#fff',
            backgroungColorImg5: '#fff',
            backgroungColorImg6: '#fff',
            imgUrl: tempImgUrl3
         })

         this.handleProfileImage(tempImgUrl3)
      }
      if (val === 4) {
         console.log('val', val);

         let tempImgUrl4 = this.state.imgUrl4
         console.log('tempimgurl', tempImgUrl4);

         this.setState({
            backgroungColorImg1: '#fff',
            backgroungColorImg2: '#fff',
            backgroungColorImg3: '#fff',
            backgroungColorImg4: '#aeebf3',
            backgroungColorImg5: '#fff',
            backgroungColorImg6: '#fff',
            imgUrl: tempImgUrl4
         })

         this.handleProfileImage(tempImgUrl4)
      }
      if (val === 5) {
         console.log('val', val);

         let tempImgUrl5 = this.state.imgUrl5
         console.log('tempimgurl', tempImgUrl5);

         this.setState({
            backgroungColorImg1: '#fff',
            backgroungColorImg2: '#fff',
            backgroungColorImg3: '#fff',
            backgroungColorImg4: '#fff',
            backgroungColorImg5: '#aeebf3',
            backgroungColorImg6: '#fff',
            imgUrl: tempImgUrl5
         })

         this.handleProfileImage(tempImgUrl5)
      }
      if (val === 6) {
         console.log('val', val);

         let tempImgUrl6 = this.state.imgUrl6
         console.log('tempimgurl', tempImgUrl6);

         this.setState({
            backgroungColorImg1: '#fff',
            backgroungColorImg2: '#fff',
            backgroungColorImg3: '#fff',
            backgroungColorImg4: '#fff',
            backgroungColorImg5: '#fff',
            backgroungColorImg6: '#aeebf3',
            imgUrl: tempImgUrl6
         })

         this.handleProfileImage(tempImgUrl6)
      }
   }

   handleProfileImage(imageUrl) {
      this.props.handleProfileImage(imageUrl)
   }

   componentDidMount() {
      if (this.state.imgUrlEdit === this.state.imgUrl1) {

         this.setState({
            backgroungColorImg1: '#aeebf3',
            backgroungColorImg2: '#fff',
            backgroungColorImg3: '#fff',
            backgroungColorImg4: '#fff',
            backgroungColorImg5: '#fff',
            backgroungColorImg6: '#fff'
         })

         this.handleProfileImage(this.state.imgUrl1)

      } else if (this.state.imgUrlEdit === this.state.imgUrl2) {

         this.setState({
            backgroungColorImg1: '#fff',
            backgroungColorImg2: '#aeebf3',
            backgroungColorImg3: '#fff',
            backgroungColorImg4: '#fff',
            backgroungColorImg5: '#fff',
            backgroungColorImg6: '#fff'
         })

         this.handleProfileImage(this.state.imgUrl2)

      } else if (this.state.imgUrlEdit === this.state.imgUrl3) {

         this.setState({
            backgroungColorImg1: '#fff',
            backgroungColorImg2: '#fff',
            backgroungColorImg3: '#aeebf3',
            backgroungColorImg4: '#fff',
            backgroungColorImg5: '#fff',
            backgroungColorImg6: '#fff'
         })

         this.handleProfileImage(this.state.imgUrl3)

      } else if (this.state.imgUrlEdit === this.state.imgUrl4) {

         this.setState({
            backgroungColorImg1: '#fff',
            backgroungColorImg2: '#fff',
            backgroungColorImg3: '#fff',
            backgroungColorImg4: '#aeebf3',
            backgroungColorImg5: '#fff',
            backgroungColorImg6: '#fff'
         })

         this.handleProfileImage(this.state.imgUrl4)

      } else if (this.state.imgUrlEdit === this.state.imgUrl5) {

         this.setState({
            backgroungColorImg1: '#fff',
            backgroungColorImg2: '#fff',
            backgroungColorImg3: '#fff',
            backgroungColorImg4: '#fff',
            backgroungColorImg5: '#aeebf3',
            backgroungColorImg6: '#fff'
         })

         this.handleProfileImage(this.state.imgUrl5)

      } else if (this.state.imgUrlEdit === this.state.imgUrl6) {

         this.setState({
            backgroungColorImg1: '#fff',
            backgroungColorImg2: '#fff',
            backgroungColorImg3: '#fff',
            backgroungColorImg4: '#fff',
            backgroungColorImg5: '#fff',
            backgroungColorImg6: '#aeebf3'
         })

         this.handleProfileImage(this.state.imgUrl6)
      }
   }

   render() {
      return (
         <div className="images">
            <div className="image" onClick={() => this.handleBackgroundColorAndImageUrl(1)} style={{ backgroundColor: `${this.state.backgroungColorImg1}` }}>
               <div className="image-name">
                  <p>Mimie</p>
               </div>

               <div className="img">
                  <img src={this.state.imgUrl1} alt="profile-image" />
               </div>
            </div>

            <div className="image" onClick={() => this.handleBackgroundColorAndImageUrl(2)} style={{ backgroundColor: `${this.state.backgroungColorImg2}` }}>
               <div className="image-name">
                  <p>Wonder Woman</p>
               </div>

               <div className="img">
                  <img src={this.state.imgUrl2} alt="profile-image" />
               </div>
            </div>

            <div className="image" onClick={() => this.handleBackgroundColorAndImageUrl(3)} style={{ backgroundColor: `${this.state.backgroungColorImg3}` }}>
               <div className="image-name">
                  <p>Little Mermaid</p>
               </div>

               <div className="img">
                  <img src={this.state.imgUrl3} alt="profile-image" />
               </div>
            </div>

            <div className="image" onClick={() => this.handleBackgroundColorAndImageUrl(4)} style={{ backgroundColor: `${this.state.backgroungColorImg4}` }}>
               <div className="image-name">
                  <p>Mickey</p>
               </div>

               <div className="img">
                  <img src={this.state.imgUrl4} alt="profile-image" />
               </div>
            </div>

            <div className="image" onClick={() => this.handleBackgroundColorAndImageUrl(5)} style={{ backgroundColor: `${this.state.backgroungColorImg5}` }}>
               <div className="image-name">
                  <p>Batman</p>
               </div>

               <div className="img">
                  <img src={this.state.imgUrl5} alt="profile-image" />
               </div>
            </div>

            <div className="image" onClick={() => this.handleBackgroundColorAndImageUrl(6)} style={{ backgroundColor: `${this.state.backgroungColorImg6}` }}>
               <div className="image-name">
                  <p>Spiderman</p>
               </div>

               <div className="img">
                  <img src={this.state.imgUrl6} alt="profile-image" />
               </div>
            </div>

         </div>
      )
   }
}