var Canvas = function(id, visible) {
	if (arguments.length < 1) {
		return;
	}
	if (typeof id == 'string'){
		Component.apply(this, [id]);
		// @FOO
		//this.canvas = this.obj.get(0);
		this.canvas = document.getElementById(id);
	}
	else {
		Component.apply(this, [null]);
		this.canvas = id;
	}

	this.ctx = this.canvas.getContext('2d');
	this.ctx.font = "" + Resource.fontSize + "px 'Monotype Corsiva'";

	this.graphics = new Graphics(this.ctx, visible);
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

Canvas.prototype.createImage2 = function(pid, id, w, h) {
	// @FOO
	/*
	var c = $('<canvas id="' + id + '" class="canvas" width="' + w + 'px" height="' + h + 'px">');
	c.hide();
	$('#' + pid).append(c);
	*/
	var c = document.createElement('canvas')
	c.id = id;
	c.width = w;//String(w) + "px";
	c.height = h;//String(h) + "px";
	c.style = "display:none";
	// IE11対策
	c.style.display = "none";

	var p = Jmj.canvas.parentElement; // document.getElementById("page2_content");
	p.appendChild(c);

	// @FOO
	//var canvas = new Canvas(id);
	var canvas = new Canvas(id, false);

	return canvas;
};
