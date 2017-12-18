let nextTodoId = 0;


export const addTodo = (text) =>{
    return{
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
  }
export const Delete = (num) =>{
  return{
    type: 'DELETE',
    data: num
  }
}
export const addUser = (action) =>{
  return{
    type:"ADD_USER",
    name:action.name,
    id:action.id,
    loginStatus: true,
    img: action.img
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
export const resetPin = () => {return{type:"RESET_PIN"}}

export const votePin = (id, who, votes) =>{
  return{
    type:"VOTE_PIN",
    id,
    who,
    votes
  }
}
