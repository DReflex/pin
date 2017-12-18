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
