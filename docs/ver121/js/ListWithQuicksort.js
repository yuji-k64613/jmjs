var ListWithQuicksort = function(id) {
	if (arguments.length < 1) {
		return;
	}
	List.apply(this, [id]);
};
ListWithQuicksort.prototype = new List();

ListWithQuicksort.prototype.quickSort = function(a, b) {
	var c;
	var d;
	if (a >= b)
		return;
	this.swap(a, Math.floor((a + b) / 2));
	d = a;
	for ( c = a + 1; c <= b; c++)
		if (this.getItem(c).compareTo(this.getItem(a)) < 0)
			this.swap(++d, c);

	this.swap(d, a);
	this.quickSort(a, d - 1);
	this.quickSort(d + 1, b);
};

ListWithQuicksort.prototype.swap = function(a, b) {
	var c = this.getItem(a);
	this.replaceItem(this.getItem(b), a);
	this.replaceItem(c, b);
};

