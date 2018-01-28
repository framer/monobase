### Monobase

A fast and simple React static site generator that let's you build a site from a set of components.

#### Quick start

* Download the [default project template](https://raw.githubusercontent.com/koenbok/monobase/master/project.zip)
* `cd ~/Downloads/project`
* `make serve` to start you dev server
* `make build` to generate your site

#### Why is it great?

Monobase let's you build sites in a [component based way](https://reactjs.org/docs/react-component.html), allowing you to isolate and re-use every part of your website. Don't build a site, build a site _system_.

More great features:

* Components can be optionally be interactive (if marked dynamic).
* Style and correctness enforcing through [TypeScript](https://www.typescriptlang.org/) and [Prettier](https://prettier.io/).
* Automatic browser reloading on changes.
* Fast with even huge sites through incremental rendering.
* Easily extendable with existing React components.
* Extra fast reloading on css only file changes [todo].
* Automatic port selection if default is taken.
* Secure SSL serving by default.
* Nicely formatted terminal logging.
* Extensive error page with hints for common issues.

#### Project layout

* `/Makefile` Shorthands for commands to quickly build or install.
* `/pages` The html pages including site structure.
* `/pages/index.ts` Default index page.
* `/pages/404.ts` File not found page.
* `/components` The React Components used by the pages.
* `/components/template.ts` Default page template.
* `/static` Just static files like css, images, fonts and downloads.

#### Dynamic components

Some React components are interactive. Monobase generates a single script called components.js containing every _marked_ component and [hydrates](https://reactjs.org/docs/react-dom.html#hydrate) them after the page load so they become interactive. This means the inital html gets loaded statically, and then code attaches itself automatically after page load.

To mark components as interactive wrap them in the `Dynamic` component [[example](https://github.com/koenbok/monobase/blob/master/examples/default.com/components/examples/Timer.tsx#L22)]

#### Example dynamic components

You can find these in the default project `/components/examples` folder.

* **Grid** - A simple but dynamic grid.
* **Button** – Just a button you can click.
* **Timer** - A timer that displays the running time in ms.
* **Cookie** - An input that stores values in a cookie.
* **Scroll** – An element that responds to page scrolling. [todo]
* **Mouse** – A mouse location display.
* **Styled** – An example of a static, inline styled component.
* **Picture** - A responsive image loader.
* **Visible** - A wrapper that hides the content if offscreen.
* **Unsplash** - An unsplash random image element.

#### Gotchas

* On a page or component edit the current page and every component in the `project/components` will be reloaded. So make sure every file you'd like to use with autoreload is in either the `project/pages` or `project/components` folder.
* Only the hydrated components get picked up by the React Dev tools, as it uses runtime introspection and can't find static html components.

#### Todo

* ~~Make project based (non relative) path loading work.~~
* ~~Improve dynamic component discovery (automagically, tips welcome).~~
* ~~Harden component hydration with unique names based on component file hashes.~~
* ~~Minified `component.js` settings for production.~~
* ~~Potential speedup: separate ts type checking from compilation, like `awesome-ts-loader`.~~
* Make a development page listing all components at `/components` where you can click them to see an isolated version.

#### Deployment

The output of `make build` is just a web project that you can deploy anywhere, like Amazon S3 sites or Netlify. I myselfs also really like [Zeit](https://zeit.co/) for static websites.

* Install Zeit: `yarn --global install now`
* Build project: `make build`
* Upload: `now ./build`
