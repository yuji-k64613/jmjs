var Scrollbar = function(id) {
	if (arguments.length < 1) {
		return;
	}
	Component.apply(this, [id]);

	this.value = null;
};
Scrollbar.prototype = new Component();

Scrollbar.prototype.setValue = function(v) {
	this.value = v;
	this.obj.val(v);
	if (this.obj.is(':visible')) {
		this.obj.slider('refresh'); // TODO
	}
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
