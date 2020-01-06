# Node server

How to create a base node server.

Create file `package.json` and write inside:

```json
{
    "name": "smapi",
    "version": "1.0.0",
    "description": "Send e-mail HTTP api",
    "author": "BoMa Idea it@bomaidea.xyz",
    "main": "server.js",
    "scripts": {
        "start": "node server.js"
    },  
    "dependencies": {
        "express": "^4.16.1"
    }   
}

```

Then install dependencies for generate the file `package-lock.json`, with the command:

```
npm install
```

Then create the file `server.js` and write inside the following code:

```
'use strict';

const express = require('express');

// Constatns 
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req, res) => {
    res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
```

For start your server use the command:

```
npm start
```

Then for check your page:

```
curl -i localhost:8080
```

Here it is!

