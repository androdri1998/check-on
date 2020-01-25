import React from 'react';
import {
	createStackNavigator
} from 'react-navigation';

import TelasTrending from '../../../telas/Trending';
import Historico from '../../../telas/Historico';
import Comentarios from '../../../telas/Comentarios';
import VisualizarPerfil from '../../../telas/VisualizarPerfil';

export const StackTrending=createStackNavigator({
    Trending: {screen: TelasTrending},
    HistoricoTrending:{screen: Historico},
    ComentariosTrending:{screen: Comentarios},
    VisulizarPerfilTrending: {screen: VisualizarPerfil},
},{
    initialRouteName:'Trending',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});