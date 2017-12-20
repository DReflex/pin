import React from 'react';
import './welcome.css'
import Login from './login'
import { connect } from 'react-redux';

import { Link, DirectLink, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
// https://s.pinimg.com/webapp/style/images/bg_multi_case_grid_no_text_white_55_percent-2000ab22.jpg
import { addUser, hideNavbar } from '../../actions/index'
class Welcome extends React.Component{
  componentWillMount(){
    // this.props.user.loginStatus? this.props.history.push('/home'): null
  }
  componentDidMount(){
    this.props.dispatch(hideNavbar())
      document.getElementById('body').style.overflow = "hidden"
  }


  handleUser = (num) =>{
    const user0 ={
      name:"root@kali",
      id:123456,
      loginStatus: true,
      img: "https://www.offensive-security.com/wp-content/uploads/2015/05/kali-nh1.png"
    };
    const user1 ={
      name:"ubuntu",
      id:654321,
      loginStatus: true,
      img: "https://images.unsplash.com/photo-1476983109555-18ebaf412d7c?auto=format&fit=crop&w=920&q=80"
    };
    (num === "0")? this.handleSocialLogin(user0):this.handleSocialLogin(user1)
  }
//
handleSocialLogin = (user) => {
  fetch(`/api/user/${user.id}`)
  .then((res) => {
    if(res.status === 404){
      fetch('/api/user', {
                method: 'POST',
                mode: 'CORS',
                body: JSON.stringify({
                  id: user.id,
                  img:user.img,
                  name: user.name
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        return undefined
    }else{
      return res
    }
  }).then((res) =>{
    let data = {
     id: user.id,
     img:user.img,
     name: user.name,
     loginStatus: true
   }
    if(res){
      return res.json()
    }else{
      return data
    }
  })
  .then((data) => {
    let user = {
      name:data.name,
      id:data.id,
      loginStatus: true,
      img: data.img,
      creations: data.creations,
    }
     this.props.dispatch(addUser(user))
  }).then(()=>this.props.history.push('/home'))
}
  render(){
    return(
      <div>
        <div id="welcome" className="welcome"></div>
          <div className="welcomeOverlay">
            <div className="login-popup">
              <div className="container">
                <img className="pinImg" src="https://seeklogo.com/images/P/pinterest-icon-logo-D4965B6748-seeklogo.com.png" />
                <h1>Pinterest Clone</h1>
                <p>login with test user</p>
                <div onClick={() =>this.handleUser("0")} className="test-user">test user 1</div>
                <div onClick={() =>this.handleUser("1")} className="test-user">test user</div>
                <p>or</p>
                <Login />
              </div>
              <div className="gitHub"><img src="http://pluspng.com/img-png/ok-calling-myself-a-developer-would-be-a-stretch-but-still-two-years-ago-i-had-no-clue-what-git-and-github-was-and-how-to-do-a-pr-256.png" />
              <p>Check out GitHub</p></div>
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
