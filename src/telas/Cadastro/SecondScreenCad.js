import  React,{ Component } from "react";
import {
    Text,
    View,
    ScrollView,
    StatusBar,
    Image,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import Ripple from "react-native-material-ripple";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {fist_color,header_text_color, unfocus_color} from '../../config/constantes';

import {styleGeral} from '../../styles/geral';
import {loginStyle} from '../../styles/login';
import FormCadSecond from '../Forms/FormCadSecond';
import GeralHeader from "../components/headers/GeralHeader";
import BodyHeader from "../components/headers/BodyHeader";

export default class SecondScreenCad extends Component{
    constructor(props){
        super(props);
        this.state={
            userEdit:null
        }
    }

    componentDidMount(){
        let {navigation} = this.props;

        this.setState({
            userEdit:navigation.getParam('info', null)
        },()=>{console.log(this.state.userEdit)});
    }

    componentWillReceiveProps(nextProps){
        // const {coments} = this.props;
        // if(coments!==nextProps.coments){
        //     this.setState({coments:nextProps.coments});
        // }
    }

    render(){
        return (
            <View style={styleGeral.container}>
                <GeralHeader title="Falta pouco"/>
                <ScrollView contentContainerStyle={loginStyle.containerScroolLogin}>
                    <View style={loginStyle.padBodyContainer}>
                        <View style={[loginStyle.bodyContainerLogin,{padding:10}]}>
                            {/* <BodyHeader title=""/> */}
                                <View style={loginStyle.containerLogo}>
                                    <Image style={loginStyle.imgDimSecond} source={require('../../assets/img/logoPurple2.png')}/>
                                </View>
                                <FormCadSecond userEdit={[this.state.userEdit]} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}