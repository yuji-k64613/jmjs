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
	//return this.canvas.getGraphics();
	if (this.graphics == null){
		var ctx = this.canvas.getCanvas().getContext('2d');
		this.graphics = new Graphics(ctx);
	}
	return this.graphics;
};

Image.prototype.getImage = function() {
	return this.img;
};
