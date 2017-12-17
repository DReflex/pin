import React from 'react';
import Home from './home/home';
import Todo from './todo/todo';
import Welcome from './welcome/welcome'
import User from './user/user'
import { Switch, Route } from 'react-router-dom';
import Navbar from './navbar/navbar'

class App extends React.Component{
  render(){
    return(
      <div>
        <Navbar />
        <main>
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route path='/home'component = {Home} />
            <Route  path='/todo' component={Todo} />
            <Route path='/user' component = {User} />
          </Switch>
        </main>
      </div>
    )
  }
}
export default App
