import { HOSTAPI } from "../../config/constantes";
import {getData} from '../../funcoes/geralFunctions';
import {AsyncStorage,ToastAndroid} from 'react-native';

export const types ={
    GET_BUSCA_USERS:'GET_BUSCA_USERS',
};

const initial_state={
    users:null
};

export const BuscaReducer= (state=initial_state,action)=>{
    switch (action.type) {
      case types.GET_BUSCA_USERS:
        return {
          ...state,
          users:action.payload.data
        }
        break;
      default:
        return state;
    }
}

export const getBuscaUsers=async (txt_busca)=>{

    // console.log(HOSTAPI);
    let id= await getData('user');
    let usersBusca = await fetch(HOSTAPI+`?user_id=${id}&txt_busca=${txt_busca}&type=GET_BUSCA_USERS`).
    then(res=>res.json())
    .then(resjson=>{
        if(!resjson.error){
            if(resjson.isgetusers){
                return resjson.usersBusca;
            }else{
                ToastAndroid.show(resjson.message, ToastAndroid.SHORT);
                // alert(resjson.message);
                return [];
            }
        }else{
            ToastAndroid.show(resjson.message, ToastAndroid.SHORT);
            // alert(resjson.message);
        }
    })
    .catch(err=>{
        console.log(err.message);
    });

    return {
      type:types.GET_BUSCA_USERS,
      payload:{data:usersBusca}
    }
}