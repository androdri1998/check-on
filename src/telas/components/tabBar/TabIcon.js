import React,{Component} from 'react';

import {
    View
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { styleGeral } from '../../../styles/geral';
import {unfocus_color} from '../../../config/constantes';

const TabIcon=(props)=>{
    return (
        // <View style={[styleGeral.contIconTab,{
        //                                         borderColor:props.foc?props.tint:unfocus_color}]}>
            <MaterialIcons name={props.name} size={props.foc?34:24} color={props.foc?props.tint:unfocus_color} />
        // </View>
    );
};

export default TabIcon;