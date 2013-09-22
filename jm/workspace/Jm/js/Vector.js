var Vector = function(vec){
	if (arguments.length < 1) {
		this.vec = new Array();
	}
	else {
		this.vec = vec;
	}
};

Vector.prototype.addElement = function(elm) {
	this.vec.push(elm);
};

Vector.prototype.elementAt = function(i) {
	return this.vec[i];
};

Vector.prototype.set = function(i, val) {
	this.vec[i] = val;
	return val;
};

Vector.prototype.size = function() {
	return this.vec.length;
};

Vector.prototype.isEmpty = function() {
	return this.size() == 0;
};


