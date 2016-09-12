* `npm run dev` uses raw formats of the two tasks, instead of their `npm run` scripts. That is for backwards compatibility with npm 2.x. See [here](https://github.com/kimmobrunfeldt/concurrently/issues/4).

* If the app can't find the horizon server, it is frustratingly hard to figure out just by inspecting the browser environment. Make sure you pass in the correct `host` option to the constructor @ `index.js`. You can leave it out only when horizon is listening at its default port (8181).

### TODO

[] Use horizon-devtools

[] Configure webpack to move .html file when bundling for production

[] eslint

[] an actual FE app
