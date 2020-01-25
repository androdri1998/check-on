import React from 'react';
import {
	createStackNavigator
} from 'react-navigation';

import Busca from '../../../telas/Busca';
import Historico from '../../../telas/Historico';
import Comentarios from '../../../telas/Comentarios';
import VisualizarPerfil from '../../../telas/VisualizarPerfil';

export const StackBusca=createStackNavigator({
    Busca: {screen: Busca},
    HistoricoBusca:{screen: Historico},
    ComentariosBusca:{screen: Comentarios},
    VisulizarPerfilBusca: {screen: VisualizarPerfil},
},{
    initialRouteName:'Busca',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});