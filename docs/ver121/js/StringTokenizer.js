var StringTokenizer = function(s, t) {
	this.s = s;
	this.t = t;
	this.pos = 0;
};

StringTokenizer.prototype.nextToken = function() {
	var l = this.s.length;

	while (true) {
		if (this.pos >= l) {
			return null;
		}
		var t = l;
		for (var i = 0; i < this.t.length; i++) {
			var u = this.s.indexOf(this.t.charAt(i), this.pos);
			if (u >= 0 && u < t) {
				t = u;
			}
		}
		var m = this.pos;
		if (t > this.pos) {
			this.pos = t + 1;
			var v = this.s.substring(m, t);
			if (v.length > 0){
				return v;
			}
		}
		this.pos++;
	}
};

StringTokenizer.prototype.countTokens = function() {
	var t = this.pos;
	
	this.pos = 0;
	var s;
	var i = 0;
	for (i = 0; (s = this.nextToken()) != null; i++){
		;
	}
	this.pos = t;
	return i;
};
