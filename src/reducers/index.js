import { combineReducers } from 'redux'
import user from './user';
import placeholder from './placeholder'
import pins from './pins'
import navbar from './navbar'
const todoApp = combineReducers({
  user,
  placeholder,
  pins,
  navbar
})

export default todoApp
