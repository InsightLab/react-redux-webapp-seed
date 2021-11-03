# react-redux-webapp-seed

Repositório Template contendo estrutura base visando facilitar o início de um novo projeto ReactJS.
Listamos aqui algumas bibliotecas e conceitos que acreditamos ser bastante úteis durante o desenvolvimento.

### Bibliotecas

> **TypeScript** ~ maior escalabilidade devido ao código mais legível e confiável/tipagem
> **React, React-DOM, React-Router** ~ ReactJS para Web com gerenciador de Rotas
> **Redux Toolkit, Thunk, Saga** ~ definição de estados compartilhados/globais
> **Cypress** ~ testes de integração com dados mock - foco inicial em "testes de aceitação"
> **Jest, Testing-Library** ~ testes unitários para componentes/custom-hooks mais críticos
> **Styled-Components** ~ melhor componentização definindo estilos mais isolados via CSS-in-JS
> **Axios** ~ melhor controle de requisições web para diferentes APIs
> **Ramda, useHooksTS** ~ funções e hooks utilitários

### Estrutura Geral

O template possui uma separação lógica inicial para os diferentes tipos de componentes.

```bash
.
├── cypress   # testes de integração
├── public    # arquivos estáticos públicos
└── src
     ├── components   # todos os componentes visuais React
     │    ├── layout  # componentes de layout (header, footer, etc)
     │    ├── pages   # componentes de página
     │    └── shared  # componentes compartilhados entre páginas e/ou layout
     ├── hooks   # hooks de uso geral como useAsyncRequest, useAuth,...
     ├── redux   # configurações redux e redux-saga
     ├── theme   # definição de estilos globais, fontes, dark-mode,...
     └── services         # comunicação com serviços externos
          └── resources   # configurações axios, websockets, event-sources,...
```

### Alguns Conceitos

Na tentativa de controlar um pouco o crescimento da complexidade do software, sugerimos alguns conceitos simples porém importantes.

##### C1 - Pensar em componentes isolados

Componentes específicos de uma página devem ser definidos próximo ao componente que o utiliza.
Assumir que alguém irá utilizar o novo componente fará que o diretório **shared** tenha muitos componentes, às vezes sendo utilizado apenas por uma única página - ou nenhuma.

##### C2 - Gerenciamento de estados por custom hooks

Sempre que um componente estiver definindo muitos estados/useState tente isolar esses dados em um custom hook. Se o estado precisa ser compartilhado entre diferentes componentes da aplicação, o custom hook será a interface de abstração ao dado - seja via Context API ou Redux.

##### C3 - Testes com foco em documentação

Quando necessário, tentar definir testes pensando sempre na especificação do software (testes de aceitação) utilizando o Cypress com dados mock. Para testes unitários optamos por criar um arquivo de mesmo nome com sufixo **.test** - isolando no mesmo diretório o componente e seus testes.

### Componente Exemplo

Um componente **UserProfilePage** poderia ser inicialmente definido nesta estrutura

```bash
.
└── src/pages/User/Profile/
     ├── index.tsx        # define/exporta componente UserProfilePage
     ├── State.ts         # custom-hooks contendo estados/comportamentos da página
     ├── View.tsx         # componente visual que recebe todos os valores via props
     ├── View.styled.tsx  # estilos específicos para o componente View
     └── View.test.tsx    # testes unitários do componente View para diferentes props
```

PS1: Podemos criar um **State.test.ts** uma vez que nossos estados estão isolados via um custom-hook.
PS2: Caso nosso componente View utilize apenas componentes de **shared/** então **View.styled.tsx** pode ser removido.
PS3: Testar nosso componente View é simples uma vez que o mesmo apenas renderiza props.

### Rotas

Todas as rotas possíveis da aplicação são definidas no arquivo **src/routes.ts**

```javascript
// ...
export const routes: TRoute[] = [
  {
    path: '/users',
    component: pages.UsersListPage, // # algum componente de página
    permission: () => true, // # alguma função para validar permissões do usuário
  },
  // ...
];
```
