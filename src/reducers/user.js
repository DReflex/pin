const stateInit = {
  name:String,
  id:Number,
  loginStatus: false,
  img:String,
  creations: 0
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
    }
    case "LOGOUT":
    return{
      ...state,
      name:"",
      id:undefined,
      loginStatus: false,
      img: "",
    }
    case "UPDATE_U":
    return{
      ...state,
      img: action.img,
      name: action.name
    }
    case "CREATIONS":
    return{
      ...state,
      creations: action.creations
    }
    default:
    return state
  }
}
export default user
