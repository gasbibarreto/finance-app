# personal-finance

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Deploy para GitHub Pages

### Configuração Inicial

1. **Ajuste o nome do repositório no `vite.config.ts`**:
   - Se seu repositório GitHub for `seu-usuario/personal-finance-app`, o `base` deve ser `/personal-finance-app/`
   - Se for `seu-usuario/finance-app`, mantenha `/finance-app/`
   - Se for a raiz do repositório (ex: `seu-usuario/seu-usuario.github.io`), use `base: '/'`

2. **Faça o deploy**:
   ```sh
   npm run deploy
   ```

   Este comando irá:
   - Executar o build do projeto (`predeploy`)
   - Publicar a pasta `dist` na branch `gh-pages` do seu repositório

### Configuração no GitHub

1. Vá em **Settings** > **Pages** do seu repositório
2. Em **Source**, selecione a branch `gh-pages` e a pasta `/ (root)`
3. Salve as configurações
4. Aguarde alguns minutos para o GitHub processar
5. Seu site estará disponível em: `https://seu-usuario.github.io/nome-do-repositorio/`

### Nota Importante

- O caminho `base` no `vite.config.ts` deve corresponder ao nome do seu repositório GitHub
- Se você mudar o nome do repositório, atualize o `base` no `vite.config.ts` e faça um novo deploy
