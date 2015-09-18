# Project Configuration

Place all the configuration variables inside the [package.json](https://docs.npmjs.com/misc/scripts) thus, when running the node script using the `npm run` command, all the keys will be available as `process.env.npm_package_{key}`.

```json
"name": "myproject"
"config": {
  "foo": "bar"
}
...
```

Project specific variables should be placed under the `config` key. You can override these values (e.g. on the server) with the `npm config` command as shown in the example below.

```
npm config set myproject:foo newbar
```

Run `npm config` to get the list of all possible commands.
