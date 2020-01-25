<?php
    // $method = $_SERVER['REQUEST_METHOD'];
    // if ($method == 'POST') {
    //     // Method is POST
    // } elseif ($method == 'GET') {
    //     // Method is GET
    // } elseif ($method == 'PUT') {
    //     // Method is PUT
    // } elseif ($method == 'DELETE') {
    //     // Method is DELETE
    // } else {
    //     // Method unknown
    // }


    // $verifyTry=$db->consultaDB('onepub',"SELECT * FROM onepub.tryacessfail where iduser=".$verifyEmail[0]['id'].";");
    // $block=false;
    // if(sizeof($verifyTry)==1&&$verifyTry){
    //     $minutos=$db->consultaDB('onepub',"SELECT TIMESTAMPDIFF(MINUTE,datahora,now()) intervalo from onepub.tryacessfail where iduser=".$verifyEmail[0]['id'].";");
    //     if($minutos[0]['intervalo']<=15&&$verifyTry[0]['quanttry']==15){
    //         echo json_encode(array(
    //             'islog' => false,
    //             'message'=> 'Tentativas excessivas de login, favor tente novamente mais tarde'
    //         ));
    //         $block=true;
    //     }

    //     $minutos=null;
    // }


    // $sqlacesso="INSERT into onepub.acesso(ip, tipo, idusuario)
    //         Values(:ip,:tipo,:idusuario);";
    // $ip=$_SERVER['REMOTE_ADDR'];
    // $values=array(
    //     ':ip' => $ip,
    //     ':tipo' => 'login',
    //     ':idusuario' => $verifyLogin[0]['id']
    // );

    // $db->alterDataDB('onepub',$sqlacesso,$values)








    // public function tryAcessFail($user){
    //     // echo json_encode(array(
    //     //     'islog' => false,
    //     //     'message'=> $user
    //     // ));
    //     $db=new ConectDB();
    //     $verifyEmail=$db->consultaDB('onepub',"SELECT id FROM onepub.usuario where email='".$user."';");
    //     if(sizeof($verifyEmail)==1&&$verifyEmail){
    //         $verifyTry=$db->consultaDB('onepub',"SELECT * FROM onepub.tryacessfail where iduser=".$verifyEmail[0]['id'].";");
    //         if(sizeof($verifyTry)==1&&$verifyTry){

    //             $values='';
    //             $sqlup="UPDATE onepub.tryacessfail set quanttry=:quant where iduser=:id;";
    //             $minutos=$db->consultaDB('onepub',"SELECT TIMESTAMPDIFF(MINUTE,datahora,now()) intervalo from onepub.tryacessfail where iduser=".$verifyEmail[0]['id'].";");

    //             if($minutos[0]['intervalo']<=15&&$verifyTry[0]['quanttry']<15){
    //                 $values=array(
    //                             ':quant' => $verifyTry[0]['quanttry']+1,
    //                             ':id' => $verifyEmail[0]['id']
    //                           );
    //             }else if($minutos[0]['intervalo']>15){
    //                 date_default_timezone_set('America/Fortaleza');
    //                 $sqlup="UPDATE onepub.tryacessfail set quanttry=:quant,datahora=:data where iduser=:id;";
    //                 $values=array(
    //                             ':quant' => 1,
    //                             ':id' => $verifyEmail[0]['id'],
    //                             ':data'=> date('Y-m-d H:i:s')
    //                           );
    //             }

    //             if($values!=''){
    //                 if($db->updateUser('onepub',$sqlup,$values)){
    //                     return true;
    //                 }else{
    //                     return false;
    //                 }
    //             }else{
    //                 return array(
    //                     'islog' => false,
    //                     'message'=> 'Tentativas excessivas de login, favor tente novamente mais tarde'
    //                 );
    //             }

    //             $values=null;
    //             $sqlup=null;
    //             $minutos=null;
    //         }else if(sizeof($verifyTry)==0){
    //             $sqltry="INSERT into onepub.tryacessfail(quanttry, iduser)
    //             Values(:quanttry,:iduser);";
    //             $values=array(
    //                 ':quanttry' => 1,
    //                 ':iduser' => $verifyEmail[0]['id']
    //             );

    //             if($db->insertUser('onepub',$sqltry,$values)){
    //                 return true;
    //             }else{
    //                 return false;
    //             }

    //             $sqltry=null;
    //             $values=null;
    //         }

    //         $verifyTry=null;
    //     }else{
    //         return true;
    //     }

    //     $db=null;
    //     $verifyEmail=null;
    // }

    // public function clearTry($user){
    //     $db=new ConectDB();
    //     $verifyEmail=$db->consultaDB('onepub',"SELECT id FROM onepub.usuario where email='".$user."';");
    //     if(sizeof($verifyEmail)==1&&$verifyEmail){
    //         $verifyTry=$db->consultaDB('onepub',"SELECT * FROM onepub.tryacessfail where iduser=".$verifyEmail[0]['id'].";");
    //         if(sizeof($verifyTry)==1&&$verifyTry){
    //             $sqldel="DELETE from onepub.tryacessfail where iduser=:id;";
    //             $values=array(':id'   => $verifyEmail[0]['id']);
    //             if($db->deleteUser('onepub',$sqldel,$values)){
    //                 return true;
    //             }else{
    //                 return false;
    //             }

    //             $sqldel=null;
    //             $values=null;
    //         }else{
    //             return true;
    //         }

    //         $verifyTry=null;
    //     }else{
    //         return false;
    //     }

    //     $db=null;
    //     $verifyEmail=null;
    // }

?>