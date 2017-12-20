
export const addUser = (action) =>{
  return{
    type:"ADD_USER",
    name:action.name,
    id:action.id,
    loginStatus: true,
    img: action.img
  }
}
export const logout = () => {
  return{
    type:"LOGOUT"
  }
}
export const update = (name, img) => {
  console.log(name, img);
  return{
    type:"UPDATE_U",
    name,
    img
  }
}
export const phImg = (img) =>{
  return{
    type: "IMG",
    img
  }
}
export const phDesc = (desc) =>{
  return{
    type: "DESC",
    desc
  }
}
export const phLink = (link) =>{
  return{
    type: "LINK",
    link
  }
}
export const userImg = (user_img) =>{
  return{
    type:"USER_IMG",
    user_img
  }
}
export const userName = (user_name) =>{
  return{
    type:"USER_NAME",
    user_name
  }
}
export const resetPH = () =>{return{type:"RESET_PH"}}
export const phErr = (error) =>{
  return{
    type:"PH_ERR",
    error
  }
}
export const addPin = (action) =>{
  return{
    type: "ADD_PIN",
    img:action.img,
    desc: action.desc,
    creator_img:action.creator_img,
    creator_id:action.creator_id,
    id:action._id,
    who: action.who,
    votes:action.votes,
  }
}
export const deletePin = (id) =>{
  return{
    type:"DELETE_PIN",
    id
  }
}
export const resetPin = () => {return{type:"RESET_PIN"}}

export const votePin = (id, who, votes) =>{
  return{
    type:"VOTE_PIN",
    id,
    who,
    votes
  }
}
export const showNavbar = () =>{
  return{
    type:"SHOW"
  }
}
export const hideNavbar = () =>{
  return{
    type:"HIDE"
  }
}
