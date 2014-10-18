var TextField = function(id){
	if (arguments.length < 1) {
		return;
	}
	Component.apply(this, [id]);
	
	this.text = "";
	
	var self = this;
	var func = function(e){
		self.text = self.obj.val();
	}
	this.obj.change(func);
};
TextField.prototype = new Component();

TextField.prototype.setText = function(t) {
	this.text = t;
	this.obj.text(t);
};

TextField.prototype.getText = function(t) {
	return this.text;
};

TextField.prototype.refresh = function() {
	this.obj.val(this.text);
};
