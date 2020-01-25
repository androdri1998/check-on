import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SectionList
} from 'react-native';
import Post from '../Posts/Post';

export default class PostListHome extends Component{

    constructor(props){
        super(props);
        this.state={
            posts:props.posts,
            stack:props.stack
        }
    }

    componentWillReceiveProps(nextProps) {
        const { posts} = this.props;
        if (nextProps.posts !== posts) {
                // console.log("posts",nextProps.posts);
                this.setState({
                    posts:nextProps.posts
                });
        }
    }

    render(){
        let itens=[],i=0;
        Object.keys(this.state.posts).map(e=>{
            itens.push({title:'post'+i,data:[this.state.posts[e]]});
            i++;
        });

        return(
            // <Text>gjagdaj</Text>
            <SectionList
                renderItem={({ item, index, section }) => {
                    return (<Post post={[item]} stack={this.state.stack}/>)
                }}
                sections={itens}
                keyExtractor={(item, index) => item.id}
            />
        )
    }
}
