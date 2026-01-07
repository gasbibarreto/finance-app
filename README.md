# Personal Finance App 💰

Aplicativo de gerenciamento de finanças pessoais desenvolvido com Vue 3, TypeScript e Pinia. Este projeto permite que os usuários gerenciem suas transações, orçamentos, potes de economia e contas recorrentes de forma intuitiva e eficiente.

![Design preview for the Personal finance app coding challenge](../preview.jpg)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Deploy](#deploy)
- [Desenvolvimento](#desenvolvimento)

## 🎯 Sobre o Projeto

Este é um aplicativo completo de finanças pessoais que permite aos usuários:

- Visualizar uma visão geral completa das finanças
- Gerenciar transações com busca, filtro e ordenação
- Criar e gerenciar orçamentos por categoria
- Criar e gerenciar potes de economia
- Acompanhar contas recorrentes e seus status
- Calcular automaticamente saldo, receitas e despesas

O projeto foi desenvolvido como solução para o desafio [Personal finance app do Frontend Mentor](https://www.frontendmentor.io/challenges/personal-finance-app-JfjtZgyMt1).

## 🛠 Tecnologias Utilizadas

### Core
- **Vue 3** (^3.5.22) - Framework JavaScript progressivo
- **TypeScript** (^5.9.3) - Tipagem estática
- **Vite** (^7.1.11) - Build tool e dev server

### Gerenciamento de Estado
- **Pinia** (^3.0.3) - Store de estado global

### Roteamento
- **Vue Router** (^4.6.3) - Roteamento SPA (configurado)

### Estilização
- **Less** (^4.4.2) - Pré-processador CSS

### Testes
- **Vitest** (^3.2.4) - Framework de testes
- **Vue Test Utils** (^2.4.6) - Utilitários de teste para Vue

### Qualidade de Código
- **ESLint** (^9.37.0) - Linter
- **Prettier** (3.6.2) - Formatador de código
- **Vue TSC** (^3.1.1) - Type checking para Vue

### Deploy
- **gh-pages** (^6.3.0) - Deploy para GitHub Pages

## ✨ Funcionalidades

### 📊 Overview (Visão Geral)
- Exibição do saldo atual, receitas e despesas
- Visualização dos primeiros 4 potes de economia
- Resumo de contas recorrentes (pagas, próximas e vencidas)
- Lista dos últimos orçamentos criados
- Últimas transações realizadas

### 💳 Transações
- Listagem completa de todas as transações
- **Paginação**: 10 transações por página
- **Busca**: Por nome da transação
- **Filtro**: Por categoria (Entertainment, Bills, Groceries, Dining Out, Transportation, Personal Care, Education, Lifestyle, Shopping, General)
- **Ordenação**: Latest, Oldest, A to Z, Z to A, Highest, Lowest

### 📈 Orçamentos (Budgets)
- **CRUD completo**: Criar, visualizar, atualizar e deletar orçamentos
- Cálculo automático do valor gasto por categoria no mês atual
- Visualização das 3 últimas transações de cada categoria
- Gráfico de progresso (donut chart) para cada orçamento
- Navegação para página de transações com filtro aplicado ao clicar em "See All"

### 🏦 Potes de Economia (Pots)
- **CRUD completo**: Criar, visualizar, atualizar e deletar potes
- Adicionar dinheiro aos potes (deduz do saldo atual)
- Retirar dinheiro dos potes (adiciona ao saldo atual)
- Visualização do progresso em relação à meta
- Exclusão de potes retorna o dinheiro ao saldo

### 🔄 Contas Recorrentes (Recurring Bills)
- Listagem de todas as contas recorrentes
- Agrupamento por fornecedor (apenas um item por fornecedor)
- Status das contas: Pagas, Próximas e Vencidas
- **Busca**: Por nome do fornecedor
- **Ordenação**: Latest, Oldest, A to Z, Z to A, Highest, Lowest

### 🎨 Interface
- Design responsivo (desktop, tablet e mobile)
- Estados de hover e focus em todos os elementos interativos
- Navegação completa via teclado
- Validação de formulários com mensagens de erro
- Modais para ações (adicionar/retirar dinheiro, deletar itens)

## 📁 Estrutura do Projeto

```
personal-finance/
├── src/
│   ├── assets/
│   │   ├── data/
│   │   │   └── data.json          # Dados iniciais do aplicativo
│   │   ├── fonts/                 # Fontes do projeto
│   │   └── svg/                   # Ícones SVG
│   ├── components/
│   │   ├── actionsModal/          # Modais de ações
│   │   │   ├── ActionsModal.vue
│   │   │   ├── AddMoneyOrWithdraw.vue
│   │   │   └── DeleteItem.vue
│   │   ├── budgets/               # Componentes de orçamentos
│   │   │   ├── AddNewBudget.vue
│   │   │   ├── Budgets.vue
│   │   │   └── CardBudget.vue
│   │   ├── pots/                  # Componentes de potes
│   │   │   ├── AddNew.vue
│   │   │   ├── CardPots.vue
│   │   │   └── Pots.vue
│   │   ├── transactions/          # Componentes de transações
│   │   │   ├── Transactions.vue
│   │   │   └── TransactionsList.vue
│   │   ├── Card.vue               # Componente de card reutilizável
│   │   ├── Menu.vue               # Menu de navegação
│   │   ├── Overview.vue           # Página de visão geral
│   │   └── RecurringBills.vue     # Página de contas recorrentes
│   ├── composables/
│   │   └── useColors.ts           # Composable para cores
│   ├── stores/
│   │   └── finance.ts             # Store Pinia para gerenciamento de estado
│   ├── router/
│   │   └── index.ts               # Configuração do Vue Router
│   ├── common/
│   │   └── common.ts              # Funções utilitárias
│   ├── App.vue                    # Componente raiz
│   ├── main.ts                    # Entry point
│   ├── interfaces.ts              # Interfaces TypeScript
│   ├── types.ts                   # Tipos TypeScript
│   └── styles.less                # Estilos globais
├── public/                        # Arquivos estáticos
├── dist/                          # Build de produção
├── package.json
├── tsconfig.json                  # Configuração TypeScript
├── vite.config.ts                 # Configuração Vite
└── vitest.config.ts               # Configuração Vitest
```

## 📦 Pré-requisitos

- **Node.js** >= 20.19.0
- **npm** ou **yarn**

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd personal-finance-app/personal-finance
```

2. Instale as dependências:
```bash
npm install
```

## 📜 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev
```
Inicia o servidor de desenvolvimento com hot-reload na porta padrão do Vite.

### Build de Produção
```bash
npm run build
```
Gera os arquivos otimizados para produção na pasta `dist/`.

### Preview do Build
```bash
npm run preview
```
Visualiza o build de produção localmente antes do deploy.

### Type Checking
```bash
npm run type-check
```
Executa verificação de tipos TypeScript usando `vue-tsc`.

### Linting
```bash
npm run lint
```
Executa o ESLint para verificar e corrigir problemas de código.

### Testes
```bash
npm run test:unit
```
Executa os testes unitários usando Vitest.

## 🌐 Deploy para GitHub Pages

### Configuração Inicial

1. **Ajuste o nome do repositório no `vite.config.ts`**:
   - Se seu repositório GitHub for `seu-usuario/personal-finance-app`, o `base` deve ser `/personal-finance-app/`
   - Se for `seu-usuario/finance-app`, mantenha `/finance-app/`
   - Se for a raiz do repositório (ex: `seu-usuario/seu-usuario.github.io`), use `base: '/'`

2. **Faça o build do projeto**:
   ```sh
   npm run build
   ```

3. **Faça o deploy usando gh-pages**:
   ```sh
   npx gh-pages -d dist
   ```
   
   Este comando irá:
   - Publicar a pasta `dist` na branch `gh-pages` do seu repositório
   
   **Alternativa**: Você pode adicionar um script de deploy no `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && npx gh-pages -d dist"
   }
   ```
   
   Depois, basta executar:
   ```sh
   npm run deploy
   ```

### Configuração no GitHub

1. Vá em **Settings** > **Pages** do seu repositório
2. Em **Source**, selecione a branch `gh-pages` e a pasta `/ (root)`
3. Salve as configurações
4. Aguarde alguns minutos para o GitHub processar
5. Seu site estará disponível em: `https://seu-usuario.github.io/nome-do-repositorio/`

### Nota Importante

- O caminho `base` no `vite.config.ts` deve corresponder ao nome do seu repositório GitHub
- Se você mudar o nome do repositório, atualize o `base` no `vite.config.ts` e faça um novo deploy

## 💻 Desenvolvimento

### Gerenciamento de Estado

O projeto utiliza **Pinia** para gerenciamento de estado centralizado. A store principal (`finance.ts`) gerencia:

- **Balance**: Saldo atual, receitas e despesas
- **Transactions**: Lista de transações
- **Budgets**: Lista de orçamentos
- **Pots**: Lista de potes de economia
- **Computed Properties**: Contas recorrentes pagas, próximas e vencidas

### Customização

Para mais informações sobre configuração do Vite, consulte a [Documentação do Vite](https://vite.dev/config/).

## 📝 Licença

Este projeto foi desenvolvido como solução para um desafio do Frontend Mentor.

## 🙏 Agradecimentos

- [Frontend Mentor](https://www.frontendmentor.io) pelo desafio

---

**Desenvolvido com ❤️ usando Vue 3 + TypeScript**
