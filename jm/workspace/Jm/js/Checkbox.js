var Checkbox = function(id, id_label, t){
	if (arguments.length < 2) { // TODO
		return;
	}
	Component.apply(this, [id]);
	$('#' + id_label).text(t);

	this.state = false;	
};
Checkbox.prototype = new Component();

Checkbox.prototype.setState = function(s) {
	this.state = s;
};

Checkbox.prototype.getState = function() {
	return this.state;
};

