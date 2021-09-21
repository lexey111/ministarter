# Mini starter

A tiny project containing

* React
* Typescript
* Less
* Jest |  Enzyme | ESLint | Puppeteer
* Webpack

Designed to be a starter kit for new apps. Includes a couple of components, `Checkbox` and `Dropdown`, just to demonstrate the approach and the structure of application and its components.

Project inspired by [this](https://github.com/shelfio/frontend-component-task) test task I've found during the surfing.

Application uses Less to process stylesheets, and `@variables.less` to define some values. It also includes special `@lib-prefix` processing via Webpack with allows aligning of JS and CSS (LESS) class names like:

```tsx
// tsx
declare const LIB_PREFIX: string; // webpack DefinePlugin

return <div className={LIB_PREFIX + '-checkbox'}>...</div>
```

```less
.@{lib-prefix}-checkbox {...}
```

## Building

1. `npm install`
2. `npm run build`, or `npm run build:dev`, or `npm start` for devserver on http://localhost:3030
3. or `docker-compose up` (Docker must be installed).

Build results will be placed to `dist` folder.

## Testing

* `npm run test`, or `npm run test:watch`
* `npm run coverage` for coverage report
* `npm start` and `npm run test:e2e` in other terminal for E2E


### Production build with Docker

Build `docker build -f Dockerfile.prod -t ministarter:prod .`

Then run `docker run -it --rm -p 1337:80 ministarter:prod` and check it on http://localhost:1337/

Or, with Composer: `docker-compose -f docker-compose.prod.yml up -d --build`
