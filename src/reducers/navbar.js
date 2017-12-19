const stateInit = {
  show: false
}
const navbar =(state = stateInit, actions)=>{
  switch(actions.type){
    case "SHOW":
    return{
      ...state,
      show:true
    }
    case "HIDE":
    return{
      ...state,
      show:false
    }
    default:
    return state
  }
}
export default navbar
