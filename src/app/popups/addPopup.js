import React from "react";
import { connect } from "react-redux"
import {
   phImg, phDesc, resetPH,
  phLink, phErr, addPin,
   userImg,userName,showNavbar
  } from '../../actions/index';
  import Masonry from 'masonry-layout';

import './popups.css'



class AddPopup extends React.Component{

  handleChange = (e, type) =>{
    let value= e.target.value
    switch(type){
      case "img":
      this.fetchPhoto(value)
      this.props.dispatch(phErr(false))
      return this.props.dispatch(phImg(value))

      case "desc":
      this.props.dispatch(phErr(false))
      return this.props.dispatch(phDesc(value))

      case "u_img":
      return this.props.dispatch(userImg(value))

      case "u_name":
      return this.props.dispatch(userName(value))

      default:
      return console.log("should never happen");
    }
  }
  fetchPhoto =(code) => {
    //logic here
    // var myHeaders = new Headers({
    //     'Access-Control-Allow-Origin':'http://localhost:4000',
    //     "Access-Control-Allow-Credentials": true,
    //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    //     'Access-Control-Allow-Methods': 'POST, GET, PATCH, DELETE, OPTIONS'
    //   });
      fetch(`https://safe-brushlands-32516.herokuapp.com/${code}`)
      .then((res) => {
        if(res.status === 404){
          var image ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVlLQ11LjhFhyCJCR0D1nHSv3d1jWMHCfX4LamAunO_0PLVUl9"
          this.props.dispatch(phLink(image))
        }else{
        image = res.url.split('https://safe-brushlands-32516.herokuapp.com/')[1]
        this.props.dispatch(phLink(image))
        console.log(image);
        }
      })

    }
    addPin = () =>{
      let ph = this.props.placeholder
      let link = ph.link;
      let desc = ph.desc;
       if(link === "" || desc === ""){
         this.props.dispatch(phErr(true))
       }else{
         fetch(`/api/pin`, {
           method: 'POST',
           body: JSON.stringify({
             desc:desc,
             img: link,
             votes:0,
             who:[],
             creator_id:this.props.user.id,
             creator_img:this.props.user.img
           }),
           headers: {
               'Content-Type': 'application/json'
           }
         }).then(res => res.json())
         .then((res) =>{
             console.log(res);
             let data = {
               desc:res.desc,
               img: res.img,
               votes:res.votes,
               who:res.who,
               creator_id:res.creator_id,
               creator_img:res.creator_img,
               id: res._id
             }
             this.props.dispatch(addPin(data));
             this.disable();
             this.props.dispatch(resetPH());
             setTimeout(this.startMasonry, 100);
           }
         )
         //
       }
    }
    startMasonry = () =>{
      var elem = document.querySelector('.pinsContainer');
      var msnry = new Masonry( elem, {
      // options
      itemSelector: '.pins',
      columnWidth: '.grid-sizer',
      percentPosition: true

    });
    }
  addPin = () =>{
    let ph = this.props.placeholder
    let link = ph.link;
    let desc = ph.desc;
     if(link === "" || desc === ""){
       this.props.dispatch(phErr(true))
     }else{
       fetch(`/api/pin`, {
         method: 'POST',
         body: JSON.stringify({
           desc:desc,
           img: link,
           votes:0,
           who:[],
           creator_id:this.props.user.id,
           creator_img:this.props.user.img
         }),
         headers: {
             'Content-Type': 'application/json'
         }
       }).then(res => res.json())
       .then((res) =>{
           console.log(res);
           let data = {
             desc:res.desc,
             img: res.img,
             votes:res.votes,
             who:res.who,
             creator_id:res.creator_id,
             creator_img:res.creator_img,
             id: res._id
           }
           this.props.dispatch(addPin(data));
           this.exit("popup");
           this.props.dispatch(resetPH());
         }
       )
       //
     }

  }
  resetPH = () =>{
      return this.props.dispatch(resetPH())
    }
exit = (id) =>{
  this.resetPH()
  document.getElementById(id).style.animation="fadeOut .2s linear both"
  setTimeout(function () {
    document.getElementById(id).style.animation="scale .3s linear both"
    document.getElementById("overlay").style.display="none"
    document.getElementById(id).style.display="none"
  }, 200);
}
  render(){
    let placeholder = this.props.placeholder
    let error = placeholder.error? "1px solid rgb(150, 0, 0)": "none"

    return(
      <div id="popup" className="editPopup col">
          <div className="PopupHeader row">
            <h4 className="Head">Create Pin</h4>
              <span onClick={() => this.exit("popup")}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
          </div>
        <div className="row popupMain">
          <div className="popupImg">
            <img alt="" src={placeholder.link} />
          </div>
          <div className="popupInput col">
            <input style={{border: error}} onChange={(e) => this.handleChange(e, "img")} value={placeholder.img} placeholder="Image link"/>
            <textarea style={{border: error}} onChange={(e) => this.handleChange(e, "desc")} value={placeholder.desc} placeholder="Describe" />
          </div>
        </div>
        <div onClick={this.addPin} className="popupEnd">Next</div>
      </div>
    )
  }
}
const store =(store)=>{
  return{
    placeholder:store.placeholder,
    user:store.user
  }
}
AddPopup = connect(store)(AddPopup)
export default AddPopup
