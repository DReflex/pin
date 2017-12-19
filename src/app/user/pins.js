import React from 'react';
import { connect } from "react-redux";
import Masonry from 'masonry-layout';
import { resetPin, addPin, votePin, deletePin } from '../../actions/index';
import { withRouter } from 'react-router-dom'

import './user.css';
class Pins extends React.Component{
  componentWillMount(){
    if(this.props.user.id == null){
      this.props.history.push('/')
    }
  }
  componentDidMount(){
    this.getPins()
     setTimeout(this.startMasonry, 100);
  }
  getPins= () =>{
    if(this.props.location.pathname === "/home"){
      this.props.dispatch(resetPin())
      fetch('/api/pin').then(res => res.json())
      .then((pin) => {
        pin.forEach((elem) =>{
          this.props.dispatch(addPin(elem))
        })
      }).then(() => document.getElementById('pinContainer').style.marginTop = 0)
    }else{
      let id = this.props.location.pathname.split("/")[2]
      if(id === ""){
        id = 0
      }
      this.props.dispatch(resetPin())
      fetch(`/api/pin/${id}`).then(res => res.json())
      .then((pin) => {
        pin.forEach((elem) =>{
          this.props.dispatch(addPin(elem))
        })
      })
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
  handleVote = (id, vote) => {
    fetch(`/api/pin/${id}`,{
      method: 'PUT',
      mode: 'CORS',
      body: JSON.stringify({
            user: this.props.user.id
      }),
      headers: {
          'Content-Type': 'application/json'
      }
    }).then(res=> res.json())
    .then((pin) => {
      this.props.dispatch(votePin(pin._id, pin.who, pin.votes))
    })
  }
  delete = (id) =>{
    console.log(id);
    fetch(`/api/pin/${id}`,{
      method:"DELETE"
    }).then(()=>this.props.dispatch(deletePin(id)))

  }
  render () {
    // put it to component did mount using js
    let ifTrue = (this.props.location.pathname.split("/")[1] === "user")? true :false
    let pins = this.props.pins
    return(
      <div id="pinContainer" className="pinsContainer row">
          <div className="grid-sizer"></div>
          {
            pins.map((pin, key) => {

              return(
                <div key={key} className="pins col">
                  {ifTrue?(
                    <div onClick={() => this.delete(pin.id)} className="delete">
                      <i className="fa fa-times-circle" aria-hidden="true"></i>
                      </div>):null}
                  <div className="sinlgePin col">
                    <img src={pin.img} alt="#S" />
                    <h4>{pin.desc}</h4>
                  </div>
                  <div className="pinDetail row">
                    <img onClick={()=>this.props.history.push(`/profile/${pin.creator_id}`)} alt=" " src={pin.creator_img} />
                    <span>{pin.votes}<i onClick={() =>this.handleVote(pin.id, pin.votes)} className="fa fa-heart" aria-hidden="true"></i></span>
                  </div>
                </div>
              )
            })
          }

      </div>
    )
  }
}
const store = (store) =>{
  return{
    user:store.user,
    pins: store.pins
  }
}
Pins = connect(store)(Pins)
export default withRouter(Pins)
