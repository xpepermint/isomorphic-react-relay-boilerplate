# Babel Integration

Use the `babel` package for enabling ES6+ support. Start by installing the dependencies.

```
npm i --save babel babel-runtime
```

Create the `.babelrc` file and paste the configuration below.

```js
{
  "stage": 0,
  "optional": ["es7.classProperties", "runtime"]
}
```

No you can run scripts by using the `babel-node` command.
