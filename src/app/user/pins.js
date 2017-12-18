import React from 'react';
import { connect } from "react-redux";
import Masonry from 'masonry-layout';
import { resetPin, addPin, votePin } from '../../actions/index';
import './user.css';
class Pins extends React.Component{
  // componentDidMount(){
  //   this.props.dispatch(resetPin())
  //   fetch('/api/pin').then(res => res.json())
  //   .then((pin) => {
  //     pin.forEach((elem) =>{
  //     this.props.dispatch(addPin(elem))
  //     })
  //   })
  // }
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
  render () {
    // put it to component did mount using js
    var width= window.innerWidth
    let newWidth;
    if(width <= 768 && width >= 450){
      newWidth= `{
        "columnWidth": 40,
        "itemSelector": ".pins",
        "percentPosition": true,
        "gutter": 10
      }`
    }else if(width <= 450){
      newWidth=`{
        "columnWidth": 20,
        "itemSelector": ".pins",
        "percentPosition": true,
        "gutter": 10
      }`
    }else{
      newWidth=`{
        "columnWidth": 50,
        "itemSelector": ".pins",
        "percentPosition": true,
        "gutter": 10
      }`
    }
    let pins = this.props.pins
    return(
      <div data-masonry={newWidth}
          className="pinsContainer row">
          {
            pins.map((pin, key) => {

              return(
                <div key={key} className="pins col">
                  <div className="pinImg col">
                    <img src={pin.img} alt="#S" />
                    <h4>{pin.desc}</h4>
                  </div>
                  <div className="pinDetail row">
                    <img alt=" " src={pin.creator_img} />
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
export default Pins
