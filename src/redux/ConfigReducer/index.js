// constante a serem usadas por actions e reducers
export const types ={
    ACTIVE_MODAL:'ACTIVE_MODAL',
};

// estado inicial da store do reducer
const initial_state={
    modalActive:false
};

// local verificação das actions e retornar os resultados obtidos
export const ConfigReducer= (state=initial_state,action)=>{
  switch (action.type) {
    case types.ACTIVE_MODAL:
      return {
        ...state,
        modalActive:action.payload.data
      }
      break;
    default:
      return state;
  }
}

export const alterModal=(mode=false)=>{
    return {
      type:types.ACTIVE_MODAL,
      payload:{data:mode}
    }
}