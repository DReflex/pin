import React from 'react';
import { connect } from 'react-redux';
import {resetPH,  showNavbar } from '../../actions/index';
import Pins from '../user/pins'
import '../user/user.css';
import UserPopup from '../popups/userPopup'
import AddPopup from '../popups/addPopup'
import { withRouter } from 'react-router-dom'
class Profile extends React.Component{
  componentWillMount(){
    console.log(this.props.user.id);
    if(this.props.user.id == null){
      this.props.history.push('/')
    }
  }
  componentDidMount(){
    document.getElementById('body').style.overflow = "auto"
    this.props.dispatch(resetPH())
    this.props.dispatch(showNavbar())
  }




  resetPH = () =>{
    return this.props.dispatch(resetPH())
  }

  edit= (id) =>{
      document.getElementById(id).style.display ="flex"
      document.getElementById("overlay").style.display="block"
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
Profile = connect(store)(Profile)
export default withRouter(Profile)
