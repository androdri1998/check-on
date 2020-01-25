import React, {Component} from "react";
import {StyleSheet} from 'react-native';

import {fist_color,body_color,header_text_color, unfocus_color} from '../config/constantes';

export const styleGeral=StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:'red'
        backgroundColor:fist_color,
        // position:'absolute',
        // zIndex:0
    },
    bodyContainer:{
        flex:1,
        backgroundColor:body_color,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:10
    },
    headerGeral:{
        height:60,
        paddingHorizontal:10,
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        zIndex:0
    },
    headerText:{
        fontSize:20,
        color:header_text_color
    },
    contIconTab:{
        padding:5,
        // padding:7,
        // paddingHorizontal:0,
        // minWidth:34,
        alignItems:'center',
        justifyContent:'center',
        borderStyle:'solid',
        borderWidth:2,
        borderColor:fist_color,
        borderRadius:20
    },
    backImagePreview:{
        padding:5,
        width:45,
        height:45,
        backgroundColor:unfocus_color,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center'
    },
    imagePreview:{
        backgroundColor:'white',
        borderRadius:30,
        width:40,
        height:40
    },
    contBtnRippleIcon:{
        // backgroundColor:"red",
        borderRadius:30,
        padding:5,
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden'
    },
    warnTxt:{
        alignSelf:'flex-end',
        color:'#ff6f00'
    },
    errTxt:{
        color:'#dd2c00',
        textAlign:'center',
        margin:5
    },
    shimmerComponent: {
        alignSelf: 'stretch',
        marginBottom: 10,
    },
    shimeTxtAtualiz:{
        padding:5,
        paddingHorizontal:0,
        width:200
    },
    flex:{
        flex:1
    },
    row:{
        flexDirection:'row'
    },
    backAlign:{
        backgroundColor:"white",
        alignItems:'center'
    },
    ajusteBtnLog:{
        alignSelf:'flex-end',
        marginLeft:10
    },
    contInpImage:{
        flexDirection:'row',
        alignItems:'center'
    },
    containerButtons:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    }
});