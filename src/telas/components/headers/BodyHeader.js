import React,{Component} from 'react';

import {
    View,
    Text
} from 'react-native';

import {loginStyle} from '../../../styles/login';

const BodyHeader=(props)=>{
    return (
        <View style={loginStyle.headerSimple}>
            <Text style={loginStyle.textHeaderSimple}>{props.title}</Text>
        </View>
    );
};

export default BodyHeader;