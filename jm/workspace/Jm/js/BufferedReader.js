var BufferedReader = function(data){
	this.data = data;
	
	this.length = data.length;
	this.pos = 0;
};

BufferedReader.prototype.readLine = function() {
	if (this.pos >= this.length){
		return null;
	}
	var n = this.data.indexOf('\r\n', this.pos);  // TODO
	var m = this.pos;
	if (n < 0){
		this.pos = this.length;
		return this.data.substring(m);
	}
	else {
		this.pos = n + 2;
		return this.data.substring(m, n);		
	}
};

BufferedReader.prototype.close = function() {
	this.data = null;
	this.length = null;
	this.pos = null;
};
