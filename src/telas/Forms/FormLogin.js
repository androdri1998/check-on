import React,{Component} from 'react';
import {
    View, TextInput, Button,TouchableOpacity,Text,ActivityIndicator
} from 'react-native';

import {withFormik} from 'formik';
import {withNavigation} from 'react-navigation';
import * as Yup from 'yup';

import {styleGeral} from '../../styles/geral';
import {loginStyle} from '../../styles/login';

import {POST_TYPE_LOGIN,HOSTAPI} from '../../config/constantes';
import {logar} from '../../funcoes/loginFunctions';
import {persistData, getData} from '../../funcoes/geralFunctions';

const Form = (props) =>(
    <View style={[styleGeral.container,{backgroundColor:"white",alignItems:'center'}]}>

        { props.isSubmitting && <ActivityIndicator /> }

        <View style={loginStyle.backLabel}>
            <Text style={loginStyle.labelLog}>Email</Text>
        </View>
        <TextInput
            style={[loginStyle.input,{marginTop:-10}]}
            value={props.values.email}
            keyboardType="email-address"
            placeholder="example@mail.com"
            onChangeText={text=>props.setFieldValue('email',text)}
            />
        
        { props.touched.email && props.errors.email && <Text style={styleGeral.warnTxt}>{props.errors.email}</Text> }


        <View style={loginStyle.backLabel}>
            <Text style={loginStyle.labelLog}>Senha</Text>
        </View>
        <TextInput
            style={[loginStyle.input,{marginTop:-10}]}
            value={props.values.password}
            secureTextEntry={true}
            placeholder="******"
            onChangeText={text=>props.setFieldValue('password',text)}
            />
        
        { props.touched.password && props.errors.password && <Text style={styleGeral.warnTxt}>{props.errors.password}</Text> }

        <View style={loginStyle.lineBtns}>
            <TouchableOpacity onPress={()=>props.navigation.navigate('Cadastro')}>
                <Text style={[loginStyle.txtBtnLog,{fontSize:14}]}>Ainda não possui uma conta?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[loginStyle.btnLog,{alignSelf:'flex-end',marginLeft:10}]}
                onPress={props.handleSubmit}>
                <Text style={loginStyle.txtBtnLog}>Login</Text>
            </TouchableOpacity>
        </View>
        { props.errors.message && <Text style={[styleGeral.errTxt]}>{props.errors.message}</Text> }
    </View>
);

export default withNavigation(withFormik({
    mapPropsToValues:()=>({email:'',password:''}),
    validationSchema:Yup.object().shape({
        email:Yup.string()
                .email('Digite um email válido')
                .required('Preencha o campo de email'),
        password:Yup.string()
                .min(6,'A senha deve ter 6 caracteres')
                .required('Preencha o campo de senha')
    }),
    handleSubmit:async (values,{props:{navigation}, setSubmitting, setErrors })=>{
        console.log(values);

        // logar(values);
        let data=new FormData();

        data.append('data',JSON.stringify(values));
        data.append('type',POST_TYPE_LOGIN);

        await fetch(HOSTAPI,{
            headers:{
                'Accept':'application/json',
                'Content-Type': 'multipart/form-data'
            },
            method:'post',
            body:data
        })
        .then((res)=>res.json())
        .then(async (resJson)=>{
            setSubmitting(false);
            console.log(resJson);
            if(resJson.err){
                setErrors({ message: resJson.message });
            }else{
                persistData('islog','true');
                persistData('user',resJson.results[0].id);
                // alert(await getData('user'));
                navigation.navigate('Loged');
            }
        }).catch(err=>{
            setSubmitting(false);
            setErrors({ message: "Ops... Houve um erro ao realizar o login, favor tente novamente mais tarde." });
        });
    }
})(Form));