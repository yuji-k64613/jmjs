var DidyoumeanList = function(id, jmj) {
	if (arguments.length < 1) {
		return;
	}
	List.apply(this, [id]);
	
	this.jmj = jmj;
};
DidyoumeanList.prototype = new List();

DidyoumeanList.prototype.create = function(a) {
	this.removeAll();
	if (JmjController.vanilla_siteswap_check(a)) {
		var b = new java.util.HashSet();
		var c = Clazz.newArray(Jmj.LMAX, 0);
		var d;
		var e;
		var f = 0;
		this.jmj.holder.getPattern(a);
		for ( d = 0; d < this.jmj.pattw; d++) {
			f += this.jmj.patt[d][0];
			c[d] = this.jmj.patt[d][0];
		}
		var g = Math.floor(f / this.jmj.pattw); {
			for ( d = 0; d < this.jmj.pattw; d++) {
				var h = Clazz.newArray(Jmj.LMAX, 0);
				System.arraycopy(c, 0, h, 0, d);
				System.arraycopy(c, d + 1, h, d, this.jmj.pattw - d - 1);
				b.add(this.pat2string(h, this.jmj.pattw - 1));
			}
		}
		if (f % this.jmj.pattw == 0) { {
				for ( d = 0; d < this.jmj.pattw; d++) {
					for ( e = d + 1; e < this.jmj.pattw; e++) {
						//var h = c.clone();
						var h = clone(c);
						h[d] = c[e];
						h[e] = c[d];
						b.add(this.pat2string(h, this.jmj.pattw));
					}
				}
			} {
				for ( d = 0; d < this.jmj.pattw; d++) {
					for ( e = 0; e < this.jmj.pattw - 1; e++) {
						if (e < d - 1) {
							var h = Clazz.newArray(Jmj.LMAX, 0);
							System.arraycopy(c, 0, h, 0, e);
							h[e] = c[d];
							System.arraycopy(c, e, h, e + 1, d - e);
							System.arraycopy(c, d + 1, h, d + 1, this.jmj.pattw - 1 - d);
							b.add(this.pat2string(h, this.jmj.pattw));
						} else if (e > d + 1) {
							var h = Clazz.newArray(Jmj.LMAX, 0);
							System.arraycopy(c, 0, h, 0, d);
							System.arraycopy(c, d + 1, h, d, e - d);
							h[e] = c[d];
							System.arraycopy(c, e + 1, h, e + 1, this.jmj.pattw - e);
							b.add(this.pat2string(h, this.jmj.pattw));
						}
					}
				}
			}
		} else { {
				var h = (f % this.jmj.pattw);
				var i = this.jmj.pattw - (f % this.jmj.pattw);
				for ( d = 0; d < this.jmj.pattw; d++) {
					//var j = c.clone();
					var j = clone(c);
					j[d] = c[d] - h;
					b.add(this.pat2string(j, this.jmj.pattw));
					j[d] = c[d] + i;
					b.add(this.pat2string(j, this.jmj.pattw));
				}
			} {
				var h = (g + 1) * (this.jmj.pattw + 1);
				var i = h - f;
				for ( d = 1; d <= this.jmj.pattw; d++) {
					var j = Clazz.newArray(Jmj.LMAX, 0);
					System.arraycopy(c, 0, j, 0, d);
					System.arraycopy(c, d, j, d + 1, this.jmj.pattw - d);
					j[d] = i;
					b.add(this.pat2string(j, this.jmj.pattw + 1));
				}
			}
		} {
			var h = g * (this.jmj.pattw + 1);
			var i = h - f;
			for ( d = 1; d <= this.jmj.pattw; d++) {
				var j = Clazz.newArray(Jmj.LMAX, 0);
				System.arraycopy(c, 0, j, 0, d);
				System.arraycopy(c, d, j, d + 1, this.jmj.pattw - d);
				j[d] = i;
				b.add(this.pat2string(j, this.jmj.pattw + 1));
			}
		}
		//for (var str, $str = b.iterator(); $str.hasNext() && (( str = $str.next()) || true); ) {
		var str;
		for (var it = b.iterator(); it.hasNext(); ) {
			str = it.next();
			if (str.equals("")) {
				continue;
			}
			this.jmj.holder.getPattern(str);
			if (this.jmj.pattInitialize()) {
				this.add(str);
			}
		}
		if (this.getItemCount() > 0) {
			return true;
		} else {
			return false;
		}
	} else {
		this.jmj.putError("[Did you mean...] is for vanilla-siteswap, now.", "It cannot handle this: " + this.jmj.siteswap);
		return false;
	}
};

DidyoumeanList.prototype.pat2string = function(a, b) {
	var c = "";
	var x;
	for (var d = 0; d < b; d++) {
		if (0 <= a[d] && a[d] <= 9) {
			//c += (String.fromCharCode((('0').charCodeAt(0) + a[d]))).charCodeAt(0);
			x = ('0').charCodeAt(0);
			x = x + a[d];
			x = String.fromCharCode(x);
			c += x;
		} else if (10 <= a[d] && a[d] <= 35) {
			//c += (String.fromCharCode((('a').charCodeAt(0) + a[d] - 10))).charCodeAt(0);
			x = ('a').charCodeAt(0);
			x = x + a[d] - 10;
			x = String.fromCharCode(x);
			c += x;
		} else {
			return "";
		}
	}
	return c;
};
