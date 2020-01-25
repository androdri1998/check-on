<?php
    // require_once('../db/ConectDB.php');

    class Funcoes{

        private $dbs=array("onepub"=>array('db' => "mysql:host=127.0.0.1 dbname='onepub'",
                                            'user'=>"root",
                                            'pass'=>"andre1998")
                            );

        private function consultaDB($db,$sql,$values=false){
            try {
                $conn = new PDO($this->dbs[$db]['db'],$this->dbs[$db]['user'],$this->dbs[$db]['pass']);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $preConsulta = $conn->prepare($sql);
                
                if($values)
                    $preConsulta->execute($values);
                else
                    $preConsulta->execute();
                    
                $rows = $preConsulta->fetchAll();
                $conn = null;
                return $rows;
            }
            catch(PDOException $e){
                echo json_encode(array(
                    'messageErr'=> $e->getMessage(),
                    'message'=> 'Ocorreu um erro, tente novamente mais tarde.',
                    'err'=>true
                ));
                return false;
            }

        }

        private function tryAcessFail($user){
            $resEmail=$this->consultaDB('onepub',"SELECT id FROM onepub.usuario where email=:email;",[':email'=>$user]);
            if(is_array($resEmail)&&sizeof($resEmail)==1){
                $verifyTry=$this->consultaDB('onepub',"SELECT * FROM onepub.tryacessfail where iduser=:id;",[':id'=>$resEmail[0]['id']]);
            
                if(is_array($verifyTry)&&sizeof($verifyTry)==1){

                    $values=false;
                    $sqlup="UPDATE onepub.tryacessfail set quanttry=:quant where iduser=:id;";

                    $minutos=$this->consultaDB('onepub',"SELECT TIMESTAMPDIFF(MINUTE,datahora,now()) intervalo from onepub.tryacessfail where iduser=:id;",[':id'=>$resEmail[0]['id']]);

                    if($minutos[0]['intervalo']<=15&&$verifyTry[0]['quanttry']<15){
                        $values=array(
                            ':quant' => $verifyTry[0]['quanttry']+1,
                            ':id' => $resEmail[0]['id']
                        );
                        // return true;
                    }else if($minutos[0]['intervalo']>15){
                        date_default_timezone_set('America/Fortaleza');
                        $sqlup="UPDATE onepub.tryacessfail set quanttry=:quant,datahora=:data where iduser=:id;";

                        $values=array(
                            ':quant' => 1,
                            ':id' => $resEmail[0]['id'],
                            ':data'=> date('Y-m-d H:i:s')
                        );

                    }

                    if($values){
                        $conn =  new PDO($this->dbs['onepub']['db'],$this->dbs['onepub']['user'],$this->dbs['onepub']['pass']);
                        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $conn->beginTransaction();
    
                        try{
                            $preInsert=$conn->prepare($sqlup);
                            $preInsert->execute($values);
                            $preInsert->closeCursor();
                            
                            $preInsert=null;

                            $conn->commit();
                            return true;
                        }catch(Exception $e){
                            
                            $conn->rollBack();
                            return false;
                        }

                        $conn=null;
                    }
                    
                    // // else{
                    // //     tentativas excessivas
                    // // }

                    $values=null;
                    $sqlup=null;
                    $minutos=null;

                }else if(is_array($verifyTry)&&sizeof($verifyTry)==0){
                    $sqltry="INSERT into onepub.tryacessfail(quanttry, iduser)
                    Values(:quanttry,:iduser);";
                    $values=array(
                        ':quanttry' => 1,
                        ':iduser' => $resEmail[0]['id']
                    );

                    $conn =  new PDO($this->dbs['onepub']['db'],$this->dbs['onepub']['user'],$this->dbs['onepub']['pass']);
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $conn->beginTransaction();

                    try{
                        $preInsert=$conn->prepare($sqltry);
                        $preInsert->execute($values);
                        $preInsert->closeCursor();
                        
                        $preInsert=null;
                        $conn->commit();

                        $conn=null;
                        return true;
                    }catch(Exception $e){
                        
                        $conn->rollBack();
                        $conn=null;
                        return false;
                    }
                    

                    $sqltry=null;
                    $values=null;
                }

                $verifyTry=null;
            }else{
                return true;
            }

            $db=null;
            $resEmail=null;
        }

        private function clearTry($user){
            $verifyEmail=$this->consultaDB('onepub',"SELECT id FROM onepub.usuario where email=:email;",[':email'=>$user]);
            if(is_array($verifyEmail)&&sizeof($verifyEmail)==1){

                $verifyTry=$this->consultaDB('onepub',"SELECT * FROM onepub.tryacessfail where iduser=:id;",[':id'=>$verifyEmail[0]['id']]);
                if(is_array($verifyTry)&&sizeof($verifyTry)==1){
                    $sqldel="DELETE from onepub.tryacessfail where iduser=:id;";
                    $values=array(':id'   => $verifyEmail[0]['id']);

                    $conn =  new PDO($this->dbs['onepub']['db'],$this->dbs['onepub']['user'],$this->dbs['onepub']['pass']);
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $conn->beginTransaction();

                    try{
                        $preInsert=$conn->prepare($sqldel);
                        $preInsert->execute($values);
                        $preInsert->closeCursor();

                        $conn->commit();
                        $conn=null;
                        return true;
                    }catch(Exception $e){

                        $conn->rollBack();
                        $conn=null;
                        return false;
                    }

                    
                    $sqldel=null;
                    $values=null;
                }else{
                    return true;
                }
            
                $verifyTry=null;
            }else{
                return true;
            }

            $verifyEmail=null;
        }

        public function login($obj){
            $resEmail=$this->consultaDB('onepub',
            'SELECT * FROM onepub.usuario where email=:email;' ,['email'=>$obj->email]);

            $results=null;
            if(is_array($resEmail)&&sizeof($resEmail)==1){

                $verifyTry=$this->consultaDB('onepub',"SELECT * FROM onepub.tryacessfail where iduser=:id;",[":id"=>$resEmail[0]['id']]);
                $block=false;
                if(is_array($verifyTry)&&sizeof($verifyTry)==1){
                    $minutos=$this->consultaDB('onepub',"SELECT TIMESTAMPDIFF(MINUTE,datahora,now()) intervalo from onepub.tryacessfail where iduser=:id;",[':id'=>$resEmail[0]['id']]);
                
                    if($minutos[0]['intervalo']<=15&&$verifyTry[0]['quanttry']==15){
                        $block=true;
                    }

                    $minutos=null;
                }

                if(!$block){
                    $results=$this->consultaDB('onepub',
                    'SELECT * FROM onepub.usuario where email=:email and senha=:senha;'
                    ,['email'=>$obj->email,'senha'=>md5($obj->password)]);
                    if(is_array($results)&&sizeof($results)==1){
                        if(is_array($results)&&!empty($results)){

                            $conn =  new PDO($this->dbs['onepub']['db'],$this->dbs['onepub']['user'],$this->dbs['onepub']['pass']);
                            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                            $conn->beginTransaction();

                            try{
                                $sqlacesso="INSERT into onepub.acesso(ip, tipo, idusuario)
                                    Values(:ip,:tipo,:idusuario);";
                                $ip=$_SERVER['REMOTE_ADDR'];
                                $values=array(
                                    ':ip' => $ip,
                                    ':tipo' => 'login',
                                    ':idusuario' => $results[0]['id']
                                );

                                $preInsert=$conn->prepare($sqlacesso);
                                $preInsert->execute($values);
                                $preInsert->closeCursor();

                                
                                $preInsert=null;
                                $isErr=$this->clearTry($obj->email);
                                
                                if($isErr){
                                    echo json_encode([
                                        'results'=>$this->tratarArray($results),
                                        'err'=>false
                                    ]);
                                    $conn->commit();
                                }else{
                                    $conn->rollBack();
                                }
                                
                                // login realizado com sucesso

                            }catch(Exception $e){
                                echo json_encode([ 
                                    'message'=>'Ops... Houve um erro ao realizar login, favor tente novamente mais tarde.',
                                    'err'=>true
                                    ,"messageErr"=>$e->getMessage()
                                ]);
                                $conn->rollBack();

                                // erro ao realizar login
                            }

                            $conn=null;

                        }
                    }else{
                        if(is_array($results)&&empty($results)){

                            // IMPLEMENTAR BLOQUEIO DE SENHA
                            $isErr=$this->tryAcessFail($obj->email);
                            if($isErr){
                                echo json_encode([
                                    'message'=>'Senha incorreta.',
                                    // 'message'=>$isErr,
                                    'err'=>true
                                ]);
                            }else{
                                echo json_encode([ 
                                    'message'=>'Ops... Houve um erro ao realizar login, favor tente novamente mais tarde.',
                                    'err'=>true
                                ]);
                            }
                        }
                    }
                }else{
                    echo json_encode(array(
                        'err' => true,
                        'message'=> 'Tentativas excessivas de login, favor tente novamente mais tarde.'
                    ));
                }

                $verifyTry=null;
            }else{
                if(is_array($resEmail)&&empty($resEmail)){
                    echo json_encode([
                        'message'=>'Email não cadastrado.',
                        'err'=>true
                    ]);
                }
            }

            $resEmail=null;
            $results=null;
        }

        public function verifyEmailUsername($obj){
            $resEmail=$this->consultaDB('onepub',
            'SELECT * FROM onepub.usuario where email=:email;' ,['email'=>$obj->email]);
            if(is_array($resEmail)&&sizeof($resEmail)==0){

                $resUser=$this->consultaDB('onepub',
                'SELECT * FROM onepub.usuario where username=:username;' ,['username'=>$obj->username]);
                if(is_array($resUser)&&sizeof($resUser)==0){

                    $sql="insert into onepub.pre_inscricao(email,username)values(:email,:username);";
                    $conn =  new PDO($this->dbs['onepub']['db'],$this->dbs['onepub']['user'],$this->dbs['onepub']['pass']);
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $conn->beginTransaction();
                    $values=[":email"=>$obj->email,":username"=>$obj->username];

                    try{

                        $preInsert=$conn->prepare($sql);
                        $preInsert->execute($values);
                        $preInsert->closeCursor();

                        $conn->commit();
                        echo json_encode(["err"=>false,"message"=>"Está tudo certo!"]);
                    }catch(Exception $e){

                        $conn->rollBack();
                        echo json_encode(["err"=>true,"message"=>"Houve um erro ao realizar a realizar a pré inscrição"
                        ,"messageErr"=>$e->getMessage()]);
                    }

                    $sql=null;
                    $values=null;
                    $conn=null;

                }else{
                    echo json_encode(["err"=>true,"message"=>"Username já existente"]);
                }

                $resUser=null;

            }else{
                echo json_encode(["err"=>true,"message"=>"Email já existente"]);
            }

            $resEmail=null;
            $db=null;
        }

        public function tratarArray($arr){
            $newArr=[];
            foreach($arr as $key => $value){
                $newArr[$key]=[];
                foreach($value as $keyy => $valueInt){
                    $bol=!is_numeric($keyy);
                    if($bol){
                        $newArr[$key][$keyy]=$valueInt;
                    }
                }
            }
            return $newArr;
        }

        public function updateUser($obj,$update=false){

            $dir = __DIR__.'/images/';
            $dirUser=null;
            $dirUser=$obj->pasta;

            $user_ft_perfil=null;
            if(isset($_FILES["ft_perfil"])){
                date_default_timezone_set("Brazil/East");
                $ext = strtolower(substr($_FILES['ft_perfil']['name'],-4));
                $new_name = md5(uniqid()) . $ext;
                $user_ft_perfil=$new_name;

                move_uploaded_file($_FILES['ft_perfil']['tmp_name'], $dir.$dirUser."/perfis/".$new_name);

                $ext=null;
                $new_name=null;
            }

            $user_ft_capa=null;
            if(isset($_FILES["ft_capa"])){
                date_default_timezone_set("Brazil/East");
                $ext = strtolower(substr($_FILES['ft_capa']['name'],-4));
                $new_name = md5(uniqid()) . $ext;
                $user_ft_capa=$new_name;

                move_uploaded_file($_FILES['ft_capa']['tmp_name'], $dir.$dirUser."/capas/".$new_name);

                $ext=null;
                $new_name=null;
            }

            // if($update){
                if(($user_ft_perfil&&$user_ft_capa)){
                    $sql="UPDATE onepub.usuario set alternativename=:alternativename, descricao=:descricao, fotoperf=:fotoperf, fotocapa=:fotocapa;";
                
                    $values=array(
                        ':alternativename' => $obj->nomealter,
                        ':descricao' => $obj->descricao,
                        ':fotoperf' => $user_ft_perfil,
                        ':fotocapa' => $user_ft_capa
                    );
                }else if($user_ft_perfil&&!$user_ft_capa){
                    $sql="UPDATE onepub.usuario set alternativename=:alternativename, descricao=:descricao, fotoperf=:fotoperf;";
                
                    $values=array(
                        ':alternativename' => $obj->nomealter,
                        ':descricao' => $obj->descricao,
                        ':fotoperf' => $user_ft_perfil
                    );
                }else if(!$user_ft_perfil&&$user_ft_capa){
                    $sql="UPDATE onepub.usuario set alternativename=:alternativename, descricao=:descricao, fotocapa=:fotocapa;";
                
                    $values=array(
                        ':alternativename' => $obj->nomealter,
                        ':descricao' => $obj->descricao,
                        ':fotocapa' => $user_ft_capa
                    );
                }else if(!$user_ft_perfil&&!$user_ft_capa){
                    $sql="UPDATE onepub.usuario set alternativename=:alternativename, descricao=:descricao;";
                
                    $values=array(
                        ':alternativename' => $obj->nomealter,
                        ':descricao' => $obj->descricao
                    );
                }
            // }
            

            $conn =  new PDO($this->dbs['onepub']['db'],$this->dbs['onepub']['user'],$this->dbs['onepub']['pass']);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->beginTransaction();

            try{

                $preInsert=$conn->prepare($sql);
                $preInsert->execute($values);
                $preInsert->closeCursor();

                $conn->commit();

                $preInsert=null;

                echo json_encode(array(
                    'err' => false,
                    'results' => "Perfil atualizado com sucesso"
                ));

            }catch(Exception $e){
                $conn->rollBack();

                echo json_encode(array(
                    'err' => true,
                    'message' => "Ops... houve um erro ao realizar o cadastro"
                    ,"messageErr"=>$e->getMessage()
                ));
            }

            $conn=null;
            $dir=null;
            $dirUser=null;
            $user_ft_perfil=null;
            $user_ft_capa=null;
            $sql=null;
            $values=null;
        }

        public function cadastrarUser($obj){

            $dir = __DIR__.'/images/';
            $dirUser=md5(uniqid(time()));
            if(!is_dir($dir.$dirUser)){
                mkdir($dir.$dirUser, 0777);
                mkdir($dir.$dirUser."/perfis", 0777);
                mkdir($dir.$dirUser."/capas", 0777);
            }

            $user_ft_perfil=null;
            if(isset($_FILES["ft_perfil"])){
                date_default_timezone_set("Brazil/East");
                $ext = strtolower(substr($_FILES['ft_perfil']['name'],-4));
                $new_name = md5(uniqid()) . $ext;
                $user_ft_perfil=$new_name;

                move_uploaded_file($_FILES['ft_perfil']['tmp_name'], $dir.$dirUser."/perfis/".$new_name);

                $ext=null;
                $new_name=null;
            }else{
                $user_ft_perfil='padrao.png';
            }

            $user_ft_capa=null;
            if(isset($_FILES["ft_capa"])){
                date_default_timezone_set("Brazil/East");
                $ext = strtolower(substr($_FILES['ft_capa']['name'],-4));
                $new_name = md5(uniqid()) . $ext;
                $user_ft_capa=$new_name;

                move_uploaded_file($_FILES['ft_capa']['tmp_name'], $dir.$dirUser."/capas/".$new_name);

                $ext=null;
                $new_name=null;
            }else{
                $user_ft_capa='padrao.png';
            }


            $sql="INSERT into onepub.usuario(senha, email, username, alternativename, descricao, fotoperf,fotocapa,pasta)
                    Values(:senha,:email,:username,:alternativename,:descricao,:fotoperf,:fotocapa,:pasta);";
            
            $values=array(
                ':senha' => md5($obj->senha),
                ':email' => $obj->email,
                ':username' => $obj->username,
                ':alternativename' => $obj->nomealter,
                ':descricao' => $obj->descricao,
                ':fotoperf' => $user_ft_perfil,
                ':fotocapa' => $user_ft_capa,
                ':pasta' => $dirUser
            );

            $conn =  new PDO($this->dbs['onepub']['db'],$this->dbs['onepub']['user'],$this->dbs['onepub']['pass']);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->beginTransaction();

            try{

                $preInsert=$conn->prepare($sql);
                $preInsert->execute($values);
                $preInsert->closeCursor();

                $conn->commit();

                $preInsert=null;

            }catch(Exception $e){
                $conn->rollBack();

                echo json_encode(array(
                    'err' => true,
                    'message' => "Ops... houve um erro ao realizar o cadastro"
                    ,"messageErr"=>$e->getMessage()
                ));
            }

            $id=$this->consultaDB('onepub',"SELECT id FROM onepub.usuario where email=:email;",[':email'=>$obj->email]);

            $sqlacesso="INSERT into onepub.acesso(ip, tipo, idusuario)
                        Values(:ip,:tipo,:idusuario);";
            $ip=$_SERVER['REMOTE_ADDR'];
            $valuesacess=array(
                ':ip' => $ip,
                ':tipo' => 'login',
                ':idusuario' => $id[0]['id']
            );

            $conn->beginTransaction();

            try{

                $preInsert=$conn->prepare($sqlacesso);
                $preInsert->execute($valuesacess);
                $preInsert->closeCursor();

                $conn->commit();

                echo json_encode(array(
                    'err' => false,
                    'results' => $id[0]['id']
                ));

                $preInsert=null;

            }catch(Exception $e){
                $conn->rollBack();

                echo json_encode(array(
                    'err' => true,
                    'message' => "Cadastro realizado com sucesso, mas houve um erro ao realizar o login"
                    ,"messageErr"=>$e->getMessage()
                ));
            }

            $conn=null;
            $dir=null;
            $dirUser=null;
            $user_ft_perfil=null;
            $user_ft_capa=null;
            $sql=null;
            $values=null;
        }

        public function getSimpleInfoUser($obj){
            $user=$this->consultaDB('onepub',"SELECT 
                                                us.id user_id, 
                                                us.email, 
                                                us.username, 
                                                us.alternativename, 
                                                us.descricao, 
                                                us.fotoperf, 
                                                us.contaprivada, 
                                                us.pasta, 
                                                us.datahoracadastro, 
                                                us.atualizacaodesc, 
                                                us.fotocapa,
                                                (SELECT count(*) from onepub.follows where iddestinofollow=:id) quantSeguidores,
												(SELECT count(*) from onepub.follows where idautorfollow=:id) quantSeguindo,
                                                (SELECT count(DISTINCT date(pst.datahorapost)) from onepub.posts pst where pst.idautorpost=:id) dias_compartilhados,
												case
													when (SELECT id from onepub.follows where idautorfollow=:autorFollow and iddestinofollow=:id)>0 then true
													else false
												end isseg
                                            FROM onepub.usuario us where id=:id;",[':id'=>$obj["id"],":autorFollow"=>$obj["autorFollow"]]);
            echo json_encode(['err'=>false,'user'=>$this->tratarArray($user)]);
        }

        public function cadastrarPost($obj){

            $conn =  new PDO($this->dbs['onepub']['db'],$this->dbs['onepub']['user'],$this->dbs['onepub']['pass']);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->beginTransaction();

            $sql="INSERT into onepub.posts(idautorpost,contenttext)
                VALUES(:id,:content)";
            $values=[":id"=>$obj->id,":content"=>$obj->post];

            try{

                $preInsert=$conn->prepare($sql);
                $preInsert->execute($values);
                $preInsert->closeCursor();

                $conn->commit();
                echo json_encode(['err'=>false,'message'=>"Dia atualizado com sucesso."]);
            }catch(Exception $e){

                $conn->rollBack();
                echo json_encode(['err'=>true,'message'=>"Ops... Houve um erro ao realizar o post"
                ,"messageErr"=>$e->getMessage()]);
            }

            $conn=null;
        }

        public function getMyPosts($obj){
            $posts=$this->consultaDB('onepub',
                'SELECT 
                    p.id post_id, 
                    p.idautorpost user_id, 
                    p.foto, 
                    p.contenttext, 
                    p.datahorapost,
                    -- user
                    us.email, 
                    us.username, 
                    us.alternativename, 
                    us.descricao, 
                    us.fotoperf, 
                    us.contaprivada, 
                    us.pasta,
                    us.atualizacaodesc, 
                    us.fotocapa
                FROM onepub.posts p
                inner join onepub.usuario us 
                    on us.id=p.idautorpost
                where p.idautorpost=:id order by p.datahorapost desc;
                ',[':id'=>$obj]);

            echo json_encode(['err'=>false,'posts'=>$this->tratarArray($posts)]);
        }

        public function getPostsDay($obj,$data){
            $posts=$this->consultaDB('onepub',
                'SELECT 
                    p.id post_id, 
                    p.idautorpost user_id, 
                    p.foto, 
                    p.contenttext, 
                    p.datahorapost,
                    -- user
                    us.email, 
                    us.username, 
                    us.alternativename, 
                    us.descricao, 
                    us.fotoperf, 
                    us.contaprivada, 
                    us.pasta,
                    us.atualizacaodesc, 
                    us.fotocapa
                FROM onepub.posts p
                inner join onepub.usuario us 
                    on us.id=p.idautorpost
                where p.idautorpost=:id and date(p.datahorapost)=:datasel order by p.datahorapost desc;
                ',[':id'=>$obj,':datasel'=>$data]);

            echo json_encode(['err'=>false,'posts'=>$this->tratarArray($posts)]);
        }

        public function getComentsPost($postId){
            $coments=$this->consultaDB('onepub',
                'SELECT 
                cm.id coment_id, 
                cm.idautorcoments user_id, 
                cm.idpost post_id, 
                cm.contenttextcoment, 
                cm.datahoracoment,
                -- user
                us.email, 
                us.username, 
                us.alternativename, 
                us.descricao, 
                us.fotoperf, 
                us.contaprivada, 
                us.pasta,
                us.atualizacaodesc, 
                us.fotocapa
            FROM onepub.coments cm
            inner join onepub.usuario us 
                on us.id=cm.idautorcoments
            WHERE idpost=:post_id order by cm.datahoracoment desc;',[":post_id"=>$postId]);

            echo json_encode(['err'=>false,'coments'=>$this->tratarArray($coments)]);
        }

        public function cadastrarComent($obj){
            $conn =  new PDO($this->dbs['onepub']['db'],$this->dbs['onepub']['user'],$this->dbs['onepub']['pass']);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->beginTransaction();

            $sqlTr="INSERT into onepub.trending(idautorinteracao, idpost,typeinteracao)
                    Values(:idautorinteracao,:idpost,:typeinteracao);";
            $valuesTr=array(
                ':idautorinteracao' => $obj->autor_id,
                ':idpost' => $obj->post_id,
                ':typeinteracao' => 2
            );

            $sql="INSERT into onepub.coments(idautorcoments, idpost,contenttextcoment)
                        Values(:idautorcoments,:idpost,:contenttextcoment);";
            $values=array(
                ':idautorcoments' => $obj->autor_id,
                ':idpost' => $obj->post_id,
                ':contenttextcoment' => $obj->content_text
            );

            try{
                $preInsert=$conn->prepare($sqlTr);
                $preInsert->execute($valuesTr);
                $preInsert->closeCursor();

                $preInsert=$conn->prepare($sql);
                $preInsert->execute($values);
                $preInsert->closeCursor();

                $conn->commit();
                echo json_encode(['err'=>false,'message'=>"Opaaa que já está interagindo."]);
            }catch(Exception $e){

                $conn->rollBack();
                echo json_encode(['err'=>true,'message'=>"Opss... houve um erro ao tentar-mos interagir! \nverifica ai sua conexão, de boas!"
                ,"messageErr"=>$e->getMessage()]);
            }

            $conn=null;
            $sqlTr=null;
            $valuesTr=null;
            $sql=null;
            $values=null;
        }

        public function getPostsOfFollows($obj){
            try{
                $id=$obj;

                $posts=$this->consultaDB('onepub',"SELECT
                                                    post.id post_id,
                                                    foll.iddestinofollow user_id,
                                                    userr.username,
                                                    post.idautorpost,
                                                    post.datahorapost,
                                                    post.foto,
                                                    post.contenttext,
                                                    userr.alternativename,
                                                    userr.fotoperf,
                                                    userr.pasta,
                                                    saves.id idpostsave,
                                                    (SELECT count(*) FROM onepub.saves sv where sv.idpost=post.id) quantsaves
                                                    from onepub.follows foll
                                                JOIN onepub.posts post
                                                    on foll.iddestinofollow=post.idautorpost
                                                LEFT JOIN onepub.usuario userr
                                                    on post.idautorpost=userr.id
                                                LEFT JOIN onepub.saves saves
                                                    on post.id=saves.idpost and saves.idautorsave=".$id." 
                                                where foll.idautorfollow=".$id."   
                                                order by post.datahorapost desc;");

                if(sizeof($posts)>=1&&$posts){
                    echo json_encode(array(
                        'isposts' => true,
                        'posts' => $this->tratarArray($posts)
                    ));
                }else if(sizeof($posts)==0){
                    echo json_encode(array(
                        'isposts' => false,
                        'message'=> 'Seus amigos ainda não compartilharam sobre o dia deles.'
                    ));
                }else{
                    echo json_encode(array(
                        'iserror' => true,
                        'message'=> 'Houve um erro ao buscar posts, favor tentar novamente mais tarde.'
                    ));
                }

                $db=null;
                $id=null;
                $posts=null;
            }catch(Exception $e){
                echo json_encode(['err'=>true,'message'=>"Opss... houve um erro ao tentar-mos buscar posts de seus amigos! \nverifica ai sua conexão, de boas!"
                ,"messageErr"=>$e->getMessage()]);
            }
        }

        public function getUsersBusca($obj){
            try{
                $busca=$obj["txt_busca"];
                $id=(int)$obj["user_id"];
    
                $usersData=$this->consultaDB('onepub',"SELECT id user_id,username,fotoperf,pasta
                    FROM onepub.usuario where username LIKE '%".$busca."%' and id!=".$id." LIMIT 10;");
    
                if(sizeof($usersData)>=1&&$usersData){
                	echo json_encode(array(
                		'isgetusers' => true,
                		'usersBusca' => $this->tratarArray($usersData)
                	));
                }else if(sizeof($usersData)==0){
                	echo json_encode(array(
                		'isgetusers' => false,
                		'message'=> "Não foram encontrados usuários com esta busca"
                	));
                }else if(!$usersData){
                	echo json_encode(array(
                		'error' => false,
                		'message'=> 'Houve um erro ao realizar a busca de usuários, favor tente novamente mais tarde'
                	));
                }
    
                $db=null;
                $busca=null;
                $id=null;
                $usersData=null;
            }catch(Exception $e){
                echo json_encode(array(
                    'error' => false,
                    'message'=> 'Houve um erro ao realizar a busca de usuários, favor tente novamente mais tarde'
                ));
            }
        }

        public function follow($obj){
            $conn =  new PDO($this->dbs['onepub']['db'],$this->dbs['onepub']['user'],$this->dbs['onepub']['pass']);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->beginTransaction();

            $idAutor=$obj->idautor;
			$idReceived=$obj->idreceived;

			$sql="INSERT into onepub.follows(idautorfollow, iddestinofollow)
					Values(:idautor,:idreceived);";
			$values=array(
				':idautor' => $idAutor,
				':idreceived' => $idReceived
            );

            try{
                $preInsert=$conn->prepare($sql);
                $preInsert->execute($values);
                $preInsert->closeCursor();

                $conn->commit();
                echo json_encode(array(
					'err' => false,
					'message'  => 'Você agora é um seguidor.'
				));
            }catch(Exception $e){
                $conn->rollBack();
                echo json_encode(array(
                    'err' => true,
                    "messageErr"=>$e->getMessage(),
					'message'=> 'Houve um erro ao realizar o follow, favor tente novamente mais tarde'
				));
            }

			$db=null;
			$idAutor=null;
			$idReceived=null;
			$sql=null;
        }

        public function unfollow($obj){
            $conn =  new PDO($this->dbs['onepub']['db'],$this->dbs['onepub']['user'],$this->dbs['onepub']['pass']);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->beginTransaction();

            $idAutor=$obj->idautor;
			$idReceived=$obj->idreceived;

			$sql="DELETE from onepub.follows where idautorfollow=:idautor and iddestinofollow=:idreceived;";
			$values=array(
				':idautor' => $idAutor,
				':idreceived' => $idReceived
			);
            
            try{
                $preInsert=$conn->prepare($sql);
                $preInsert->execute($values);
                $preInsert->closeCursor();

                $conn->commit();
                echo json_encode(array(
					'unfollow' => true,
					'message'  => 'Você não é mais um seguidor.'
				));
            }catch(Exception $e){
                $conn->rollBack();
                echo json_encode(array(
					'unfollow' => false,
					'message'=> 'Houve um erro ao realizar o follow, favor tente novamente mais tarde'
				));
            }

			$db=null;
			$idAutor=null;
			$idReceived=null;
			$sql=null;
        }

        public function newSave($obj){
            $conn =  new PDO($this->dbs['onepub']['db'],$this->dbs['onepub']['user'],$this->dbs['onepub']['pass']);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->beginTransaction();

			$idAutor=$obj->idautorsave;
			$idPost=$obj->idpost;

			$verifySave=$this->consultaDB('onepub',"SELECT id from onepub.saves where idautorsave=".$idAutor." AND idpost=".$idPost.";");

			if(sizeof($verifySave)==0){

				$sqlTr="INSERT into onepub.trending(idautorinteracao, idpost,typeinteracao)
						Values(:idautorinteracao,:idpost,:typeinteracao);";
				$valuesTr=array(
					':idautorinteracao' => $idAutor,
					':idpost' => $idPost,
					':typeinteracao' => 1
                );

                $sql="INSERT into onepub.saves(idautorsave, idpost)
							Values(:idautorsave,:idpost);";
                $values=array(
                    ':idautorsave' => $idAutor,
                    ':idpost' => $idPost
                );
                
                try{
                    $preInsert=$conn->prepare($sqlTr);
                    $preInsert->execute($valuesTr);
                    $preInsert->closeCursor();

                    $preInsert=$conn->prepare($sql);
                    $preInsert->execute($values);
                    $preInsert->closeCursor();
    
                    $conn->commit();

                    echo json_encode(array(
                        'issave'   => true,
                        'message'  => 'Está salvo na sua Coleção.'
                    ));

                }catch(Exception $e){
                    $conn->rollBack();
                    
                    echo json_encode(array(
                        'iserror' => true,
                        'message'=> 'Houve um erro ao realizar o save, favor tente novamente mais tarde'
                    ));

                    $sqlTr=null;
                    $valuesTr=null;
                    $sql=null;
					$values=null;
                }
				
			}else if(sizeof($verifySave)==1&&$verifySave){
				echo json_encode(array(
					'issave'   => true,
					'message'  => 'Já está salvo na sua Coleção.'
				));
			}else{
				echo json_encode(array(
					'iserror' => true,
					'message'=> 'Houve um erro ao realizar o save, favor tente novamente mais tarde'
				));
			}

			$db=null;
			$idPost=null;
			$idAutor=null;
        }
        
        public function dropSave($obj){
            $conn =  new PDO($this->dbs['onepub']['db'],$this->dbs['onepub']['user'],$this->dbs['onepub']['pass']);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->beginTransaction();

			$idAutor=$obj->idautorsave;
			$idPost=$obj->idpost;

			$verifySave=$this->consultaDB('onepub',"SELECT id from onepub.saves where idautorsave=".$idAutor." AND idpost=".$idPost.";");

			if(sizeof($verifySave)==1&&$verifySave){
				$sql="DELETE from onepub.saves where idautorsave=:idautorsave and idpost=:idpost";
				$values=array(
					':idautorsave' => $idAutor,
					':idpost' => $idPost
                );
                
                try{
                    $preInsert=$conn->prepare($sql);
                    $preInsert->execute($values);
                    $preInsert->closeCursor();
    
                    $conn->commit();

                    echo json_encode(array(
						'issave'   => false,
						'message'  => 'Este post não está mais na sua coleção'
					));

                }catch(Exception $e){
                    $conn->rollBack();
                    
                    echo json_encode(array(
						'iserror' => true,
						'message'=> 'Houve um erro ao realizar na remoção do save, favor tente novamente mais tarde'
					));

                    $sql=null;
					$values=null;
                }
			}else if(sizeof($verifySave)==0){
				echo json_encode(array(
					'issave'   => false,
					'message'  => 'Este save não está na sua Coleção.'
				));
			}else{
				echo json_encode(array(
					'iserror' => true,
					'message'=> 'Houve um erro ao realizar na remoção do save, favor tente novamente mais tarde'
				));
			}

			$db=null;
			$idPost=null;
			$idAutor=null;
        }

        public function getSaves($id){

			$posts=$this->consultaDB('onepub',"SELECT
												posts.id post_id,
												posts.idautorpost user_id,
												posts.foto,
												posts.contenttext,
												posts.datahorapost,
												saves.datahorasave,
												userr.username,
												userr.alternativename,
												userr.fotoperf,
												userr.pasta,
												saves.id idpostsave,
												(SELECT count(*) FROM onepub.saves sv where sv.idpost=posts.id) quantsaves
												from onepub.saves saves
											JOIN onepub.posts posts
												on saves.idautorsave=".$id." AND saves.idpost=posts.id
											JOIN onepub.usuario userr
												on posts.idautorpost=userr.id
											order by datahorasave desc;");

			if(sizeof($posts)>=1&&$posts){
				echo json_encode(array(
					'isposts' => true,
					'posts' => $this->tratarArray($posts)
				));
			}else if(sizeof($posts)==0){
				echo json_encode(array(
					'isposts' => true,
					'message'=> 'Você ainda não possui saves.'
				));
			}else{
				echo json_encode(array(
					'iserror' => true,
					'message'=> 'Houve um erro ao buscar os saves, favor tentar novamente mais tarde.'
				));
			}

			$db=null;
			$id=null;
			$posts=null;
        }

        public function getTrending($id){
			$metodo="Últimos 15 minutos!";

			$posts=$this->consultaDB('onepub',"SELECT
												trd.idpost post_id,
												(SELECT COUNT(*) from onepub.trending tr where tr.idpost=trd.idpost and TIMESTAMPDIFF(MINUTE, tr.datahorainteracao, now())<=15) quant,
												(SELECT count(*) FROM onepub.saves sv where sv.idpost=trd.idpost) quantsaves,
												posts.idautorpost user_id,
												posts.foto,
												posts.contenttext,
												posts.datahorapost,
												userr.username,
												userr.alternativename,
												userr.fotoperf,
												userr.pasta,
												saves.issaves idpostsave
											FROM onepub.trending trd
											JOIN onepub.posts posts
												on trd.idpost=posts.id and TIMESTAMPDIFF(MINUTE, trd.datahorainteracao, now())<=15
											JOIN onepub.usuario userr
												on userr.id=posts.idautorpost
											LEFT JOIN onepub.saves saves
												on posts.id=saves.idpost and saves.idautorsave=".$id."
											GROUP by trd.idpost,saves.issaves
											order by quant desc LIMIT 30;");
			if(sizeof($posts)<15){
				$posts=null;
				$posts=$this->consultaDB('onepub',"SELECT
													trd.idpost post_id,
													(SELECT COUNT(*) from onepub.trending tr where tr.idpost=trd.idpost) quant,
													(SELECT count(*) FROM onepub.saves sv where sv.idpost=trd.idpost) quantsaves,
													posts.idautorpost user_id,
													posts.foto,
													posts.contenttext,
													posts.datahorapost,
													userr.username,
													userr.alternativename,
													userr.fotoperf,
													userr.pasta,
													saves.issaves idpostsave
												FROM onepub.trending trd
												JOIN onepub.posts posts
													on trd.idpost=posts.id
												JOIN onepub.usuario userr
													on userr.id=posts.idautorpost
												LEFT JOIN onepub.saves saves
													on posts.id=saves.idpost and saves.idautorsave=".$id."
												GROUP by trd.idpost,saves.issaves
												order by quant desc LIMIT 30;");

				$metodo="Maiores de todos os tempos!";
			}

			if(sizeof($posts)>=1&&$posts){
				echo json_encode(array(
					'isposts' => true,
					'message' => $metodo,
					'posts' => $posts
				));
			}else{
				echo json_encode(array(
					'iserror' => true,
					'message'=> 'Houve um erro ao buscar os treadings, favor tentar novamente mais tarde.'
				));
			}

			$db=null;
			$id=null;
			$posts=null;
        }
    }
?>