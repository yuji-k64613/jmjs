var List = function(id) {
	if (arguments.length < 1) {
		return;
	}
	Component.apply(this, [id]);
	this.index = -1;
};
List.prototype = new Component();

List.prototype.select = function(i) {
	this.index = i;
};

List.prototype.getSelectedIndex = function() {
	return this.index;
};

List.prototype.add = function(id, index, n, func, isPattern) {
	this.list.addElement(n);

	var l = n.length;
	var ids = 'id="' + id + '_' + index + '"';
	//if (l > 0 && n.charAt(0) == '[') {
	if (!isPattern) { // TODOs
		n = n.substring(1, l - 2)
		this.obj.append('<li ' + ids + ' data-role="list-divider">' + n + '</li>');

	} else {
		this.obj.append('<li><a ' + ids + ' href="#">' + n + '</a></li>');
		this.obj.click(func);
	}
};

List.prototype.removeAll = function() {
	this.list = new Vector();
};

List.prototype.validate = function() {
	if (this.obj.is(':visible')) {// TODO
		this.obj.listview('refresh');
	}
};
