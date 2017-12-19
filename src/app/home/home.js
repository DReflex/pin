import React from 'react'
import { Link } from 'react-router-dom'
import {showNavbar} from '../../actions/index'
import {connect } from 'react-redux'
import Pins from '../user/pins'
class Home extends React.Component {
  componentWillMount(){
    if(this.props.user.id == null){
      this.props.history.push('/')
    }
  }
componentDidMount(){
  this.props.dispatch(showNavbar())
  document.getElementById('body').style.overflow = "auto"
}
  render(){
    return(
      !this.props.user.id? null :<Pins />

    )
  }
}
const store = (store) =>{
  return{
    user:store.user
  }

}
Home = connect(store)(Home)
export default Home
