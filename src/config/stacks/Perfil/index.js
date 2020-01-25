import React from 'react';
import {
	createStackNavigator
} from 'react-navigation';

import Perfil from '../../../telas/Perfil';
import Historico from '../../../telas/Historico';
import SecondScreenCad from '../../../telas/Cadastro/SecondScreenCad';
import PreviewPerfil from '../../../telas/PreviewPerfil';
import Comentarios from '../../../telas/Comentarios';
import {Configuracoes} from '../../../telas/Configuracoes';
import VisualizarPerfil from '../../../telas/VisualizarPerfil';


export const StackPerfil=createStackNavigator({
    Perfil: {screen: Perfil},
    HistoricoPerfil: {screen: Historico},
    SecondScreenCadPerfil: {screen: SecondScreenCad},
    PreviewPerfil: {screen: PreviewPerfil},
    ComentariosPerfil: {screen: Comentarios},
    ConfiguracoesPerfil: {screen: Configuracoes},
    VisulizarPerfilPerfil: {screen: VisualizarPerfil},
},{
    initialRouteName:'Perfil',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});