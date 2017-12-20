import React from 'react';
import SocialLogin from 'react-social-login';
import './welcome.css'
const Button = ({ children, triggerLogin, ...props }) => (
  <div onClick={triggerLogin} className="fbLog"><img alt="#" src="https://cdn.worldvectorlogo.com/logos/facebook-icon-white.svg"/>Facebook</div>
)


export default SocialLogin(Button)
