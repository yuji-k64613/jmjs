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
		alert('TODO Integer.$valueOf');
	}
	return new Integer(i);
};

