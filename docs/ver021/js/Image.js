var Image = function(canvas, img) {
	//if (arguments.length < 1) {
	//	return;
	//}
	//Component.apply(this, [id]);
	this.canvas = canvas;
	this.img = img;
	this.graphics = null;
};
//Image.prototype = new Component();

Image.prototype.getGraphics = function() {
	//if (this.graphics == null){
	//	var ctx = this.canvas.getCanvas().getContext('2d');
	//	this.graphics = new Graphics(ctx);
	//}
	//return this.graphics;
	return this.canvas.getGraphics();
};

Image.prototype.getImage = function() {
	return this.img;
};
