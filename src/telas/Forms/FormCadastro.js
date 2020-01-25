import React,{Component} from 'react';
import {
    View, 
    TextInput, 
    Button,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native';

import {withFormik} from 'formik';
import {withNavigation} from 'react-navigation';
import * as Yup from 'yup';

import {styleGeral} from '../../styles/geral';
import {loginStyle} from '../../styles/login';

import {POST_VERIFY_INFOS_CAD,HOSTAPI} from '../../config/constantes';

class FormCadastro extends Component{
    constructor(props){
        super(props);
    }

    alertFun=(title,obj)=>{
        Alert.alert(
        title,
        `As informações estão corretas?\nUsername: ${obj.username}\nEmail:${obj.email}`,
            [
                {
                    text: 'Não',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'Sim', onPress: () => this.props.navigation.navigate('SecondScreenCad',{
                    username:this.props.values.username,
                    email:this.props.values.email,
                    senha:this.props.values.password
                })},
            ],
            {cancelable: false},
        );
    }
    
    render(){
        return (
            <View style={[styleGeral.container,styleGeral.backAlign]}>
                <View style={loginStyle.backLabel}>
                    <Text style={loginStyle.labelLog}>Username</Text>
                </View>
                <TextInput
                    style={[loginStyle.input,{marginTop:-10}]}
                    value={this.props.values.username}
                    placeholder="Usern@me"
                    onChangeText={text=>this.props.setFieldValue('username',text)}
                    />
                { this.props.touched.username && this.props.errors.username && <Text style={styleGeral.warnTxt}>{this.props.errors.username}</Text> }
                <View style={loginStyle.backLabel}>
                    <Text style={loginStyle.labelLog}>Email</Text>
                </View>
                <TextInput
                    style={[loginStyle.input,{marginTop:-10}]}
                    value={this.props.values.email}
                    keyboardType="email-address"
                    placeholder="example@mail.com"
                    onChangeText={text=>this.props.setFieldValue('email',text)}
                    />
                { this.props.touched.email && this.props.errors.email && <Text style={styleGeral.warnTxt}>{this.props.errors.email}</Text> }
                <View style={loginStyle.backLabel}>
                    <Text style={loginStyle.labelLog}>Senha</Text>
                </View>
                <TextInput
                    style={[loginStyle.input,{marginTop:-10}]}
                    value={this.props.values.password}
                    secureTextEntry={true}
                    placeholder="******"
                    onChangeText={text=>this.props.setFieldValue('password',text)}
                    />
                { this.props.touched.password && this.props.errors.password && <Text style={styleGeral.warnTxt}>{this.props.errors.password}</Text> }
                <View style={loginStyle.backLabel}>
                    <Text style={loginStyle.labelLog}>Confirmar senha</Text>
                </View>
                <TextInput
                    style={[loginStyle.input,{marginTop:-10}]}
                    value={this.props.values.confsenha}
                    secureTextEntry={true}
                    placeholder="******"
                    onChangeText={text=>this.props.setFieldValue('confsenha',text)}
                    />
                { this.props.touched.confsenha && this.props.errors.confsenha && <Text style={styleGeral.warnTxt}>{this.props.errors.confsenha}</Text> }

                <View style={[loginStyle.lineBtns,{alignItems:'center',justifyContent:'flex-end'}]}>
                    <TouchableOpacity 
                        style={[loginStyle.btnLog,styleGeral.ajusteBtnLog]}
                        onPress={()=>this.props.navigation.goBack()}>
                        <Text style={loginStyle.txtBtnLog}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[loginStyle.btnLog,styleGeral.ajusteBtnLog]}
                        onPress={this.props.handleSubmit}>
                        <Text style={loginStyle.txtBtnLog}>Continuar</Text>
                    </TouchableOpacity>
                </View>

                { this.props.errors.message && <Text style={styleGeral.errTxt}>{this.props.errors.message}</Text> }
            </View>
        );
    }
}

export default withNavigation(withFormik({
    mapPropsToValues:()=>({email:'',password:'',username:'',confsenha:''}),
    validationSchema:Yup.object().shape({
        email:Yup.string()
            .email('Digite um email válido')
            .required('Preencha o campo de email'),
        password:Yup.string()
            .min(6,'A senha deve ter 6 caracteres')
            .required('Preencha o campo de senha'),
        username:Yup.string()
            .min(6,'O nome de usuário deve ter 6 caracteres no mínimo')
            .max(20,'O nome de usuário deve ter 20 caracteres no máximo')
            .required('Preencha o campo de senha'),
        confsenha:Yup.string()
            .min(6,'A conferência de senha deve ter 6 caracteres')
            .required('Preencha o campo de conferência de senha')
    }),
    handleSubmit:(values,{props:{navigation}, setSubmitting, setErrors})=>{
        console.log(values);
        if(values.password==values.confsenha){
            // setSubmitting(false);
            Alert.alert(
                "Estamos quase lá",
                `As informações estão corretas?\nUsername: ${values.username}\nEmail:${values.email}`,
                [
                    {
                        text: 'Não',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {text: 'Sim', onPress: async () => {
                        // navigation.navigate('SecondScreenCad',{
                        //     username:values.username,
                        //     email:values.email,
                        //     senha:values.password
                        // });

                        let data=new FormData();

                        data.append('data',JSON.stringify(values));
                        data.append('type',POST_VERIFY_INFOS_CAD);

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
                            // console.log(resJson);
                            if(resJson.err){
                                setErrors({ message: resJson.message });
                            }else{
                                navigation.navigate('SecondScreenCad',{
                                    username:values.username,
                                    email:values.email,
                                    senha:values.password
                                });
                            }
                        }).catch(err=>{
                            setSubmitting(false);
                            setErrors({ message: err.message });
                        });
                    }},
                ],
                {cancelable: false},
            );
        }else{
            setSubmitting(false);
            setErrors({message:"As senhas estão diferentes"});
        }
        
    }
})(FormCadastro));