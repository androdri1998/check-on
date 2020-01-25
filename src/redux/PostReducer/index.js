import { HOSTAPI } from "../../config/constantes";
import {getData} from '../../funcoes/geralFunctions';
import {AsyncStorage,ToastAndroid} from 'react-native';

export const types ={
    GET_POST_MY_PERFIL:'GET_POST_MY_PERFIL',
    GET_POST_DAY:'GET_POST_DAY',
    GET_COMENTS_POST:'GET_COMENTS_POST',
    GET_POST_OTHER_PERFIL:'GET_POST_OTHER_PERFIL',
    GET_POST_OF_FOLLOWS:'GET_POST_OF_FOLLOWS',
    GET_POSTS_SAVES:'GET_POSTS_SAVES',
    GET_POSTS_TRENDING:'GET_POSTS_TRENDING'
};

// estado inicial da store do reducer
const initial_state={
    myPosts:null,
    otherPosts:null,
    postDay:null,
    coments:null,
    timeline:null,
    postSaves:null,
    postTrending:null
};

// local verificação das actions e retornar os resultados obtidos
export const PostsReducer= (state=initial_state,action)=>{
    switch (action.type) {
        case types.GET_POST_MY_PERFIL:
            return {
                ...state,
                myPosts:action.payload.data
            }
            break;
        case types.GET_POST_OTHER_PERFIL:
            return {
                ...state,
                otherPosts:action.payload.data
            }
            break;
        case types.GET_POST_DAY:
            return {
                ...state,
                postDay:action.payload.data
            }
            break;
        case types.GET_COMENTS_POST:
            return {
                ...state,
                coments:action.payload.data
            }
            break;
        case types.GET_POST_OF_FOLLOWS:
            return {
                ...state,
                timeline:action.payload.data
            }
            break;
        case types.GET_POSTS_SAVES:
            return {
                ...state,
                postSaves:action.payload.data
            }
            break;
        case types.GET_POSTS_TRENDING:
            return {
                ...state,
                postTrending:action.payload.data
            }
            break;
        default:
            return state;
    }
}

export const fetchComentsPost= async (post_id)=>{
    let coments = await fetch(HOSTAPI+`?post_id=${post_id}&type=GET_POST_COMENTS`).
    then(res=>res.json())
    .then(resjson=>{
        // console.log(resjson.coments);
        return resjson.coments;
    })
    .catch(err=>{
        console.log(err.message);
    });
    
    return {
      type:types.GET_COMENTS_POST,
      payload:{data:coments}
    };
}

export const fetchMyPosts=async ()=>{
    
    // console.log(HOSTAPI);
    let id= await getData('user');
    let posts = await fetch(HOSTAPI+`?user=${id}&type=GET_MY_POSTS`).
    then(res=>res.json())
    .then(resjson=>{
        // console.log(resjson.posts);
        return resjson.posts;
    })
    .catch(err=>{
        console.log(err.message);
    });
    
    return {
      type:types.GET_POST_MY_PERFIL,
      payload:{data:posts}
    };
}

export const fetchPostsOfFollows=async ()=>{
    
    // console.log(HOSTAPI);
    let id= await getData('user');
    let posts = await fetch(HOSTAPI+`?user_id=${id}&type=GET_POST_OF_FOLLOWS`).
    then(res=>res.json())
    .then(resjson=>{
        // console.log(resjson.posts);
        if(resjson.isposts){
            return resjson.posts;
        }else if(resjson.iserror){
            ToastAndroid.show(resjson.message, ToastAndroid.SHORT);
            // alert(resjson.message);
            return [];
        }else if(!resjson.isposts){
            ToastAndroid.show(resjson.message, ToastAndroid.SHORT);
            // alert(resjson.message);
            return [];
        }
    })
    .catch(err=>{
        console.log(err.message);
    });
    
    return {
      type:types.GET_POST_OF_FOLLOWS,
      payload:{data:posts}
    };
}

export const fetchOtherPosts=async (id)=>{
    
    // console.log(HOSTAPI);
    // let id= await getData('user');
    let posts = await fetch(HOSTAPI+`?user=${id}&type=GET_MY_POSTS`).
    then(res=>res.json())
    .then(resjson=>{
        // console.log(resjson.posts);
        return resjson.posts;
    })
    .catch(err=>{
        console.log(err.message);
    });
    
    return {
      type:types.GET_POST_OTHER_PERFIL,
      payload:{data:posts}
    };
}

export const fetchMyPostsDay=async (user,date)=>{
    
    // console.log(HOSTAPI);
    let posts = await fetch(HOSTAPI+`?user=${user}&data=${date}&type=GET_POST_DAY`).
    then(res=>res.json())
    .then(resjson=>{
        // console.log(resjson.posts);
        return resjson.posts;
    })
    .catch(err=>{
        console.log(err.message);
    });
    
    return {
      type:types.GET_POST_DAY,
      payload:{data:posts}
    };
}

export const fetchPostsSaves=async ()=>{
    let data=new FormData(),it=false,posts=null;
    it=await getData('user');

    posts= await fetch(HOSTAPI+`?id=${it}&type=GET_POSTS_SAVES`)
    .then(res=>res.json())
    .then(resJson=>{
        if(resJson.isposts){
            if(resJson.message){
                ToastAndroid.show(resJson.message, ToastAndroid.SHORT);
                return [];
            }
            return resJson.posts;
        }else{
            ToastAndroid.show(resJson.message, ToastAndroid.SHORT);
            return [];
        }
    }).catch(()=>{
        // alert("falha na busca");
        return [];
    });

    return {
      type:types.GET_POSTS_SAVES,
      payload:{data:posts}
    }
}

export const fetchPostsTreading=async ()=>{
    let posts=null;

    it=await getData('user');

    posts= await fetch(HOSTAPI+`?id=${it}&type=GET_POSTS_TRENDING`)
    .then(res=>res.json())
    .then(resJson=>{
        ToastAndroid.show(resJson.message, ToastAndroid.SHORT);
        if(resJson.isposts){
            return resJson.posts;
        }else{
            return [];
        }
    }).catch(()=>{
        // alert("falha na busca");
        return [];
    });

    return {
      type:types.GET_POSTS_TRENDING,
      payload:{data:posts}
    }
}