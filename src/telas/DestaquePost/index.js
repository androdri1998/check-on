import  React,{ Component } from "react";
import {
    Text,
    View,
    ScrollView,
    StatusBar,
    Image,
    Modal,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Ripple from 'react-native-material-ripple';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getSimpleInfoUser} from '../../redux/UserReducer';
import {alterModal} from '../../redux/ConfigReducer';
import {fetchMyPostsDay} from '../../redux/PostReducer';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import {fist_color,header_text_color, unfocus_color, HOST_IMAGES, HOST_IMAGE_PADRAO} from '../../config/constantes';

import {styleGeral} from '../../styles/geral';
import {loginStyle} from '../../styles/login';
import {perfilStyle} from '../../styles/perfil';
import GeralHeader from "../components/headers/GeralHeader";
import BodyHeader from "../components/headers/BodyHeader";
import PostListHistorico from "../components/Lists/PostListHistorico";

import {removeData, returnDateFormat, returnHoraFormat,returnDay} from '../../funcoes/geralFunctions';
import {returnFirstPostsDay} from '../../funcoes/postsFunctions';
import FormPost from "../Forms/FormPost";
import ModalPost from "../components/modals/ModalPost";

import {getData} from '../../funcoes/geralFunctions';
import PostDestaqueHistorico from '../components/Posts/PostDestaqueHistorico';
import { postStyle } from "../../styles/post";

class DestaquePost extends Component{
    constructor(props){
        super(props);

        this.state={
        //     user:null,
            user:null,
        //     // filterPost:null,
        //     dataDay:null,

        //     // refresh
        //     refreshing:false,

        //     // modal
        //     modVisible:false
        }
    }

    async getData(data,refresh=false){
        if(refresh){
            this.setState({
                refreshing:true,
            });
        }

        // console.log(data);
        // if(data){
        //     let id= await getData('user');
        //     await Promise.all([
        //         this.props.fetchMyPostsDay(id,data)
        //     ]);
        // }

        if(this.state.refreshing){
            this.setState({refreshing:false});
        }
    }

    componentDidMount(){
        let {navigation} = this.props;
        const info = navigation.getParam('info',null);
        this.setState({user:info});
    }

    render(){
        let postDest=null;
        if(this.state.user){
            postDest=(
                <PostDestaqueHistorico post={[{
                    username:this.state.user.username,
                    fotoperf:this.state.user.fotoperf,
                    fotocapa:this.state.user.fotocapa,
                    pasta:this.state.user.pasta,
                    alternativename:this.state.user.alternativename,
                    datahorapost:this.state.user.datahorapost,
                    contenttext:this.state.user.contenttext
                }]}/>
            );
        }
        return (
            <View style={styleGeral.container}>
                <GeralHeader title={"Destaque"}/>
                <View style={[loginStyle.padBodyContainer,{paddingTop:60,paddingBottom:0}]}>
                    <View style={loginStyle.bodyContainerLogin}>
                        <ScrollView contentContainerStyle={[loginStyle.containerScroolLogin,{padding:4}]}>
                            <View style={postStyle.containerPostDestaque}>
                                <View style={[perfilStyle.containerInfoLinePerf,{marginTop:0}]}>
                                    <View style={[perfilStyle.contImgPerfil]}>
                                        <Image 
                                            style={[perfilStyle.perfilImg,{display:!this.state.perfilImageVisible?'none':'flex'}]}  
                                            source={this.state.user?this.state.user.fotoperf!=`padrao.png`?{uri:HOST_IMAGES+`${this.state.user.pasta}/perfis/${this.state.user.fotoperf}`}:{uri:HOST_IMAGE_PADRAO}:null} 
                                            onLoad={() => { this.setState({ perfilImageVisible: true }); }}/>

                                    </View>
                                    <View style={styleGeral.row}>
                                        <Text numberOfLines={1} style={perfilStyle.textNamePerfil}>{this.state.user?this.state.user.alternativename:null}</Text>
                                    </View>
                                    <Text numberOfLines={1} style={[perfilStyle.textUsernamePerfil,{fontWeight:'600'}]}>{this.state.user?this.state.user.username:null}</Text>
                                </View>
                                {postDest}
                            </View>
                            <View style={postStyle.containerMarcaDagua}>
                                <Image style={postStyle.marcaDagua} source={require('../../assets/img/logoPurple2.png')}/>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                <ModalPost />
            </View>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        modVisible:state.configReducer.modalActive,
        postDay:state.postReducer.postDay
    };
}

// fetchPostSelected é importada da actions e passada como função para props
// mapDispatchToProps dispacha para o props todas as funções importadas e necessárias
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({fetchMyPostsDay,alterModal},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(DestaquePost);