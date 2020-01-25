import {HOSTAPI,TYPE_LOGIN} from '../config/constantes';

import {getData} from './geralFunctions';

export const veriLog=async ()=>{
    let it=false,islog=false;
    it=await getData('islog');
    if(it=='true'){
        // alert('true');
        islog=true;
    }else{
        // alert('false');
        islog=false;
    }
    return islog;
}

export const logar =async (obj)=>{
    let data=new FormData();

    data.append('email',JSON.stringify(obj));
    data.append('type',TYPE_LOGIN);

    await fetch(HOSTAPI,{
        headers:{
            'Accept':'application/json',
            'Content-Type': 'multipart/form-data'
        },
        method:'post',
        body:data
    })
    .then((res)=>res.json())
    .then((resJson)=>{
        console.log(resJson);
    });
}
