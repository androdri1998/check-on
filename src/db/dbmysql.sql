create database onepub CHARACTER set utf8mb4 collate utf8mb4_bin;

    -- ALTER TABLE onepub.usuario CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

create table onepub.usuario(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  senha TEXT NOT NULL,
  email TEXT NOT NULL,
  username VARCHAR(50) NOT NULL,
  alternativename TEXT NOT NULL,
  descricao TEXT,
  fotoperf TEXT,
  contaprivada BOOLEAN DEFAULT false NOT NULL,
  pasta TEXT NOT NULL,
  datahoracadastro DATETIME DEFAULT NOW() NOT NULL,
  atualizacaodesc DATETIME DEFAULT NOW() NOT NULL,
  fotocapa text not null,
  block boolean DEFAULT false not null
);

create table onepub.type_interactions(
	id int AUTO_INCREMENT PRIMARY key,
	tipo_desc text
);

create table onepub.tryacessfail(
	id int AUTO_INCREMENT not null,
	quanttry int not null,
	iduser int not null,
	datahora DATETIME DEFAULT NOW() not null,
	PRIMARY KEY(id),
	FOREIGN KEY(iduser) REFERENCES onepub.usuario(id)
);

create table onepub.acesso(
  id INT AUTO_INCREMENT NOT NULL,
  ip TEXT NOT NULL,
  tipo TEXT,
  datahoraacesso DATETIME DEFAULT NOW() NOT NULL,
  idusuario INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (idusuario) REFERENCES onepub.usuario(id)
);

create table onepub.contasexcluidas(
  id INT AUTO_INCREMENT NOT NULL,
  username TEXT NOT NULL,
  idusuario INT NOT NULL,
  datahoraexclusao DATETIME DEFAULT NOW() NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(idusuario) REFERENCES onepub.usuario(id)
);

create table onepub.posts(
  id INT AUTO_INCREMENT NOT NULL,
  idautorpost INT NOT NULL,
  foto text,
  contenttext text,
  datahorapost DATETIME DEFAULT NOW() NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(idautorpost) REFERENCES onepub.usuario(id)
);

create table onepub.coments(
  id INT AUTO_INCREMENT NOT NULL,
  idautorcoments INT NOT NULL,
  idpost INT NOT NULL,
  contenttextcoment TEXT,
  datahoracoment DATETIME DEFAULT NOW() NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(idautorcoments) REFERENCES onepub.usuario(id),
  FOREIGN KEY(idpost) REFERENCES onepub.posts(id)
);

create table onepub.saves(
  id INT AUTO_INCREMENT NOT NULL,
  idautorsave INT NOT NULL,
  idpost INT NOT NULL,
  datahorasave DATETIME DEFAULT NOW() NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(idautorsave) REFERENCES onepub.usuario(id),
  FOREIGN KEY(idpost) REFERENCES onepub.posts(id),
  issaves boolean DEFAULT true
);

create table onepub.follows(
  id INT AUTO_INCREMENT NOT NULL,
  idautorfollow INT NOT NULL,
  iddestinofollow INT NOT NULL,
  datahorafollow DATETIME DEFAULT NOW() NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(idautorfollow) REFERENCES onepub.usuario(id),
  FOREIGN KEY(iddestinofollow) REFERENCES onepub.usuario(id)
);

create table onepub.logs(
  id INT AUTO_INCREMENT NOT NULL,
  descricao text not null,
  keylog text,
  datahoralog DATETIME DEFAULT NOW() NOT NULL,
  idautorlog INT,
  PRIMARY KEY(id),
  FOREIGN KEY(idautorlog) REFERENCES onepub.usuario(id)
);

create table onepub.trending(
  id INT AUTO_INCREMENT NOT NULL,
  idautorinteracao INT NOT NULL,
  idpost INT NOT NULL,
  typeinteracao int not null,
  datahorainteracao DATETIME DEFAULT NOW() NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(idautorinteracao) REFERENCES onepub.usuario(id),
  FOREIGN KEY(idpost) REFERENCES onepub.posts(id),
  FOREIGN KEY(typeinteracao) REFERENCES onepub.type_interactions(id) ON UPDATE CASCADE;
);

create table onepub.chat(
  id INT AUTO_INCREMENT NOT NULL,
  idparticipante1 INT NOT NULL,
  idparticipante2 INT NOT NULL,
  datahoracriacao DATETIME DEFAULT NOW() NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(idparticipante1) REFERENCES onepub.usuario(id),
  FOREIGN KEY(idparticipante2) REFERENCES onepub.usuario(id)
);

create table onepub.mensagens(
  id INT AUTO_INCREMENT NOT NULL,
  idchat INT NOT NULL,
  idautormensagem INT NOT NULL,
  iddestinomensagem INT NOT NULL,
  contenttextmensagem text not null,
  datahoramensagem DATETIME DEFAULT NOW() NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(idautormensagem) REFERENCES onepub.usuario(id),
  FOREIGN KEY(iddestinomensagem) REFERENCES onepub.usuario(id),
  FOREIGN KEY(idchat) REFERENCES onepub.chat(id)
);

create table onepub.pre_inscricao(
	id int AUTO_INCREMENT PRIMARY key,
	email text not null,
	username varchar(30) not null,
	data_tentativa datetime DEFAULT CURRENT_TIMESTAMP
);