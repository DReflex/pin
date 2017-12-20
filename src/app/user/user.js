import React from 'react';
import { connect } from 'react-redux';
import {
   phImg, phDesc, resetPH,
  phLink, phErr, addPin,
   userImg,userName,showNavbar, creations
  } from '../../actions/index';
import Pins from './pins'
import './user.css';
import UserPopup from '../popups/userPopup'
import AddPopup from '../popups/addPopup'

class User extends React.Component{
  componentWillMount(){
    let id = this.props.location.pathname.split("/user/")[1]
    if(id !== this.props.user.id){
      this.props.history.push('/home')
    }
    if(this.props.user.id == null){
      this.props.history.push('/')
    }

  }
  componentDidMount(){
    document.getElementById('body').style.overflow = "auto"
    this.props.dispatch(resetPH())
    this.props.dispatch(showNavbar())
    this.getNum()
  }

  resetPH = () =>{
    return this.props.dispatch(resetPH())
  }

  edit= (id) =>{
      document.getElementById(id).style.display ="flex"
      document.getElementById("overlay").style.display="block"
  }
  // add proper functionality
  getNum = () =>{
    fetch(`/api/pin/${this.props.user.id}`).then(res =>res.json())
    .then(data => this.props.dispatch(creations(data.length)))
  }

  render(){

    let user=this.props.user
    let placeholder = this.props.placeholder
    let error = placeholder.error? "1px solid rgb(150, 0, 0)": "none"
    return(
      <div className="user col">
        <div id="overlay" className="userOverlay">
        </div>

        <UserPopup />
        <AddPopup />

        <div className="userDetail">
          <span onClick={()=>this.edit("editPopup")} className="edit"><i className="fa fa-pencil" aria-hidden="true"></i></span>
          <div className="userName">
            <h3>{user.name}</h3>
            <p>number of pins <span>{user.creations}</span></p>
          </div>
          <div className="addPin">
            <div id="box" onClick={()=>this.edit("popup")} className="box"><h4>Create Pin</h4></div>
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
