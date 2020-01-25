import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
    Text,
    View
} from 'react-native';

import {first_color,unfocus_color} from './constantes';

import Home from '../telas/Home';
import Perfil from '../telas/Perfil';
import TabIcon from '../telas/components/tabBar/TabIcon';
import { loginStyle } from '../styles/login';
import { styleGeral } from '../styles/geral';

// stacks
import {StackPerfil} from './stacks/Perfil';
import {StackHome} from './stacks/Home';
import {StackBusca} from './stacks/Busca';
import {StackSaves} from './stacks/Saves';
import {StackTrending} from './stacks/Trending';

export const Tabs=createBottomTabNavigator({
    Home:{
        screen:StackHome,
        navigationOptions:{
            // tabBarVisible: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor, focused }) => (
                <TabIcon name="public" tint={tintColor} foc={focused}/>
            ) 
        } 
    },
    Trending:{
        screen:StackTrending,
        navigationOptions:{
            // tabBarVisible: false,
            tabBarLabel: 'Trending',
            tabBarIcon: ({ tintColor, focused }) => (
                <TabIcon name="trending-up" tint={tintColor} foc={focused}/>
            ) 
        } 
    },
    Busca:{
        screen:StackBusca,
        navigationOptions:{
            // tabBarVisible: false,
            tabBarLabel: 'Buscar',
            tabBarIcon: ({ tintColor, focused }) => (
                <TabIcon name="search" tint={tintColor} foc={focused}/>
            ) 
        } 
    },
    Saves:{
        screen:StackSaves,
        navigationOptions:{
            // tabBarVisible: false,
            tabBarLabel: 'Saves',
            tabBarIcon: ({ tintColor, focused }) => (
                <TabIcon name="bookmark-border" tint={tintColor} foc={focused}/>
            ) 
        } 
    },
    Perfil:{
        screen:StackPerfil,
        navigationOptions:{
            // tabBarVisible: false,
            tabBarLabel: 'Perfil',
            // activeTintColor:'red',
            inactiveTintColor:'blue',
            tabBarIcon: ({ tintColor, focused }) => (
                <TabIcon name="perm-identity" tint={tintColor} foc={focused}/>
            ) 
        }
    }
},
{
    initialRouteName: "Trending",
    tabBarPosition:'bottom',
    swipeEnabled:true,
    tabBarOptions: {
        renderIndicator:()=>null,
        lazy:true,
        visible:false,
        activeTintColor:'#470d9d',
        upperCaseLabel:false,
        showIcon:true,
        showLabel:true,
        style: {
            elevation:0,
            backgroundColor: 'white',
            borderColor:'white',
            // borderTopLeftRadius:20,
            // borderTopRightRadius:20,
            // paddingHorizontal:5
        },
        tabStyle:{
            borderColor:'white',
            boderWidth:0
            // backgroundColor:'transparent',
            // alignItems:'center',
            // height:70,
            // paddingHorizontal:5
        }
    },
});