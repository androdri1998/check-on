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
    ToastAndroid,
    ActivityIndicator
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import Ripple from "react-native-material-ripple";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {fist_color,header_text_color, unfocus_color} from '../../config/constantes';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getSimpleInfoUser} from '../../redux/UserReducer';

import {withFormik} from 'formik';
import {withNavigation} from 'react-navigation';
import * as Yup from 'yup';

import {styleGeral} from '../../styles/geral';
import {loginStyle} from '../../styles/login';

import {VERIFY_INFOS_CAD,PUT_TYPE_ATT_CADASTRO,HOSTAPI,POST_TYPE_CADASTRO} from '../../config/constantes';
import {persistData} from '../../funcoes/geralFunctions';

class FormCadSecond extends Component{
    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps){
        const {userEdit} = this.props;
        // this.props.setFieldValue('post_id',nextProps.post_id)
        // console.log(nextProps);
        if(userEdit!=nextProps.userEdit&&nextProps.userEdit[0]){
            this.props.setFieldValue('descricao',nextProps.userEdit[0].descricao);
            this.props.setFieldValue('nome',nextProps.userEdit[0].nome);
            this.props.setFieldValue('avatarCapaSource',nextProps.userEdit[0].fotocapa);
            this.props.setFieldValue('avatarPerfilSource',nextProps.userEdit[0].fotoperf);
            this.props.setFieldValue('pasta',nextProps.userEdit[0].pasta);
            this.props.setFieldValue('update',nextProps.userEdit[0].update);
            this.props.setFieldValue('avatarCapaSourceName','Capa atual');
            this.props.setFieldValue('avatarPerfilSourceName','Perfil atual');
        }
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

                this.props.setFieldValue('avatarPerfilSource',response.uri);
                this.props.setFieldValue('imagemPerfil',response);
                this.props.setFieldValue('avatarPerfilSourceName',response.fileName);

            }
        });
    }

    getImagemCapa(){
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

                this.props.setFieldValue('avatarCapaSource',response.uri);
                this.props.setFieldValue('imagemCapa',response);
                this.props.setFieldValue('avatarCapaSourceName',response.fileName);

            }
        });
    }

    render(){
        let {navigation} = this.props;

        return (
            <View style={{flex:1,alignItems:'center'}}>
                { this.props.isSubmitting && <ActivityIndicator /> }
                <View style={loginStyle.backLabel}>
                    <Text style={loginStyle.labelLog}>Editar foto de perfil</Text>
                </View>
                <View style={[loginStyle.lineEditPhoto,{width:'100%',marginTop:-10}]}>
                    <View style={styleGeral.contInpImage}>
                        <View style={styleGeral.backImagePreview}>
                            <Image style={styleGeral.imagePreview} source={this.props.values.avatarPerfilSource
                                                                                ?{uri:this.props.values.avatarPerfilSource}
                                                                                :require('../../assets/baseline_person_black_48.png')}/>
                        </View>
                        <Text style={{marginLeft:10}}>{this.props.values.avatarPerfilSourceName
                                                        ?this.props.values.avatarPerfilSourceName.length>20
                                                            ?`${this.props.values.avatarPerfilSourceName.substring(0,20)}...`
                                                            :`${this.props.values.avatarPerfilSourceName.substring(0,20)}`
                                                        :"padrao"}</Text>
                    </View>
                    <View style={styleGeral.contBtnRippleIcon}>
                        <Ripple onPress={()=>this.getImagemPerfil()}>
                            <MaterialIcons name="edit" size={24} color={unfocus_color} />
                        </Ripple>
                    </View>
                </View>
                <View style={loginStyle.backLabel}>
                    <Text style={loginStyle.labelLog}>Editar foto de capa</Text>
                </View>
                <View style={[loginStyle.lineEditPhoto,{width:'100%',marginTop:-10}]}>
                    <View style={styleGeral.contInpImage}>
                        <View style={styleGeral.backImagePreview}>
                            <Image style={styleGeral.imagePreview} source={this.props.values.avatarCapaSource
                                                                                ?{uri:this.props.values.avatarCapaSource}
                                                                                :require('../../assets/baseline_person_black_48.png')}/>
                        </View>
                        <Text style={{marginLeft:10}}>{this.props.values.avatarCapaSourceName
                                                        ?this.props.values.avatarCapaSourceName.length>20
                                                            ?`${this.props.values.avatarCapaSourceName.substring(0,20)}...`
                                                            :`${this.props.values.avatarCapaSourceName.substring(0,20)}`
                                                        :"padrao"}</Text>
                    </View>
                    <View style={styleGeral.contBtnRippleIcon}>
                        <Ripple onPress={()=>this.getImagemCapa()}>
                            <MaterialIcons name="edit" size={24} color={unfocus_color} />
                        </Ripple>
                    </View>
                </View>
                <View style={loginStyle.backLabel}>
                    <Text style={loginStyle.labelLog}>Nome</Text>
                </View>
                <TextInput
                    style={[loginStyle.input,{marginTop:-10}]}
                    value={this.props.values.nome}
                    placeholder="Nome"
                    onChangeText={text=>this.props.setFieldValue('nome',text)}
                    />

                { this.props.touched.nome && this.props.errors.nome && <Text style={styleGeral.warnTxt}>{this.props.errors.nome}</Text> }

                <View style={loginStyle.backLabel}>
                    <Text style={loginStyle.labelLog}>Descrição</Text>
                </View>
                <TextInput
                    style={[loginStyle.input,{marginTop:-10,maxHeight:90}]}
                    value={this.props.values.descricao}
                    placeholder="Fale um pouco sobre você..."
                    multiline = {true}
                    numberOfLines = {3}
                    onChangeText={text=>this.props.setFieldValue('descricao',text)}
                    />

                { this.props.touched.descricao && this.props.errors.descricao && <Text style={styleGeral.warnTxt}>{this.props.errors.descricao}</Text> }

                <View style={[loginStyle.lineBtns,{alignItems:'center',justifyContent:'flex-end'}]}>
                    <View style={styleGeral.containerButtons}>
                        <TouchableOpacity 
                            style={[loginStyle.btnLog,{width:50,alignSelf:'flex-end',marginLeft:10}]}
                            onPress={()=>this.props.navigation.navigate('PreviewPerfil',{
                                nome:this.props.values.nome,
                                username:navigation.getParam('username', null),
                                descricao:this.props.values.descricao,
                                uricapa:this.props.values.avatarCapaSource?this.props.values.avatarCapaSource:null,
                                uriperfil:this.props.values.avatarPerfilSource?this.props.values.avatarPerfilSource:null
                            })}>
                            <MaterialIcons name="visibility" size={24} color={fist_color} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[loginStyle.btnLog,{alignSelf:'flex-end',marginLeft:10}]}
                            onPress={()=>this.props.navigation.goBack()}>
                            <Text style={loginStyle.txtBtnLog}>Voltar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[loginStyle.btnLog,{alignSelf:'flex-end',marginLeft:10}]}
                            onPress={this.props.handleSubmit}>
                            <Text style={loginStyle.txtBtnLog}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                { this.props.errors.message && <Text style={styleGeral.errTxt}>{this.props.errors.message}</Text> }
            </View>
        );
    }
}

const FormToCad=withNavigation(withFormik({
    mapPropsToValues:()=>({
        descricao:'',
        nome:'',
        pasta:null,
        update:false,
        // capa
        avatarCapaSource:null,
        imagemCapa:null,
        avatarCapaSourceName:null,
        // perfil
        avatarPerfilSource:null,
        imagemPerfil:null,
        avatarPerfilSourceName:null,
    }),
    validationSchema:Yup.object().shape({
        nome:Yup.string()
        .min(2,'Nome deve ter pelo menos 2 caracteres')
        .required('Preencha o campo de nome'),
        descricao:Yup.string()
        .required('Preencha o campo de descrição'),
    }),
    handleSubmit:async (values,{props:{navigation,getSimpleInfoUser}, setSubmitting, setErrors})=>{
        console.log(values);

        Alert.alert(
        "Alteração de perfil",
        `Deseja salvar as alterações do perfil?`,
            [
                {
                    text: 'Não',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'Sim', onPress: async () =>{
                    let username=navigation.getParam('username', null);
                    let email=navigation.getParam('email', null);
                    let senha=navigation.getParam('senha', null);
                    
                    let data=new FormData();

                    let obj={
                        email:email,
                        senha:senha,
                        username:username,
                        nomealter:values.nome,
                        descricao:values.descricao,
                        pasta:values.pasta?values.pasta:null,
                    };

                    if(values.imagemPerfil){
                        data.append('ft_perfil',{
                            uri:values.imagemPerfil.uri,
                            name:values.imagemPerfil.fileName,
                            type:values.imagemPerfil.type
                        });
                    }

                    if(values.imagemCapa){
                        data.append('ft_capa',{
                            uri:values.imagemCapa.uri,
                            name:values.imagemCapa.fileName,
                            type:values.imagemCapa.type
                        });
                    }
                    
                    data.append('data',JSON.stringify(obj));
                    if(values.update)
                        data.append('type',PUT_TYPE_ATT_CADASTRO);
                    else
                        data.append('type',POST_TYPE_CADASTRO);
                
                    await fetch(HOSTAPI,{
                        headers:{
                            'Accept':'application/json',
                            'Content-Type': 'multipart/form-data'
                        },
                        method:'post',
                        body:data
                    })
                    .then((res)=>res.json())
                    .then((resJson)=>{
                        setSubmitting(false);
                        if(resJson.err){
                            setErrors({ message: resJson.message });
                        }else{
                            Alert.alert(
                                'Boas noticias',
                                'Cadastro realizado com sucesso',
                                [
                                    {text: 'Ir para home', onPress: () => {
                                            if(values.update){
                                                getSimpleInfoUser();
                                                ToastAndroid.show(resJson.results, ToastAndroid.SHORT);
                                                navigation.goBack();
                                            }else{
                                                persistData('islog','true');
                                                persistData('user',resJson.results);
                                                navigation.navigate('Loged');
                                            }
                                        }
                                    },
                                ],
                                {cancelable: false},
                            );
                        }
                        console.log(resJson);
                    }).catch(err=>{
                        setSubmitting(false);
                        setErrors({message:err.message});
                        console.log(err.message);
                    });
                }},
            ],
            {cancelable: false},
        );
    }
})(FormCadSecond));

const mapStateToProps=(state)=>{
    return {};
}

// fetchPostSelected é importada da actions e passada como função para props
// mapDispatchToProps dispacha para o props todas as funções importadas e necessárias
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({getSimpleInfoUser},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(FormToCad);