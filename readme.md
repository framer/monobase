### Monobase

A fast and simple React static site generator that let's you build a site from a set of components.

#### Quick start

* Download the [default.com](http://goo.gl/cLdfQG) template
* `cd ~/Downloads/default.com`
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

To mark components as interactive:

* Wrap them in the `Dynamic` component [[example](https://github.com/koenbok/monobase/blob/master/examples/default.com/components/Timer.tsx#L22)]
* Export them in `/components/dynamic.ts` [[example](https://github.com/koenbok/monobase/blob/master/examples/default.com/components/dynamic.ts#L2)]

#### Example dynamic components

You can find these in the default project `/components` folder.

* **Button** – Just a button you can click.
* **Timer** - A timer that displays the running time in ms.
* **Cookie** - An input that stores values in a cookie. [todo]
* **Scroll** – An element that responds to page scrolling. [todo]
* **Mouse** – A mouse location display.
* **RandomImage** - An unsplash random image element.

#### Todo

* Make project based (non relative) path loading work.
* Improve dynamic component discovery (automagically).
