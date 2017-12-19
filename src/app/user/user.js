import React from 'react';
import { connect } from 'react-redux';
import {
   phImg, phDesc, resetPH,
  phLink, phErr, addPin,
   userImg,userName,showNavbar
  } from '../../actions/index';
import Pins from './pins'
import './user.css';


class User extends React.Component{
  componentDidMount(){
    document.getElementById('body').style.overflow = "auto"
    this.props.dispatch(resetPH())
    this.props.dispatch(showNavbar())

  }
  togglePopup=()=>{
    document.getElementById("popup").classList.remove('bye')
    document.getElementById("popup").classList.remove('popupAnimate')

  setTimeout(function () {
    document.getElementById("popup").classList.add('popupAnimate')
    setTimeout(()=>{
      document.getElementById("overlay").style.display = "block"
    },300)


  }, 10);

  }
  disable=()=>{

    document.getElementById("popup").classList.remove('popupAnimate')
    setTimeout(() => {
      document.getElementById("popup").classList.add('bye')
      document.getElementById("popup").classList.add('popupAnimate')
      setTimeout(()=>{
        document.getElementById("overlay").style.display = "none"
      },300)
    }, 1);
  }
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
    var myHeaders = new Headers({
        'Access-Control-Allow-Origin':'http://localhost:4000',
        "Access-Control-Allow-Credentials": true,
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'POST, GET, PATCH, DELETE, OPTIONS'
      });
      fetch(`https://safe-brushlands-32516.herokuapp.com/${code}`,{
        headers:myHeaders,
        mode:'cors'
      })
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

  resetPH = () =>{
    return this.props.dispatch(resetPH())
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
         mode: 'CORS',
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
         }
       )
       //
     }

  }
  edit= () =>{
      document.getElementById("editPopup").style.display ="block"
  }

  render(){
    let user=this.props.user
    let placeholder = this.props.placeholder
    let error = placeholder.error? "1px solid rgb(150, 0, 0)": "none"
    return(
      <div className="user col">
        <div id="overlay" className="userOverlay">
        </div>
        <div id="editPopup" className="editPopup">
          <input onChange={(e)=> this.handleChange(e, "u_img")} placeholder="IMg" value={placeholder.user_img} />
            <input onChange={(e)=> this.handleChange(e, "u_name")} placeholder="Name" value={placeholder.user_name} />
            <button onClick={
                () =>{
                  document.getElementById("editPopup").style.display ="none"
                  this.resetPH()
                 }

              }
                >close</button>
        </div>
        <div className="userDetail">
          <span onClick={this.edit} className="edit"><i className="fa fa-pencil" aria-hidden="true"></i></span>
          <div className="userName">
            <h3>{user.name}</h3>
            <p>number of pins <span>4</span></p>
          </div>
          <div className="addPin">
            <div id="popup" className="userPopup col">
                <div className="pHead row"><h4>Create Pin</h4> <span onClick={ () => {this.disable(); this.resetPH()}}><i className="fa fa-times" aria-hidden="true"></i>

                </span></div>
              <div className="row main">
                <div className="pImg">
                  <img alt="" src={placeholder.link} />
                </div>
                <div className="inputs col">
                  <input style={{border: error}} onChange={(e) => this.handleChange(e, "img")} value={placeholder.img} placeholder="Image link"/>
                  <textarea style={{border: error}} onChange={(e) => this.handleChange(e, "desc")} value={placeholder.desc} placeholder="Describe" />
                </div>
              </div>
              <div onClick={this.addPin} className="next">Next</div>
            </div>
            <div id="box" onClick={this.togglePopup} className="box"><h4>Create Pin</h4></div>
            </div>
          <img alt=" " src={user.img} className="userImg" />
        </div>
        <Pins />
      </div>
    )
  }
}
const store = (store)=>{
  return{
    user:store.user,
    placeholder: store.placeholder
  }
}
User = connect(store)(User)
export default User
