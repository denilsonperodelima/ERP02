-- MySQL dump 10.16  Distrib 10.1.37-MariaDB, for Win32 (AMD64)
--
-- Host: localhost    Database: erp02
-- ------------------------------------------------------
-- Server version	10.1.37-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administrador` (
  `cargo` varchar(255) DEFAULT NULL,
  `entrada` datetime DEFAULT NULL,
  `estadocivil` varchar(255) DEFAULT NULL,
  `nascimentocidade` varchar(255) DEFAULT NULL,
  `nascimentodata` datetime DEFAULT NULL,
  `nascimentouf` varchar(255) DEFAULT NULL,
  `rg` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK2meubqerb3q0do8y5u6my5fyh` FOREIGN KEY (`id`) REFERENCES `pessoa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banco`
--

DROP TABLE IF EXISTS `banco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banco` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(255) DEFAULT NULL,
  `conta` varchar(255) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `obs` varchar(255) DEFAULT NULL,
  `pessoa_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6q9ibpym97ok5n3gk5w0n4nyj` (`pessoa_id`),
  CONSTRAINT `FK6q9ibpym97ok5n3gk5w0n4nyj` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banco`
--

LOCK TABLES `banco` WRITE;
/*!40000 ALTER TABLE `banco` DISABLE KEYS */;
INSERT INTO `banco` VALUES (1,'237','CONTA 01043','ITAU','OBS',1),(2,'123','CONTA XXXXXX','BRADESCO','OBS',1),(3,'237','CONTA 01043','ITAU - vend1','OBS',3),(4,'123','CONTA XXXXXX','BRADESCO vend1','OBS',3),(5,'237','CONTA 01043','ITAU - bcvendmaria21','OBS',4),(6,'123','CONTA XXXXXX','BRADESCO bcvendmaria22','OBS',4),(7,'237','CONTA 01043','ITAU - vend1','OBS',2),(8,'123','CONTA XXXXXX','BRADESCO vend1','OBS',2),(9,'237','CONTA 01043','ITAU - bcvendmaria21','OBS',7),(10,'123','CONTA XXXXXX','BRADESCO bcvendmaria22','OBS',7);
/*!40000 ALTER TABLE `banco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cidade`
--

DROP TABLE IF EXISTS `cidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cidade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `estado_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkworrwk40xj58kevvh3evi500` (`estado_id`),
  CONSTRAINT `FKkworrwk40xj58kevvh3evi500` FOREIGN KEY (`estado_id`) REFERENCES `estado` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cidade`
--

LOCK TABLES `cidade` WRITE;
/*!40000 ALTER TABLE `cidade` DISABLE KEYS */;
/*!40000 ALTER TABLE `cidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `bairronf` varchar(255) DEFAULT NULL,
  `cepnf` varchar(255) DEFAULT NULL,
  `cidadenf` varchar(255) DEFAULT NULL,
  `endereconf` varchar(255) DEFAULT NULL,
  `inscestadual` varchar(255) DEFAULT NULL,
  `inscmunicipal` varchar(255) DEFAULT NULL,
  `nomefantasia` varchar(255) DEFAULT NULL,
  `ufnf` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FKa710hls1tg15o3d4ok5biathy` FOREIGN KEY (`id`) REFERENCES `pessoa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES ('Bairro nr 83.869.366/0001-29','01122-333','Rio de Janeiro','Endereço nf 83.869.366/0001-29','INCESTADUAL_88','INCMUNICIPAL_77',' NOME FANTASIA','RJ',5),('Bairro nr 88.578.167/0001-85','01122-333','Curitiba','Endereço nf 88.578.167/0001-85','INCESTADUAL_88','INCMUNICIPAL_77',' NOME FANTASIA','PR',6);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contato`
--

DROP TABLE IF EXISTS `contato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contato` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `pessoa_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqcaicb387g3yd3xfy44qravfh` (`pessoa_id`),
  CONSTRAINT `FKqcaicb387g3yd3xfy44qravfh` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contato`
--

LOCK TABLES `contato` WRITE;
/*!40000 ALTER TABLE `contato` DISABLE KEYS */;
INSERT INTO `contato` VALUES (1,'Jose da Silva','COMERCIAL',1),(2,'Roberto Carlos','FINANCEIRO',1),(3,'Felix','ADMINISTRATIVO',1),(4,'Maria Valentina','MAE',7),(5,'Roberto Carlos','PAI',7),(6,'Felix','PESSOAL',7),(7,'Irmao do Felix','PESSOAL',7),(8,'Jose da Silva','COMERCIAL',5),(9,'Roberto Carlos','FINANCEIRO',5),(10,'Felix','ADMINISTRATIVO',5);
/*!40000 ALTER TABLE `contato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contatotipo`
--

DROP TABLE IF EXISTS `contatotipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contatotipo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `contato_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKccc4yt17blb00f0t6h5kiy9dv` (`contato_id`),
  CONSTRAINT `FKccc4yt17blb00f0t6h5kiy9dv` FOREIGN KEY (`contato_id`) REFERENCES `contato` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contatotipo`
--

LOCK TABLES `contatotipo` WRITE;
/*!40000 ALTER TABLE `contatotipo` DISABLE KEYS */;
INSERT INTO `contatotipo` VALUES (1,'josedasilva@gmail.com','E-MAIL',4),(2,'(11)95651-9917','CELULAR',4),(3,'2946-6170','TELEFONE',4),(4,'www.josedasilva.com.br','SITE',4);
/*!40000 ALTER TABLE `contatotipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empresa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cep` varchar(255) DEFAULT NULL,
  `cidade` varchar(255) DEFAULT NULL,
  `contato1` varchar(255) DEFAULT NULL,
  `contato2` varchar(255) DEFAULT NULL,
  `contato3` varchar(255) DEFAULT NULL,
  `documento` varchar(255) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `segmento` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `uf` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `INDEMP1` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa`
--

LOCK TABLES `empresa` WRITE;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` VALUES (1,'02221-000','São Paulo','Contato1','Contato2','Contato3','57.114.211/0001-72','Rua dos Coqueiros, 300','Velocino Tech Ltda',NULL,'ATIVA','SP'),(2,'03344-567','São Paulo','Contato1','Contato2','Contato3','33.398.058/0001-94','Rua da Telefonica, 45','Empresa da Mariza',NULL,'ATIVA','SP'),(3,'04296-000','São Paulo','Contato1','Contato2','Contato3','00.358.214/0001-34','Av. do Cursino, 45','Empresa Tavão',NULL,'ATIVA','SP'),(4,'04296-000','São Paulo','Contato1','Contato2','Contato3','63.233.818/0001-74','Av. do Cursino, 45','Empresa Nilton Peró',NULL,'ATIVA','SP');
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS `endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `endereco` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bairro` varchar(255) DEFAULT NULL,
  `cep` varchar(255) DEFAULT NULL,
  `cidade` varchar(255) DEFAULT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `logradouro` varchar(255) DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `uf` varchar(255) DEFAULT NULL,
  `pessoa_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKn1l2g0b74rqd9ywu29sva9sy9` (`pessoa_id`),
  CONSTRAINT `FKn1l2g0b74rqd9ywu29sva9sy9` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
INSERT INTO `endereco` VALUES (1,'Jardim','38220834','SÃO PAULO','Apto 303','Rua Flores','300','NOTA FISCAL','UF',1),(2,'Centro','38777012','SÃO PAULO','Sala 800','Avenida Matos','105','NOTA FISCAL','UF',1),(3,'Centro','281777012','SÃO PAULO',NULL,'Avenida Floriano','2106','NOTA FISCAL','UF',1),(4,'Jardim','38220834','SÃO PAULO','Apto 303','Rua Flores','300','RESIDENCIAL','UF',7),(5,'Centro','38777012','SÃO PAULO','Sala 800','Avenida Matos','105','RESIDENCIAL','UF',7),(6,'Centro','281777012','SÃO PAULO',NULL,'Avenida Floriano','2106','RESIDENCIAL','UF',7),(7,'Jardim','38220834','SÃO PAULO','Apto 303','Rua Flores','300','NOTA FISCAL','UF',5),(8,'Centro','38777012','SÃO PAULO','Sala 800','Avenida Matos','105','NOTA FISCAL','UF',5),(9,'Centro','281777012','SÃO PAULO',NULL,'Avenida Floriano','2106','NOTA FISCAL','UF',5);
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fornecedor`
--

DROP TABLE IF EXISTS `fornecedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fornecedor` (
  `inscestadual` varchar(255) DEFAULT NULL,
  `inscmunicipal` varchar(255) DEFAULT NULL,
  `nomefantasia` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK4fumwc92qrfurlo1g6jhos1sq` FOREIGN KEY (`id`) REFERENCES `pessoa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fornecedor`
--

LOCK TABLES `fornecedor` WRITE;
/*!40000 ALTER TABLE `fornecedor` DISABLE KEYS */;
INSERT INTO `fornecedor` VALUES ('estadual','municipal','fantasia',1);
/*!40000 ALTER TABLE `fornecedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionario`
--

DROP TABLE IF EXISTS `funcionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `funcionario` (
  `usuario` varchar(255) DEFAULT NULL,
  `admissao` datetime DEFAULT NULL,
  `ctps` varchar(255) DEFAULT NULL,
  `demissao` datetime DEFAULT NULL,
  `estadocivil` varchar(255) DEFAULT NULL,
  `nascimentocidade` varchar(255) DEFAULT NULL,
  `nascimentodata` datetime DEFAULT NULL,
  `nascimentouf` varchar(255) DEFAULT NULL,
  `nomemae` varchar(255) DEFAULT NULL,
  `nomepai` varchar(255) DEFAULT NULL,
  `pis` varchar(255) DEFAULT NULL,
  `registro` varchar(255) DEFAULT NULL,
  `rg` varchar(255) DEFAULT NULL,
  `salario` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FKpjvvctvfjm69dvye3aea5k56f` FOREIGN KEY (`id`) REFERENCES `pessoa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionario`
--

LOCK TABLES `funcionario` WRITE;
/*!40000 ALTER TABLE `funcionario` DISABLE KEYS */;
INSERT INTO `funcionario` VALUES (NULL,'1997-02-24 10:32:00','CTPS 376.570.990-54','1997-02-25 10:32:00','CASADO','Ipauçu','1997-02-24 10:32:00','SP','NOME DA MAES PIS 376.570.990-54','NOME DO PAI PIS 376.570.990-54','PIS 376.570.990-54','REGPIS 376.570.990-54','RG 376.570.990-54',NULL,7),(NULL,'1997-02-24 10:32:00','CTPS 376.570.990-54','1997-02-25 10:32:00','CASADO','Ipauçu','1997-02-24 10:32:00','SP','NOME DA MAES PIS 376.570.990-54','NOME DO PAI PIS 376.570.990-54','PIS 376.570.990-54','REGPIS 376.570.990-54','RG 376.570.990-54',NULL,8);
/*!40000 ALTER TABLE `funcionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupo`
--

DROP TABLE IF EXISTS `grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grupo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) DEFAULT NULL,
  `idempresa` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `INDGRUP1` (`idempresa`,`descricao`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupo`
--

LOCK TABLES `grupo` WRITE;
/*!40000 ALTER TABLE `grupo` DISABLE KEYS */;
INSERT INTO `grupo` VALUES (9,'ANDROID',1),(8,'CELULAR',1),(14,'CLIENTE',1),(2,'COMPUTADOR',1),(5,'DELL',1),(11,'DER',1),(4,'DESK TOP',1),(13,'DNIT',1),(12,'DSV',1),(15,'EMPRESA',1),(16,'FORNECEDOR',1),(17,'FUNCIONARIO',1),(7,'IMPRESSORA',1),(3,'LAP TOP',1),(1,'PRODUTO',1),(10,'PRODUTO2',1),(18,'VENDEDOR',1),(6,'VERMELHO',1),(19,'CLIENTE',2),(20,'EMPRESA',2),(21,'FORNECEDOR',2),(22,'FUNCIONARIO',2),(23,'VENDEDOR',2);
/*!40000 ALTER TABLE `grupo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_pedido`
--

DROP TABLE IF EXISTS `item_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_pedido` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `desconto` double DEFAULT NULL,
  `idproduto` int(11) DEFAULT NULL,
  `nomeproduto` varchar(255) DEFAULT NULL,
  `preco` double DEFAULT NULL,
  `quantidade` double DEFAULT NULL,
  `unidade` varchar(255) DEFAULT NULL,
  `pedido_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK60ym08cfoysa17wrn1swyiuda` (`pedido_id`),
  CONSTRAINT `FK60ym08cfoysa17wrn1swyiuda` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_pedido`
--

LOCK TABLES `item_pedido` WRITE;
/*!40000 ALTER TABLE `item_pedido` DISABLE KEYS */;
INSERT INTO `item_pedido` VALUES (1,10,43,'AET',28.77,33.5,'unidade',1),(2,90,41,'Computador',12.11,13.3,'UNIDADE',1);
/*!40000 ALTER TABLE `item_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagamento`
--

DROP TABLE IF EXISTS `pagamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pagamento` (
  `pedido_id` int(11) NOT NULL,
  `estado` int(11) DEFAULT NULL,
  PRIMARY KEY (`pedido_id`),
  CONSTRAINT `FKthad9tkw4188hb3qo1lm5ueb0` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamento`
--

LOCK TABLES `pagamento` WRITE;
/*!40000 ALTER TABLE `pagamento` DISABLE KEYS */;
INSERT INTO `pagamento` VALUES (1,2),(2,1);
/*!40000 ALTER TABLE `pagamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagamento_com_boleto`
--

DROP TABLE IF EXISTS `pagamento_com_boleto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pagamento_com_boleto` (
  `data_pagamento` datetime DEFAULT NULL,
  `data_vencimento` datetime DEFAULT NULL,
  `pedido_id` int(11) NOT NULL,
  PRIMARY KEY (`pedido_id`),
  CONSTRAINT `FKcr74vrxf8nfph0knq2bho8doo` FOREIGN KEY (`pedido_id`) REFERENCES `pagamento` (`pedido_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamento_com_boleto`
--

LOCK TABLES `pagamento_com_boleto` WRITE;
/*!40000 ALTER TABLE `pagamento_com_boleto` DISABLE KEYS */;
INSERT INTO `pagamento_com_boleto` VALUES (NULL,'2017-10-20 00:00:00',2);
/*!40000 ALTER TABLE `pagamento_com_boleto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagamento_com_cartao`
--

DROP TABLE IF EXISTS `pagamento_com_cartao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pagamento_com_cartao` (
  `numero_de_parcelas` int(11) DEFAULT NULL,
  `pedido_id` int(11) NOT NULL,
  PRIMARY KEY (`pedido_id`),
  CONSTRAINT `FKta3cdnuuxclwfh52t4qi432ow` FOREIGN KEY (`pedido_id`) REFERENCES `pagamento` (`pedido_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamento_com_cartao`
--

LOCK TABLES `pagamento_com_cartao` WRITE;
/*!40000 ALTER TABLE `pagamento_com_cartao` DISABLE KEYS */;
INSERT INTO `pagamento_com_cartao` VALUES (6,1);
/*!40000 ALTER TABLE `pagamento_com_cartao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedido` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clientenome` varchar(255) DEFAULT NULL,
  `dtaltera` datetime DEFAULT NULL,
  `dtfinaliza` datetime DEFAULT NULL,
  `dtinclui` datetime DEFAULT NULL,
  `idempresa` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `usualt` varchar(255) DEFAULT NULL,
  `usuinc` varchar(255) DEFAULT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `endereco_de_entrega_id` int(11) DEFAULT NULL,
  `vendedor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `INDPED1` (`idempresa`,`status`,`clientenome`),
  KEY `INDPED2` (`idempresa`),
  KEY `INDPED3` (`status`),
  KEY `INDPED4` (`clientenome`),
  KEY `FK30s8j2ktpay6of18lbyqn3632` (`cliente_id`),
  KEY `FK1fihyy2fnocpuwc74674qmfkv` (`endereco_de_entrega_id`),
  KEY `FKi6y72r3lhf410eb1mqbr41bwv` (`vendedor_id`),
  CONSTRAINT `FK1fihyy2fnocpuwc74674qmfkv` FOREIGN KEY (`endereco_de_entrega_id`) REFERENCES `endereco` (`id`),
  CONSTRAINT `FK30s8j2ktpay6of18lbyqn3632` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`),
  CONSTRAINT `FKi6y72r3lhf410eb1mqbr41bwv` FOREIGN KEY (`vendedor_id`) REFERENCES `vendedor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,'CLI 83869','2017-09-30 10:32:00',NULL,'2019-02-24 10:32:00',1,'ANDAMENTO','usupedalt','usupedidoinc',5,7,2),(2,'CLI 83869','2017-09-30 10:32:00','2019-10-30 10:32:00','2017-10-10 19:35:00',1,'FINALIZADO','usupedalt','usupedidoinc',5,8,2);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfis`
--

DROP TABLE IF EXISTS `perfis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `perfis` (
  `usuario_id` int(11) NOT NULL,
  `perfis` int(11) DEFAULT NULL,
  KEY `FKiso72ajmkk36lw7dqjva1h8hl` (`usuario_id`),
  CONSTRAINT `FKiso72ajmkk36lw7dqjva1h8hl` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfis`
--

LOCK TABLES `perfis` WRITE;
/*!40000 ALTER TABLE `perfis` DISABLE KEYS */;
INSERT INTO `perfis` VALUES (1,6),(2,6),(3,1),(3,3),(3,4),(3,6),(4,1),(4,6);
/*!40000 ALTER TABLE `perfis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pessoa`
--

DROP TABLE IF EXISTS `pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pessoa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `documento` varchar(255) DEFAULT NULL,
  `dtaltera` datetime DEFAULT NULL,
  `dtexclui` datetime DEFAULT NULL,
  `dtinclui` datetime DEFAULT NULL,
  `empresaid` int(11) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `tipopessoa` varchar(255) DEFAULT NULL,
  `tiporelacionamento` varchar(255) DEFAULT NULL,
  `usualt` varchar(255) DEFAULT NULL,
  `usuexc` varchar(255) DEFAULT NULL,
  `usuinc` varchar(255) DEFAULT NULL,
  `empresa_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `INDPESS1` (`empresaid`,`tiporelacionamento`,`nome`),
  KEY `INDPESS2` (`nome`),
  KEY `FK3xtnlhj6pake1q0047rm3g5mm` (`empresa_id`),
  CONSTRAINT `FK3xtnlhj6pake1q0047rm3g5mm` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pessoa`
--

LOCK TABLES `pessoa` WRITE;
/*!40000 ALTER TABLE `pessoa` DISABLE KEYS */;
INSERT INTO `pessoa` VALUES (1,'83.869.366/0001-29','2019-10-03 10:32:00','2019-10-03 10:32:00','2019-10-03 10:32:00',1,'NOME FORNECEDOR 83.869.366/0001-29','JURIDICA','FORNECEDOR','usualt','usuexc','usuinc',2),(2,'994.119.400-99','2019-10-03 10:32:00','2019-10-03 10:32:00','2019-10-03 10:32:00',1,'VEND 994','FISICA','VENDEDOR','usualt','usuexc','usuinc',1),(3,'862.263.080-36','2019-10-03 10:32:00','2019-10-03 10:32:00','2019-10-03 10:32:00',1,'VEND 862','FISICA','VENDEDOR','usualt','usuexc','usuinc',1),(4,'639.648.590-79','2019-10-03 10:32:00','2019-10-03 10:32:00','2019-10-03 10:32:00',1,'VENDEDOR 862.263.080-36','FISICA','VENDEDOR','usualt','usuexc','usuinc',3),(5,'83.869.366/0001-29','2019-10-03 10:32:00',NULL,'2019-10-03 10:32:00',1,'CLI 83869','JURIDICA','CLIENTE','USUALT','USUEXCL','USUINCX',1),(6,'88.578.167/0001-85','2019-10-03 10:32:00',NULL,'2019-10-03 10:32:00',1,'CLI 88578','JURIDICA','CLIENTE','USUALT','USUEXCL','USUINCX',1),(7,'376.570.990-54','2019-10-03 10:32:00',NULL,'2019-10-03 10:32:00',2,'Sonia Baixinha','FISICA','FUNCIONARIO','USUALT','USUEXCL','USUINCX',2),(8,'376.570.990-54','2019-10-03 10:32:00',NULL,'2019-10-03 10:32:00',2,'Mariza Peró','FISICA','FUNCIONARIO','USUALT','USUEXCL','USUINCX',2);
/*!40000 ALTER TABLE `pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(255) DEFAULT NULL,
  `codigoean` varchar(255) DEFAULT NULL,
  `dtaltera` datetime DEFAULT NULL,
  `dtexclui` datetime DEFAULT NULL,
  `dtinclui` datetime DEFAULT NULL,
  `empresaid` int(11) DEFAULT NULL,
  `estoquemaximo` int(11) DEFAULT NULL,
  `estoqueminimo` int(11) DEFAULT NULL,
  `localizacaoestoque` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `ncm` varchar(255) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `obs` varchar(255) DEFAULT NULL,
  `origem` varchar(255) DEFAULT NULL,
  `pesobruto` double DEFAULT NULL,
  `pesoliquido` double DEFAULT NULL,
  `situacao` varchar(255) DEFAULT NULL,
  `subcategoria1` varchar(255) DEFAULT NULL,
  `subcategoria2` varchar(255) DEFAULT NULL,
  `subcategoria3` varchar(255) DEFAULT NULL,
  `subcategoria4` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `unidade` varchar(255) DEFAULT NULL,
  `usualt` varchar(255) DEFAULT NULL,
  `usuexc` varchar(255) DEFAULT NULL,
  `usuinc` varchar(255) DEFAULT NULL,
  `valorcusto` double DEFAULT NULL,
  `valorvenda` double DEFAULT NULL,
  `volume` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PRODX1` (`empresaid`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` VALUES (1,'ELETRONICO','codigo ean Máquinas rendeiras marrom 13',NULL,NULL,'2019-11-25 16:27:23',1,45,25,'localiza Máquinas rendeiras marrom 13','marca Máquinas rendeiras marrom 13','ncm Máquinas rendeiras marrom 13','Máquinas rendeiras marrom 13','observacao Máquinas rendeiras marrom 13','origem Máquinas rendeiras marrom 13',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','duzia','','',NULL,11.12,0.9887640449438202,12.5),(2,'ELETRONICO','codigo ean Paliteiros bege 11',NULL,NULL,'2019-11-25 16:27:23',1,45,25,'localiza Paliteiros bege 11','marca Paliteiros bege 11','ncm Paliteiros bege 11','Paliteiros bege 11','observacao Paliteiros bege 11','origem Paliteiros bege 11',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','pacote','','',NULL,11.12,0.42696629213483145,12.5),(3,'ELETRONICO','codigo ean Livros razão cinza 40',NULL,NULL,'2019-11-25 16:27:23',1,45,25,'localiza Livros razão cinza 40','marca Livros razão cinza 40','ncm Livros razão cinza 40','Livros razão cinza 40','observacao Livros razão cinza 40','origem Livros razão cinza 40',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','fardo','','',NULL,11.12,3.5730337078651684,12.5),(4,'ELETRONICO','codigo ean Tortas rosa 44',NULL,NULL,'2019-11-25 16:27:23',1,45,25,'localiza Tortas rosa 44','marca Tortas rosa 44','ncm Tortas rosa 44','Tortas rosa 44','observacao Tortas rosa 44','origem Tortas rosa 44',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','metro','','',NULL,11.12,4.831460674157303,12.5),(5,'ELETRONICO','codigo ean Edredons marrom 11',NULL,NULL,'2019-11-25 16:27:24',1,45,25,'localiza Edredons marrom 11','marca Edredons marrom 11','ncm Edredons marrom 11','Edredons marrom 11','observacao Edredons marrom 11','origem Edredons marrom 11',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','fardo','','',NULL,11.12,5.370786516853933,12.5),(6,'ELETRONICO','codigo ean Remos verde 17',NULL,NULL,'2019-11-25 16:27:24',1,45,25,'localiza Remos verde 17','marca Remos verde 17','ncm Remos verde 17','Remos verde 17','observacao Remos verde 17','origem Remos verde 17',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','pacote','','',NULL,11.12,5.168539325842697,12.5),(7,'ELETRONICO','codigo ean Cintas umbilicais rosa 3',NULL,NULL,'2019-11-25 16:27:24',1,45,25,'localiza Cintas umbilicais rosa 3','marca Cintas umbilicais rosa 3','ncm Cintas umbilicais rosa 3','Cintas umbilicais rosa 3','observacao Cintas umbilicais rosa 3','origem Cintas umbilicais rosa 3',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','metro','','',NULL,11.12,0.6966292134831461,12.5),(8,'ELETRONICO','codigo ean Livros razão laranja 17',NULL,NULL,'2019-11-25 16:27:24',1,45,25,'localiza Livros razão laranja 17','marca Livros razão laranja 17','ncm Livros razão laranja 17','Livros razão laranja 17','observacao Livros razão laranja 17','origem Livros razão laranja 17',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','m3','','',NULL,11.12,2.741573033707865,12.5),(9,'ELETRONICO','codigo ean Máquinas rendeiras laranja 38',NULL,NULL,'2019-11-25 16:27:24',1,45,25,'localiza Máquinas rendeiras laranja 38','marca Máquinas rendeiras laranja 38','ncm Máquinas rendeiras laranja 38','Máquinas rendeiras laranja 38','observacao Máquinas rendeiras laranja 38','origem Máquinas rendeiras laranja 38',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','kilo','','',NULL,11.12,4.876404494382022,12.5),(10,'ELETRONICO','codigo ean Cintas umbilicais laranja 21',NULL,NULL,'2019-11-25 16:27:24',1,45,25,'localiza Cintas umbilicais laranja 21','marca Cintas umbilicais laranja 21','ncm Cintas umbilicais laranja 21','Cintas umbilicais laranja 21','observacao Cintas umbilicais laranja 21','origem Cintas umbilicais laranja 21',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','fardo','','',NULL,11.12,5.303370786516854,12.5),(11,'ELETRONICO','codigo ean Apliques capilares prata 35',NULL,NULL,'2019-11-25 16:27:24',2,45,25,'localiza Apliques capilares prata 35','marca Apliques capilares prata 35','ncm Apliques capilares prata 35','Apliques capilares prata 35','observacao Apliques capilares prata 35','origem Apliques capilares prata 35',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','pacote','','',NULL,11.12,4.202247191011236,12.5),(12,'ELETRONICO','codigo ean Ovos rosa 36',NULL,NULL,'2019-11-25 16:27:24',2,45,25,'localiza Ovos rosa 36','marca Ovos rosa 36','ncm Ovos rosa 36','Ovos rosa 36','observacao Ovos rosa 36','origem Ovos rosa 36',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','fardo','','',NULL,11.12,0.47191011235955055,12.5),(13,'ELETRONICO','codigo ean Vasos verde 39',NULL,NULL,'2019-11-25 16:27:25',2,45,25,'localiza Vasos verde 39','marca Vasos verde 39','ncm Vasos verde 39','Vasos verde 39','observacao Vasos verde 39','origem Vasos verde 39',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','metro','','',NULL,11.12,4.808988764044944,12.5),(14,'ELETRONICO','codigo ean Colheres marrom 5',NULL,NULL,'2019-11-25 16:27:25',2,45,25,'localiza Colheres marrom 5','marca Colheres marrom 5','ncm Colheres marrom 5','Colheres marrom 5','observacao Colheres marrom 5','origem Colheres marrom 5',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','pacote','','',NULL,11.12,5.280898876404494,12.5),(15,'ELETRONICO','codigo ean Álcool etílico lilas 39',NULL,NULL,'2019-11-25 16:27:25',2,45,25,'localiza Álcool etílico lilas 39','marca Álcool etílico lilas 39','ncm Álcool etílico lilas 39','Álcool etílico lilas 39','observacao Álcool etílico lilas 39','origem Álcool etílico lilas 39',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','fardo','','',NULL,11.12,5.123595505617978,12.5),(16,'ELETRONICO','codigo ean Tesouras laranja 48',NULL,NULL,'2019-11-25 16:27:25',2,45,25,'localiza Tesouras laranja 48','marca Tesouras laranja 48','ncm Tesouras laranja 48','Tesouras laranja 48','observacao Tesouras laranja 48','origem Tesouras laranja 48',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','mil','','',NULL,11.12,3.101123595505618,12.5),(17,'ELETRONICO','codigo ean Paliteiros verde 9',NULL,NULL,'2019-11-25 16:27:25',2,45,25,'localiza Paliteiros verde 9','marca Paliteiros verde 9','ncm Paliteiros verde 9','Paliteiros verde 9','observacao Paliteiros verde 9','origem Paliteiros verde 9',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','mil','','',NULL,11.12,3.932584269662921,12.5),(18,'ELETRONICO','codigo ean Livros razão azul 50',NULL,NULL,'2019-11-25 16:27:25',2,45,25,'localiza Livros razão azul 50','marca Livros razão azul 50','ncm Livros razão azul 50','Livros razão azul 50','observacao Livros razão azul 50','origem Livros razão azul 50',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','duzia','','',NULL,11.12,3.033707865168539,12.5),(19,'ELETRONICO','codigo ean Edredons azul 25',NULL,NULL,'2019-11-25 16:27:25',2,45,25,'localiza Edredons azul 25','marca Edredons azul 25','ncm Edredons azul 25','Edredons azul 25','observacao Edredons azul 25','origem Edredons azul 25',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','unidade','','',NULL,11.12,2.157303370786517,12.5),(20,'ELETRONICO','codigo ean Máquinas rendeiras laranja 35',NULL,NULL,'2019-11-25 16:27:26',2,45,25,'localiza Máquinas rendeiras laranja 35','marca Máquinas rendeiras laranja 35','ncm Máquinas rendeiras laranja 35','Máquinas rendeiras laranja 35','observacao Máquinas rendeiras laranja 35','origem Máquinas rendeiras laranja 35',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','m3','','',NULL,11.12,3.3707865168539324,12.5),(21,'ELETRONICO','codigo ean Livros razão verde 14',NULL,NULL,'2019-11-25 16:27:26',3,45,25,'localiza Livros razão verde 14','marca Livros razão verde 14','ncm Livros razão verde 14','Livros razão verde 14','observacao Livros razão verde 14','origem Livros razão verde 14',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','mil','','',NULL,11.12,4.764044943820225,12.5),(22,'ELETRONICO','codigo ean Ovos bege 25',NULL,NULL,'2019-11-25 16:27:26',3,45,25,'localiza Ovos bege 25','marca Ovos bege 25','ncm Ovos bege 25','Ovos bege 25','observacao Ovos bege 25','origem Ovos bege 25',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','pacote','','',NULL,11.12,4.606741573033708,12.5),(23,'ELETRONICO','codigo ean Álcool etílico azul 17',NULL,NULL,'2019-11-25 16:27:26',3,45,25,'localiza Álcool etílico azul 17','marca Álcool etílico azul 17','ncm Álcool etílico azul 17','Álcool etílico azul 17','observacao Álcool etílico azul 17','origem Álcool etílico azul 17',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','duzia','','',NULL,11.12,3.9775280898876404,12.5),(24,'ELETRONICO','codigo ean Cintas umbilicais bege 14',NULL,NULL,'2019-11-25 16:27:26',3,45,25,'localiza Cintas umbilicais bege 14','marca Cintas umbilicais bege 14','ncm Cintas umbilicais bege 14','Cintas umbilicais bege 14','observacao Cintas umbilicais bege 14','origem Cintas umbilicais bege 14',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','m3','','',NULL,11.12,4.426966292134831,12.5),(25,'ELETRONICO','codigo ean Colheres prata 18',NULL,NULL,'2019-11-25 16:27:28',3,45,25,'localiza Colheres prata 18','marca Colheres prata 18','ncm Colheres prata 18','Colheres prata 18','observacao Colheres prata 18','origem Colheres prata 18',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','m3','','',NULL,11.12,2.404494382022472,12.5),(26,'ELETRONICO','codigo ean Dominós azul 25',NULL,NULL,'2019-11-25 16:27:28',3,45,25,'localiza Dominós azul 25','marca Dominós azul 25','ncm Dominós azul 25','Dominós azul 25','observacao Dominós azul 25','origem Dominós azul 25',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','kilo','','',NULL,11.12,1.2134831460674158,12.5),(27,'ELETRONICO','codigo ean Máquinas rendeiras lilas 12',NULL,NULL,'2019-11-25 16:27:28',3,45,25,'localiza Máquinas rendeiras lilas 12','marca Máquinas rendeiras lilas 12','ncm Máquinas rendeiras lilas 12','Máquinas rendeiras lilas 12','observacao Máquinas rendeiras lilas 12','origem Máquinas rendeiras lilas 12',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','volume','','',NULL,11.12,0.8764044943820225,12.5),(28,'ELETRONICO','codigo ean Remos rosa 26',NULL,NULL,'2019-11-25 16:27:28',3,45,25,'localiza Remos rosa 26','marca Remos rosa 26','ncm Remos rosa 26','Remos rosa 26','observacao Remos rosa 26','origem Remos rosa 26',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','pacote','','',NULL,11.12,5.325842696629214,12.5),(29,'ELETRONICO','codigo ean Sacos de dormir marrom 29',NULL,NULL,'2019-11-25 16:27:28',3,45,25,'localiza Sacos de dormir marrom 29','marca Sacos de dormir marrom 29','ncm Sacos de dormir marrom 29','Sacos de dormir marrom 29','observacao Sacos de dormir marrom 29','origem Sacos de dormir marrom 29',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','m3','','',NULL,11.12,5.191011235955056,12.5),(30,'ELETRONICO','codigo ean Vassouras marrom 46',NULL,NULL,'2019-11-25 16:27:30',3,45,25,'localiza Vassouras marrom 46','marca Vassouras marrom 46','ncm Vassouras marrom 46','Vassouras marrom 46','observacao Vassouras marrom 46','origem Vassouras marrom 46',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','fardo','','',NULL,11.12,0.9662921348314607,12.5),(31,'ELETRONICO','codigo ean Colheres cinza 4',NULL,NULL,'2019-11-25 16:27:30',4,45,25,'localiza Colheres cinza 4','marca Colheres cinza 4','ncm Colheres cinza 4','Colheres cinza 4','observacao Colheres cinza 4','origem Colheres cinza 4',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','kilo','','',NULL,11.12,5.258426966292135,12.5),(32,'ELETRONICO','codigo ean Tortas cinza 40',NULL,NULL,'2019-11-25 16:27:30',4,45,25,'localiza Tortas cinza 40','marca Tortas cinza 40','ncm Tortas cinza 40','Tortas cinza 40','observacao Tortas cinza 40','origem Tortas cinza 40',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','m3','','',NULL,11.12,0.6741573033707865,12.5),(33,'ELETRONICO','codigo ean Tesouras azul 1',NULL,NULL,'2019-11-25 16:27:30',4,45,25,'localiza Tesouras azul 1','marca Tesouras azul 1','ncm Tesouras azul 1','Tesouras azul 1','observacao Tesouras azul 1','origem Tesouras azul 1',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','pacote','','',NULL,11.12,0,12.5),(34,'ELETRONICO','codigo ean Álcool etílico verde 47',NULL,NULL,'2019-11-25 16:27:32',4,45,25,'localiza Álcool etílico verde 47','marca Álcool etílico verde 47','ncm Álcool etílico verde 47','Álcool etílico verde 47','observacao Álcool etílico verde 47','origem Álcool etílico verde 47',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','kilo','','',NULL,11.12,4.247191011235955,12.5),(35,'ELETRONICO','codigo ean Sabonetes azul 2',NULL,NULL,'2019-11-25 16:27:32',4,45,25,'localiza Sabonetes azul 2','marca Sabonetes azul 2','ncm Sabonetes azul 2','Sabonetes azul 2','observacao Sabonetes azul 2','origem Sabonetes azul 2',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','unidade','','',NULL,11.12,5.168539325842697,12.5),(36,'ELETRONICO','codigo ean Barbante lilas 8',NULL,NULL,'2019-11-25 16:27:32',4,45,25,'localiza Barbante lilas 8','marca Barbante lilas 8','ncm Barbante lilas 8','Barbante lilas 8','observacao Barbante lilas 8','origem Barbante lilas 8',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','unidade','','',NULL,11.12,2.4719101123595504,12.5),(37,'ELETRONICO','codigo ean Barbante cinza 14',NULL,NULL,'2019-11-25 16:27:32',4,45,25,'localiza Barbante cinza 14','marca Barbante cinza 14','ncm Barbante cinza 14','Barbante cinza 14','observacao Barbante cinza 14','origem Barbante cinza 14',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','mil','','',NULL,11.12,4.651685393258427,12.5),(38,'ELETRONICO','codigo ean Ovos azul 12',NULL,NULL,'2019-11-25 16:27:34',4,45,25,'localiza Ovos azul 12','marca Ovos azul 12','ncm Ovos azul 12','Ovos azul 12','observacao Ovos azul 12','origem Ovos azul 12',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','pacote','','',NULL,11.12,5.46067415730337,12.5),(39,'ELETRONICO','codigo ean Tesouras bege 4',NULL,NULL,'2019-11-25 16:27:34',4,45,25,'localiza Tesouras bege 4','marca Tesouras bege 4','ncm Tesouras bege 4','Tesouras bege 4','observacao Tesouras bege 4','origem Tesouras bege 4',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','duzia','','',NULL,11.12,0.8539325842696629,12.5),(40,'ELETRONICO','codigo ean Vassouras verde 39',NULL,NULL,'2019-11-25 16:27:34',4,45,25,'localiza Vassouras verde 39','marca Vassouras verde 39','ncm Vassouras verde 39','Vassouras verde 39','observacao Vassouras verde 39','origem Vassouras verde 39',10,9.01,'ATIVO',NULL,NULL,NULL,NULL,'PRODUTO','unidade','','',NULL,11.12,0,12.5),(41,'COMPUTADOR','codigo ean computador','2019-10-03 10:32:00',NULL,'2019-10-03 10:32:00',1,45,25,'localização estoque computador','Marca boademais','ncm computador','Computador','OBSERVAÇÃO MINHA TERRA TEM PALMEIRAS ONDE CANTA O SABIA','origem computador',10,9.01,'ATIVO','DESK TOP','DELL','VERMELHO','','PRODUTO','UNIDADE','usuialtroduto','usuialtexroduto','usuincproduto',11.12,55.66,12.5),(42,'AET','codigo ean computador','2019-03-20 10:32:00',NULL,'2019-10-03 10:32:00',1,45,25,'localização estoque computador','Licença viagem','ncm computador','AET','OBSERVAÇÃO XX','origem computador',10,9.01,'ATIVO','DER','VIAGEM',NULL,NULL,'SERVIÇO','unidade','usuialtroduto','usuialtexroduto','usuincproduto',11.12,55.66,12.5),(43,'AET','codigo ean computador','2019-03-20 10:32:00',NULL,'2019-10-03 10:32:00',1,45,25,'localização estoque computador','Licença Viagem Anual','ncm computador','AET','OBSERVAÇÃO XX','origem computador',10,9.01,'ATIVO','DSV','ANUAL',NULL,NULL,'SERVIÇO','unidade','usuialtroduto','usuialtexroduto','usuincproduto',11.12,55.66,12.5);
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto_fornecedor`
--

DROP TABLE IF EXISTS `produto_fornecedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produto_fornecedor` (
  `produto_id` int(11) NOT NULL,
  `fornecedor_id` int(11) NOT NULL,
  KEY `FKn1k3cs5wvvvwbg2xkpbwrqhnn` (`fornecedor_id`),
  KEY `FKjndqo3rv2gc9bsttkvcet0y98` (`produto_id`),
  CONSTRAINT `FKjndqo3rv2gc9bsttkvcet0y98` FOREIGN KEY (`produto_id`) REFERENCES `produto` (`id`),
  CONSTRAINT `FKn1k3cs5wvvvwbg2xkpbwrqhnn` FOREIGN KEY (`fornecedor_id`) REFERENCES `fornecedor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto_fornecedor`
--

LOCK TABLES `produto_fornecedor` WRITE;
/*!40000 ALTER TABLE `produto_fornecedor` DISABLE KEYS */;
INSERT INTO `produto_fornecedor` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(19,1),(20,1),(21,1),(22,1),(23,1),(24,1),(25,1),(26,1),(27,1),(28,1),(29,1),(30,1),(31,1),(32,1),(33,1),(34,1),(35,1),(36,1),(37,1),(38,1),(39,1),(40,1);
/*!40000 ALTER TABLE `produto_fornecedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto_vendedor`
--

DROP TABLE IF EXISTS `produto_vendedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produto_vendedor` (
  `produto_id` int(11) NOT NULL,
  `vendedor_id` int(11) NOT NULL,
  KEY `FKe9r7wrfpxwjibxe24bkpf8m8t` (`vendedor_id`),
  KEY `FKmekp2xq7oo2pr65u8nj83jk2j` (`produto_id`),
  CONSTRAINT `FKe9r7wrfpxwjibxe24bkpf8m8t` FOREIGN KEY (`vendedor_id`) REFERENCES `vendedor` (`id`),
  CONSTRAINT `FKmekp2xq7oo2pr65u8nj83jk2j` FOREIGN KEY (`produto_id`) REFERENCES `produto` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto_vendedor`
--

LOCK TABLES `produto_vendedor` WRITE;
/*!40000 ALTER TABLE `produto_vendedor` DISABLE KEYS */;
/*!40000 ALTER TABLE `produto_vendedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subgrupo`
--

DROP TABLE IF EXISTS `subgrupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subgrupo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) DEFAULT NULL,
  `grupo_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKce7uys9ey52cr1ivvmq4kkf08` (`grupo_id`),
  CONSTRAINT `FKce7uys9ey52cr1ivvmq4kkf08` FOREIGN KEY (`grupo_id`) REFERENCES `grupo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subgrupo`
--

LOCK TABLES `subgrupo` WRITE;
/*!40000 ALTER TABLE `subgrupo` DISABLE KEYS */;
INSERT INTO `subgrupo` VALUES (1,'TIPO',1),(2,'STATUS',1),(3,'UNIDADE',1),(4,'CATEGORIA',1),(5,'COMPUTADOR',2),(6,'subcatelaptopLAPTOP',3),(7,'DESKTOP',4),(8,'DELL',5),(9,'VERMELHO',6),(10,'IMPRESSORA',7),(11,'CELULAR',8),(12,'ANDROID',9),(13,'AET',10),(14,'ESCOLTA',10),(15,'ANUAL',11),(16,'VIAGEM',11),(17,'ANUAL',12),(18,'VIAGEM',12),(19,'ANUAL',13),(20,'VIAGEM',13),(21,'PESSOA',14),(22,'ENDERECO',14),(23,'CONTATO',14),(24,'CONTATOITEM',14),(25,'PESSOA',15),(26,'STATUS',15),(27,'SEGMENTO',15),(28,'ENDERECO-FOR',16),(29,'CONTATO',16),(30,'CONTATOITEM',16),(31,'STATUS',17),(32,'ESTCIVIL',17),(33,'CONTATO',17),(34,'CONTATOITEM',17),(35,'TIPOENDER',17),(36,'STATUS',18),(37,'TIPOVEND',18),(38,'CONTATO',18),(39,'CONTATOITEM',18),(40,'TIPOENDER',18),(41,'PESSOA',18),(42,'PESSOA',19),(43,'ENDERECO',19),(44,'CONTATO',19),(45,'CONTATOITEM',19),(46,'PESSOA',20),(47,'STATUS',20),(48,'SEGMENTO',20),(49,'ENDERECO-FOR',21),(50,'CONTATO',21),(51,'CONTATOITEM',21),(52,'STATUS',22),(53,'ESTCIVIL',22),(54,'CONTATO',22),(55,'CONTATOITEM',22),(56,'TIPOENDER',22),(57,'STATUS',23),(58,'TIPOVEND',23),(59,'CONTATO',23),(60,'CONTATOITEM',23),(61,'TIPOENDER',23),(62,'PESSOA',23);
/*!40000 ALTER TABLE `subgrupo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subgrupoitem`
--

DROP TABLE IF EXISTS `subgrupoitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subgrupoitem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) DEFAULT NULL,
  `dtexclui` datetime DEFAULT NULL,
  `subgrupo_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3fg3upo0kt2vbpvd15vprp2ed` (`subgrupo_id`),
  CONSTRAINT `FK3fg3upo0kt2vbpvd15vprp2ed` FOREIGN KEY (`subgrupo_id`) REFERENCES `subgrupo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subgrupoitem`
--

LOCK TABLES `subgrupoitem` WRITE;
/*!40000 ALTER TABLE `subgrupoitem` DISABLE KEYS */;
INSERT INTO `subgrupoitem` VALUES (1,'PRODUTO',NULL,1),(2,'SERVIÇO',NULL,1),(3,'ATIVO',NULL,2),(4,'INATIVO',NULL,2),(5,'PEÇA',NULL,3),(6,'KG',NULL,3),(7,'UNIDADE',NULL,3),(8,'ENGRADADO',NULL,3),(9,'SACAS',NULL,3),(10,'NENHUM',NULL,3),(11,'SELECIONAR',NULL,4),(12,'COMPUTADOR',NULL,4),(13,'IMPRESSORA',NULL,4),(14,'CELULAR',NULL,4),(15,'SELECIONAR',NULL,5),(16,'LAP TOP',NULL,5),(17,'DESK TOP',NULL,5),(18,'PLACA MAE',NULL,5),(19,'SELECIONAR',NULL,6),(20,'MICROSOFT',NULL,6),(21,'DELL',NULL,6),(22,'SELECIONAR',NULL,7),(23,'DELL',NULL,7),(24,'APPLE',NULL,7),(25,'SELECIONAR',NULL,8),(26,'VERMELHO',NULL,8),(27,'AMARELO',NULL,8),(28,'SELECIONAR',NULL,9),(29,'ESCURO',NULL,9),(30,'CLARO',NULL,9),(31,'SELECIONAR',NULL,10),(32,'JATO TINTA',NULL,10),(33,'LASER',NULL,10),(34,'SELECIONAR',NULL,11),(35,'IOS',NULL,11),(36,'ANDROID',NULL,11),(37,'SELECIONAR',NULL,12),(38,'ALGODÃO DOCE',NULL,12),(39,'CAND',NULL,12),(40,'DER',NULL,13),(41,'DSV',NULL,13),(42,'DNIT',NULL,13),(43,'ANUAL',NULL,14),(44,'VIAGEM',NULL,14),(45,'FISICA',NULL,21),(46,'JURIDICA',NULL,21),(47,'OUTRO',NULL,21),(48,'OPERACIONAL',NULL,22),(49,'COMERCIAL',NULL,22),(50,'FINANCEIRO',NULL,23),(51,'NOTA FISCAL',NULL,23),(52,'E-MAIL',NULL,24),(53,'TELEFONE',NULL,24),(54,'CELULAR',NULL,24),(55,'FAX',NULL,24),(56,'NEXTEL',NULL,24),(57,'SITE',NULL,24),(58,'FISICA',NULL,25),(59,'JURIDICA',NULL,25),(60,'ATIVA',NULL,26),(61,'SUSPENSA',NULL,26),(62,'COMERCIO',NULL,27),(63,'INDUSTRIA',NULL,27),(64,'INFORMATICA',NULL,27),(65,'TRANSPORTE',NULL,27),(66,'LOCADORA',NULL,27),(67,'METALURGICA',NULL,27),(68,'COMERCIAL',NULL,28),(69,'RESIDENCIAL',NULL,28),(70,'FINANCEIRO',NULL,29),(71,'OPERACIONAL',NULL,29),(72,'E-MAIL',NULL,30),(73,'TELEFONE',NULL,30),(74,'CELULAR',NULL,30),(75,'FAX',NULL,30),(76,'NEXTEL',NULL,30),(77,'SITE',NULL,30),(78,'ATIVO',NULL,31),(79,'SUSPENSO',NULL,31),(80,'CASADO',NULL,32),(81,'SOLTEIRO',NULL,32),(82,'MAE',NULL,33),(83,'PAI',NULL,33),(84,'PESSOAL',NULL,33),(85,'E-MAIL',NULL,34),(86,'TELEFONE',NULL,34),(87,'CELULAR',NULL,34),(88,'FAX',NULL,34),(89,'NEXTEL',NULL,34),(90,'SITE',NULL,34),(91,'RESIDENCIAL',NULL,35),(92,'ATIVO',NULL,36),(93,'INATIVO',NULL,36),(94,'INTERNO',NULL,37),(95,'EXTERNO',NULL,37),(96,'FINANCEIRO',NULL,38),(97,'OPERACIONAL',NULL,38),(98,'E-MAIL',NULL,39),(99,'TELEFONE',NULL,39),(100,'CELULAR',NULL,39),(101,'FAX',NULL,39),(102,'NEXTEL',NULL,39),(103,'SITE',NULL,39),(104,'COMERCIAL',NULL,40),(105,'RESIDENCIAL',NULL,40),(106,'FISICA',NULL,41),(107,'JURIDICA',NULL,41),(108,'FISICA',NULL,42),(109,'JURIDICA',NULL,42),(110,'OUTRO',NULL,42),(111,'OPERACIONAL',NULL,43),(112,'COMERCIAL',NULL,43),(113,'FINANCEIRO',NULL,44),(114,'NOTA FISCAL',NULL,44),(115,'E-MAIL',NULL,45),(116,'TELEFONE',NULL,45),(117,'CELULAR',NULL,45),(118,'FAX',NULL,45),(119,'NEXTEL',NULL,45),(120,'SITE',NULL,45),(121,'FISICA',NULL,46),(122,'JURIDICA',NULL,46),(123,'ATIVA',NULL,47),(124,'SUSPENSA',NULL,47),(125,'COMERCIO',NULL,48),(126,'INDUSTRIA',NULL,48),(127,'INFORMATICA',NULL,48),(128,'TRANSPORTE',NULL,48),(129,'LOCADORA',NULL,48),(130,'METALURGICA',NULL,48),(131,'COMERCIAL',NULL,49),(132,'RESIDENCIAL',NULL,49),(133,'FINANCEIRO',NULL,50),(134,'OPERACIONAL',NULL,50),(135,'E-MAIL',NULL,51),(136,'TELEFONE',NULL,51),(137,'CELULAR',NULL,51),(138,'FAX',NULL,51),(139,'NEXTEL',NULL,51),(140,'SITE',NULL,51),(141,'ATIVO',NULL,52),(142,'SUSPENSO',NULL,52),(143,'CASADO',NULL,53),(144,'SOLTEIRO',NULL,53),(145,'MAE',NULL,54),(146,'PAI',NULL,54),(147,'PESSOAL',NULL,54),(148,'E-MAIL',NULL,55),(149,'TELEFONE',NULL,55),(150,'CELULAR',NULL,55),(151,'FAX',NULL,55),(152,'NEXTEL',NULL,55),(153,'SITE',NULL,55),(154,'RESIDENCIAL',NULL,56),(155,'ATIVO',NULL,57),(156,'INATIVO',NULL,57),(157,'INTERNO',NULL,58),(158,'EXTERNO',NULL,58),(159,'FINANCEIRO',NULL,59),(160,'OPERACIONAL',NULL,59),(161,'E-MAIL',NULL,60),(162,'TELEFONE',NULL,60),(163,'CELULAR',NULL,60),(164,'FAX',NULL,60),(165,'NEXTEL',NULL,60),(166,'SITE',NULL,60),(167,'COMERCIAL',NULL,61),(168,'RESIDENCIAL',NULL,61),(169,'FISICA',NULL,62),(170,'JURIDICA',NULL,62);
/*!40000 ALTER TABLE `subgrupoitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tabela`
--

DROP TABLE IF EXISTS `tabela`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tabela` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) DEFAULT NULL,
  `dtexclui` datetime DEFAULT NULL,
  `grupo` varchar(255) DEFAULT NULL,
  `idempresa` int(11) DEFAULT NULL,
  `subgrupo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `INDTAB1` (`idempresa`,`grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tabela`
--

LOCK TABLES `tabela` WRITE;
/*!40000 ALTER TABLE `tabela` DISABLE KEYS */;
/*!40000 ALTER TABLE `tabela` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cpf_ou_cnpj` varchar(255) DEFAULT NULL,
  `dataexpira` datetime DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `idempresa` int(11) DEFAULT NULL,
  `nome` varchar(255) NOT NULL,
  `nomeempresa` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `tipo` int(11) DEFAULT NULL,
  `pessoa_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_5171l57faosmj8myawaucatdw` (`email`),
  KEY `FK9kjbckbnh9ryosephjpbojisa` (`pessoa_id`),
  CONSTRAINT `FK9kjbckbnh9ryosephjpbojisa` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'023.037.038-16','2020-10-01 10:32:00','soninha@gmail.com',2,'Sonia Baixinha','Empresa da Mariza','$2a$10$7IxVMy5vV6ZMTrdI8C7deea6zo/T2mMAftgZ1Z8sNAcUIdT/1q.2G','ATIVO',1,7),(2,'665.059.780-54','2019-10-22 10:32:00','ana@gmail.com',2,'Ana Costa','Empresa da Mariza','$2a$10$CcJi9Lbnuv/qCdTFSLKYOu2IJJqoIr66nKR9pGtMLq1ACH2FPcV5.','ativo',1,6),(3,'023.037.038-16','2020-09-22 10:32:00','pero@gmail.com',1,'Denilson Peró de Lima','Velocino Tech Ltda','$2a$10$ZbzvLT5tZlv11IzJfZBHV.iHWhXfe/0p1O4S9tFxFXpP8DRRVej5y','ATIVO',1,5),(4,'023.037.038-16','2020-10-01 10:32:00','mariza@gmail.com',2,'Mariza Peró','Empresa da Mariza','$2a$10$7wmoCIumOf4GahVCJyfCSOfYfRFIJflZ/F46oPpKIGxLYyFK3OxJ2','ATIVO',1,8);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_periodo_eventual`
--

DROP TABLE IF EXISTS `usuario_periodo_eventual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario_periodo_eventual` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datafim` datetime DEFAULT NULL,
  `datainicio` datetime DEFAULT NULL,
  `horafim` int(11) DEFAULT NULL,
  `horainicio` int(11) DEFAULT NULL,
  `funcionario_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK26ll60w1pqdp5x70868e1ge05` (`funcionario_id`),
  CONSTRAINT `FK26ll60w1pqdp5x70868e1ge05` FOREIGN KEY (`funcionario_id`) REFERENCES `funcionario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_periodo_eventual`
--

LOCK TABLES `usuario_periodo_eventual` WRITE;
/*!40000 ALTER TABLE `usuario_periodo_eventual` DISABLE KEYS */;
INSERT INTO `usuario_periodo_eventual` VALUES (1,'2019-10-22 10:32:00','2019-10-22 10:32:00',14,8,7);
/*!40000 ALTER TABLE `usuario_periodo_eventual` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_periodo_suspenso`
--

DROP TABLE IF EXISTS `usuario_periodo_suspenso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario_periodo_suspenso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datafim` datetime DEFAULT NULL,
  `datainicio` datetime DEFAULT NULL,
  `horafim` int(11) DEFAULT NULL,
  `horainicio` int(11) DEFAULT NULL,
  `funcionario_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKekxrf0cwpxib81eg7i6edt862` (`funcionario_id`),
  CONSTRAINT `FKekxrf0cwpxib81eg7i6edt862` FOREIGN KEY (`funcionario_id`) REFERENCES `funcionario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_periodo_suspenso`
--

LOCK TABLES `usuario_periodo_suspenso` WRITE;
/*!40000 ALTER TABLE `usuario_periodo_suspenso` DISABLE KEYS */;
INSERT INTO `usuario_periodo_suspenso` VALUES (1,'2019-10-21 10:32:00','2019-10-01 10:32:00',14,8,7);
/*!40000 ALTER TABLE `usuario_periodo_suspenso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_periodo_trabalho`
--

DROP TABLE IF EXISTS `usuario_periodo_trabalho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario_periodo_trabalho` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `diadasemana` int(11) DEFAULT NULL,
  `horafim` int(11) DEFAULT NULL,
  `horainicio` int(11) DEFAULT NULL,
  `funcionario_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5ghpni04h4xc6qbuyum32b18p` (`funcionario_id`),
  CONSTRAINT `FK5ghpni04h4xc6qbuyum32b18p` FOREIGN KEY (`funcionario_id`) REFERENCES `funcionario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_periodo_trabalho`
--

LOCK TABLES `usuario_periodo_trabalho` WRITE;
/*!40000 ALTER TABLE `usuario_periodo_trabalho` DISABLE KEYS */;
INSERT INTO `usuario_periodo_trabalho` VALUES (1,1,14,0,7),(2,2,18,8,7),(3,3,22,8,7),(4,4,18,8,7),(5,5,18,8,7),(6,6,24,8,7),(7,7,18,14,7);
/*!40000 ALTER TABLE `usuario_periodo_trabalho` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendedor`
--

DROP TABLE IF EXISTS `vendedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendedor` (
  `email` varchar(255) DEFAULT NULL,
  `situacao` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK4y2eue8ofw3ve5jcox1m77rdh` FOREIGN KEY (`id`) REFERENCES `pessoa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendedor`
--

LOCK TABLES `vendedor` WRITE;
/*!40000 ALTER TABLE `vendedor` DISABLE KEYS */;
INSERT INTO `vendedor` VALUES ('ana@gmail.com','ATIVO','EXTERNO',2),('maria@gmail.com','ATIVO','EXTERNO',3),('ana@gmail.com','ATIVO','EXTERNO',4);
/*!40000 ALTER TABLE `vendedor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-25 16:38:35
