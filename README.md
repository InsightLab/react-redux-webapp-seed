# react-redux-webapp-seed

Esse é um Repositório Template contendo a estrutura base de um projeto ReactJS com o objetivo de facilitar o início do seu desenvolvimento.

Listamos aqui algumas bibliotecas e conceitos que acreditamos ser bastante úteis para o desenvolvimento.

### Bibliotecas

> **TypeScript** ~ traz mais legibilidade e confiabilidade ao JavaScript tradicional
> **React, React-DOM, React-Router** ~ ReactJS para Web com gerenciador de Rotas
> **Redux Toolkit, Thunk, Saga** ~ gerenciamento de estados globais
> **Cypress** ~ testes de integração com dados *mockados* com foco inicial em "testes de aceitação"
> **Jest, Testing-Library** ~ testes unitários para componentes e *custom hooks* mais críticos
> **Styled-Components** ~ melhor componentização definindo estilos vinculados a componentes React utilizando uma abordagem *CSS-in-JS*
> **Axios** ~ melhor controle de requisições web para diferentes APIs
> **Ramda, useHooksTS** ~ conjuntos de funções e hooks utilitários de propósito geral

### Estrutura Geral

O template possui uma separação lógica inicial para os diferentes tipos de componentes.

```bash
.
├── cypress   # testes de integração
├── public    # arquivos estáticos públicos
└── src
     ├── components   # todos os componentes React que irão compor a aplicação
     │    ├── layout  # componentes que definem o layout geral da aplicação como headers, footers, etc.
     │    ├── pages   # componentes que definem as páginas da aplicação
     │    └── shared  # componentes compartilhados que podem ser reutilizados por outros componentes
     ├── hooks   # hooks de uso geral como useAsyncRequest, useAuth, etc.
     ├── redux   # configurações redux e redux-saga
     ├── theme   # definição de estilos globais, fontes, dark-mode, etc.
     └── services         # comunicação com serviços externos
          └── resources   # configurações axios, websockets, event-sources, etc.
```

### Alguns Conceitos

Na tentativa de controlar um pouco o crescimento da complexidade do software, sugerimos a adesão  de alguns conceitos simples, porém importantes.

##### C1 - Pensar em componentes isolados

Os diretórias de páginas de componentes delimitam contextos específicos para cada uma daquelas pastas. Assim, componentes específicos de uma página devem ser definidos próximo ao componente que o utiliza, isto é, se o desenvolvedor precisa construir um componente que será utilizado inicialmente apenas dentro do contexto de uma página, ele pode construí-lo dentro da sub-árvore do diretório dessa página. 

Uma vez que um componente que esteja interno a uma página precise ser reutilizado em outro componente, ele deve ser movido para o diretório `shared`. Desta forma, evita-se que o diretório `shared` cresça desnecessariamente com componentes que não sejam de fato reutilizados em mais de um componente. 

Em hipótese alguma um componente que esteja dentro do diretório de uma página deve reutilizar um componente definido dentro do diretório de outra página.

**C2 - Separação de responsabilidades**

Quando um componente possuir uma lógica complexa, com uso de estados, requisições de dados externos através de uma API ou múltiplos fluxos internos, recomenda-se que este componente seja divido em dois: uma responsável pelo gerenciamento de todas essas funções extras (*container*) e outro responsável apenas pela parte visual do componente (*view*). Esse padrão confere um maior isolamento de funções entre os componentes, além de trazer uma série de pontos positivos em aspectos de legibilidade e testabilidade do código.

##### C3 - Gerenciamento de estados através de *custom hooks*

Ainda sobre separação de responsabilidades, recomendá-se que sempre que um componente estiver definindo muitos estados, esse gerenciamento de estado seja isolado através de um *custom hook* que retorne ao componente apenas o que for importante para ele realizar sua função. Se esse estado precisar ser compartilhado entre diferentes componentes da aplicação, o custom hook será a interface de abstração ao dado - seja via Context API, quando só é necessário compartilhar estado dentro da sub-árvore do componente, normalmente para evitar o [prop drilling](https://kentcdodds.com/blog/prop-drilling), seja via Redux, em situações em que o estado compartilhado precisa estar global na aplicação, tanto para consulta quanto para atualização.

##### C4 - Testes com foco em documentação

Quando necessário, tentar definir testes pensando sempre na especificação do software (testes de aceitação) utilizando o Cypress com dados *mockados*. Para testes unitários optamos por criar um arquivo de mesmo nome com sufixo `.test` - isolando no mesmo diretório o componente e seus testes.

##### C5 - Componentes estilizados

Quando for necessário definir um componente estilizado, que ainda não tenha sido definido, específico para outro componente, ele deve ser construído em um arquivo que leva o mesmo nome do arquivo original com a adição do sufixo .styled. Por exemplo, se o arquivo do componente original se chamar `View.tsx`, o arquivo contendo componentes estilizados utilizados por ele deve se chamar `View.styled.tsx`. Assim como qualquer outro componentes, os componentes estilizados que forem reaproveitados em contextos diferentes, devem ser criados ou movidos para o diretório `shared`. 

### Componente Exemplo

Um componente chamado **UserProfilePage** poderia ser inicialmente definido nesta estrutura

```bash
.
└── src/pages/User/Profile/
     ├── index.tsx        # define/exporta componente UserProfilePage
     ├── State.ts         # custom-hooks contendo estados/comportamentos da página
     ├── View.tsx         # componente visual que recebe todos os valores via props
     ├── View.styled.tsx  # componentes estilizados específicos para o componente View
     └── View.test.tsx    # testes unitários do componente View para diferentes props
```

Obs1: Podemos criar um `State.test.ts` uma vez que nossos estados estão isolados via um *custom hook*.
Obs2: Caso nosso componente `View` utilize apenas componentes do diretório `shared`, então o arquivo `View.styled.tsx` pode ser removido.
Obs3: Testar nosso componente `View` é simples uma vez que o mesmo apenas renderiza props.

### Rotas

Todas as rotas possíveis da aplicação deverão ser definidas no arquivo `src/routes.ts` seguindo o padrão abaixo:

```javascript
// ...
export const routes: TRoute[] = [
  {
    path: '/users', 					 	// a rota propriamente dita para uma página
    component: pages.UsersListPage, 	 	// o componente de página relacionado à rota definida
    permission: (user: TUserMe) => true, 	// função para validar as permissões do usuário à rota definida
  },
  // ...
];
```
