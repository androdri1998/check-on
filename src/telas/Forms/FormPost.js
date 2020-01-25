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
import {fetchMyPosts} from '../../redux/PostReducer';
import {getSimpleInfoUser} from '../../redux/UserReducer';

import {styleGeral} from '../../styles/geral';
import {loginStyle} from '../../styles/login';

import {POST_TYPE_NEW_POST,HOSTAPI,TYPE_CADASTRO,TYPE_NEW_POST} from '../../config/constantes';
import {persistData, getData} from '../../funcoes/geralFunctions';
import { modalStyle } from '../../styles/modal';

class FormPost extends Component{
    constructor(props){
        super(props);
    }

    getImagemPerfil(){
        // alert("imagem");
        let options = {
            title: 'Selecionar foto de perfil',
            // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log(response);

                // this.props.setFieldValue('avatarPerfilSource',response.uri);
                // this.props.setFieldValue('imagemPerfil',response);
                // this.props.setFieldValue('avatarPerfilSourceName',response.fileName);

            }
        });
    }

    render(){
        let {navigation} = this.props;

        return (
            <View style={modalStyle.containerFormPost}>
                { this.props.isSubmitting && <ActivityIndicator /> }
                <View style={modalStyle.inpPost}>
                    <View style={[loginStyle.backLabel,{marginTop:10}]}>
                        <Text style={loginStyle.labelLog}>Atualize seu dia</Text>
                    </View>
                    <TextInput
                        style={[loginStyle.input,modalStyle.ajustInpPost]}
                        value={this.props.values.postInput}
                        placeholder="O que temos para hoje?"
                        multiline = {true}
                        numberOfLines = {3}
                        onChangeText={text=>this.props.setFieldValue('postInput',text)}
                        />
                </View>

                { this.props.touched.postInput && this.props.errors.postInput && <Text style={styleGeral.warnTxt}>{this.props.errors.postInput}</Text> }

                <View style={[loginStyle.lineBtns,{alignItems:'center',justifyContent:'flex-end'}]}>
                    <View style={modalStyle.lineBtnsLog}>
                        <TouchableOpacity 
                            style={[loginStyle.btnLog,{alignSelf:'flex-end',marginLeft:10}]}
                            onPress={()=>{this.props.alterModal(false)}}>
                            <Text style={loginStyle.txtBtnLog}>Fechar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[loginStyle.btnLog,{alignSelf:'flex-end',marginLeft:10}]}
                            onPress={this.props.handleSubmit}>
                            <Text style={loginStyle.txtBtnLog}>Post now</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                { this.props.errors.message && <Text style={styleGeral.errTxt}>{this.props.errors.message}</Text> }
            </View>
        );
    }
}

const FormToPost=withNavigation(withFormik({
    mapPropsToValues:()=>({
        postInput:'',
        
        // perfil
        avatarPerfilSource:null,
        imagemPerfil:null,
        avatarPerfilSourceName:null,
    }),
    validationSchema:Yup.object().shape({
        postInput:Yup.string()
        .required('Preencha o campo de post'),
    }),
    handleSubmit:async (values,{props:{navigation,
                                        alterModal,
                                        fetchMyPosts,
                                        getSimpleInfoUser}, setSubmitting, setErrors})=>{
        // console.log(values);
        // setSubmitting(false);

        let obj={
            post:values.postInput,
            id:await getData('user')
        };

        let data=new FormData();

        data.append('data',JSON.stringify(obj));
        data.append('type',POST_TYPE_NEW_POST);

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
            console.log(resJson);
            setSubmitting(false);
            if(!resJson.err){
                ToastAndroid.show(resJson.message, ToastAndroid.SHORT);
                await Promise.all([
                    getSimpleInfoUser(),
                    fetchMyPosts()
                ]);
                alterModal(false);
            }else{
                setErrors({message:resJson.message});
            }
        }).catch(err=>{
            setSubmitting(false);
            setErrors({message:err.message});
        })
    }
})(FormPost));


const mapStateToProps=(state)=>{
    return {modVisible:state.configReducer.modalActive};
}

// fetchPostSelected é importada da actions e passada como função para props
// mapDispatchToProps dispacha para o props todas as funções importadas e necessárias
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({alterModal,fetchMyPosts,getSimpleInfoUser},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(FormToPost);