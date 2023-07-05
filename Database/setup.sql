CREATE DATABASE IF NOT EXISTS estoque;

USE estoque;

CREATE TABLE IF NOT EXISTS produto (
  id bigint NOT NULL AUTO_INCREMENT,
  referencia varchar(100) NOT NULL,
  descricao varchar(255) DEFAULT NULL,
  estoque bigint DEFAULT NULL,
  deleted_at datetime DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY produto_UN (referencia)
);

CREATE TABLE IF NOT EXISTS costureiros (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(100) DEFAULT NULL,
  deleted_at datetime DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY costureiros_UN (nome)
);


CREATE TABLE IF NOT EXISTS producao (
  id bigint NOT NULL AUTO_INCREMENT,
  id_produto bigint NOT NULL,
  quantia bigint NOT NULL,
  quantia_finalizada bigint DEFAULT NULL,
  finalizado_at datetime DEFAULT NULL,
  adicionado_at datetime NOT NULL,
  PRIMARY KEY (id),
  KEY producao_FK (id_produto),
  CONSTRAINT producao_FK FOREIGN KEY (id_produto) REFERENCES produto (id)
);


CREATE TABLE IF NOT EXISTS produzido (
  id bigint NOT NULL AUTO_INCREMENT,
  id_producao bigint NOT NULL,
  id_costureiro int NOT NULL,
  quantia bigint NOT NULL,
  dia datetime NOT NULL,
  PRIMARY KEY (id),
  KEY produzido_FK_1 (id_costureiro),
  KEY produzido_FK (id_producao),
  CONSTRAINT produzido_FK FOREIGN KEY (id_producao) REFERENCES producao (id),
  CONSTRAINT produzido_FK_1 FOREIGN KEY (id_costureiro) REFERENCES costureiros (id)
) ;



GRANT ALL PRIVILEGES ON * TO 'drzebra'@'%';