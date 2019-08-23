var Float = function(i){
	this.n = i;
};

Float.prototype.floatValue = function() {
	return this.n;
};

Float.parseFloat = function(s) {
	return parseInt(s);
};

Float.$valueOf = function(v){
	var i = parseInt(v)
	if (isNaN(i)){
		throw new TypeError();
	}
	return new Float(i);
};

