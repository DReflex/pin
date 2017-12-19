import React from 'react';
import Home from './home/home';
import Welcome from './welcome/welcome'
import User from './user/user'
import { Switch, Route } from 'react-router-dom';
import Navbar from './navbar/navbar'
import Profile from './home/profile'

class App extends React.Component{
  render(){
    return(
      <div>
        <Navbar />
        <main>
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route path='/home'component = {Home} />
            <Route path='/user' component = {User} />
            <Route path='/profile' component = {Profile} />
          </Switch>
        </main>
      </div>
    )
  }
}
export default App
