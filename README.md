# potber

This is a mobile-first web client for the german internet forum [forum.mods.de](https://foru.mods.de) built with [ember.js](https://emberjs.com/). You can find the application at

- https://potber.de/ - Productive environment
- https://test.potber.de/ - Test environment

## How to use

Visit https://potber.de/ and browse away!

If you have trouble logging in, you can simply log in manually on [https://forum.mods.de](https://forum.mods.de). potber and the original forum share a single session.

## Core features

### Location

Visit https://www.potber.de (or https://test.potber.de for the test environment) to use the app.

### Browser support

Potber supports the following browsers. Other browser might work, but are not supported. The app might still behave and display differently on different devices.

- Chrome >= 108
- Chrome for Android >= 108
- Firefox >= 107
- Firefox for Android >= 107
- Safari on iOS >= 16.1

## How to develop or build the app

### Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with npm)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Docker Engine](https://docs.docker.com/engine/release-notes/)
- [Docker Compose](https://docs.docker.com/compose/release-notes/)

### Installation

- `git clone https://github.com/spuxx1701/potber.git`
- `cd potber`
- `npm install`

### Running / Development

- Start up the CORS proxy server with `cd .cors-proxy && docker-compose up`.
- Start up the development server with `npm start`.
- Visit the app at [http://localhost:4200](http://localhost:4200).

#### Linting

- `npm run lint`
- `npm run lint:fix`

#### Building

- `ember build` (development)
- `ember build --environment integration` (integration)
- `ember build --environment production` (production)

#### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [ember-cli](https://cli.emberjs.com/release/)
