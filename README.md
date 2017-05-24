# express-dynamic-static
Middleware to dynamically change the path of express.static at runtime

## Why is this useful?
When working with multiple client applications on the same server, each client
application may have its own static assets folder. This plugin lets you define
the path to the static assets folder at runtime when a route is requested.

A typical use case might be a client-side app and a client-side admin app
running on the same server.

## Install
`npm install express-dynamic-static --save`

## Example
```js
const express = require('express');
const dynamicStatic = require('express-dynamic-static')();
const path = require('path');

const app = express();
app.use(dynamicStatic);

app.get('/', (req, res) => {
    dynamicStatic.setPath(path.resolve(__dirname, 'path/to/app/assets'));
    
    // res.render...
}


app.get('/admin', (req, res) => {
    dynamicStatic.setPath(path.resolve(__dirname, 'path/to/admin/assets'));
    
    // res.render...
}

// ...
```

### Options

An initial static path may be passed (default: `public`):
```js
const defaultStaticPath = path.join(__dirname, 'path/to/default/assets');
const dynamicStatic = require('express-dynamic-static')(defaultStaticPath);
```



