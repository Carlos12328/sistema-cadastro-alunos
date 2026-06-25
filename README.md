# Sistema de Cadastro de Alunos

Aplicativo mobile desenvolvido com React Native, Expo e Firebase para gerenciamento do processo de cadastro acadêmico, permitindo o envio de documentos pelos alunos e a validação dessas informações por atendentes.

---

# Visão Geral

O sistema possui dois perfis de acesso:

### Aluno

* Realizar cadastro no sistema;
* Efetuar login;
* Enviar documentos obrigatórios;
* Acompanhar o status da análise dos documentos.

### Atendente

* Visualizar alunos cadastrados;
* Consultar documentos enviados;
* Aprovar ou rejeitar solicitações;
* Atualizar o status do cadastro.

---

# Funcionalidades Implementadas

## Autenticação

* Cadastro de usuários;
* Login com email e senha;
* Logout;
* Controle de sessão;
* Tratamento de erros de autenticação;
* Proteção de rotas.

## Controle de Perfis

O sistema diferencia automaticamente usuários dos tipos:

* Aluno
* Atendente

Após o login, a navegação e as funcionalidades disponíveis são definidas de acordo com o perfil do usuário.

## Cadastro de Alunos

Durante o cadastro são coletadas as seguintes informações:

* Nome completo;
* Email;
* Senha;
* CPF;
* Telefone;
* Data de nascimento;
* Curso.

Também foram implementadas:

* Validação de CPF;
* Validação de email;
* Validação de telefone;
* Validação de data;
* Máscaras de entrada para CPF e telefone.

## Upload de Documentos

Os alunos podem enviar documentos para validação.

Funcionalidades implementadas:

* Seleção de imagem pelo dispositivo;
* Armazenamento local;
* Controle de envio;
* Atualização automática de status.

## Tratamento de Imagens

Antes do armazenamento, as imagens passam por um processo de otimização:

* Redimensionamento automático;
* Compressão de arquivo;
* Conversão para JPEG;
* Limitação máxima de resolução.

Objetivo:

* Reduzir espaço utilizado;
* Melhorar desempenho;
* Padronizar os arquivos enviados.

## Área do Atendente

O atendente possui acesso a:

* Lista de alunos cadastrados;
* Visualização dos dados do aluno;
* Visualização dos documentos enviados;
* Aprovação do cadastro;
* Rejeição do cadastro.

---

# Tecnologias Utilizadas

## Front-end

* React Native
* Expo
* TypeScript

## Navegação

* React Navigation

## Backend as a Service

Firebase

### Serviços Utilizados

* Firebase Authentication
* Cloud Firestore

## Manipulação de Imagens

* Expo Image Picker
* Expo Image Manipulator

## Armazenamento Local

* Expo File System

---

# Arquitetura do Projeto

```txt
src/
├── components/
├── context/
├── navigation/
├── screens/
├── services/
├── types/
└── utils/
```

---

# Estrutura das Pastas

## components

Componentes reutilizáveis da aplicação.

---

## context

Gerenciamento de estado global.

### AuthContext

Responsável por:

* Monitorar autenticação;
* Disponibilizar usuário logado;
* Disponibilizar perfil do usuário;
* Controlar carregamento inicial da sessão.

---

## navigation

Configuração das rotas da aplicação.

Responsável por:

* Navegação entre telas;
* Proteção de acesso;
* Fluxo autenticado e não autenticado.

---

## screens

Contém as telas da aplicação.

### LoginScreen

Tela de autenticação.

### RegisterScreen

Tela de cadastro de usuários.

### HomeScreen

Tela principal após login.

### UploadDocumentsScreen

Envio de documentos pelo aluno.

### StudentListScreen

Listagem de alunos para atendentes.

### StudentDetailsScreen

Detalhes do aluno e gerenciamento de status.

---

## services

Camada responsável pela comunicação com Firebase e demais serviços.

### firebaseConfig

Inicialização da conexão com Firebase.

### authService

Operações de autenticação.

### userService

Consulta de perfil do usuário.

### studentService

Operações relacionadas aos alunos.

### storageService

Armazenamento local de arquivos.

### imageService

Otimização e tratamento de imagens.

---

## types

Definições de tipos TypeScript.

Exemplo:

* Student
* StudentStatus

---

## utils

Funções auxiliares.

### validations

Validações de formulários.

### masks

Máscaras para entrada de dados.

---

# Modelo de Dados

## Collection: users

```json
{
  "uid": "string",
  "nome": "string",
  "email": "string",
  "role": "aluno | atendente"
}
```

## Collection: alunos

```json
{
  "userId": "string",
  "nomeCompleto": "string",
  "cpf": "string",
  "telefone": "string",
  "dataNascimento": "string",
  "curso": "string",
  "status": "Pendente | Entregue | Aprovado | Rejeitado",
  "rgUrl": "string",
  "certificadoUrl": "string",
  "criadoEm": "timestamp"
}
```

---

# Fluxo da Aplicação

```txt
Cadastro
    ↓
Login
    ↓
Identificação do Perfil
    ↓
Aluno ---------------- Atendente
    ↓                      ↓
Enviar Documentos     Listar Alunos
    ↓                      ↓
Aguardar Análise     Visualizar Dados
    ↓                      ↓
Status Atualizado ← Aprovar/Rejeitar
```

---

# Como Executar o Projeto

## Instalar dependências

```bash
npm install
```

## Executar aplicação

```bash
npx expo start
```

## Executar no Android

```bash
npm run android
```

## Executar no iOS

```bash
npm run ios
```

---

# Principais Aprendizados

Durante o desenvolvimento foram aplicados conceitos de:

* React Native;
* Expo;
* TypeScript;
* Firebase Authentication;
* Cloud Firestore;
* Controle de acesso por perfil;
* Context API;
* Navegação entre telas;
* Manipulação de imagens;
* Armazenamento local;
* Desenvolvimento colaborativo utilizando Git e GitHub.

---

# Autores

Projeto desenvolvido para a disciplina de Programação de Aplicativos.

Equipe responsável pelo desenvolvimento das funcionalidades, integrações e documentação do sistema.
