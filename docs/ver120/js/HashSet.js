var HashSet = function() {
	this.hash = new Hashtable();
};

HashSet.prototype.add = function(key) {
	this.hash.put(key, null);
};

HashSet.prototype.iterator = function() {
	var keys = this.hash.keys();
	return keys;
};

HashSet.prototype.hashtable = function() {
	return this.hash;
};
