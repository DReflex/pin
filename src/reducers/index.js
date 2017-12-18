import { combineReducers } from 'redux'
import todos from './reducer'
import user from './user';
import placeholder from './placeholder'
import pins from './pins'
const todoApp = combineReducers({
  todos,
  user,
  placeholder,
  pins
})

export default todoApp
