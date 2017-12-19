import React from 'react'
import { Link } from 'react-router-dom'
import {showNavbar} from '../../actions/index'
import {connect } from 'react-redux'

class Home extends React.Component {
componentDidMount(){
  this.props.dispatch(showNavbar())
}
  render(){
    return (
      <div>
        <h1>This is Home</h1>
        <Link to={'/todo'}>TO TODO</Link>
      </div>
    )
  }
}
const store = (store) =>{

}
Home = connect(store)(Home)
export default Home
