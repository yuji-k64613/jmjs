var Vector = function(){
	this.vec = new Array();
};

Vector.prototype.addElement = function(elm) {
	this.vec.push(elm);
};

Vector.prototype.elementAt = function(i) {
	return this.vec[i];
};

Vector.prototype.size = function() {
	return this.vec.length;
};

Vector.prototype.isEmpty = function() {
	return this.size() == 0;
};


