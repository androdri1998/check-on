import React,{Component} from 'react';
import {
    StyleSheet
} from 'react-native';
import { unfocus_color } from '../config/constantes';

export const perfilStyle=StyleSheet.create({
    containerImagesInfo:{
        height:200,
        flexDirection:'row'
    },
    styleCapa:{
        width:'100%',
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        height:200,
        position:'absolute'
    },
    filterCapa:{
        width:'100%',
        alignItems:'center',
        justifyContent:'flex-end',
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        alignSelf:'flex-end',
        flexDirection:'column',
        padding:10,
        height:200,
        backgroundColor:'rgba(0,0,0,.4)'
    },
    containerInfoLinePerf:{
        width:'100%',
        alignSelf:'center',
        alignItems:'center',
        // justifyContent:'flex-end',
        // borderTopLeftRadius:30,
        // borderTopRightRadius:30,
        alignSelf:'flex-end',
        flexDirection:'column',
        marginTop:-50,
        // padding:10,
        // height:200,
        // backgroundColor:'rgba(0,0,0,.4)'
    },
    contImgPerfil:{
        height:100,
        width:100,
        backgroundColor:'white',
        padding:3,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20
    },
    perfilImg:{
        width:'100%',
        borderRadius:20,
        height:'100%'
    },
    contImgSmallPerfil:{
        height:24,
        width:24,
        padding:1,
        alignItems:'center',
        borderRadius:5
    },
    perfilSmallImg:{
        width:'100%',
        borderRadius:5,
        width:22,
        height:22,
        backgroundColor:'white'
    },
    textNamePerfil:{
        // marginTop:5,
        paddingHorizontal:0,
        alignSelf:'center',
        color:'black',
        fontSize:36,
        fontWeight:'500',
        // flex:1
    },
    textUsernamePerfil:{
        // alignSelf:'center',
        color:'black',
        fontSize:16,
    },
    lineSmallDesc:{
        flexDirection:'row',
        width:'100%',
        alignItems:'center'
    },
    textDesc:{
        padding:10,
        paddingHorizontal:0,
        fontSize:20,
        color:'black',
        alignSelf:'center'
    },
    textDateDesc:{
        alignSelf:'flex-end',
        fontSize:14,
        color:unfocus_color
    },
    lineIndic:{
        flexDirection:'row',
        alignItems:'center'
    },
    numberIndic:{
        marginRight:5,
        fontSize:14,
        fontWeight:'bold',
        color:'black'
    },
    txtIndicesc:{
        fontSize:14,
        fontWeight:'bold',
        color:'black'
    },
    numberIndicDias:{
        marginRight:5,
        fontSize:20,
        fontWeight:'bold',
        color:'black'
    },
    txtIndicDescDias:{
        fontSize:18,
        color:'black'
    }
});