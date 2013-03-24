var Thread = function(obj, func){
	this.obj = obj;
	this.func = func;
	this.interval = 20;
};

Thread.prototype.start = function() {
	this.id = setInterval(this.func, this.interval);
};

Thread.prototype.stop = function() {
	clearInterval(this.id);
};
