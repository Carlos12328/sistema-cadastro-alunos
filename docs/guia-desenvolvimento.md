# Guia de Desenvolvimento - Sistema de Cadastro de Alunos

## Objetivo do Projeto

Desenvolver um aplicativo mobile em React Native para cadastro de alunos, permitindo:

* Cadastro e autenticação de usuários;
* Upload de documentos pessoais;
* Upload de certificado;
* Tratamento de imagens antes do envio;
* Armazenamento utilizando Firebase;
* Validação dos documentos por atendentes;
* Controle de status do cadastro.

---

# Tecnologias Utilizadas

* React Native
* Expo
* Firebase Authentication
* Firestore Database
* React Navigation
* expo-image-picker
* expo-image-manipulator
* expo-file-system
* Git
* GitHub

---

# Arquitetura Atual

```text
src/

components/
├── Componentes reutilizáveis

context/
├── AuthContext.tsx

navigation/
├── Controle de navegação e proteção de rotas

screens/
├── Telas da aplicação

services/
├── Integração com Firebase
```

---

# Fluxo Atual do Sistema

## Login

```text
Usuário digita:
- Email
- Senha

↓

LoginScreen

↓

authService.login()

↓

Firebase Authentication

↓

Firebase autentica usuário

↓

onAuthStateChanged()

↓

AuthContext atualiza user

↓

Navigation detecta usuário autenticado

↓

Tela Home
```

---

## Proteção de Rotas

Quando existe usuário autenticado:

Telas disponíveis:

* Home

Quando não existe usuário autenticado:

Telas disponíveis:

* Login
* Cadastro

Isso impede acesso direto às áreas protegidas.

---

# Estrutura do Firestore

## Coleção users

Aluno:

```json
{
  "uid": "firebase_uid",
  "nome": "Carlos",
  "email": "carlos@email.com",
  "role": "aluno"
}
```

Atendente:

```json
{
  "uid": "firebase_uid",
  "nome": "João",
  "email": "joao@email.com",
  "role": "atendente"
}
```

---

## Coleção alunos

```json
{
  "userId": "firebase_uid",

  "nomeCompleto": "",
  "cpf": "",
  "dataNascimento": "",
  "email": "",
  "telefone": "",
  "curso": "",

  "status": "Pendente",

  "rgUrl": "",
  "certificadoUrl": "",

  "criadoEm": "timestamp"
}
```

---

# Como Começar

1. Ler este documento inteiro.
2. Identificar sua issue.
3. Atualizar a branch develop.
4. Criar sua branch de trabalho.
5. Desenvolver apenas sua funcionalidade.
6. Fazer commit.
7. Fazer push.
8. Abrir Pull Request para develop.
9. Solicitar revisão.
10. Após aprovação, realizar merge.

---

# Padrão de Git

NUNCA trabalhar diretamente na branch develop.

Sempre iniciar por:

```bash
git checkout develop

git pull

git checkout -b feature/nome-da-feature
```

Exemplos:

```text
feature/cadastro-aluno

feature/upload-rg

feature/tratamento-imagem

feature/upload-certificado

feature/listagem-alunos

feature/validacao-alunos
```

---

# Padrão de Commits

Utilizar commits descritivos.

Exemplos:

```text
feat(student): cria formulario de cadastro

feat(upload): implementa upload de rg

feat(upload): implementa upload de certificado

feat(attendant): cria listagem de alunos

feat(validation): implementa alteracao de status

fix(auth): corrige validacao de login
```

---

# Fluxo de Trabalho

1. Escolher issue.
2. Mover issue para In Progress.
3. Criar branch.
4. Desenvolver.
5. Commit.
6. Push.
7. Abrir Pull Request.
8. Solicitar revisão.
9. Merge para develop.
10. Mover issue para Done.

---

# Divisão de Desenvolvimento

## Carlos

### Responsável por

* Cadastro de alunos
* Integração das entregas da equipe
* Estrutura de dados dos alunos

### Issues

* #22 Criar formulário de cadastro de aluno
* #23 Validar formulário de cadastro de aluno
* #24 Salvar cadastro de aluno no Firestore
* #25 Implementar status inicial "Pendente"
* #26 Associar aluno ao usuário autenticado

### Entregável

* Cadastro completo de alunos funcionando
* Dados persistidos corretamente no Firestore

---

## Pessoa 1 — Upload de Documentos

### Responsável por

* Seleção de imagens
* Upload do RG/CPF

### Issues

* #27 Configurar expo-image-picker
* #28 Implementar upload de RG/CPF

### Entregável

* Usuário consegue selecionar RG/CPF
* Preview da imagem
* Integração inicial para upload

---

## Pessoa 2 — Tratamento de Imagens

### Responsável por

* Otimização das imagens

### Issues

* #29 Configurar expo-image-manipulator
* #30 Implementar compressão de imagens
* #31 Implementar redimensionamento de imagens

### Entregável

* Imagens comprimidas
* Imagens redimensionadas antes do upload

---

## Pessoa 3 — Certificados e Armazenamento Local

### Responsável por

* Upload do certificado
* Persistência dos arquivos

### Issues

* #40 Implementar upload de certificado
* #32 Salvar URI/URL dos documentos no Firestore

### Entregável

* Upload de certificado
* URLs salvas corretamente

---

## Pessoa 4 — Área do Atendente

### Responsável por

* Consulta dos alunos cadastrados

### Issues

* #33 Criar tela de listagem de alunos
* #34 Buscar alunos no Firestore

### Entregável

* Lista de alunos carregada do Firestore
* Exibição dos dados principais

---

## Pessoa 5 — Validação dos Cadastros

### Responsável por

* Visualização de detalhes
* Alteração de status
* Controle de acesso

### Issues

* #35 Criar tela de detalhes do aluno
* #36 Exibir documentos enviados pelo aluno
* #37 Implementar alteração de status do aluno
* #38 Implementar atualização em tempo real
* #39 Restringir acesso da área do atendente

### Entregável

* Visualizar cadastro completo
* Visualizar documentos enviados
* Alterar status
* Atualização automática dos dados
* Controle de perfil (Aluno x Atendente)

---

# Regras Importantes

* Não trabalhar diretamente na branch develop.
* Não fazer merge sem Pull Request.
* Não alterar a estrutura do Firestore sem alinhar com o grupo.
* Não criar novas coleções sem discussão prévia.
* Sempre manter commits pequenos e descritivos.
* Sempre atualizar a develop antes de criar uma nova branch.

---

# Status Atual do Projeto

## Concluído

### Autenticação

* Login com Firebase Authentication
* Cadastro de usuários
* Tratamento de erros de login
* Tratamento de erros de cadastro

### Segurança

* AuthContext implementado
* Proteção de rotas implementada
* Navegação baseada em autenticação

### Infraestrutura

* Firebase configurado
* Firestore configurado
* Estrutura inicial do projeto criada

---

# Próximas Entregas

1. Cadastro de alunos
2. Upload de RG/CPF
3. Tratamento de imagens
4. Upload de certificado
5. Salvamento local dos arquivos e vínculo da URI no Firestore
6. Área do atendente
7. Validação dos documentos
8. Controle de perfis
9. Atualização em tempo real

---

# Dúvidas

Antes de alterar:

* Estrutura do Firestore
* Coleções
* Campos dos documentos
* Fluxos de autenticação
* Fluxos de navegação

alinhar com o grupo para evitar retrabalho e conflitos durante a integração.
