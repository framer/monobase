### Monobase

A fast and simple React static site generator that keep interactive components interactive.

#### Quick start

* Download the [default.com](goo.gl/cLdfQG) template
* `cd ~/Downloads/default.com`
* `make serve` to start you dev server
* `make build` to generate your site

#### Why is it great?

Monobase let's you build sites in a component based way, allowing you to isolate and re-use every part of your website.

#### Project layout

* `Makefile` Shorthands for commands to quickly build or install.
* `pages` The html pages including site structure.
* `components` The React Components used by the pages.
* `static` Just static files like images, fonts and downloads.

#### Dynamic components

Some React components are interactive. Monobase generates a single script called components.js containing every _marked_ component and [hydrates](https://reactjs.org/docs/react-dom.html#hydrate) them after the page load so they become interactive.

To mark components as interactive:

* Wrap them in the Dynamic Component [example](https://github.com/koenbok/monobase/blob/master/examples/default.com/components/Timer.tsx#L22)
* Export them in `components/dynamic.ts` [example](https://github.com/koenbok/monobase/blob/master/examples/default.com/components/dynamic.ts#L2)
