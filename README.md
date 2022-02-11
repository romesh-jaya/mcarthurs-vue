# McArthur's Self-service Kiosk App

This PWA application, written in Vue.js is meant to be used in a self-service kiosk at a fast food restaurant. Users can choose which items they like and submit to the kitchen for preperation. Requires a touch-capable device with minimum display resolution of 1024\*768 in lanscape orientation. Keyboard is required for store clerk to login to the device (only at the start of the day maybe).

Site is hosted here:
https://mcarthurs-kiosk.web.app/

Login credentials:

- email: user1@mcarthurs.com
- password: mcarthur1

## Screenshots

<p align="center">
Home Page
</p>

<div align="center">
  <img src="https://user-images.githubusercontent.com/56665179/153539385-e949c174-fd29-4709-afd1-cb46f15be2c4.png" height="400" alt="Home page">
</div>

---

<p align="center">
Category Selection
</p>

<div align="center">
  <img src="https://user-images.githubusercontent.com/56665179/153539947-dda946d0-5797-4b06-a675-8d92bb62a7e4.png" height="400" alt="Category Selection">
</div>

---

<p align="center">
Item Quantity Selection
</p>

<div align="center">
  <img src="https://user-images.githubusercontent.com/56665179/153539949-254642ce-3b0a-45fe-9a2a-37db4502951d.png" height="400" alt="Item Quantity Selection">
</div>

---

<p align="center">
Order Details
</p>

<div align="center">
  <img src="https://user-images.githubusercontent.com/56665179/153539952-f27a4078-6961-4052-b62f-f8a845e10c2e.png" height="400" alt="Order Details">
</div>

---

<p align="center">
Order Confirmation
</p>

<div align="center">
  <img src="https://user-images.githubusercontent.com/56665179/153539943-9eb448ad-d32c-4347-97e8-937083d26177.png" height="400" alt="Order Confirmation">
</div>

---

## Architecture

Tech stack used:

- Vuex
- Vite
- PWA
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

The Sanity and GraphCMS servers are interfaced via a NodeJS middleware, which is used to hide the sensitive API keys for Sanity and GraphCMS.

Strapi and Sanity use axios while GraphCMS uses Apollo client to communicate with backend.

Here is the architectural overview:

<div align="center">
  <img src="https://github.com/romesh-jaya/mcarthurs-vue/blob/main/Architecture.png?raw=true" height="500" alt="Architecture">
</div>

## Notes

1. Logout functionality hasn't been provided in the app, as we don't expect the Kiosk users to be able to logout by themselves. Instead, there is a 30 min timeout and store clerk can manually clear the browser cache if needed to logout.

2. Strapi doesn't have refresh token functionality as of the date of writing the app. Also, it is hosted on Heroku free tier, which auto-cycles the dyno after 30 mins' non-usage. Therefore, 30min has been chosen as the JWT expiration window.

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
