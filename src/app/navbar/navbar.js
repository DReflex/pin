import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { hideNavbar, logout } from '../../actions/index';
import { withRouter } from 'react-router-dom'
import "./navbar.css"
// fix navbar this is just display
class Navbar extends React.Component{
  componentDidMount(){
    this.props.dispatch(hideNavbar())
  }
  handleLogout = () =>{
    this.props.dispatch(hideNavbar())

    this.props.dispatch(logout())
    this.props.history.push('/')
  }
  render(){
    let user = this.props.user
    return(
      this.props.navbar.show?
      (
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>

              <div className="navbar-brand">
                <img className="pinLogo" src="https://seeklogo.com/images/P/pinterest-icon-logo-D4965B6748-seeklogo.com.png" />
                <h3>Pinterest Clone</h3>
              </div>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li><Link to="/home">Home</Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="nav-img"><Link to={`/user/${user.id}`}><img alt="broken" src={user.img} />{user.name}</Link></li>
                <li onClick={this.handleLogout}><Link to="#"><span className="glyphicon glyphicon-log-out"></span> Logout</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        ):null


    )
  }
}
const store = (store)=>{
  return {
    user: store.user,
    navbar: store.navbar
  }
}
Navbar = connect(store)(Navbar)
export default withRouter(Navbar)
