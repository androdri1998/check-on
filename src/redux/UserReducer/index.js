import { HOSTAPI } from "../../config/constantes";
import {getData} from '../../funcoes/geralFunctions';

export const types ={
    GET_INFO_SIMPLE_USER:'GET_INFO_SIMPLE_USER',
    GET_INFO_SIMPLE_OTHER_USER:'GET_INFO_SIMPLE_OTHER_USER',
};

const initial_state={
    user:null,
    otherUser:null
};

export const UserReducer= (state=initial_state,action)=>{
    switch (action.type) {
      case types.GET_INFO_SIMPLE_USER:
        return {
          ...state,
          user:action.payload.data
        }
        break;
      case types.GET_INFO_SIMPLE_OTHER_USER:
        return {
          ...state,
          otherUser:action.payload.data
        }
        break;
      default:
        return state;
    }
}

export const getSimpleInfoUser=async ()=>{

    // console.log(HOSTAPI);
    let id= await getData('user');
    let user = await fetch(HOSTAPI+`?user=${id}&autorFollow=${id}&type=GET_INFO_SIMPLE_USER`).
    then(res=>res.json())
    .then(resjson=>{
        // console.log(resjson.user[0]);
        return resjson;
    })
    .catch(err=>{
        console.log(err.message);
    });

    return {
      type:types.GET_INFO_SIMPLE_USER,
      payload:{data:user.user[0]}
    }
}

export const getSimpleInfoOtherUser=async (id)=>{

    // console.log(HOSTAPI);
    let autorFollow= await getData('user');
    let user = await fetch(HOSTAPI+`?user=${id}&autorFollow=${autorFollow}&type=GET_INFO_SIMPLE_USER`).
    then(res=>res.json())
    .then(resjson=>{
        console.log(resjson.user[0]);
        return resjson;
    })
    .catch(err=>{
        console.log(err.message);
    });

    return {
      type:types.GET_INFO_SIMPLE_OTHER_USER,
      payload:{data:user.user[0]}
    }
}