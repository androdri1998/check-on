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
import {fetchPostsSaves} from '../../redux/PostReducer';

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

class TelasSaves extends Component{
    constructor(props){
        super(props);

        this.state={
            posts:null,

            // refresh
            refreshing:false
        }
    }

    async getData(refresh=false){
        if(refresh){
            this.setState({
                refreshing:true,
            });
        }

        await Promise.all([
            this.props.fetchPostsSaves()
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
        const {posts} = this.props;

        console.log(nextProps.posts);

        if(nextProps.posts!=posts){
            this.setState({posts:nextProps.posts});
        }
    }

    render(){
        let filterPostRender=null;

        if(this.state.posts){
            filterPostRender=<PostListHome stack="saves" posts={this.state.posts}/>;
        }

        return (
            <View style={styleGeral.container}>
                <GeralHeader title="Saves"/>
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
        posts:state.postReducer.postSaves
    };
}

const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({fetchPostsSaves},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TelasSaves);