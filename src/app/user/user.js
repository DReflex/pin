import React from 'react'
import { connect } from 'react-redux'
import './user.css'
class User extends React.Component{
  componentDidMount(){
    document.getElementById('body').style.overflow = "auto"
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
  render(){
    let user=this.props.user
    return(
      <div className="user">
        <div id="overlay" className="userOverlay">

        </div>
        <div className="userDetail">
          <div className="userName">
            <h3>{user.name}</h3>
            <p>number of pins <span>4</span></p>
          </div>
          <div className="addPin">
            <div id="popup" className="userPopup col">
                <div className="pHead row"><h4>Create Pin</h4> <span onClick={this.disable}><i className="fa fa-times" aria-hidden="true"></i>

                </span></div>
              <div className="row main">
                <div className="pImg">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLCX5JEgYu91E6ma_0-HKbG8VHd0wgCvV5AllRPjbXTV2GwYd-7A" />
                </div>
                <div className="inputs col">
                  <input placeholder="Image link"/>
                  <textarea placeholder="Describe" />
                </div>
              </div>
              <div className="next">Next</div>
            </div>
            <div id="box" onClick={this.togglePopup} className="box"><h4>Create Pin</h4></div>
            </div>
          <img alt=" " src={user.img} className="userImg" />
        </div>
      </div>
    )
  }
}
const store = (store)=>{
  return{
    user:store.user
  }
}
User = connect(store)(User)
export default User
