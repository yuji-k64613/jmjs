var Thread = function(obj, func, t){
	this.obj = obj;
	this.func = func;
	this.interval = t;
	this.id = 0;
	this.t = 0;
};

Thread.prototype.start = function() {
	//this.id = setInterval(this.func, this.interval);
	if (this.func == null){
		return;
	}
	var now = +(new Date());
	if (this.t <= 0){
		this.t = now;
	}
	var old = this.t;
	//var dt = now - old;
	var dt = now - (old + this.interval);
	if (dt < 0){
		dt = 0;
	}
	this.t = now;
	var itval = this.interval - dt;
	if (itval < 10){
		itval = 10;
	}

	var target = this;
	setTimeout(function(){
			Thread.prototype.start.apply(target);
		}, itval);
	var f = this.func;
	var o = this.obj;
	f.apply(o);
};

Thread.prototype.stop = function() {
	//clearInterval(this.id);
	this.func = null;
};
