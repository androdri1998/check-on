import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SectionList
} from 'react-native';
import ItemBusca from '../Busca/Item';

export default class ListBuscaUsers extends Component{

    constructor(props){
        super(props);
        this.state={
            users:props.users,
            stack:props.stack
        }

        // console.log("posts",props.posts);
    }

    componentWillReceiveProps(nextProps) {
        const { users} = this.props;
        if (nextProps.users !== users) {
                // console.log("users",nextProps.users);
                this.setState({
                    users:nextProps.users
                });
        }
    }

    render(){
        let itens=[],i=0;
        Object.keys(this.state.users).map(e=>{
            itens.push({title:'user'+i,data:[this.state.users[e]]});
            i++;
        });

        return(
            // <Text>gjagdaj</Text>
            <SectionList
                renderItem={({ item, index, section }) => {
                    return (<ItemBusca user={[item]} stack={this.state.stack}/>)
                }}
                sections={itens}
                keyExtractor={(item, index) => item.id}
            />
        )
    }
}
