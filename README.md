# @turph/database

> Simple Database using MongoDB

## Documentation

### new Database()

```js
new database(mongo url, options)
```

Option Types:
  name » Name of the collection that the data will be stored in

__Example__

```js
  const turphDatabase = require('./database.js'); // Note: since this is not a NPM Package you need to make a new file for this called "database.js" if you wish to use this line of code
  
  const database = new turphDatabase('{ INSERT MONGO URL HERE }', { name: 'database' });
  db
  .on('error', err => console.log(err))
  .on('connected', info => console.log(info));
```
