const EventEmitter = require('events');
const mongo = require('mongoose');
const pify = require('pify');

class database extends EventEmitter {
	constructor(url, opts) {
		super();
		let dbOption = {
			useNewUrlParser: true,
			useUnifiedTopology: true
		};

		mongo
			.connect(
				url,
				dbOption
			)
			.then(() => {
				this.emit('connected', '[DATABASE] Successfully connected to Database');
			})
			.catch(err => {
				this.emit('error', '[DATABASE] ' + err);
			});
		this.db = mongo.connection;

		if (typeof opts !== 'object') {
			return this.emit('error', '[DATABASE] Options must be in object form');
		}

		if (!opts.name) {
			return this.emit('error', '[DATABASE] Please define a collection name');
		}

		this.collection = this.db.collection(opts.name);
		this.collection.createIndex(
			{ key: 1 },
			{
				unique: true,
				background: true
			}
		);

		this.mongo = ['replaceOne', 'findOne', 'deleteOne', 'find'].reduce(
			(obj, method) => {
				obj[method] = pify(this.collection[method].bind(this.collection));
				return obj;
			},
			{}
		);

		this.db.on('error', err => this.emit('error', err));
	}

	async get(key) {
		return this.mongo.findOne({ key }).then(doc => {
			if (doc === null) {
				return undefined;
			}
			return doc.value;
		});
	}
	
	async fetch(key) {
		return this.mongo.findOne({ key }).then(doc => {
			if (doc === null) {
				return undefined;
			}
			return doc.value;
		});
	}

	async set(key, value) {
	  return this.mongo.replaceOne({ key }, { key, value }, { upsert: true })
	  .then(() => { return true })
	}

	async delete(key) {
		if (typeof key !== 'string') {
			return Promise.resolve(false);
		}

		return this.mongo.deleteOne({ key }).then(() => return true );
	}

	async search(key) {
		if (typeof key !== 'string') {
			return Promise.resolve(false);
		}
	
	  let documents = await this.mongo.find({}, function(err, data) {
	    if(err) return undefined;
	    if(!data) return undefined;
	  });
	  
	  let map = [];
	  
	  
	  await documents.forEach(doc => {
	    if(doc.key.toLowerCase().includes(key.toLowerCase())) {
        map.push({ key: doc.key, value: doc.value })
	    }
	  });
	  return map;
	}
	
	async find(key) {
		if (typeof key !== 'string') {
			return Promise.resolve(false);
		}
	
	  let documents = await this.mongo.find({}, function(err, data) {
	    if(err) return undefined;
	    if(!data) return undefined;
	  });
	  
	  let map = [];
	  
	  
	  await documents.forEach(doc => {
	    if(doc.key.toLowerCase().includes(key.toLowerCase())) {
        map.push({ key: doc.key, value: doc.value })
	    }
	  });
	  return map;
	}
	
	async all() {
	  let documents = await this.mongo.find({}, function (err, data) {
	    if(err) return undefined;
	    if(!data) return undefined;
	  });
	  
	  let map = { data: [] };
	  
	  await documents.forEach(doc => {
	    map.data.push({ key: doc.key, value: doc.value })
	  });
	  
	  if(map.data.length > 0) return map;
	  
	  return undefined;
	}
	
	async clear(key) {
	  if(typeof key !== 'string') {
	    return Promise.resolve(false);
	  }
	  
	  return this.mongo.deleteMany({ key: new RegExp(`${key}`, 'i') })
	    .then(() => {
	      return true;
	    })
	}
}

module.exports = database;
