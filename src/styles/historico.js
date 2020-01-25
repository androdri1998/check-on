import React,{Component} from 'react';
import {
    StyleSheet
} from 'react-native';
// import { unfocus_color } from '../config/constantes';

import {fist_color,body_color,header_text_color, unfocus_color} from '../config/constantes';

export const historicoStyle=StyleSheet.create({
    containerPostsHist:{
        flex:1,
        flexDirection:'row'
    },
    containerInfoDay:{
        alignItems:'center',
        // paddingTop:10,
        paddingLeft:10
    },
    txtDay:{
        fontSize:30,
        // marginBottom:10,
        color:fist_color
    },
    lineDay:{
        // width:1,
        flex:1,
        // backgroundColor:'red',
        alignItems:'center',
        borderStyle:'solid',
        borderColor:'rgba(0,0,0,.1)',
        borderRightWidth:2,
    }
});