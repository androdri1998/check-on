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
import {historicoStyle} from '../../styles/historico';
import {perfilStyle} from '../../styles/perfil';
import GeralHeader from "../components/headers/GeralHeader";
import BodyHeader from "../components/headers/BodyHeader";
import PostListHistorico from "../components/Lists/PostListHistorico";

import {removeData, returnDateFormat, returnHoraFormat,returnDay} from '../../funcoes/geralFunctions';
import {returnFirstPostsDay} from '../../funcoes/postsFunctions';
import FormPost from "../Forms/FormPost";
import ModalPost from "../components/modals/ModalPost";

import {getData} from '../../funcoes/geralFunctions';
import Post from '../components/Posts/Post';

class Historico extends Component{
    constructor(props){
        super(props);

        this.state={
            // config
            stack:null,

            // user
            user:null,
            postDay:null,
            // filterPost:null,
            dataDay:null,

            // refresh
            refreshing:false,

            // modal
            modVisible:false
        }
    }

    async getData(data,refresh=false){
        if(refresh){
            this.setState({
                refreshing:true,
            });
        }

        console.log(data);
        if(data){
            let id= this.state.user.user_id;
            await Promise.all([
                this.props.fetchMyPostsDay(id,data)
            ]);
        }

        if(this.state.refreshing){
            this.setState({refreshing:false});
        }
    }

    componentDidMount(){
        let {navigation} = this.props;
        const info = navigation.getParam('info',null);
        const stack = navigation.getParam('stack',null);
        this.setState({stack:stack,user:info,dataDay:info.datahorapost.split(" ")[0]},()=>{
            this.getData(info.datahorapost.split(" ")[0]);
        });
    }

    componentWillReceiveProps(nextProps){
        const {postDay} = this.props;

        // if(nextProps.modVisible!=modVisible){
        //     this.setState({modVisible:nextProps.modVisible});
        // }

        if(nextProps.postDay!=postDay){
            // let filterPost=returnFirstPostsDay(nextProps.postDay);
            // console.log(filterPost);
            this.setState({postDay:nextProps.postDay});
        }
    }

    showHideModal(){
        let att=!this.state.modVisible;
        this.props.alterModal(att);
    }

    onSwipeDown(gestureState){
        this.showHideModal();
    }

    render(){
        let filterPostRender=null;
        if(this.state.postDay){
            // filterPostRender=<PostListPerfil posts={this.state.filterPost}/>;
            console.log(this.state.postDay[0]);
            filterPostRender=(  
                                <View>
                                    <View>
                                        <Post post={[{
                                            username:this.state.user.username,
                                            fotoperf:this.state.user.fotoperf,
                                            fotocapa:this.state.user.fotocapa,
                                            pasta:this.state.user.pasta,
                                            alternativename:this.state.user.alternativename,
                                            datahorapost:this.state.user.datahorapost,
                                            contenttext:this.state.user.contenttext
                                        }]} stack={this.state.stack}/>
                                    </View>
                                    <View style={historicoStyle.containerPostsHist}>
                                        <View style={historicoStyle.containerInfoDay}>
                                            <Text style={historicoStyle.txtDay}>{returnDay(this.state.dataDay)}</Text>
                                            <View style={historicoStyle.lineDay}>
                                            </View>
                                        </View>
                                        <View style={styleGeral.flex}>
                                            <PostListHistorico stack={this.state.stack} posts={this.state.postDay}/>
                                        </View>
                                    </View>
                                </View>
                            );
        }else{
            filterPostRender=(<Text>Carregando...</Text>);
        }

        return (
            <View style={styleGeral.container}>
                <GeralHeader title={"Historico"}/>
                <ScrollView contentContainerStyle={[loginStyle.containerScroolLogin]}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={()=>this.getData(this.state.dataDay,true)}
                                />
                        }>
                    <View style={[loginStyle.padBodyContainer,{paddingTop:60,paddingBottom:0}]}>
                        <View style={[loginStyle.bodyContainerLogin,{padding:4}]}>
                                    {filterPostRender}
                        </View>
                    </View>
                </ScrollView>
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

export default connect(mapStateToProps,mapDispatchToProps)(Historico);