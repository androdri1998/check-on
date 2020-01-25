import React from 'react';
import {
	createStackNavigator
} from 'react-navigation';

import TelasSaves from '../../../telas/Saves';
import Historico from '../../../telas/Historico';
import Comentarios from '../../../telas/Comentarios';
import VisualizarPerfil from '../../../telas/VisualizarPerfil';

export const StackSaves=createStackNavigator({
    Saves: {screen: TelasSaves},
    HistoricoSaves:{screen: Historico},
    ComentariosSaves:{screen: Comentarios},
    VisulizarPerfilSaves: {screen: VisualizarPerfil},
},{
    initialRouteName:'Saves',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});