import AsyncStorage from '@react-native-community/async-storage';

// storage local
export const persistData=(item,value)=>{
    AsyncStorage.setItem(item,value);
}

export const getData=async (item)=>{
    let retIt=false;
    await AsyncStorage.getItem(item).then(e=>{
        retIt=e;
    });

    return retIt;
}

export const removeData=async (item)=>{
    let isExc=false;
    await AsyncStorage.removeItem(item).then(()=>{
        isExc=true;
    });

    return isExc;
}

export const clearData=()=>{
    AsyncStorage.clear();
}

// manuseio de datas
export const returnDay=function(value){
    return value.split(" ")[0].split("-")[2];
}

export const returnDateFormat=function(value){
    let dat=value.split(" ")[0];
    return `${dat.split("-")[2]}/${dat.split("-")[1]}/${dat.split("-")[0]}`;
}

export const returnHoraFormat=function(value){
    let dat=value.split(" ")[1];
    return `${dat.split(":")[0]}:${dat.split(":")[1]}`;
}

export const calcdiffdates=function(value){
    let daty=new Date();
    // let arr=value.split(" ")[0].split()
    let datyComp=new Date(value.replace(' ', 'T'));
    datyComp.setHours(datyComp.getHours()+3);
    let timeDiff = Math.abs(daty.getTime()-datyComp.getTime());
    // console.log(datyComp);
    let diffDays=timeDiff/(1000*60*60*24);
    if(diffDays<1){
        diffDays=timeDiff/(1000*60*60);
        if(diffDays<1){
            diffDays=timeDiff/(1000*60);
            if(diffDays<1){
                diffDays="A poucos segundos";
            }else{
                diffDays=`Há ${Math.round(diffDays)} ${Math.round(diffDays)<=1?"minuto":"minutos"}`;
            }
        }else{
            diffDays=`Há ${Math.round(diffDays)} ${Math.round(diffDays)<=1?"hora":"horas"}`;
        }
    }else{
        if(diffDays>30){
            if(diffDays>365){
                diffDays=diffDays/365;
                diffDays=`Há ${Math.round(diffDays)} ${Math.round(diffDays)<=1?"ano":"anos"}`;
            }else{
                diffDays=diffDays/12;
                diffDays=`Há ${Math.round(diffDays)} ${Math.round(diffDays)<=1?"mês":"meses"}`;
            }
        }else{
            diffDays=`Há ${Math.round(diffDays)} ${Math.round(diffDays)<=1?"dia":"dias"}`;
        }
    }

    return diffDays;
}

export const returnRoutesOfStacks=(stack,tela)=>{
    if(stack=="home"){
        switch(tela){
            case "historico":
                return "HistoricoHome";
                break;
            case "comentarios":
                return "ComentariosHome";
                break;
            case "visualizarperfil":
                return "VisulizarPerfilHome";
                break;
        }
    }else if(stack=="saves"){
        switch(tela){
            case "historico":
                return "HistoricoSaves";
                break;
            case "comentarios":
                return "ComentariosSaves";
                break;
            case "visualizarperfil":
                return "VisulizarPerfilSaves";
                break;
        }
    }else if(stack=="perfil"){
        switch(tela){
            case "historico":
                return "HistoricoPerfil"
                break;
            case "editar":
                return "SecondScreenCadPerfil"
                break;
            case "previewperfil":
                return "PreviewPerfil"
                break;
            case "comentarios":
                return "ComentariosPerfil"
                break;
            case "configuracoes":
                return "ConfiguracoesPerfil"
                break;
            case "visualizarperfil":
                return "VisulizarPerfilPerfil"
                break;
        }
    }else if(stack=="busca"){
        switch(tela){
            case 'historico':
                return "HistoricoBusca"
                break;
            case 'visualizarperfil':
                return "VisulizarPerfilBusca"
                break;
            case 'comentarios':
                return "ComentariosBusca"
                break;
        }
    }
}