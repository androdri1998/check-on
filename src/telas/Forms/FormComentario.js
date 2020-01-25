import React,{Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    StatusBar,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import Ripple from "react-native-material-ripple";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {fist_color,header_text_color, unfocus_color} from '../../config/constantes';

import {withFormik} from 'formik';
import {withNavigation} from 'react-navigation';
import * as Yup from 'yup';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {alterModal} from '../../redux/ConfigReducer';
import {fetchComentsPost} from '../../redux/PostReducer';

import {styleGeral} from '../../styles/geral';
import {loginStyle} from '../../styles/login';

import {
    POST_TYPE_NEW_POST,
    HOSTAPI,
    TYPE_CADASTRO,
    TYPE_NEW_POST,
    POST_TYPE_NEW_COMENT
} from '../../config/constantes';
import {persistData, getData} from '../../funcoes/geralFunctions';
import { modalStyle } from '../../styles/modal';

class FormComentario extends Component{
    constructor(props){
        super(props);
        this.state={
            post_id:null
        }
    }

    componentDidMount(){
        console.log(this.props);
    }

    componentWillReceiveProps(nextProps){
        const {obj} = this.props;
        // this.props.setFieldValue('post_id',nextProps.post_id)
        // console.log(nextProps);
        if(obj!=nextProps.obj){
            this.props.setFieldValue('post_id',nextProps.obj[0].info.post_id);
                // this.setState({post_id:nextProps.obj[0]})
        }
    }

    // getImagemPerfil(){
    //     // alert("imagem");
    //     let options = {
    //         title: 'Selecionar foto de perfil',
    //         // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    //         storageOptions: {
    //             skipBackup: true,
    //             path: 'images',
    //         },
    //     };

    //     ImagePicker.launchImageLibrary(options, (response) => {
    //         console.log('Response = ', response);

    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton);
    //         } else {
    //             console.log(response);

    //             // this.props.setFieldValue('avatarPerfilSource',response.uri);
    //             // this.props.setFieldValue('imagemPerfil',response);
    //             // this.props.setFieldValue('avatarPerfilSourceName',response.fileName);

    //         }
    //     });
    // }

    render(){
        let {navigation} = this.props;
        // if(this.state.post_id){
        //     this.props.setFieldValue('post_id',this.state.post_id)
        // }

        return (
            <View style={{backgroundColor:'white',position:'absolute',bottom:0}}>
                { this.props.isSubmitting && <ActivityIndicator /> }
                
                    <View style={{width:'100%'}}>
                        <View style={[loginStyle.backLabel,{}]}>
                            <Text style={loginStyle.labelLog}>Comentário</Text>
                        </View>
                        <View style={modalStyle.containerInpComentario}>
                            <TextInput
                                style={[loginStyle.input,modalStyle.inpAjustComent]}
                                value={this.props.values.comentario}
                                placeholder="Diga algo sobre..."
                                // multiline = {true}
                                numberOfLines = {1}
                                onChangeText={text=>this.props.setFieldValue('comentario',text)}
                                />
                            <View style={modalStyle.btnInpAlign}>
                                <TouchableOpacity 
                                style={modalStyle.btnComent}
                                onPress={this.props.handleSubmit} disabled={!this.props.values.comentario}>
                                    <MaterialIcons name="send" size={24} color={this.props.values.comentario?fist_color:unfocus_color} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                { this.props.touched.comentario && this.props.errors.comentario && <Text style={styleGeral.warnTxt}>{this.props.errors.comentario}</Text> }
                { this.props.errors.message && <Text style={styleGeral.errTxt}>{this.props.errors.message}</Text> }
            </View>
        );
    }
}

const FormToComentario=withNavigation(withFormik({
    mapPropsToValues:()=>({
        comentario:'',
        post_id:null
    }),
    validationSchema:Yup.object().shape({}),
    handleSubmit:async (values,{props:{fetchComentsPost},resetForm,setSubmitting, setErrors})=>{
        console.log(values);
        
        let obj={
            autor_id:await getData('user'),
            post_id:values.post_id,
            content_text:values.comentario,
        };

        let data=new FormData();
        data.append('data',JSON.stringify(obj));
        data.append('type',POST_TYPE_NEW_COMENT);

        await fetch(HOSTAPI,{
            headers:{
                'Accept':'application/json',
                'Content-Type': 'multipart/form-data'
            },
            method:'post',
            body:data
        })
        .then(res=>res.json())
        .then(async resJson=>{
            setSubmitting(false);
            if(!resJson.err){
                console.log(resJson);
                await Promise.all([
                    fetchComentsPost(values.post_id)
                ]);
                let valId=values.post_id;

                resetForm({comentario:'',post_id:valId});
                // alterModal(false);
            }else{
                console.log(resJson);
                setErrors({message:resJson.messageErr});
            }
            ToastAndroid.show(resJson.message, ToastAndroid.SHORT);
        }).catch(err=>{
            setSubmitting(false);
            setErrors({message:err.message});
        });
        
        // setSubmitting(false);
    }
})(FormComentario));


const mapStateToProps=(state)=>{
    return {modVisible:state.configReducer.modalActive};
}

// fetchPostSelected é importada da actions e passada como função para props
// mapDispatchToProps dispacha para o props todas as funções importadas e necessárias
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({alterModal,fetchComentsPost},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(FormToComentario);