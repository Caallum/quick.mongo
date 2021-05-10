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

### database.set()

*Promise*

```js
database.set(key, value)
```

__Example__

```js
await database.set('foo', 'fee');
```

Returns <[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)>

### database.get()

*Promise*

```js
await database.get(key)
```
 
__Example__

```js
await database.get('foo'); // fee
```

Returns <[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>

### database.search()

*Promise*

```js
database.search(query)
```

__Example__

```js
await database.search('foo');
```

Returns <[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>

### database.find()

*Promise*

```js
database.find(query)
```

__Example__

```js
await database.find('foo');
```

### database.all()

*Promise*

```js
database.all()
```

__Example__

```js
await database.all()
```

### database.delete()

*Promise*

```js
database.delete(key)
```

__Example__

```js
await database.delete('foo');
```
