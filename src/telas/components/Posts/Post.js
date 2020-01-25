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

import Ripple from "react-native-material-ripple";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';

import {styleGeral} from '../../../styles/geral';
import {loginStyle} from '../../../styles/login';
import {perfilStyle} from '../../../styles/perfil';
import { postStyle } from '../../../styles/post';

import {fist_color,
        header_text_color, 
        unfocus_color, 
        HOST_IMAGES, 
        HOST_IMAGE_PADRAO} from '../../../config/constantes';

import {fetchMyPosts,fetchPostsSaves} from '../../../redux/PostReducer';
import { 
    returnDay, 
    returnDateFormat, 
    returnHoraFormat,
    calcdiffdates,
    returnRoutesOfStacks 
} from '../../../funcoes/geralFunctions';
import {newSave,dropSave} from '../../../funcoes/postsFunctions';

class Post extends Component{
    constructor(props){
        super(props);
        this.state={
            post:props.post[0],
            stack:props.stack,
            issave:props.post[0].idpostsave?true:false
        };

        // console.log(props.post[0].contenttext);
    }

    componentWillReceiveProps(nextProps){
        const {post} = this.props;

        if(post[0]!=nextProps.post[0]){
            this.setState({post:nextProps.post[0],issave:nextProps.post[0].idpostsave?true:false});

        }
    }

    render(){
        return(
            <View style={postStyle.containerPost}>
                <View style={postStyle.padPost}>
                    <View style={postStyle.headerPost}>
                        <View style={postStyle.lineInfoPerf}>
                            <View style={[perfilStyle.contImgSmallPerfil]}>
                                <Image 
                                    style={[perfilStyle.perfilSmallImg]}  
                                    source={this.state.post?this.state.post.fotoperf!=`padrao.png`?{uri:HOST_IMAGES+`${this.state.post.pasta}/perfis/${this.state.post.fotoperf}`}:{uri:HOST_IMAGE_PADRAO}:null} 
                                    />
                            </View>
                            <TouchableWithoutFeedback onPress={()=>{
                                this.props.navigation.push(returnRoutesOfStacks(this.state.stack,"visualizarperfil"),{
                                    user_id:this.state.post.user_id,
                                    stack:this.state.stack
                                })
                            }}>
                                <Text numberOfLines={1} style={postStyle.lineUsername}>{this.state.post?this.state.post.username:null}</Text>
                            </TouchableWithoutFeedback>
                        </View >
                    </View>
                    {/* <View style={postStyle.lineInfoPerf}>
                        <View style={[perfilStyle.contImgSmallPerfil]}>
                            <Image 
                                style={[perfilStyle.perfilSmallImg]}  
                                source={this.state.post?this.state.post.fotoperf!=`padrao.png`?{uri:HOST_IMAGES+`${this.state.post.pasta}/perfis/${this.state.post.fotoperf}`}:{uri:HOST_IMAGE_PADRAO}:null} 
                                />
                        </View>
                        <Text numberOfLines={1} style={postStyle.lineUsername}>{this.state.post?this.state.post.username:null}</Text>
                    </View > */}
                    <View style={postStyle.lineDivider}></View>
                    <TouchableWithoutFeedback
                        onPress={()=>this.props.navigation.push(returnRoutesOfStacks(this.state.stack,"historico"),{
                            info:{
                                user_id:this.state.post.user_id,
                                username:this.state.post.username,
                                fotoperf:this.state.post.fotoperf,
                                fotocapa:this.state.post.fotocapa,
                                pasta:this.state.post.pasta,
                                alternativename:this.state.post.alternativename,
                                datahorapost:this.state.post.datahorapost,
                                contenttext:this.state.post.contenttext
                            },
                            stack:this.state.stack
                        })}>
                        <View
                            style={postStyle.containerContentPost}>
                            <Text style={postStyle.txtContent}>{this.state.post.contenttext}</Text>
                            <Text style={[postStyle.dateStyle,{fontSize:10}]}>{returnDateFormat(this.state.post.datahorapost)} {returnHoraFormat(this.state.post.datahorapost)}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={postStyle.lineDivider}></View>
                    <View style={postStyle.footerPost}>
                        <View style={postStyle.lineButtons}>
                            <View style={[styleGeral.contBtnRippleIcon,{marginRight:5}]}>
                                <Ripple onPress={async ()=>{
                                                            if(!this.state.issave){
                                                                let issav= await newSave(this.state.post.post_id);
                                                                this.setState({issave:issav},()=>{
                                                                    fetchPostsSaves()
                                                                });
                                                            }else{
                                                                let issav= await dropSave(this.state.post.post_id);
                                                                this.setState({issave:issav},()=>{
                                                                    fetchPostsSaves()
                                                                });
                                                            }
                                                        }}>
                                    <MaterialIcons style={{color:this.state.issave?fist_color:"black"}} name={this.state.issave?"bookmark":"turned-in-not"} size={24} color='black' />
                                </Ripple>
                            </View>
                            <View style={[styleGeral.contBtnRippleIcon,{marginRight:5}]}>
                                <Ripple onPress={()=>{this.props.navigation.push(returnRoutesOfStacks(this.state.stack,"comentarios"),{
                                        post_id:this.state.post.post_id
                                    })}}>
                                    <MaterialIcons name="chat-bubble-outline" size={24} color='black' />
                                </Ripple>
                            </View>
                            <View style={[styleGeral.contBtnRippleIcon,{marginRight:5}]}>
                                <Ripple onPress={()=>{this.props.navigation.push('DestaquePost',{
                                        info:{
                                            username:this.state.post.username,
                                            fotoperf:this.state.post.fotoperf,
                                            fotocapa:this.state.post.fotocapa,
                                            pasta:this.state.post.pasta,
                                            alternativename:this.state.post.alternativename,
                                            datahorapost:this.state.post.datahorapost,
                                            contenttext:this.state.post.contenttext
                                        }
                                    });}}>
                                    <MaterialIcons name="star-border" size={24} color='black' />
                                </Ripple>
                            </View>
                        </View>
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
    return bindActionCreators({fetchMyPosts,fetchPostsSaves},dispatch);
}

export default withNavigation(connect(mapStateToProps,mapDispatchToProps)(Post));