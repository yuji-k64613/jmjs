var Scrollbar = function(id) {
	if (arguments.length < 1) {
		return;
	}
	Component.apply(this, [id]);

	this.value = null;
	this.isRefreshed = false;

};
Scrollbar.prototype = new Component();

Scrollbar.prototype.setValue = function(v) {
	this.value = v;
	this.obj.val(v);
	this.refresh();
};

Scrollbar.prototype.refresh = function() {
	if (!this.isRefreshed && this.obj.is(':visible')) {
		this.obj.slider('refresh');
		this.isRefreshed = true;
	}
};

// TODO
Scrollbar.prototype.refresh2 = function() {
		this.obj.slider('refresh');
		this.isRefreshed = true;
};

Scrollbar.prototype.getValue = function() {
	return this.value;
};

Scrollbar.prototype.setValues = function(value, visible, minimum, maximum) {
	// TODO
	this.obj.slider({
		min : minimum,
		max : maximum
	});
	this.setValue(value);
};
