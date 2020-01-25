import {AsyncStorage,ToastAndroid} from 'react-native';
import {HOSTAPI} from '../config/constantes';
import {DELETE_TYPE_UNFOLLOW,POST_TYPE_FOLLOW} from '../config/constantes';
import {getData} from './geralFunctions';

export const follow=async (idseguido)=>{
    let data=new FormData(),it=false,follow=false;

    it=await getData('user');

    let obj={
        idautor:it,
        idreceived:idseguido,
    };

    data.append('data',JSON.stringify(obj));
    data.append('type',POST_TYPE_FOLLOW);

    follow=await fetch(HOSTAPI,{
        headers:{
            'Accept':'application/json',
            'Content-Type': 'multipart/form-data'
        },
        method:'post',
        body:data
    })
    .then((res)=>res.json())
    .then((resJson)=>{
        ToastAndroid.show(resJson.message, ToastAndroid.SHORT);
        if(!resJson.err){
            return true;
        }else {
            return false;
        }
    });

    return follow;
}

export const unfollow=async (idseguido)=>{
    let data=new FormData(),it=false,follow=false;
    
    it=await getData('user');

    let obj={
        idautor:it,
        idreceived:idseguido,
    };
    data.append('data',JSON.stringify(obj));
    data.append('type',DELETE_TYPE_UNFOLLOW);

    follow=await fetch(HOSTAPI,{
        headers:{
            'Accept':'application/json',
            'Content-Type': 'multipart/form-data'
        },
        method:'post',
        body:data
    })
    .then((res)=>res.json())
    .then((resJson)=>{
        ToastAndroid.show(resJson.message, ToastAndroid.SHORT);
        if(resJson.unfollow){
            return false;
        }else{
            return true;
        }
    });
    //
    return follow;
}