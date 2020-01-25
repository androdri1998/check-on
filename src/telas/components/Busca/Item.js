import React,{Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import {withNavigation} from 'react-navigation';

import {HOST_IMAGES, 
    HOST_IMAGE_PADRAO} from '../../../config/constantes';

import {perfilStyle} from '../../../styles/perfil';
import { postStyle } from '../../../styles/post';
import { buscaStyle } from '../../../styles/busca';
import { returnRoutesOfStacks } from '../../../funcoes/geralFunctions';
class ItemBusca extends Component{
    constructor(props){
        super(props);
        this.state={
            user:this.props.user[0],
            stack:this.props.stack
        }
    }
    componentWillReceiveProps(nextProps){
        const {user}=this.props;

        if(user!=nextProps.user[0]){
            this.setState({user:nextProps.user[0]});
        }
    }

    render(){
        return (
            <View>
                <TouchableOpacity onPress={()=>{
                        this.props.navigation.push(returnRoutesOfStacks(this.state.stack,"visualizarperfil"),{
                            user_id:this.state.user.user_id,
                            stack:this.state.stack
                        })
                    }} style={buscaStyle.itemBusca}>
                    <View style={[perfilStyle.contImgSmallPerfil]}>
                        <Image 
                            style={[perfilStyle.perfilSmallImg]}  
                            source={this.state.user?this.state.user.fotoperf!=`padrao.png`?{uri:HOST_IMAGES+`${this.state.user.pasta}/perfis/${this.state.user.fotoperf}`}:{uri:HOST_IMAGE_PADRAO}:null} 
                            />
                    </View>
                    <Text style={buscaStyle.itemBuscaTxt}>{this.state.user.username}</Text>
                </TouchableOpacity>
                <View style={postStyle.lineDivider}></View>
            </View>
            
        )
    }
}

export default withNavigation(ItemBusca);