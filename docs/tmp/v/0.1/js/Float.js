var Float = function(i){
	this.n = i;
};

Float.prototype.floatValue = function() {
	return this.n;
};

Float.parseFloat = function(s) {
	return parseFloat(s);
};

Float.$valueOf = function(v){
	var i = parseFloat(v);
	if (isNaN(i)){
		throw new TypeError();
	}
	return new Float(i);
};

