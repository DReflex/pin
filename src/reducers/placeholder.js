const stateInit = {
  img:"",
  desc:"",
  link:"http://thetechtemple.com/wp-content/themes/TechNews/images/img_not_available.png",
  error: false
}
const placeholder= (state = stateInit, action) =>{
  switch(action.type){
    case "IMG":
    return{
      ...state,
      img: action.img
    }
    case "LINK":
    console.log("this is link");
    return{
      ...state,
      link:action.link
    }
    case "DESC":
    return{
      ...state,
      desc:action.desc
    }
    case "PH_ERR":
    return{
      ...state,
      error:action.error
    }
    case "RESET_PH":
    return{
      ...state,
      img:"",
      desc:"",
      link:"http://thetechtemple.com/wp-content/themes/TechNews/images/img_not_available.png",
      error:false
    }
    default:
    return state
  }
}
export default placeholder
