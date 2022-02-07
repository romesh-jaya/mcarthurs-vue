# McArthur's Self-service Kiosk App

This application, written in Vue.js is meant to be used in a self-service kiosk at a fast food restaurant. Users can choose which items they like and submit to the kitchen for preperation. Requires a touch-capable device with minimum display resolution of 1024\*768 in lanscape orientation.

Tech stack used:

- Vuex
- Vite
- Typescript
- SCSS
- Fontawesome icons
- Lazy loading routes
- Husky
- Composition API
- vee-validate for form validation
- Authentication

Backend integration with:

- STRAPI
- SANITY
- GRAPHCMS

The same dataset is present in all 3 backends. 3 different backends have been used for demo purposes only.

Site is hosted here:
https://mcarthurs-kiosk.web.app/

Note: Logout functionality hasn't been provided in the app, as we don't expect the Kiosk users to be able to logout by themselves. Instead, there is a 30 min timeout and store clerk can manually clear the browser cache if needed to logout.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
