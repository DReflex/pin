import React from 'react';
import { connect } from 'react-redux'
import { resetPH, phImg, phDesc, userImg, userName, phErr,update } from '../../actions/index'
import './popups.css'

class UserPopup extends React.Component{
  resetPH = () =>{
    return this.props.dispatch(resetPH())
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
  exit = (id) =>{
    this.resetPH()
    document.getElementById(id).style.animation="fadeOut .2s linear both"

    setTimeout(function () {
      document.getElementById(id).style.animation="scale .3s linear both"
      document.getElementById("overlay").style.display="none"
      document.getElementById(id).style.display="none"

    }, 200);


  }
  handleSave =() =>{
    // http://usatthebiglead.files.wordpress.com/2011/07/pawel-wolak.jpg?w=1000
    let img = (this.props.placeholder.user_img === "")
    ? "http://usatthebiglead.files.wordpress.com/2011/07/pawel-wolak.jpg?w=1000"
    : this.props.placeholder.user_img
    let name = (this.props.placeholder.user_name === "")? ":D":this.props.placeholder.user_name
    fetch(img).then((res) =>{
      if(res.status === 404){
        console.log("404");
       fetch(`/api/user/${this.props.user.id}`,{
          method: 'PUT',
          mode: 'CORS',
          body: JSON.stringify({
            img: "http://usatthebiglead.files.wordpress.com/2011/07/pawel-wolak.jpg?w=1000",
            name: name
          }),
          headers: {
              'Content-Type': 'application/json'
          }
        })
      this.props.dispatch(update(name, "http://usatthebiglead.files.wordpress.com/2011/07/pawel-wolak.jpg?w=1000"))
      }else{
      fetch(`/api/user/${this.props.user.id}`,{
          method: 'PUT',
          mode: 'CORS',
          body: JSON.stringify({
            img: img,
            name: name
          }),
          headers: {
              'Content-Type': 'application/json'
          }
        })
        this.props.dispatch(update(name, img))
      }
    }).then(()=>{
      this.exit("editPopup")
    })


  }
  render(){
    let placeholder = this.props.placeholder
    return(
      <div id="editPopup" className="editPopup">
        <div className="PopupHeader row">
          <h4 className="Head">Edit user information</h4>
          <span onClick={() =>this.exit("editPopup")}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </span>
        </div>
        <div className="popupMain row">
          <div className="popupImg">
            <img src={this.props.user.img} />
          </div>
          <div className="popupInput col">
            <input onChange={(e)=> this.handleChange(e, "u_img")} placeholder="IMg" value={placeholder.user_img} />
            <input onChange={(e)=> this.handleChange(e, "u_name")} placeholder="Name" value={placeholder.user_name} />
          </div>
        </div>
        <div onClick={this.handleSave} className="popupEnd"><p>Save</p></div>
      </div>

    )
  }
}

const store = (store) => {
  return{
    placeholder: store.placeholder,
    user: store.user
  }
}
UserPopup = connect(store)(UserPopup)
export default UserPopup
