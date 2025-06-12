# 🚌 V-MAP - Sistema de Gestão de Transporte Escolar

**V-MAP** é uma plataforma web completa para gerenciamento de transporte escolar, desenvolvida com foco em **pais**, **alunos** e **administradores escolares**.  
O sistema visa transmitir segurança aos responsáveis ao monitorarem o percurso do filho.

---

## 🚀 Funcionalidades Principais

- **Autenticação por perfil** (Administrador, Responsável, Aluno) com **login por CPF e senha**
- **Cadastro e gerenciamento de alunos, responsáveis, rotas e veículos**
- **Relacionamento entre alunos e responsáveis (muitos para muitos)**
- **Painel administrativo com interface moderna**
- **Visualização e controle de rotas**
- **API RESTful com autenticação JWT e validação de dados**
- **Responsividade e navegação intuitiva com abas e modais animados**
- **Visualização do percurso do aluno ao entrar no ônibus**

---

## 🛠️ Tecnologias Utilizadas

### Backend:
- Node.js + Express
- JavaScript
- MySQL (com `mysql2/promise`)
- JWT (JSON Web Tokens)
- Jest (para testes)
- Estrutura MVC
- Middleware de autenticação e tratamento de erros

### Frontend:
- Next.js
- Tailwind CSS
- React Icons
- Hooks personalizados (`useFetchResponsaveis`, `useFetchTotalAlunos`, etc.)

---

## 🔐 Segurança

- Login protegido com **hash de senha e JWT**
- Middleware de autenticação para proteger rotas privadas

---

## 📁 Estrutura de Pastas

V-MAP/
├── backend/
│ ├── config/
-src
│ ├── controllers/
│ ├── logs/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── tests/
│ └── app.js
│
├── frontend/
-viewer
│ ├── components/
│ ├── DashboardAdm/
│ ├── DashboardAluno/
│ ├── dashboardResponsavel/
│ ├── hooks/
│ ├── login/
│ ├── RotaAluno/
│ ├── RotaResponsavel/
│ ├── publio/
│ └── page.js


---

## 📌 Requisitos

- Node.js
- MySQL
- npm ou yarn

---

## ▶️ Como Rodar o Projeto

```bash
# Backend
cd v-map
npm install
npm start

# Frontend
cd src/viewer
npm install
npm run dev

👨‍💻 Desenvolvido por
Equipe do projeto V-MAP — Projeto Integrador SENAI

Davi Chagas

Pedro Leonardi

Gustavo de Paula

Nycolas