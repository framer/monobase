<h1 align="center">Monobase</h1>

<div align="center">
  A fast and simple React static site generator that builds sites from components.
</div>

<br />

![monobase](https://cl.ly/60b82a79ec07/Image%2525202019-04-23%252520at%25252011.07.52%252520PM.png)

<hr />

[See an example of the default deployed project.](https://romantic-williams-000b9b.netlify.com/)

#### Quick start

- Download the [default project template](https://github.com/koenbok/monobase/raw/master/project.zip)
- `cd ~/Downloads/project`
- `make serve` to start you dev server
- `make build` to generate your site

#### Why is it great?

Monobase let's you build sites in a [component based way](https://reactjs.org/docs/react-component.html), allowing you to isolate and re-use every part of your website. Don't build a site, build a site _system_, and re-use it everywhere.

More great features:

- Components can be optionally be interactive (if marked with `Dynamic()`).
- Style and correctness enforcing through [TypeScript](https://www.typescriptlang.org/) and [Prettier](https://prettier.io/).
- Automatic fast browser reloading on changes.
- Fast with even huge sites through incremental rendering.
- Easily extendable with existing React components.
- Automatic port selection if default is taken.
- Secure SSL serving by default.
- Nicely formatted terminal logging.
- Extensive error page with hints for common issues.
- Optimized builds for production.

#### Project layout

- `/Makefile` Shorthands for commands to quickly build or install.
- `/pages` The html pages including site structure.
- `/pages/index.tsx` Default index page.
- `/pages/404.tsx` File not found page.
- `/components` The React Components used by the pages.
- `/components/template.tsx` Default page template.
- `/static` Just static files like css, images, fonts and downloads.

#### Dynamic components

Some React components are interactive. Monobase generates a single script called components.js containing every _marked_ component and [hydrates](https://reactjs.org/docs/react-dom.html#hydrate) them after the page load so they become interactive. This means the inital html gets loaded statically, and then code attaches itself automatically after page load.

To mark components as interactive wrap them in the `Dynamic` component [[example](https://github.com/koenbok/monobase/blob/master/project/components/examples/Timer.tsx#L27)]

#### Example dynamic components

You can find these in the default project `/components/examples` folder.

- **Grid** - A simple but dynamic grid.
- **Button** – Just a button you can click.
- **Timer** - A timer that displays the running time in ms.
- **Cookie** - An input that stores values in a cookie.
- **Scroll** – An element that responds to page scrolling. [todo]
- **Mouse** – A mouse location display.
- **Styled** – An example of a static, inline styled component.
- **Picture** - A responsive image loader.
- **Visible** - A wrapper that hides the content if offscreen.
- **Unsplash** - An unsplash random image element.

#### SSL on localhost

Monobase uses ssl / https on localhost. By default you'll have to click some warning away everytime. To make ssl work on localhost you can install [mkcert](https://github.com/FiloSottile/mkcert).

- `brew install mkcert`
- `mkcert -install`
- Restart your browser

#### Gotchas

- On a page or component edit the current page and every component in the `project/components` will be reloaded. So make sure every file you'd like to use with autoreload is in either the `project/pages` or `project/components` folder.
- Only the hydrated components will show in the React Dev tools, as it uses runtime introspection and can't find static html components.

#### Styled Components

It's easy to use Styled Components with Monobase. Just import `StyledSheet` and use it in your template to inline all the generated css. To get a great experience in VSCode, make sure to use the [Styled Components Extension](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components).

```.jsx
import { Development, StyledSheet } from "monobase";

export default function Template(props) {
  return (
    <html>
      <head>
        <StyledSheet app={props.children} />
      </head>
      <body>
        {props.children}
        <Development />
      </body>
    </html>
  );
}
```

#### Performance

Monobase generates a combined bundle for all of your pages, which contains all the JavaScript. Minified and gzipped it's around 40kb (depending on the size of your site) which is smaller than most images. Once it's loaded, it's cached for every page.


#### Deployment

The output of `make build` is just a web project that you can deploy anywhere, like Amazon S3 sites or Netlify. I myselfs also really like [Zeit](https://zeit.co/) or [Netlify](https://netlify.com) for static websites.

- Install Zeit: `yarn --global install now`
- Build project: `make build`
- Upload: `now ./build`
