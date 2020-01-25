import React, {Component} from "react";
import {StyleSheet} from 'react-native';

import {fist_color,body_color,header_text_color, unfocus_color} from '../config/constantes';

export const comentStyle=StyleSheet.create({
    padComent:{
        padding:5
    },
    comentContainer:{
        flexDirection:'row',
        paddingHorizontal:0
    },
    ajustContInfo:{
        backgroundColor:'white',
        borderRadius:10,
        marginTop:2
    },
    txtComent:{
        marginLeft:10,
        flex:1,
        maxWidth:'100%'
    },
    perfTxt:{
        color:'black',
        fontSize:16,
        fontWeight:'600'
    },
    contentStyle:{
        color:'black',
        flex: 1, 
        flexWrap: 'wrap'
    }
});