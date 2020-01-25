import  React,{ Component } from "react";
import {
    Text,
    View,
    ScrollView,
    StatusBar,
    Image
} from 'react-native';

import {fist_color,header_text_color} from '../../config/constantes';

import {styleGeral} from '../../styles/geral';
import {loginStyle} from '../../styles/login';
import FormCadastro from '../Forms/FormCadastro';
import GeralHeader from "../components/headers/GeralHeader";
import BodyHeader from "../components/headers/BodyHeader";

export default class Cadastro extends Component{
    render(){
        return (
            <View style={styleGeral.container}>
                <GeralHeader title="Vamos lá"/>
                <ScrollView contentContainerStyle={loginStyle.containerScroolLogin}>
                    <View style={loginStyle.padBodyContainer}>
                        <View style={[loginStyle.bodyContainerLogin,{padding:10}]}>
                            <BodyHeader title=""/>
                                <View style={loginStyle.containerLogo}>
                                    <Image style={loginStyle.imgDim} source={require('../../assets/img/logoPurple2.png')}/>
                                </View>
                                <FormCadastro />    
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}