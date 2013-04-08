var Scrollbar = function(id) {
	if (arguments.length < 1) {
		return;
	}
	Component.apply(this, [id]);

	this.value = null;
	this.isRefreshed = false;
	
	this.func = function(t){
		var target = t;
		return function(e){
			var self = target;
			var v = self.obj.val();
			v = Float.parseFloat(v);
			self.value = v;
		}
	};
};
Scrollbar.prototype = new Component();

Scrollbar.prototype.setValue = function(v) {
	this.value = v;
	this.obj.val(v);
	this.refresh();
	this.obj.change(this.func(this));
};

Scrollbar.prototype.refresh = function(isForce) {
	//this.isRefreshed=false; // 削除忘れてた
	var b = false;
	if (arguments.length >= 1 && isForce) {
		b = true;
		this.obj = $('#' + this.id);
		this.obj.change(this.func(this));
		this.obj.val(this.value);
	}
	if (b || (!this.isRefreshed && this.obj.is(':visible'))) {
		this.obj.slider('refresh');
		this.isRefreshed = true;
	}
};

Scrollbar.prototype.getValue = function() {
	return this.value;
};

Scrollbar.prototype.setValues = function(value, visible, minimum, maximum) {
	// min, maxが機能しない？
	//	this.obj.slider({
	//		min: minimum,
	//		max: maximum
	//	});
	this.obj.attr('min', minimum);
	this.obj.attr('max', maximum);
	this.minimum = minimum;
	this.maximum = maximum;

	this.setValue(value);
};
