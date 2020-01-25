import React,{Component} from 'react';
import {
    View,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {alterModal} from '../../../redux/ConfigReducer';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import FormPost from "../../Forms/FormPost";
import { styleGeral } from '../../../styles/geral';
import { modalStyle } from '../../../styles/modal';

class ModalPost extends Component{
    constructor(props){
        super(props);
        this.state={
            modVisible:false
        }
    }
    
    componentWillReceiveProps(nextProps){
        const {modVisible} = this.props;

        if(nextProps.modVisible!=modVisible){
            this.setState({modVisible:nextProps.modVisible});
        }

    }

    showHideModal(){
        // alert('ola');
        let att=!this.state.modVisible;
        this.props.alterModal(att);
    }

    onSwipeDown(gestureState){
        this.showHideModal();
    }

    render(){
        const config={
            velocityThreshold:0.3,
            directionalOffsetThreshold:80
        }

        return (
            <View style={{heigth:100}}>
                <GestureRecognizer
                    onSwipeDown={(state)=>this.onSwipeDown(state)} config={config}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modVisible?this.state.modVisible:false}
                        onRequestClose={()=>this.showHideModal()}>
                        <View style={modalStyle.backgroundClose}>
                            <TouchableWithoutFeedback onPress={()=>this.showHideModal()} style={styleGeral.flex}>
                                <View style={styleGeral.flex}></View>
                            </TouchableWithoutFeedback>
                            <View style={styleGeral.row}>
                                <View style={modalStyle.containerFormModal}>
                                        <FormPost />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </GestureRecognizer>
            </View>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        modVisible:state.configReducer.modalActive
    };
}

// fetchPostSelected é importada da actions e passada como função para props
// mapDispatchToProps dispacha para o props todas as funções importadas e necessárias
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({alterModal},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalPost);