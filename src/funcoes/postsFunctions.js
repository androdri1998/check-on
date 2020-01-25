import {AsyncStorage,ToastAndroid} from 'react-native';
import {HOSTAPI} from '../config/constantes';
import {POST_TYPE_NEW_SAVE,DELETE_TYPE_DROP_SAVE} from '../config/constantes';
import {getData} from './geralFunctions';

export const returnFirstPostsDay=(obj)=>{
    let posts = [],inseridos=[];
    obj.map(e=>{
        if(!inseridos.includes(e.datahorapost.split(" ")[0])){
            inseridos.push(e.datahorapost.split(" ")[0]);
            posts.push(e);
        }
    });

    return posts;
};

export const newSave=async (idpost) => {
    let data=new FormData(),it=false,save=false;

    if(idpost){
        it=await getData('user');

        let obj={
            idautorsave:it,
            idpost:idpost,
        };
        data.append('data',JSON.stringify(obj));
        data.append('type',POST_TYPE_NEW_SAVE);

        save= await fetch(HOSTAPI,{
            headers:{
                'Accept':'application/json',
                'Content-Type': 'multipart/form-data'
            },
            method:'post',
            body:data
        }).then(res=>res.json())
        .then(resJson=>{
            ToastAndroid.show(resJson.message, ToastAndroid.SHORT);
            if(resJson.issave){
                return true;
            }else{
                return false;
            }
        });

        return save;
    }
}

export const dropSave=async (idpost)=>{
    let data=new FormData(),it=false,save=false;

    if(idpost){
        it=await getData('user');

        let obj={
            idautorsave:it,
            idpost:idpost,
        };
        data.append('data',JSON.stringify(obj));
        data.append('type',DELETE_TYPE_DROP_SAVE);

        save= await fetch(HOSTAPI,{
            headers:{
                'Accept':'application/json',
                'Content-Type': 'multipart/form-data'
            },
            method:'post',
            body:data
        }).then(res=>res.json())
        .then(resJson=>{
            ToastAndroid.show(resJson.message, ToastAndroid.SHORT);
            if(resJson.issave){
                return true;
            }else{
                return false;
            }
        });

        return save;
    }
}