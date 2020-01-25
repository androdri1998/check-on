import React,{Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';

import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {styleGeral} from '../../../styles/geral';
import {loginStyle} from '../../../styles/login';
import {perfilStyle} from '../../../styles/perfil';

import Ripple from "react-native-material-ripple";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';

import {fist_color,
        header_text_color, 
        unfocus_color, 
        HOST_IMAGES, 
        HOST_IMAGE_PADRAO} from '../../../config/constantes';

import {fetchMyPosts} from '../../../redux/PostReducer';
import { returnDay, returnDateFormat, returnHoraFormat,calcdiffdates } from '../../../funcoes/geralFunctions';
import { comentStyle } from '../../../styles/coment';

class Coment extends Component{
    constructor(props){
        super(props);
        this.state={
            coment:props.coment[0]
        };
    }

    componentWillReceiveProps(nextProps){
        const {coment} = this.props;

        if(coment[0]!=nextProps.coment[0]){
            this.setState({coment:nextProps.coment[0]});
        }
    }

    render(){
        return(
            <View style={comentStyle.padComent}>
                <View style={comentStyle.comentContainer}>
                    <View style={[perfilStyle.contImgSmallPerfil,comentStyle.ajustContInfo]}>
                        <Image 
                            style={[perfilStyle.perfilSmallImg]}  
                            source={this.state.coment?this.state.coment.fotoperf!=`padrao.png`?
                                {uri:HOST_IMAGES+`${this.state.coment.pasta}/perfis/${this.state.coment.fotoperf}`}:
                                {uri:HOST_IMAGE_PADRAO}:null} 
                            />
                    </View>
                    <View style={comentStyle.txtComent}>
                        <Text numberOfLines={1} style={comentStyle.perfTxt}>{this.state.coment?this.state.coment.username:null}</Text>
                        <Text style={comentStyle.contentStyle}>{this.state.coment.contenttextcoment}</Text>
                        <Text >{calcdiffdates(this.state.coment.datahoracoment)}</Text>
                    </View>
                </View >
            </View>
        )
    }
}

const mapStateToProps=(state)=>{
    return {};
}

// fetchPostSelected é importada da actions e passada como função para props
// mapDispatchToProps dispacha para o props todas as funções importadas e necessárias
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({fetchMyPosts},dispatch);
}

export default withNavigation(connect(mapStateToProps,mapDispatchToProps)(Coment));