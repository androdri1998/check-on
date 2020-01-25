// constante a serem usadas por actions e reducers
export const types ={
    ACTION_LOGIN:'ACTION_LOGIN',
};

// estado inicial da store do reducer
const initial_state={
    user:null
};

// local verificação das actions e retornar os resultados obtidos
export const LoginReducer= (state=initial_state,action)=>{
  switch (action.type) {
    case types.ACTIONS_CONST:
      return {
        ...state,
        user:action.payload.data
      }
      break;
    default:
      return state;
  }
}

export const loginAction=(param1)=>{
    
    // code ...
    // alert(param1);

    return {
      type:types.ACTION_LOGIN,
      payload:[1,2,3]
    }
}