import React from 'react';
import './welcome.css'
import { connect } from 'react-redux';

import { Link, DirectLink, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
// https://s.pinimg.com/webapp/style/images/bg_multi_case_grid_no_text_white_55_percent-2000ab22.jpg
import { addUser } from '../../actions/index'
class Welcome extends React.Component{
  componentWillMount(){
    window.addEventListener('wheel', e => this.handleWheel(e))
    // this.props.user.loginStatus? this.props.history.push('/home'): null
  }
  componentDidMount(){
    document.addEventL
    setTimeout(() =>{
      window.scrollTo(0, 0)
    }, 10)
    setTimeout(()=> {
        scroll.scrollTo(1000,{duration: 30000,smooth:'linear'})
    }, 1000);

  }
  componentWillUnmount(){
    window.removeEventListener('wheel', e => this.handleWheel(e))
  }
  handleWheel = (e) =>{
    e.preventDefault()
    scroll.scrollTo(1000,{duration: 15000,smooth:'linear'})
  }
  handleUser = () =>{
    const user ={
      name:"root@kali",
      id:123456,
      loginStatus: true,
      img: "https://upload.wikimedia.org/wikipedia/en/e/ec/RandomBitmap.png"
    }
    this.props.dispatch(addUser(user))
    this.props.history.push(`/home`)
  }

  render(){
    console.log(this.props.user);
    return(
      <div>
        <div id="welcome" className="welcome">
          <div className="welcomeOverlay">
            <div className="login-popup">
              <div className="container">
                <img className="pinImg" src="https://seeklogo.com/images/P/pinterest-icon-logo-D4965B6748-seeklogo.com.png" />
                <h1>Pinterest Clone</h1>
                <p>login with test user</p>
                <div onClick={this.handleUser} className="test-user">test user 1</div>
                <div className="test-user">test user</div>
                <p>or</p>
                <div className="fbLog"><img alt="#" src="https://cdn.worldvectorlogo.com/logos/facebook-icon-white.svg"/>Facebook</div>
              </div>
              <div className="gitHub"><img src="http://pluspng.com/img-png/ok-calling-myself-a-developer-would-be-a-stretch-but-still-two-years-ago-i-had-no-clue-what-git-and-github-was-and-how-to-do-a-pr-256.png" />
              <p>Check out GitHub</p></div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
const store = (store) =>{
  return{
    user: store.user
  }
}
Welcome = connect(store)(Welcome)
export default Welcome
