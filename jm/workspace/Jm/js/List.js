var List = function(id) {
	if (arguments.length < 1) {
		return;
	}
	Component.apply(this, [id]);
	this.list = new Vector();
	this.index = -1;
	
	//this.data = null;
};
List.prototype = new Component();

List.prototype.add = function(n) {
	this.list.addElement(n);
};

List.prototype.select = function(i) {
	this.index = i;
};

List.prototype.getItemCount = function() {
	return this.list.size();
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
