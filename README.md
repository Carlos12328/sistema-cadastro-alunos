# Sistema de Cadastro de Alunos

Projeto da disciplina de Programação de App utilizando React Native + Expo + Firebase.

---

# Objetivo do Projeto

Desenvolver um aplicativo mobile para:

* Cadastro de alunos;
* Upload de documentos;
* Validação de documentos por atendente;
* Controle de status do cadastro.

---

# Tecnologias Utilizadas

* React Native
* Expo
* TypeScript
* Firebase Authentication
* Firestore Database
* Expo Image Picker
* Expo Image Manipulator
* React Navigation

---

# Estrutura Atual do Projeto

```txt
sistema-cadastro-alunos/
├── assets/
├── src/
│   ├── components/
│   ├── navigation/
│   ├── screens/
│   └── services/
├── App.tsx
├── package.json
└── tsconfig.json
```

---

# Explicação das Pastas

## src/screens

Contém as telas do aplicativo.

### Telas criadas

* LoginScreen.tsx
* RegisterScreen.tsx
* StudentFormScreen.tsx
* UploadDocumentsScreen.tsx
* StudentListScreen.tsx
* StudentDetailsScreen.tsx

---

## src/services

Contém integrações com Firebase.

### Arquivos

#### firebaseConfig.ts

Responsável por conectar o projeto ao Firebase.

#### authService.ts

Responsável pelas funções de login e cadastro.

#### studentService.ts

Responsável pelas operações do Firestore relacionadas aos alunos.

#### storageService.ts

Responsável pela manipulação das imagens/documentos.

---

## src/navigation

Responsável pela navegação entre telas.

---

## src/components

Componentes reutilizáveis.

Exemplo:

* Button.tsx
* Input.tsx

---

# Firebase

O projeto já está conectado ao Firebase.

## Serviços utilizados

* Authentication
* Firestore Database

## NÃO estamos utilizando

* Firebase Hosting
* PostgreSQL
* Backend próprio

---

# Decisões Técnicas do Projeto

## Banco de Dados

Estamos utilizando Firestore (NoSQL), pois:

* já faz parte do requisito do trabalho;
* integração simples com React Native;
* atualização em tempo real;
* menos complexidade.

---

## Armazenamento de Imagens

Vamos utilizar armazenamento local no dispositivo.

Motivos:

* mais simples;
* menos configuração;
* menor chance de erro;
* permitido pelo professor.

---

# Dependências Instaladas

## Firebase

```bash
npm install firebase
```

---

## Navegação

```bash
npm install @react-navigation/native
npm install @react-navigation/native-stack
```

```bash
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
```

---

## Imagens

```bash
npx expo install expo-image-picker
npx expo install expo-image-manipulator
```

---

# Como Rodar o Projeto

## Instalar dependências

```bash
npm install
```

---

## Rodar projeto

```bash
npx expo start
```

---

# Expo Go

Instalar no celular:

* Android: Expo Go pela Play Store
* iPhone: Expo Go pela App Store

O projeto utiliza Expo SDK 54.

---

# Fluxo Atual do Projeto

Atualmente o projeto:

* inicia corretamente;
* conecta com Firebase;
* abre no Expo Go;
* possui estrutura base pronta.

---

# Próximos Passos

## 1. Configurar navegação completa

Objetivo:

* App.tsx chamar as rotas;
* LoginScreen abrir inicialmente;
* navegar entre telas.

---

## 2. Implementar autenticação

Funcionalidades:

* login;
* cadastro de usuário;
* logout;
* tratamento de erro.

---

## 3. Implementar cadastro de aluno

Campos:

* nome;
* CPF;
* telefone;
* curso;
* data de nascimento;
* status.

---

## 4. Implementar upload de documentos

Documentos:

* RG/CPF;
* certificado.

Tratamentos obrigatórios:

* compressão;
* redimensionamento.

---

## 5. Implementar área do atendente

Funcionalidades:

* listar alunos;
* visualizar documentos;
* alterar status.

---

# Organização do Git

## Branch principal

```bash
git checkout develop
```

---

## Branch por feature

Exemplo:

```bash
git checkout -b feature/login
```

---

# Recomendações para o Grupo

## NÃO alterar

* estrutura de pastas;
* versões das dependências;
* configuração Firebase.

Sem alinhar antes com o grupo.

---

## Sempre antes de começar

```bash
git pull
```

---

## Sempre testar antes de subir

```bash
npx expo start
```

---

# Objetivo do Grupo

Prioridade:

* projeto funcionando;
* integração correta com Firebase;
* upload funcionando;
* navegação funcionando.

Não precisamos implementar arquitetura avançada.

---

# Situação Atual

Base do projeto pronta para desenvolvimento em equipe.
