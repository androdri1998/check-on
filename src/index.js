import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { StackApp } from './config/config';

import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import { Provider } from 'react-redux';

import reducer from './redux/reducer';

const createStoreWithMiddleware= applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducer);

import {veriLog} from './funcoes/loginFunctions';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
        estaLogado:false,
        checkedSignIn:false
    }
  }

  componentDidMount(){
    this.log();
  }

  async log(){
    await veriLog().then((e)=>{
          this.setState({estaLogado:e,checkedSignIn:true});
    })
  }

  render() {

    const {estaLogado,checkedSignIn} = this.state;

    if (!checkedSignIn) {
      return null;
    }

    const Layout=StackApp(estaLogado);

    // console.log(Layout);

    return (
        <Provider store={store}>
          <Layout />
        </Provider>
    );
  }
}
