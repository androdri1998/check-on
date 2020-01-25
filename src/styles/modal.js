import React, {Component} from "react";
import {StyleSheet} from 'react-native';

import {fist_color,body_color,header_text_color, unfocus_color} from '../config/constantes';

export const modalStyle=StyleSheet.create({
    containerFormModal:{
        backgroundColor:'white',
        height:200,
        alignSelf:'flex-end',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:10
    },
    backgroundClose:{
        flex:1,
        backgroundColor:'rgba(0,0,0,.3)'
    },
    containerInpComentario:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:10
    },
    inpAjustComent:{
        marginTop:-10,
        height:50,
        paddingRight:45,
        width:'100%',
        maxWidth:'100%'
    },
    btnInpAlign:{
        height:50,
        alignItems:'center',
        marginLeft:-40
    },
    btnComent:{
        width:40,
        height:40,
        marginTop:5
    },
    containerFormPost:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-between'
    },
    inpPost:{
        flex:1,
        width:'100%'
    },
    ajustInpPost:{
        marginTop:-10,
        maxHeight:90,
        width:'100%',
        maxWidth:'100%'
    },
    lineBtnsLog:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    }
});