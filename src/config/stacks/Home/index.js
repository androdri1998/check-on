import React from 'react';
import {
	createStackNavigator
} from 'react-navigation';

import Home from '../../../telas/Home';
import Historico from '../../../telas/Historico';
import Comentarios from '../../../telas/Comentarios';
import VisualizarPerfil from '../../../telas/VisualizarPerfil';

export const StackHome=createStackNavigator({
    Home: {screen: Home},
    HistoricoHome:{screen: Historico},
    ComentariosHome:{screen: Comentarios},
    VisulizarPerfilHome: {screen: VisualizarPerfil},
},{
    initialRouteName:'Home',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});