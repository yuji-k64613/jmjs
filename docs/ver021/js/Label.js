var Label = function(id, t){
	if (arguments.length < 2) {
		return;
	}
	Component.apply(this, [id]);
	this.text = t;
	this.setText(t);
};
Label.prototype = new Component();

Label.prototype.setText = function(t) {
	this.text = t;
	this.obj.text(t);
};
