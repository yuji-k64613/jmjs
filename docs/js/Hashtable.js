var Hashtable = function(/*obj*/) {
	this.length = 0;
	this.items = {};
/*
	for (var p in obj) {
		if (obj.hasOwnProperty(p)) {
			this.items[p] = obj[p];
			this.length++;
		}
	}
*/
};

Hashtable.prototype.put = function(key, value) {
	var previous = undefined;
	if (this.containsKey(key)) {
		previous = this.items[key];
	} else {
		this.length++;
	}
	this.items[key] = value;
	return previous;
};

Hashtable.prototype.get = function(key) {
	return this.containsKey(key) ? this.items[key] : undefined;
};

Hashtable.prototype.containsKey = function(key) {
	return this.items.hasOwnProperty(key);
};

Hashtable.prototype.removeItem = function(key) {
	if (this.containsKey(key)) {
		previous = this.items[key];
		this.length--;
		delete this.items[key];
		return previous;
	} else {
		return undefined;
	}
};

Hashtable.prototype.keys = function() {
	var keys = [];
	for (var k in this.items) {
		if (this.containsKey(k)) {
			keys.push(k);
		}
	}
	return new Enumeration(keys);
};

Hashtable.prototype.values = function() {
	var values = [];
	for (var k in this.items) {
		if (this.containsKey(k)) {
			values.push(this.items[k]);
		}
	}
	return values;
};

Hashtable.prototype.each = function(fn) {
	for (var k in this.items) {
		if (this.containsKey(k)) {
			fn(k, this.items[k]);
		}
	}
};

Hashtable.prototype.clear = function() {
	this.items = {};
	this.length = 0;
};

Hashtable.prototype.size = function() {
	return this.length;
};

