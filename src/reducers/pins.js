const stateInit = []

const pins = (state= stateInit, action)=>{
  switch(action.type){
    case "ADD_PIN":
    return[
      ...state,
      {
        img:action.img,
        desc: action.desc,
        creator_img:action.creator_img,
        creator_id:action.creator_id,
        id:action.id,
        who: action.who,
        votes:action.votes,
      }
    ]
    case "VOTE_PIN":{
      return state.map((pin) =>{
        if(pin.id === action.id){
          return {
            ...pin,
            who:action.who,
            votes:action.votes
          }
        }else{
          return pin
        }
      })
    }
    case "RESET_PIN":{
      state = []
    }
    default:
    return state
  }
}
export default pins
