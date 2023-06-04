# potber

This is a mobile-first web client for the german internet forum [forum.mods.de](https://forum.mods.de) built with [ember.js](https://emberjs.com/). If you're looking for the potber API, you can find it [here](https://github.com/spuxx1701/potber-api).

1. [How to use](#Howtouse)
2. [Core features](#Corefeatures)
   2.1. [Browser support](#Browsersupport)
   2.2. [Standalone mode (PWA)](#StandalonemodePWA)
3. [How to develop or build the app](#Howtodeveloporbuildtheapp)
   3.1. [Prerequisites](#Prerequisites)
   3.2. [Installation](#Installation)
   3.3. [Running / Development](#RunningDevelopment)
   3.3.1. [Linting](#Linting)
   3.3.2. [Building](#Building)
   3.3.3. [Deploying](#Deploying)
4. [BBCode parser](#BBCodeparser)
5. [Further Reading / Useful Links](#FurtherReadingUsefulLinks)

## 1. <a name='Howtouse'></a>How to use

Visit https://www.potber.de (or https://test.potber.de for the staging environment) to use the app.

## 2. <a name='Corefeatures'></a>Core features

### 2.1. <a name='Browsersupport'></a>Browser support

Potber supports the following browsers. Other browser might work, but are not supported. The app might still behave and display differently on different devices.

- Chrome >= 108
- Chrome for Android >= 108
- Firefox >= 107
- Firefox for Android >= 107
- Safari on iOS >= 16.1

### 2.2. <a name='StandalonemodePWA'></a>Standalone mode (PWA)

The app supports standalone mode ([PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)). In stadalone mode, the website behaves almost exactly like an App. Whether your browser supports standalone mode and how to enable it highly depends on your browser. Android Chrome offers an option to "Install app" in your website settings, while iOS Safari has an option to "Add website to home screen". If you're having trouble, maybe [this article](https://web.dev/learn/pwa/installation/) can be of help.

## 3. <a name='Howtodeveloporbuildtheapp'></a>How to develop or build the app

### 3.1. <a name='Prerequisites'></a>Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with npm)
- [Ember CLI](https://cli.emberjs.com/release/)
- [potber-api](ttps://github.com/spuxx1701/potber-api) - Without this web server, potber-client does not function.

### 3.2. <a name='Installation'></a>Installation

- `git clone https://github.com/spuxx1701/potber-client.git`
- `cd potber-client`
- `npm install`

### 3.3. <a name='RunningDevelopment'></a>Running / Development

- Clone [potber-api](https://github.com/spuxx1701/potber-api) and start up a local instance.
- Start up the development server with `npm start`.
- Visit the app at [http://localhost:4200](http://localhost:4200).

#### 3.3.1. <a name='Linting'></a>Linting

- `npm run lint`
- `npm run lint:fix`

#### 3.3.2. <a name='Building'></a>Building

- `ember build` (development)
- `ember build --environment staging` (staging)
- `ember build --environment production` (production)

#### 3.3.3. <a name='Deploying'></a>Deploying

The application can be deployed via [Docker](https://docker.com). The application provides two different Dockerfiles for the staging and production environments:

- [staging](Dockerfile.staging)
- [production](Dockerfile.production)

After building the Docker image, you can run it locally or on a remote host. In case you're curious about how `potber.de` is hosted: Both the [test](https://test.potber.de) and [production](https://potber.de) environments run on a [Flux](https://fluxcd.io)-controlled [MicroK8s](https://microk8s.io) cluster. The infrastructure is documented [here](https://github.com/spuxx1701/flux/tree/master/cluster/apps/potber).

## 4. <a name='BBCodeparser'></a>BBCode parser

The application includes a functioning and fully custom BBCode parser written in TypeScript. It is able to parse most of the board's BBCode without errors and is being continously worked on. You can find it [here](app/services//content-parser.ts).

## 5. <a name='FurtherReadingUsefulLinks'></a>Further Reading / Useful Links

- [ember.js](https://emberjs.com/) - The framework.
- [potber-api](https://github.com/spuxx1701/potber-api) - The web server that potber-client utilizes.
- [dockerhub](https://hub.docker.com/repository/docker/spuxx/potber-client/general) - The dockerhub repository.
