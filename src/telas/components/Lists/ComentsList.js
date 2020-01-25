import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SectionList
} from 'react-native';
import Coment from '../Coments/Coment';

export default class ComentsList extends Component{

    constructor(props){
        super(props);
        this.state={
            coments:props.coments
        }

        // console.log("posts",props.posts);
    }

    componentWillReceiveProps(nextProps) {
        const { coments} = this.props;
        if (nextProps.coments !== coments) {
            console.log("testes",nextProps.coments);
            this.setState({
                coments:nextProps.coments
            });
        }
    }

    render(){
        let itens=[],i=0;
        Object.keys(this.state.coments).map(e=>{
            itens.push({title:'coment'+i,data:[this.state.coments[e]]});
            i++;
        });

        return(
            // <Text>gjagdaj</Text>
            <SectionList
                renderItem={({ item, index, section }) => {
                    return (<Coment coment={[item]} />)
                }}
                sections={itens}
                keyExtractor={(item, index) => item.id}
            />
        )
    }
}
