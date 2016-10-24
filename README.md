[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9d217b4bfc4e48ee9a2582237443ad14)](https://www.codacy.com/app/dorukk/hz-react-boilerplate?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Norm-/hz-react-boilerplate&amp;utm_campaign=Badge_Grade)

* `npm run dev` uses raw formats of the two tasks, instead of their `npm run` scripts. That is for backwards compatibility with npm 2.x. See [here](https://github.com/kimmobrunfeldt/concurrently/issues/4).

* If the app can't find the horizon server, it is frustratingly hard to figure out just by inspecting the browser environment. Make sure you pass in the correct `host` option to the constructor @ `index.js`. You can leave it out only when horizon is listening at its default port (8181).

### TODO

- [ ] Use horizon-devtools

- [ ] Configure webpack to move .html file when bundling for production

- [ ] eslint

- [ ] css modules (mqpacker, lost, import)
