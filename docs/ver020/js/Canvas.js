var Canvas = function(id) {
	if (arguments.length < 1) {
		return;
	}
	Component.apply(this, [id]);
	
	this.canvas = this.obj.get(0);
	this.ctx = this.canvas.getContext('2d');
	this.ctx.font = "" + Resource.fontSize + "px 'Monotype Corsiva'";
	
	this.graphics = new Graphics(this.ctx);
};
Canvas.prototype = new Component();

Canvas.prototype.getGraphics = function() {
	return this.graphics;
};

Canvas.prototype.getCanvas = function() {
	return this.canvas;
};

Canvas.prototype.setLayout = function(l) {

};

Canvas.prototype.setBackground = function(c) {

};

Canvas.prototype.setSize = function(w, h) {

};

Canvas.prototype.validate = function() {

};

Canvas.prototype.setVisible = function(b) {

};

Canvas.prototype.repaint = function() {

};

Canvas.prototype.createImage = function(w, h) {
	var g = new Graphics(this.ctx);
	var c = g.getContext();
	//var img = c.getImageData(0, 0, w, h);
	var img = c.createImageData(w, h);
	
	return new Image(this, img);
};
