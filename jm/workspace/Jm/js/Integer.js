var Integer = function(i){
	this.n = i;
};

Integer.prototype.intValue = function() {
	return this.n;
};

Integer.parseInt = function(s) {
	return parseInt(s, 10);
};

Integer.$valueOf = function(v){
	var i = parseInt(v, 10);
	if (isNaN(i)){
		throw new TypeError();
	}
	return new Integer(i);
};

