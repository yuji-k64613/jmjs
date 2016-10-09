var Thread = function(obj, func, t){
	this.obj = obj;
	this.func = func;
	this.interval = t;
};

Thread.prototype.start = function() {
	this.id = setInterval(this.func, this.interval);
};

Thread.prototype.stop = function() {
	clearInterval(this.id);
};
