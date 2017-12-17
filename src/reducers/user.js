const stateInit = {
  name:String,
  id:Number,
  loginStatus: false,
  img:String,
}
const user = (state = stateInit, action) =>{
  switch(action.type){
    case "ADD_USER":
    return{
      ...state,
      name:action.name,
      id:action.id,
      loginStatus: true,
      img: action.img
    }
    default:
    return state
  }
}
export default user
