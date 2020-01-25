import  React,{ Component } from "react";
import {
    Text,
    View,
    ScrollView,
    StatusBar,
    Image,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchComentsPost} from '../../redux/PostReducer';

import {fist_color,header_text_color, unfocus_color, HOST_IMAGES, HOST_IMAGE_PADRAO} from '../../config/constantes';

import {styleGeral} from '../../styles/geral';
import {loginStyle} from '../../styles/login';
import {perfilStyle} from '../../styles/perfil';
import GeralHeader from "../components/headers/GeralHeader";
import BodyHeader from "../components/headers/BodyHeader";
import FormComentario from "../Forms/FormComentario";
import ComentsList from '../components/Lists/ComentsList';

class Comentarios extends Component{
    constructor(props){
        super(props);

        this.state={
            post_id:null,
            coments:null
        }
    }

    async getData(refresh=false){
        if(refresh){
            this.setState({
                refreshing:true,
            });
        }

        await Promise.all([
            this.props.fetchComentsPost(this.state.post_id)
        ]);

        if(this.state.refreshing){
            this.setState({refreshing:false});
        }
    }

    componentDidMount(){
        let {navigation} = this.props;

        this.setState({
            post_id:navigation.getParam('post_id', null)
        },()=>{this.getData();});

    }

    componentWillReceiveProps(nextProps){
        const {coments} = this.props;

        // console.log(coments);
        // console.log(nextProps.coments);
        if(coments!==nextProps.coments){
            this.setState({coments:nextProps.coments});
        }
    }

    render(){
        let listComent=null;
        if(this.state.coments){
            listComent=<ComentsList coments={this.state.coments} />
        }else{
            listComent=null;
        }

        return (
            <View style={styleGeral.container}>
                <GeralHeader title="Comentários"/>
                <ScrollView contentContainerStyle={[loginStyle.containerScroolLogin,{paddingBottom:70}]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={()=>this.getData(true)}
                            />
                    }>
                    <View style={[loginStyle.padBodyContainer,{paddingTop:60,paddingBottom:0}]}>
                        <View style={[loginStyle.bodyContainerLogin,{padding:4}]}>
                                <View style={{padding:6}}>
                                    {listComent}
                                </View>
                            
                        </View>
                    </View>
                </ScrollView>
                <FormComentario obj={[{info:{
                    post_id:this.state.post_id
                }}]} />
            </View>
        );
    }
}

const mapStateToProps=(state)=>{
    return {coments:state.postReducer.coments};
}

const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({fetchComentsPost},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Comentarios);