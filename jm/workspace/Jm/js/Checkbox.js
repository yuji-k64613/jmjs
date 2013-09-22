var Checkbox = function(id, id_label, t){
	if (arguments.length < 3) {
		return;
	}
	Component.apply(this, [id]);
	// デザインが崩れるので
	//$('#' + id_label).text(t);

	this.obj.change(function(t){
		var target = t;
		return function(e){
			var self = target;
			// jQuery Mobile 1.3.1
			//var checked = self.isChecked(self.obj.attr("checked"));
			var checked = self.obj.is(':checked');
			self.state = checked;
		};
	}(this));

	this.state = false;
	this.isRefreshed = false;
};
Checkbox.prototype = new Component();

Checkbox.prototype.setState = function(s) {
	this.state = s;
	// Ver1.2.0
	//this.obj.attr("checked", s);
	this.obj.prop("checked", s);
	this.refresh();
};

Checkbox.prototype.refresh = function(isForce) {
	var b = false;
	if (arguments.length >= 1 && isForce) {
		b = true;
		this.obj = $('#' + this.id);
		// Ver1.2.0
		//this.obj.attr("checked", this.state);
		this.obj.prop("checked", this.state);
	}
	if (b || (!this.isRefreshed && this.obj.is(':visible'))) {
		this.obj.checkboxradio('refresh');
		this.isRefreshed = true;
	}
};

Checkbox.prototype.getState = function() {
	return this.state;
};

Checkbox.prototype.isChecked = function(checked) {
	return typeof checked != 'undefined';
};

