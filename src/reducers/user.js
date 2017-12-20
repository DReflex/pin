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
    case "LOGOUT":
    return{
      ...state,
      name:"",
      id:undefined,
      loginStatus: false,
      img: "",
      creations: []
    }
    case "UPDATE_U":
    return{
      ...state,
      img: action.img,
      name: action.name
    }
    default:
    return state
  }
}
export default user
