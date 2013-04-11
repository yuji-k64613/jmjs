var List = function(id) {
	if (arguments.length < 1) {
		return;
	}
	Component.apply(this, [id]);
	this.list = new Vector();
	this.index = -1;
	
	var self = this;
	var func = function(e){
		self.index = Integer.parseInt(self.obj.val());
	}
	this.obj.change(func);
};
List.prototype = new Component();

List.prototype.add = function(n) {
	this.list.addElement(n);
};

List.prototype.select = function(i) {
	this.index = i;
};

List.prototype.getSelectedItem = function() {
	return this.index;
};

List.prototype.getItemCount = function() {
	return this.list.size();
};

List.prototype.getItem = function(i) {
	return this.list.elementAt(i);
};

List.prototype.replaceItem = function(val, i) {
	return this.list.set(i, val);
};


List.prototype.getSelectedIndex = function() {
	return this.index;
};

List.prototype.removeAll = function() {
	this.list = new Vector();
};

// 何もしない
List.prototype.validate = function() {
	//if (this.obj.is(':visible')) {
	//	this.obj.listview('refresh');
	//}
};
