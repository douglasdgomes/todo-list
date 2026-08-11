# To-Do List

Aplicação web simples para gerenciamento de tarefas pessoais, desenvolvida como teste prático de desenvolvimento front-end.

O projeto permite adicionar, visualizar, concluir, editar e excluir tarefas, mantendo os dados salvos no navegador através do `localStorage`.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Google Fonts — DM Sans

## Funcionalidades

- [x] Adicionar novas tarefas
- [x] Listar tarefas cadastradas
- [x] Marcar tarefas como concluídas
- [x] Editar tarefas
- [x] Excluir tarefas
- [x] Persistir tarefas utilizando `localStorage`
- [x] Estado vazio quando não existem tarefas
- [x] Layout responsivo
- [x] Suporte à edição utilizando `Enter`
- [x] Cancelamento da edição utilizando `Esc`

## Estrutura do projeto

```text
to-do-list/
│
├── assets/
│   └── img/
│       ├── check-icon.svg
│       ├── delete-icon.svg
│       ├── pencil-icon.svg
│       ├── plus-line-icon.svg
│       └── rules-icon.svg
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── index.html
│
└── README.md
```

## Como executar

O projeto não necessita de instalação de dependências.

### 1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Acesse a pasta

```bash
cd to-do-list
```

### 3. Execute

Abra o arquivo `index.html` no navegador.

Também é possível utilizar uma extensão como **Live Server** no Visual Studio Code para executar o projeto localmente.

## Funcionamento

As tarefas são mantidas em um array JavaScript durante a execução da aplicação.

Cada tarefa possui:

```javascript
{
    id: 123456789,
    text: "Estudar JavaScript",
    completed: false
}
```

As alterações são persistidas no navegador utilizando:

```text
localStorage
```

Dessa forma, as tarefas permanecem disponíveis mesmo após atualizar ou fechar a página.

## Organização do JavaScript

O código foi organizado separando as principais responsabilidades da aplicação:

- `loadTasks()` — recupera as tarefas armazenadas.
- `saveTasks()` — salva as tarefas no `localStorage`.
- `addTask()` — adiciona uma nova tarefa.
- `toggleTask()` — altera o status de conclusão.
- `deleteTask()` — remove uma tarefa.
- `editTask()` — inicia o modo de edição.
- `saveTask()` — salva uma tarefa editada.
- `renderTasks()` — atualiza a interface com as tarefas atuais.

Essa separação facilita a manutenção e deixa cada função responsável por uma operação específica.

## Responsividade

A interface foi desenvolvida para se adaptar a diferentes tamanhos de tela, mantendo a usabilidade em dispositivos desktop e mobile.

## Acessibilidade

Foram aplicadas algumas práticas básicas de acessibilidade, incluindo:

- `lang="pt-BR"` no documento;
- utilização de elementos semânticos;
- labels associados aos campos de formulário;
- `aria-label` em botões de ação;
- ícones decorativos com `alt=""`;
- suporte à navegação e edição por teclado;
- atualização dinâmica da lista utilizando `aria-live`.

## Objetivo

O projeto foi desenvolvido com foco em demonstrar conhecimentos de:

- Manipulação do DOM;
- JavaScript e lógica de programação;
- Gerenciamento de estado;
- Persistência de dados no navegador;
- HTML semântico;
- CSS responsivo;
- Organização e manutenção de código.