# Auth0 Quickstart Application Theme

A theme for the Auth0 Quickstart applications based on [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/).

## Installation

To install the theme, use:

```bash
npm install --save-dev auth0-quickstarts/samples-bootstrap-theme
```


If you plan on using any of the JavaScript components in the Bootstrap library, you will also need to install [jQuery](https://github.com/jquery/jquery):

```bash
npm install --save-dev jquery
```

> **Note**: The intended use for this library is for the Auth0 QuickStart projects, which _do_ make use of JavaScript-enabled components, and so jQuery will need to be installed.

## Building Assets

To build the CSS assets into the `dist/` folder, use:

```bash
npm run build
```

This will then compile SCSS files into CSS, and minify the file to produce a production-ready version.

## Implementing the Custom Theme

Please read the [implementation guide](https://github.com/auth0-samples/samples-bootstrap-theme/wiki/Implementing-the-Design) for integrating this theme into a project.

## Version Information

This project uses the [Semver scheme](https://semver.org/) to manage versioning.

## Contributing

To contribute to this repository, please first read [the contributing guidelines](docs/CONTRIBUTING.md).
