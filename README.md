# potber

This is a mobile-first web client for the german internet forum [forum.mods.de](https://foru.mods.de) built with [ember.js](https://emberjs.com/). If you're looking for the potber API, you can find it [here](https://github.com/spuxx1701/potber-api).

## How to use

Visit https://www.potber.de (or https://test.potber.de for the test environment) to use the app.

## Core features

### Browser support

Potber supports the following browsers. Other browser might work, but are not supported. The app might still behave and display differently on different devices.

- Chrome >= 108
- Chrome for Android >= 108
- Firefox >= 107
- Firefox for Android >= 107
- Safari on iOS >= 16.1

### Standalone mode (PWA)

The app supports standalone mode ([PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)). In stadalone mode, the website behaves almost exactly like an App. Whether your browser supports standalone mode and how to enable it highly depends on your browser. Android Chrome offers an option to "Install app" in your website settings, while iOS Safari has an option to "Add website to home screen". If you're having trouble, maybe [this article](https://web.dev/learn/pwa/installation/) can be of help.

## How to develop or build the app

### Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with npm)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Docker Engine](https://docs.docker.com/engine/release-notes/)
- [Docker Compose](https://docs.docker.com/compose/release-notes/)

### Installation

- `git clone https://github.com/spuxx1701/potber-client.git`
- `cd potber-client`
- `npm install`

### Running / Development

- Clone [potber-api](https://github.com/spuxx1701/potber-api) and start up a local instance.
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
