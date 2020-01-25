import {combineReducers} from 'redux';

import {LoginReducer} from './LoginReducer';
import {UserReducer} from './UserReducer';
import { ConfigReducer } from './ConfigReducer';
import { PostsReducer } from './PostReducer';
import { BuscaReducer } from './BuscaReducer';
//  reducer geral

// retorna todos os reducers combinados
const reducer= combineReducers({
    userReducer:UserReducer,
    configReducer:ConfigReducer,
    postReducer:PostsReducer,
    buscaReducer:BuscaReducer
});

export default reducer;
