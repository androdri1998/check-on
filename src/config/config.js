import React, { Component } from 'react';
import {
	createStackNavigator,
	TabNavigator,
	createAppContainer,
	createSwitchNavigator
} from 'react-navigation';

import Login from '../telas/Login';
import Cadastro from '../telas/Cadastro';
import SecondScreenCad from '../telas/Cadastro/SecondScreenCad';
import PreviewPerfil from '../telas/PreviewPerfil';
import Home from '../telas/Home';
import {Tabs} from './configTabs';
import DestaquePost from '../telas/DestaquePost';

export const StackApp=(isLog=false)=>{
    return createAppContainer(
        createSwitchNavigator({
			unLog:createStackNavigator({
				Login,
				Cadastro,
				SecondScreenCad,
				PreviewPerfil
			},{
				initialRouteName:'Login',
				headerMode: 'none',
				navigationOptions: {
					headerVisible: false,
				}
			}),
			Loged:createStackNavigator({
				Tabs,
				DestaquePost: {screen: DestaquePost}
				// Home
			},{
				initialRouteName:'Tabs',
				headerMode: 'none',
				navigationOptions: {
					headerVisible: false,
				}
			}),
		},{
			initialRouteName:isLog?'Loged':'unLog',
        }),
    );
};