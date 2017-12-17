import { combineReducers } from 'redux'
import todos from './reducer'
import user from './user'

const todoApp = combineReducers({
  todos,
  user
})

export default todoApp
