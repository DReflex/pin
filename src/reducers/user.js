const stateInit = {
  name:String,
  id:Number,
  loginStatus: false,
  img:String,
  creations: []
}
const user = (state = stateInit, action) =>{
  switch(action.type){
    case "ADD_USER":
    return{
      ...state,
      name:action.name,
      id:action.id,
      loginStatus: true,
      img: action.img,
      creations: []
    }
    default:
    return state
  }
}
export default user
