import React,{Component} from 'react';

import {
    View,
    Text,
    StatusBar
} from 'react-native';

import {fist_color,header_text_color} from '../../../config/constantes';

import {styleGeral} from '../../../styles/geral';
import {loginStyle} from '../../../styles/login';


const GeralHeader=(props)=>{
    return (
        <View>
            <StatusBar
                    backgroundColor={fist_color}
                    barStyle="light-content"
                />
            <View style={styleGeral.headerGeral}>
                <Text style={styleGeral.headerText}>{props.title}</Text>
            </View>
        </View>
    );
}

export default GeralHeader;