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
import { postStyle } from '../../../styles/post';

class PostDestaqueHistorico extends Component{
    constructor(props){
        super(props);
        this.state={
            post:props.post[0]
        };

        // console.log(props.post[0].contenttext);
    }

    componentWillReceiveProps(nextProps){
        const {post} = this.props;

        if(post[0]!=nextProps.post[0]){
            this.setState({post:nextProps.post[0]});
        }
    }

    render(){
        return(
            <View style={postStyle.containerPost}>
                <View style={postStyle.padPost}>
                    <View style={[postStyle.lineDivider,{width:'90%'}]}></View>
                    <TouchableWithoutFeedback
                        onPress={()=>{}}>
                        <View
                            style={[postStyle.containerContentPost,{width:'90%',alignSelf:'center'}]}>
                            <Text style={[postStyle.txtContent]}>{this.state.post.contenttext}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={[postStyle.lineDivider,{width:'90%'}]}></View>
                    <View style={postStyle.footerPost}>
                        <View style={postStyle.lineButtons}></View>

                        <Text style={postStyle.dateStyle}>{calcdiffdates(this.state.post.datahorapost)}</Text>
                    </View>
                </View>
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

export default withNavigation(connect(mapStateToProps,mapDispatchToProps)(PostDestaqueHistorico));