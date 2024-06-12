
# @xso/router

Based on the URL of the link used in the browser, this will route to content-related.

It is a very important mechanism for building websites using the XSO framework, it changes the content related to the link without a page refresh.

> Changes the link and the content dynamically, preserving the page state and avoiding page refresh.

Works like other implementations found in React, Vue, Angular, Svelte, and more.

## Documentation

Here is the official website with the full documentation:

- [xsojs.dev](https://www.xsojs.dev/framework/router)

## Install

To start playing with XSO COM:

`npm install -S @xso/router`

But better, is to use the PNPM:

`pnpm install @xso/router`

Or if you prefer Yarn:

`yarn add -S @xso/router`

Or even another package manager.

## How To Use

Example of the capabilities supported in the XSO router:

`App.js`

```javascript
import com from "@xso/com";
import { Router, Route } from "@xso/router";

function Main() {
    this.view(()=> [
        { main: {
            _: [
                { [Router]: {
                    routes: [
                        { [Route]: {
                            path: '/',
                            component: Home
                        } },
                        { [Route]: {
                            path: '/product/{uid}/{name}',
                            component: Product
                        } }
                    ]
                } } // Router
            ]
        } } // Main
    ]);
}

export default com(Main);
```

## Page Component

Here is an example of how to create a page component receiving parameters from the URL:

`pages/Product/index.js`

```javascript
import com from "@xso/com";

function Product({route}) {
    this.view(() => [
        { h3: {
            _: `Router Parameters`
        } },
        { p: {
            _: `UID: ${route.params.uid}`
        } },
        { p: {
            _: `Name: ${route.params.name}`
        } }
    ]);
}

export default com(Product);
```

## Navigate

The `Navigate` component creates a link in the DOM using the `<a>` element, it is easy to create links in the page and menus.

Here is an example of how to use it:

```javascript
import com from "@xso/com";
import { Navigate } from "@xso/router";

function Link() {
    this.view(()=> [
        { [Navigate]: {
            to: '/my/page',
            onClick: () => alert('Going to My Page...'),
            _: 'To My Page'
        } }
    ]);
}

export default com(Link);
```

## navigateTo

Using the `navigateTo` is the way to change the page link programmatically, here is an example:

```javascript
import com from "@xso/com";
import { navigateTo } from "@xso/router";

function Main() {
    const counter = this.state(0);
    this.changes([counter], () => {
        navigateTo(`/product/${counter.val}`);
    });
    this.view(()=> [
        { a: {
            onClick: ()=> navigateTo('/'),
            _: 'Link to Home'
        } },
        { button: {
            onClick: ()=> counter.$val++,
            _: `Click me! ${counter.val}`,
        } }
    ]);
}

export default com(Main);
```
