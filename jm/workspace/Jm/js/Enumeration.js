var Enumeration = function(array){
	this.array = array;
	this.length = array.length;
	this.index = 0;
};

Enumeration.prototype.hasMoreElements = function() {
	if (this.index >= this.length){
		return false;
	}
	return true;
};

Enumeration.prototype.nextElement = function() {
	if (this.index >= this.length){
		return null;
	}
	return this.array[this.index++];
};
