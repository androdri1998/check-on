<?php 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods:GET,PUT,POST,DELETE,OPTIONS');
    header('Access-Control-Allow-Headers:Content-Type, Accept');

    require_once('./config/Constantes.php');
    // require_once('./db/ConectDB.php');
    require_once('./funcoes/Funcoes.php');

    // return 'bbb';
    
    $method = $_SERVER['REQUEST_METHOD'];
    
    // echo json_encode(['teste'=>$method]);
    if ($method == 'POST') {
        if($_POST['type']==Constantes::POST_TYPE_LOGIN){
            $fc=new Funcoes();
            $fc->login(json_decode($_POST['data']));
            $fc=null;
        }else if($_POST['type']==Constantes::POST_VERIFY_INFOS_CAD){
            $fc=new Funcoes();
            $fc->verifyEmailUsername(json_decode($_POST['data']));
            $fc=null;
        }else if($_POST['type']==Constantes::POST_TYPE_CADASTRO){
            $fc=new Funcoes();
            $fc->cadastrarUser(json_decode($_POST['data']),false);
            $fc=null;
        }else if($_POST['type']==Constantes::POST_TYPE_NEW_POST){
            $fc=new Funcoes();
            $fc->cadastrarPost(json_decode($_POST['data']));
            $fc=null;
        }else if($_POST['type']==Constantes::POST_TYPE_NEW_COMENT){
            $fc=new Funcoes();
            $fc->cadastrarComent(json_decode($_POST['data']));
            $fc=null;
        }else if($_POST['type']==Constantes::POST_TYPE_FOLLOW){
            $fc=new Funcoes();
            $fc->follow(json_decode($_POST['data']));
            $fc=null;
        }else if($_POST['type']==Constantes::POST_TYPE_NEW_SAVE){
            $fc=new Funcoes();
            $fc->newSave(json_decode($_POST['data']));
            $fc=null;
        }else if($_POST['type']==Constantes::PUT_TYPE_ATT_CADASTRO){
            $fc=new Funcoes();
            $fc->updateUser(json_decode($_POST['data']),true);
            $fc=null;
        }else if($_POST['type']==Constantes::DELETE_TYPE_UNFOLLOW){
            $fc=new Funcoes();
            $fc->unfollow(json_decode($_POST['data']));
            $fc=null;
        }else if($_POST['type']==Constantes::DELETE_TYPE_DROP_SAVE){
            $fc=new Funcoes();
            $fc->dropSave(json_decode($_POST['data']));
            $fc=null;
        }

        // echo json_encode(['data'=>json_decode($_POST['data'])]);
        // echo json_encode(['teste'=>"bbbb"]);
    } elseif ($method == 'GET') {
        if($_GET['type']==Constantes::GET_INFO_SIMPLE_USER){
            $fc=new Funcoes();
            $fc->getSimpleInfoUser(["id"=>$_GET['user'],"autorFollow"=>$_GET['autorFollow']]);
            $fc=null;
        }else if($_GET['type']==Constantes::GET_MY_POSTS){
            $fc=new Funcoes();
            $fc->getMyPosts($_GET['user']);
            $fc=null;
        }else if($_GET['type']==Constantes::GET_POST_DAY){
            $fc=new Funcoes();
            $fc->getPostsDay($_GET['user'],$_GET['data']);
            $fc=null;
        }else if($_GET['type']==Constantes::GET_POST_COMENTS){
            $fc=new Funcoes();
            $fc->getComentsPost($_GET['post_id']);
            $fc=null;
        }else if($_GET['type']==Constantes::GET_POST_OF_FOLLOWS){
            $fc=new Funcoes();
            $fc->getPostsOfFollows($_GET['user_id']);
            $fc=null;
        }else if($_GET['type']==Constantes::GET_BUSCA_USERS){
            $fc=new Funcoes();
            $fc->getUsersBusca(["user_id"=>$_GET['user_id'],"txt_busca"=>$_GET['txt_busca']]);
            $fc=null;
        }else if($_GET['type']==Constantes::GET_POSTS_SAVES){
            $fc=new Funcoes();
            $fc->getSaves($_GET['id']);
            $fc=null;
        }else if($_GET['type']==Constantes::GET_POSTS_TRENDING){
            $fc=new Funcoes();
            $fc->getTrending($_GET['id']);
            $fc=null;
        }
    } elseif ($method == 'PUT') {
        // Method is PUT
    } elseif ($method == 'DELETE') {
        // Method is DELETE
    } else {
        return json_encode([
            'err'=>true,
            'message'=>'método desconhecido'
        ]);
    }
?>