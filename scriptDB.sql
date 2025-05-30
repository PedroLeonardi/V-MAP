DROP DATABASE VMAP_DB;
CREATE DATABASE VMAP_DB;
USE VMAP_DB;

#--- Administrador -----------------------------------------------------------------------------------------------------------------
CREATE TABLE administrador (
	id_admin INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
	cpf VARCHAR(14) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cargo VARCHAR(100) NOT NULL
);

#--- MOTORISTA -----------------------------------------------------------------------------------------------------------------
CREATE TABLE funcionario_motorista (
	id_motorista INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    cpf_motorista VARCHAR(14) NOT NULL UNIQUE
);

#--- ROTA ONIBUS -----------------------------------------------------------------------------------------------------------------
CREATE TABLE veiculos_onibus(
	id_rota_onibus INT NOT NULL PRIMARY KEY, #VER DPS SE REMOVE O NOT NULL E ADICIONA O AUTO_INCREMENT
    id_motorista INT NULL,
    placa VARCHAR(8) NOT NULL,
    coordenadas_inicio VARCHAR(100) NOT NULL,
    #coordenadas_paradas VARCHAR(100), VER DPS SE COLOCA OU NAO.
    coordenadas_fim VARCHAR(100),
    FOREIGN KEY (id_motorista) REFERENCES funcionario_motorista (id_motorista)
				ON DELETE SET NULL
				ON UPDATE CASCADE
);

#--- RESPONSAVEIS -----------------------------------------------------------------------------------------------------------------
CREATE TABLE responsaveis(
	id_responsavel INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    cpf_responsavel VARCHAR(14) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

#--- ALUNOS -----------------------------------------------------------------------------------------------------------------
CREATE TABLE Alunos (
	id_aluno INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    cpf_aluno VARCHAR(14) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cpf_responsavel VARCHAR(14) NULL,
    id_rota_onibus INT,
    FOREIGN KEY (cpf_responsavel) REFERENCES responsaveis (cpf_responsavel)
				ON DELETE SET NULL
				ON UPDATE CASCADE,
    FOREIGN KEY (id_rota_onibus) REFERENCES veiculos_onibus(id_rota_onibus)
                ON DELETE SET NULL
				ON UPDATE CASCADE
);

#--- Paradas/CheckPoints  -----------------------------------------------------------------------------------------------------------------

CREATE TABLE rotas_checkpoints (
    checkpoint_id INT AUTO_INCREMENT PRIMARY KEY,
    rota_id VARCHAR(255), # VARCHAR porque e melhor deixar as rotas com numero e letras. (dps explico)
    coordenadas POINT,
    nome_rua VARCHAR(255), 
    identificacao VARCHAR(255), # saber qual casa
    nome_aluno VARCHAR(255)
);

#--- Escola/Garagem -----------------------------------------------------------------------------------------------------------------
CREATE TABLE Locais (
id INT PRIMARY KEY,
identificacao VARCHAR(100) NOT NULL,
coordenadas POINT 
# VER DPS DE PRECISA ADICIONAR OS 'FILHOS' DE CADA UM
);

#--- LOG ALUNOS  -----------------------------------------------------------------------------------------------------------------
CREATE TABLE Log_Alunos(
	n_LogAluno INT NOT NULL PRIMARY KEY,
    id_aluno INT NULL,
    id_rota_onibus INT NULL,
    evento VARCHAR(100) NOT NULL,
    coordenada_evento VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_aluno) REFERENCES Alunos (id_aluno)
				ON DELETE SET NULL
				ON UPDATE CASCADE,
    FOREIGN KEY (id_rota_onibus) REFERENCES veiculos_onibus (id_rota_onibus)
				ON DELETE SET NULL
				ON UPDATE CASCADE
);

#--- LOG ADMIN -----------------------------------------------------------------------------------------------------------------
CREATE TABLE Log_admin(
    n_LogAdmin INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_admin INT NULL,
    tabela_alterada VARCHAR(100),
    tabela_informacao_antes VARCHAR(255),
    tabela_informacao_depois VARCHAR(255),
    FOREIGN KEY (id_admin) REFERENCES administrador(id_admin)
				ON DELETE SET NULL
				ON UPDATE CASCADE
);

#--- LOG ONIBUS -----------------------------------------------------------------------------------------------------------------
CREATE TABLE Log_onibus (
	n_LogOnibus INT NOT NULL PRIMARY KEY,
    id_motorista INT NULL,
    localizacao TEXT,
    Hora TIME,
    id_rota_onibus INT NULL,
    FOREIGN KEY (id_rota_onibus) REFERENCES veiculos_onibus(id_rota_onibus)
    				ON DELETE SET NULL
				ON UPDATE CASCADE,
	FOREIGN KEY (id_motorista) REFERENCES funcionario_motorista(id_motorista)
        				ON DELETE SET NULL
					ON UPDATE CASCADE
);

#--- VIEWS -----------------------------------------------------------------------------------------------------------------
# Pais e respectivos Alunos.
CREATE VIEW painel_responsavel AS
SELECT responsaveis.id_responsavel AS ID_Responsavel, responsaveis.nome AS NOME_Responsavel, responsaveis.cpf_responsavel AS CPF_Responsavel, Alunos.id_aluno AS ID_Aluno, Alunos.nome AS Nome_Aluno, Alunos.cpf_aluno AS CPF_Aluno, Alunos.id_rota_onibus AS Rota_Onibus FROM Alunos
INNER JOIN responsaveis ON Alunos.cpf_responsavel = responsaveis.cpf_responsavel;

# Motoristas e respectivos Onibus.
CREATE VIEW painel_onibus_motoristas AS
SELECT funcionario_motorista.id_motorista AS ID_Motorista, funcionario_motorista.nome AS NOME_Motorista, funcionario_motorista.cpf_motorista AS CPF_Motorista, veiculos_onibus.id_rota_onibus AS ROTA_ID, veiculos_onibus.placa AS Placa_Veiculo, veiculos_onibus.coordenadas_inicio AS IniciO, veiculos_onibus.coordenadas_fim AS Final FROm veiculos_onibus
INNER JOIN funcionario_motorista ON veiculos_onibus.id_motorista = funcionario_motorista.id_motorista;	 

#Informaçoes Gerais
CREATE VIEW painel_admin AS
SELECT 
    (SELECT COUNT(id_aluno) FROM Alunos) AS Qtd_Alunos,
    (SELECT COUNT(id_motorista) FROM funcionario_motorista) AS Qtd_Motoristas,
    (SELECT COUNT(placa) FROM veiculos_onibus) AS Qtd_Onibus,
    (SELECT COUNT(rota_id) FROM rotas_checkpoints) AS Qtd_Rotas;


#Endereço Casa dos Alunos
CREATE VIEW rotas_checkpoints_view AS
SELECT checkpoint_id, rota_id, ST_X(coordenadas) AS longitude, ST_Y(coordenadas) AS latitude, nome_rua, identificacao, nome_aluno FROM rotas_checkpoints;

#--- TESTES DE INSERT -----------------------------------------------------------------------------------------------------------------
INSERT INTO rotas_checkpoints (rota_id, coordenadas, nome_rua, identificacao, nome_aluno)
VALUES 
('1M', ST_GeomFromText('POINT(-48.64005714052976 -20.904409746416718)'), 'rua sei la', 'casa verde 239', 'victor'),
('1M', ST_GeomFromText('POINT(-48.63821760476853 -20.906595480877044)'), 'rua asgsdhssh', 'casa azul 123', 'eduardo'),
('1M', ST_GeomFromText('POINT(-48.63632966017079 -20.909278614803725)'), 'rua galinha', 'casa amarela 002', 'marcelo'),
('1M', ST_GeomFromText('POINT(-48.6395134216150 -20.912240417709754)'), 'rua gorila', 'casa branca 001', 'harambe');

INSERT INTO Locais (id, identificacao, coordenadas)
VALUES
(231, 'Escola', ST_GeomFromText('POINT(-48.65078018714854 20.923923775325008)')),
(096, 'Garagem', ST_GeomFromText('POINT(-48.6537862326781 20.9124488135294230)'));

INSERT INTO administrador (nome, cpf, senha, cargo)
VALUES ('João Silva', '123.456.789-00', 'senha123', 'Coordenador');

INSERT INTO funcionario_motorista (nome, cpf_motorista)
VALUES ('Carlos Souza', '987.654.321-00'),
		('Davi Davi', '536.126.643-22'),
        ('pedro pedro', '293.284.123-33');

INSERT INTO veiculos_onibus (id_rota_onibus, id_motorista, placa, coordenadas_inicio,  coordenadas_fim)
VALUES (1, 1, 'ABC1234', 'POINT(10 10)', 'POINT(30 30)'),
		(2,2, 'DEF5678', 'POINT(10 10)', 'POINT(30 30)');

INSERT INTO responsaveis (nome, cpf_responsavel, senha)
VALUES ('Maria Oliveira', '321.654.987-00', 'senha456'),
		('João Pereira', '987.654.321-00', 'senha789'),
        ('Fernanda Costa', '123.456.789-01', 'senha123');

INSERT INTO Alunos (nome, cpf_aluno, senha, cpf_responsavel, id_rota_onibus)
VALUES ('Ana Souza', '111.222.333-44', 'senha789', '321.654.987-00', 1),
		('Carlos Silva', '555.666.777-88', 'senha123', '987.654.321-00', 1);

#--- TESTES DE SELECT -----------------------------------------------------------------------------------------------------------------
SELECT * FROM rotas_checkpoints_view;	
SELECT * FROM painel_responsavel;
SELECT * FROM painel_onibus_motoristas;
SELECT * FROM funcionario_motorista;
SELECT * FROM Locais;
SELECT * FROM painel_admin;