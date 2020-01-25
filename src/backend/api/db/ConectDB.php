<?php
	class ConectDB{

		private $dbs=array("onepub"=>array('db' => "mysql:host=127.0.0.1 dbname='onepub'",
											'user'=>"root",
											'pass'=>"andre1998")
							);

		// public function consultaDB($db,$sql,$values=false){
		// 	try {
		// 	    $conn = new PDO($this->dbs[$db]['db'],$this->dbs[$db]['user'],$this->dbs[$db]['pass']);
		// 	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		// 		$preConsulta = $conn->prepare($sql);
				
		// 		if($values)
		// 			$preConsulta->execute($values);
		// 		else
		// 			$preConsulta->execute();
					
		// 		$rows = $preConsulta->fetchAll();
		// 		$conn = null;
		// 		return $rows;
		// 	}
		// 	catch(PDOException $e){
		// 		echo json_encode(array(
		// 			'messageErr'=> $e->getMessage(),
		// 			'message'=> 'Ocorreu um erro, tente novamente mais tarde.',
        //             'err'=>true
		// 		));
		// 	    return false;
		// 	}

		// }

		public function alterDataDB($db,$sql,$arrayValues){
			try{
				$conn = new PDO($this->dbs[$db]['db'],$this->dbs[$db]['user'],$this->dbs[$db]['pass']);
			    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			    $preInsert=$conn->prepare($sql);
			    $ret=$preInsert->execute($arrayValues);
			    $conn=null;
			    return true;
			}catch(PDOException $e){
				echo json_encode(array(
					'messageErr'=> $e->getMessage(),
					'message'=> 'Ocorreu um erro, tente novamente mais tarde.',
                    'err'=>true
				));
			    return false;
			}
		}
	}
?>
