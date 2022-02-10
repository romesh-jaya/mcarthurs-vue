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
- Apollo client
- Axios interceptors

Backend integration with:

- STRAPI
- SANITY
- GRAPHCMS

The same dataset is present in all 3 backends. 3 different backends have been used for demo purposes only. The type of BE used can be changed via the env variable VITE_BE_SERVER.

Site is hosted here:
https://mcarthurs-kiosk.web.app/

Login credentials:
email: user1@mcarthurs.com
password: mcarthur1

Note: Logout functionality hasn't been provided in the app, as we don't expect the Kiosk users to be able to logout by themselves. Instead, there is a 30 min timeout and store clerk can manually clear the browser cache if needed to logout.

The Sanity and GraphCMS servers are interfaced via a NodeJS middleware, which is used to hide the sensitive API keys for Sanity and GraphCMS.

Strapi and Sanity use axios while GraphCMS uses Apollo client to communicate with backend.

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
