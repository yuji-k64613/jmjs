var Integer = function(i){
	this.n = i;
};

Integer.prototype.intValue = function() {
	return this.n;
};

Integer.parseInt = function(s) {
	return parseInt(s);
};

Integer.$valueOf = function(v){
	var i = parseInt(v)
	if (isNaN(i)){
		throw new TypeError();
	}
	return new Integer(i);
};

