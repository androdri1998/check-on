import  React,{ Component } from "react";
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    RefreshControl,
    TextInput
} from 'react-native';

import Ripple from "react-native-material-ripple";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getBuscaUsers} from '../../redux/BuscaReducer';

import {styleGeral} from '../../styles/geral';
import {loginStyle} from '../../styles/login';
import { buscaStyle } from '../../styles/busca';
import GeralHeader from "../components/headers/GeralHeader";
import ListBuscaUsers from "../components/Lists/ListBuscaUsers";

class TelasBusca extends Component{
    constructor(props){
        super(props);

        this.state={
            users:null,
            termoBusca:"",
            // refresh
            refreshing:false
        }
    }

    async buscarUsers(termo){
        await Promise.all([
            this.props.getBuscaUsers(termo)
        ]);
    }

    async getData(refresh=false){
        if(refresh){
            this.setState({
                refreshing:true,
            });
        }

        // await Promise.all([
        //     this.props.getSimpleInfoUser(),
        //     this.props.fetchPostsOfFollows()
        // ]);

        if(this.state.refreshing){
            this.setState({refreshing:false});
        }
    }

    componentDidMount(){
        this.getData();
    }

    componentWillReceiveProps(nextProps){
        const {users} = this.props;

        console.log(nextProps.users);
        if(nextProps.users!==users){
            this.setState({ users:nextProps.users});
        }
    }

    render(){
        let usersBusca=null;

        if(this.state.users){
            usersBusca=<ListBuscaUsers stack="busca" users={this.state.users}/>;
        }

        return (
            <View style={styleGeral.container}>
                <TextInput
                    style={[buscaStyle.input]}
                    value={this.state.termoBusca}
                    placeholder="Encontre seus amigos..."
                    placeholderTextColor="#fff"
                    onChangeText={text=>this.setState({termoBusca:text},()=>{this.buscarUsers(this.state.termoBusca)})}
                    />
                <ScrollView contentContainerStyle={[loginStyle.containerScroolLogin]}>
                    <View style={[loginStyle.padBodyContainer,{paddingTop:0,paddingBottom:0}]}>
                        <View style={[loginStyle.bodyContainerLogin,{padding:4}]}>
                            <View style={{padding:6}}>
                                <View>
                                    {usersBusca}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        users:state.buscaReducer.users
    };
}

const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({getBuscaUsers},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TelasBusca);