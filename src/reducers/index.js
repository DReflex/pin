import { combineReducers } from 'redux'
import todos from './reducer'
import user from './user';
import placeholder from './placeholder'
import pins from './pins'
import navbar from './navbar'
const todoApp = combineReducers({
  todos,
  user,
  placeholder,
  pins,
  navbar
})

export default todoApp
