import  React,{ Component } from "react";
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

import Ripple from "react-native-material-ripple";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getSimpleInfoUser} from '../../redux/UserReducer';
import {alterModal} from '../../redux/ConfigReducer';
import {fetchPostsOfFollows} from '../../redux/PostReducer';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import {HOST_IMAGES, HOST_IMAGE_PADRAO} from '../../config/constantes';

import {styleGeral} from '../../styles/geral';
import {loginStyle} from '../../styles/login';
import {perfilStyle} from '../../styles/perfil';
import {postStyle} from '../../styles/post';
import GeralHeader from "../components/headers/GeralHeader";
import PostListHome from "../components/Lists/PostListHome";

import {removeData, calcdiffdates} from '../../funcoes/geralFunctions';
import {returnFirstPostsDay} from '../../funcoes/postsFunctions';
import ModalPost from "../components/modals/ModalPost";

class Home extends Component{
    constructor(props){
        super(props);

        this.state={
            user:null,
            posts:null,
            filterPost:null,

            // shime
            visible: false,
            perfilImageVisible: false,
            capaImageVisible: false,

            // refresh
            refreshing:false,

            // modal
            modVisible:false
        }
    }

    async getData(refresh=false){
        if(refresh){
            this.setState({
                refreshing:true,
            });
        }

        await Promise.all([
            this.props.getSimpleInfoUser(),
            this.props.fetchPostsOfFollows()
        ]);

        if(this.state.refreshing){
            this.setState({refreshing:false});
        }
    }

    componentDidMount(){
        let {navigation} = this.props;
        this.getData();
    }

    componentWillReceiveProps(nextProps){
        const {user,modVisible,posts} = this.props;

        if(nextProps.user!==user){
            this.setState({ user:nextProps.user});
            if(!this.state.refreshing)
                this.setState({ visible: !user?true:false});
        }

        if(nextProps.modVisible!=modVisible){
            this.setState({modVisible:nextProps.modVisible});
        }

        if(nextProps.posts!=posts){
            let filterPost=returnFirstPostsDay(nextProps.posts);
            this.setState({posts:nextProps.posts,filterPost:filterPost});
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
        let user=null,filterPostRender=null;
        if(this.state.user){
            user=this.state.user;
            // console.log(user);
        }

        if(this.state.filterPost){
            filterPostRender=<PostListHome stack="home" posts={this.state.filterPost}/>;
        }

        return (
            <View style={styleGeral.container}>
                <GeralHeader title="Home"/>
                    <ScrollView contentContainerStyle={[loginStyle.containerScroolLogin]}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={()=>this.getData(true)}
                                />
                        }>
                        <View style={[loginStyle.padBodyContainer,{paddingTop:60,paddingBottom:0}]}>
                            <View style={[loginStyle.bodyContainerLogin,{padding:4}]}>
                                <View style={{padding:6}}>
                                    <View>
                                        {filterPostRender}
                                    </View>
                                </View>
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
        user:state.userReducer.user,
        modVisible:state.configReducer.modalActive,
        posts:state.postReducer.timeline
    };
}

const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({getSimpleInfoUser,fetchPostsOfFollows,alterModal},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);