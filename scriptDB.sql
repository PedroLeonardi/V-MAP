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
    n_rota 	INT NOT NULL,
    coordenadas_inicio VARCHAR(100) NOT NULL,
    coordenadas_paradas VARCHAR(100),
    coordenadas_fim VARCHAR(100),
    FOREIGN KEY (id_motorista) REFERENCES funcionario_motorista (id_motorista)
				ON DELETE SET NULL
				ON UPDATE CASCADE
);

#--- RESPONSAVEIS -----------------------------------------------------------------------------------------------------------------
CREATE TABLE responsaveis(
	id_responsavel INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno INT NULL,
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


#--- FOREGIN KEY RESPONSAVEIS/ALUNO -----------------------------------------------------------------------------------------------------------------
alter table responsaveis 
	ADD constraint fk_aluno
    FOREIGN KEY (id_aluno) REFERENCES Alunos(id_aluno)
				ON DELETE SET NULL
				ON UPDATE CASCADE;


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

INSERT INTO administrador (nome, cpf, senha, cargo)
VALUES ('João da Silva', '123.456.789-00', 'senhaSegura123!', 'Gerente de TI');