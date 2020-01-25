import React from "react";
import{
    StyleSheet
} from 'react-native';

import {fist_color,unfocus_color,body_color} from '../config/constantes';

export const loginStyle=StyleSheet.create({
    containerScroolLogin:{
        flexGrow: 1,
        // backgroundColor:"red",
        // paddingTop:60,
        // padding:10,
        flexDirection:'column'
        // zIndex:6,

    },
    bodyContainerLogin:{
        flex:1,
        backgroundColor:body_color,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        // elevation:2,
        overflow:'hidden',
        // padding:10,
    },
    input:{
        fontSize:20,
        marginBottom:5,
        borderRadius:15,
        paddingHorizontal:10,
        width:'100%',
        borderColor:unfocus_color,
        borderWidth:2,
        borderStyle:'solid',
        maxWidth:'100%'
    },
    btnLog:{
        alignSelf:'flex-end',
        width:100,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        padding:5,
        borderColor:fist_color,
        borderWidth:2,
        borderStyle:'solid'
    },
    txtBtnLog:{
        fontSize:18,
        color:fist_color
    },
    backLabel:{
        marginLeft:20,
        backgroundColor:body_color,
        alignSelf:'flex-start',
        paddingHorizontal:5,
        zIndex:2
    },
    labelLog:{
        alignSelf:'flex-start',
        color:unfocus_color,
        fontSize:16
    },
    padBodyContainer:{
        paddingTop:60,
        flex:1
    },
    headerSimple:{
        // backgroundColor:'red',
        height:60,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:5,
        paddingHorizontal:20,
        alignItems:'flex-start',
        justifyContent:'center'
    },
    textHeaderSimple:{
        color:unfocus_color,
        fontSize:16
    },
    lineBtns:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
        marginTop:5
    },
    textDest:{
        fontSize:40,
        fontWeight:'400',
        // alignSelf:'center',
        color:fist_color
    },
    lineEditPhoto:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
        // paddingHorizontal:0,
        borderColor:unfocus_color,
        borderWidth:2,
        borderStyle:'solid',
        borderRadius:15,
        marginBottom:5
    },
    containerLogo:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10
    },
    imgDim:{
        width:100,
        height:60
    },
    imgDimSecond:{
        width:70,
        height:40
    }
});