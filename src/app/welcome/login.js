import SocialButton from './login-div';
import React from 'react';
import { connect } from 'react-redux'
import { addUser } from '../../actions/index';
import { withRouter } from 'react-router'


class Login extends React.Component {
  constructor(){
    super()
    this.handleSocialLogin = this.handleSocialLogin.bind(this)
  }
handleSocialLogin = (user) => {
  fetch(`/api/user/${user._profile.id}`)
  .then((res) => {
    if(res.status === 404){
      fetch('/api/user', {
                method: 'POST',
                mode: 'CORS',
                body: JSON.stringify({
                  id: user._profile.id,
                  img:user._profile.profilePicURL,
                  nickname: user._profile.firstName
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
     id: user._profile.id,
     img:user._profile.profilePicURL,
     nickname: user._profile.firstName,
     loginStatus: true
   }
    console.log(data);
    if(res){
      return res.json()
    }else{
      return data
    }
  })
  .then((data) => {
    let user = {
      name:data.nickname,
      id:data.id,
      loginStatus: true,
      img: data.img,
      editing:false,
      stared: data.stared,
      author: data.author,
      quote:data.quote,
      background:data.background,
    }
     this.props.dispatch(addUser(user))



  }).then(()=>this.props.history.push('/home'))
}

handleSocialLoginFailure = (err) => {
  console.error("hello", err)
}

  render(){
    return(
        <SocialButton
      provider='facebook'
      appId='354675081620273'
      onLoginSuccess={this.handleSocialLogin}
      onLoginFailure={this.handleSocialLoginFailure}
    >
    </SocialButton>
    )
  }
}
const store = (store) =>{
  return {
    user: store.user
  }
}

Login = connect(store)(Login)

export default withRouter(Login)
