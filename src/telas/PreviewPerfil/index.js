import  React,{ Component } from "react";
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';

import {HOST_IMAGE_PADRAO} from '../../config/constantes';

import {styleGeral} from '../../styles/geral';
import {loginStyle} from '../../styles/login';
import {perfilStyle} from '../../styles/perfil';
import GeralHeader from "../components/headers/GeralHeader";

export default class PreviewPerfil extends Component{
    constructor(props){
        super(props);

        this.state={
            nome:null,
            username:null,
            descricao:null,
            uricapa:null,
            uriperfil:null
        }
    }

    componentDidMount(){
        let {navigation} = this.props;
        this.setState({
            nome:navigation.getParam('nome', null),
            username:navigation.getParam('username', null),
            descricao:navigation.getParam('descricao', null),
            uricapa:navigation.getParam('uricapa', null),
            uriperfil:navigation.getParam('uriperfil', null)
        });
    }

    render(){
        return (
            <View style={styleGeral.container}>
                <GeralHeader title="Pré-visualização de perfil"/>
                <ScrollView contentContainerStyle={[loginStyle.containerScroolLogin]}>
                    <View style={[loginStyle.padBodyContainer,{paddingTop:60,paddingBottom:0}]}>
                        <View style={[loginStyle.bodyContainerLogin,{padding:4}]}>
                                <View style={perfilStyle.containerImagesInfo}>
                                    <Image 
                                        style={[perfilStyle.styleCapa]} 
                                        source={this.state.uricapa?{uri:this.state.uricapa}:{uri:HOST_IMAGE_PADRAO}} 
                                        onLoad={() => { this.setState({ capaImageVisible: true }); }}/>
                                    <View style={perfilStyle.filterCapa}></View>
                                </View>
                                <View style={perfilStyle.containerInfoLinePerf}>
                                    <View style={[perfilStyle.contImgPerfil]}>
                                        <Image 
                                            style={[perfilStyle.perfilImg]}  
                                            source={this.state.uriperfil?{uri:this.state.uriperfil}:{uri:HOST_IMAGE_PADRAO}} 
                                            onLoad={() => { this.setState({ perfilImageVisible: true }); }}/>

                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text numberOfLines={1} style={perfilStyle.textNamePerfil}>{this.state.nome}</Text>
                                    </View>
                                </View>
                                <View style={{padding:6}}>
                                    <View style={{marginBottom:10}}>

                                        <Text style={[perfilStyle.textDesc,{textAlign:'center'}]}>{this.state.descricao}</Text>
                                        <Text style={perfilStyle.textDateDesc}>dd/mm/aaaa hh:mm</Text>
                                    </View>
                                    <View>
                                        <View style={perfilStyle.lineIndic}>
                                            <Text style={perfilStyle.numberIndic}>0</Text>
                                            <Text style={perfilStyle.txtIndicesc}>Seguidores</Text>
                                        </View>
                                        <View style={perfilStyle.lineIndic}>
                                            <Text style={perfilStyle.numberIndic}>0</Text>
                                            <Text style={perfilStyle.txtIndicesc}>Seguindo</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
                                        <View style={perfilStyle.lineIndic}>
                                            <Text style={perfilStyle.numberIndicDias}>0</Text>
                                            <Text style={perfilStyle.txtIndicDescDias}>Dias compartilhados</Text>
                                        </View>
                                        <TouchableOpacity 
                                            style={[loginStyle.btnLog]}
                                            onPress={()=>{}}>
                                            <Text style={loginStyle.txtBtnLog}>Postar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}