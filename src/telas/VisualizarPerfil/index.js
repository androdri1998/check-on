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
import Ripple from "react-native-material-ripple";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getSimpleInfoOtherUser} from '../../redux/UserReducer';
import {alterModal} from '../../redux/ConfigReducer';
import {fetchOtherPosts} from '../../redux/PostReducer';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import {fist_color,header_text_color, unfocus_color, HOST_IMAGES, HOST_IMAGE_PADRAO} from '../../config/constantes';

import {styleGeral} from '../../styles/geral';
import {loginStyle} from '../../styles/login';
import {perfilStyle} from '../../styles/perfil';
import {postStyle} from '../../styles/post';
import GeralHeader from "../components/headers/GeralHeader";
import BodyHeader from "../components/headers/BodyHeader";
import PostListPerfil from "../components/Lists/PostListPerfil";

import {removeData, returnDateFormat, returnHoraFormat,calcdiffdates} from '../../funcoes/geralFunctions';
import {returnFirstPostsDay} from '../../funcoes/postsFunctions';
import {follow,unfollow} from '../../funcoes/userFunctions';
import FormPost from "../Forms/FormPost";
import ModalPost from "../components/modals/ModalPost";

class VisualizarPerfil extends Component{
    constructor(props){
        super(props);

        this.state={
            user_id:null,
            user:null,
            myPosts:null,
            filterPost:null,

            // shime
            visible: false,
            perfilImageVisible: false,
            capaImageVisible: false,

            // refresh
            refreshing:false
        }
    }

    async getData(id,refresh=false){
        if(refresh){
            this.setState({
                refreshing:true,
            });
        }

        await Promise.all([
            this.props.getSimpleInfoOtherUser(id),
            this.props.fetchOtherPosts(id)
        ]);

        if(this.state.refreshing){
            this.setState({refreshing:false});
        }
    }

    componentDidMount(){
        let {navigation} = this.props;
        this.setState({
            user_id:navigation.getParam('user_id',null),
            stack:navigation.getParam('stack',null),
        },()=>{this.getData(this.state.user_id)});
    }

    componentWillReceiveProps(nextProps){
        const {user,myPosts} = this.props;

        if(nextProps.user!==user){
            this.setState({ user:nextProps.user},()=>{
                this.setState({isSeg:nextProps.user.isseg})
            });
            if(!this.state.refreshing)
                this.setState({ visible: !user?true:false});
        }

        if(nextProps.myPosts!=myPosts){
            let filterPost=returnFirstPostsDay(nextProps.myPosts);
            // console.log(filterPost);
            this.setState({myPosts:nextProps.myPosts,filterPost:filterPost});
        }
    }

    render(){

        let user=null,filterPostRender=null;
        if(this.state.user){
            user=this.state.user;
            // console.log(user);
        }

        if(this.state.filterPost){
            filterPostRender=<PostListPerfil posts={this.state.filterPost} stack={this.state.stack}/>;
        }

        return (
            <View style={styleGeral.container}>
                <GeralHeader title={user?user.username:"Perfil"}/>
                <ScrollView contentContainerStyle={[loginStyle.containerScroolLogin]}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={()=>this.getData(this.state.user_id,true)}
                                />
                        }>
                    <View style={[loginStyle.padBodyContainer,{paddingTop:60,paddingBottom:0}]}>
                        <View style={[loginStyle.bodyContainerLogin,{padding:4}]}>
                                <View style={perfilStyle.containerImagesInfo}>

                                    <ShimmerPlaceHolder
                                        style={perfilStyle.styleCapa}
                                        visible={this.state.capaImageVisible}
                                        autoRun={true}
                                        backgroundColorBehindBorder={'white'}
                                        ></ShimmerPlaceHolder>
                                    <Image 
                                        style={[perfilStyle.styleCapa,{position:!this.state.capaImageVisible?'relative':'absolute',display:!this.state.capaImageVisible?'none':'flex'}]} 
                                        source={user?user.fotocapa!='padrao.png'?{uri:HOST_IMAGES+`${user.pasta}/capas/${user.fotocapa}`}:{uri:HOST_IMAGE_PADRAO}:null} 
                                        onLoad={() => { this.setState({ capaImageVisible: true }); }}/>
                                    <View style={perfilStyle.filterCapa}>
                                        
                                    </View>
                                </View>
                                <View style={perfilStyle.containerInfoLinePerf}>
                                    <View style={[perfilStyle.contImgPerfil]}>
                                        <ShimmerPlaceHolder
                                            style={perfilStyle.perfilImg}
                                            visible={this.state.perfilImageVisible}
                                            backgroundColorBehindBorder={'white'}
                                            ></ShimmerPlaceHolder>
                                        <Image 
                                            style={[perfilStyle.perfilImg,{display:!this.state.perfilImageVisible?'none':'flex'}]}  
                                            source={user?user.fotoperf!=`padrao.png`?{uri:HOST_IMAGES+`${user.pasta}/perfis/${user.fotoperf}`}:{uri:HOST_IMAGE_PADRAO}:null} 
                                            onLoad={() => { this.setState({ perfilImageVisible: true }); }}/>

                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <ShimmerPlaceHolder
                                            style={[styleGeral.shimmerComponent,{margin:5}]}
                                            autoRun={true}
                                            visible={user?true:false}
                                        >
                                            <Text numberOfLines={1} style={perfilStyle.textNamePerfil}>{user?user.alternativename:null}</Text>
                                        </ShimmerPlaceHolder>
                                    </View>
                                    <ShimmerPlaceHolder
                                        style={[styleGeral.shimmerComponent,{margin:5,alignSelf:'center'}]}
                                        autoRun={true}
                                        visible={user?true:false}
                                    >
                                        <Text numberOfLines={1} style={perfilStyle.textUsernamePerfil}>{user?user.username:null}</Text>
                                    </ShimmerPlaceHolder>
                                </View>
                                <View style={{padding:6}}>
                                    <View style={{marginBottom:10}}>
                                        <ShimmerPlaceHolder
                                                style={[styleGeral.shimmerComponent,{margin:5}]}
                                                autoRun={true}
                                                visible={user?true:false}
                                            >
                                                <Text style={[perfilStyle.textDesc,{textAlign:'center'}]}>{user?user.descricao:null}</Text>
                                        </ShimmerPlaceHolder>
                                        <ShimmerPlaceHolder
                                                style={[styleGeral.shimmerComponent,{margin:5,alignSelf:'flex-end'}]}
                                                autoRun={true}
                                                visible={user?true:false}
                                            >
                                                <Text style={perfilStyle.textDateDesc}>{user?calcdiffdates(user.datahoracadastro):null}</Text>
                                        </ShimmerPlaceHolder>
                                    </View>
                                    <View style={[postStyle.lineButtons,{alignItems:'center',justifyContent:'center'}]}>
                                        <View style={[styleGeral.contBtnRippleIcon]}>
                                            <Ripple onPress={this.state.isSeg==0?
                                                async () => {
                                                    let isfoll=await follow(this.state.user.user_id);
                                                    this.setState({isSeg:isfoll});
                                                }:async () => {
                                                    let isfoll=await unfollow(this.state.user.user_id);
                                                    this.setState({isSeg:isfoll});
                                                }}>
                                                <Feather name={this.state.isSeg!=0?"user-check":"user-plus"} size={24} color='black' />
                                            </Ripple>
                                        </View>
                                        {/* <View style={[styleGeral.contBtnRippleIcon]}>
                                            <Ripple onPress={()=>{this.props.navigation.push("ConfiguracoesPerfil")}}>
                                                <MaterialCommunityIcons name="settings-outline" size={24} color='black' />
                                            </Ripple>
                                        </View>
                                        <View style={[styleGeral.contBtnRippleIcon]}>
                                            <Ripple onPress={async ()=>{
                                                let isOut=await removeData('islog');
                                                await removeData('user');
                                                if(isOut)
                                                    this.props.navigation.navigate('unLog');
                                                }}>
                                                <SimpleLineIcons name="logout" size={24} color='black' />
                                            </Ripple>
                                        </View> */}
                                    </View>
                                    <View>
                                        <ShimmerPlaceHolder
                                            style={[styleGeral.shimmerComponent,{margin:5}]}
                                            autoRun={true}
                                            visible={user?true:false}
                                            >
                                                <View style={perfilStyle.lineIndic}>
                                                    <Text style={perfilStyle.numberIndic}>{user?user.quantSeguidores:null}</Text>
                                                    <Text style={perfilStyle.txtIndicesc}>Seguidores</Text>
                                                </View>
                                        </ShimmerPlaceHolder>
                                        <ShimmerPlaceHolder
                                            style={[styleGeral.shimmerComponent,{margin:5}]}
                                            autoRun={true}
                                            visible={user?true:false}
                                            >
                                                <View style={perfilStyle.lineIndic}>
                                                    <Text style={perfilStyle.numberIndic}>{user?user.quantSeguindo:null}</Text>
                                                    <Text style={perfilStyle.txtIndicesc}>Seguindo</Text>
                                                </View>
                                        </ShimmerPlaceHolder>
                                    </View>
                                    <View style={styleGeral.shimeTxtAtualiz}>
                                        <ShimmerPlaceHolder
                                            style={[styleGeral.shimmerComponent,{margin:5}]}
                                            autoRun={true}
                                            visible={user?true:false}
                                            ></ShimmerPlaceHolder>
                                    </View>
                                    <View style={{display:!user?'none':'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
                                            <View style={perfilStyle.lineIndic}>
                                                <Text style={perfilStyle.numberIndicDias}>{user?user.dias_compartilhados:null}</Text>
                                                <Text style={perfilStyle.txtIndicDescDias}>Dias compartilhados</Text>
                                            </View>
                                        {/* <TouchableOpacity 
                                            style={[loginStyle.btnLog]}
                                            onPress={()=>{this.showHideModal()}}>
                                            <Text style={loginStyle.txtBtnLog}>Postar</Text>
                                        </TouchableOpacity> */}
                                    </View>
                                    <View>
                                        {filterPostRender}
                                    </View>
                                </View>
                        </View>
                    </View>
                </ScrollView>
                {/* <ModalPost /> */}
            </View>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        user:state.userReducer.otherUser,
        myPosts:state.postReducer.otherPosts
    };
}

const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({getSimpleInfoOtherUser,fetchOtherPosts},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(VisualizarPerfil);