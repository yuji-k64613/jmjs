var Graphics = function(ctx) {
	//if (arguments.length < 1) {
	//	return;
	//}
	//Component.apply(this, [id]);
	this.ctx = ctx;
	this.strokeStyle = Graphics.COLOR_BLACK;
	this.fillStyle = Graphics.COLOR_BLACK;
	this.isColorSet = false;
	this.center = 0;
};
//Graphics.prototype = new Component();

Graphics.prototype.getContext = function() {
	return this.ctx;
};

Graphics.prototype.dispose = function() {
	//this.ctx = null;
};

// 不要
//Graphics.prototype.translate = function(center, i) {
//	this.center = center;
//};

Graphics.prototype.clearRect = function(x, y, x2, y2) {
	x *= canvasScale;
	y *= canvasScale;
	x2 *= canvasScale;
	y2 *= canvasScale;

	var width = Math.abs(x2 - x);
	var height = Math.abs(y2 - y);

	//@this.ctx.beginPath();
	this.setColor();
	this.ctx.clearRect(x, y, width, height);
	//@this.ctx.closePath();
	//@this.ctx.stroke();
};

Graphics.prototype.fillRect = function(x, y, x2, y2) {
	x *= canvasScale;
	y *= canvasScale;
	x2 *= canvasScale;
	y2 *= canvasScale;
	
	var width = Math.abs(x2 - x);
	var height = Math.abs(y2 - y);

	//@this.ctx.beginPath();
	this.setColor();
	this.ctx.fillRect(x, y, width, height);
	//this.ctx.fill();
	//@this.ctx.closePath();
	//@this.ctx.stroke();
};

//Graphics.prototype.drawString = function(str, x, y, anchor, color) {
Graphics.prototype.drawString = function(str, x, y, anchor) {
	x *= canvasScale;
	y *= canvasScale;
	
	try {// for IE
		//@this.ctx.beginPath();
		//@this.ctx.strokeStyle = color;
		this.setColor();
		this.ctx.strokeText(str, x + this.center, y);
		//@this.ctx.closePath();
		//@this.ctx.stroke();
	} catch (e) {
		;
	}
};

Graphics.prototype.drawLine = function(x1, y1, x2, y2) {
	x1 *= canvasScale;
	y1 *= canvasScale;
	x2 *= canvasScale;
	y2 *= canvasScale;

	//@this.ctx.beginPath();
	//this.ctx.strokeStyle = "rgba(0, 0, 0, 1.0)";
	this.setColor();
	this.ctx.moveTo(x1 + this.center, y1);
	this.ctx.lineTo(x2 + this.center, y2);
	//@this.ctx.closePath();
};

Graphics.prototype.drawOval = function(x, y, w, h) {
	x += w / 2;
	y += h / 2;
	var r = Math.floor((w + h) / 4);	

	x *= canvasScale;
	y *= canvasScale;
	r *= canvasScale;

	//@this.ctx.beginPath();
	this.setColor();
	this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
	//this.ctx.fill();
	//@this.ctx.closePath();
	//@this.ctx.stroke();
};

Graphics.prototype.fillOval = function(x, y, w, h) {
	x += w / 2;
	y += h / 2;
	var r = Math.floor((w + h) / 4);
	
	x *= canvasScale;
	y *= canvasScale;
	r *= canvasScale;
		
	//@this.ctx.beginPath();
	this.setColor();
	this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
	this.ctx.fill();
	//@this.ctx.closePath();
	//@this.ctx.stroke();
};

Graphics.prototype.drawCircle = function(x, y, r) {
	x *= canvasScale;
	y *= canvasScale;
	r *= canvasScale;

	//@this.ctx.beginPath();
	this.setColor();
	this.ctx.arc(x + this.center, y, r, 0, (360 * Math.PI / 180), true);
	//@this.ctx.closePath();
	//@this.ctx.stroke();
};

//Graphics.prototype.drawImage = function(i, x, y, size) {
Graphics.prototype.drawImage = function(img, x, y, obj) {
	x *= canvasScale;
	y *= canvasScale;

	//@this.ctx.beginPath();
	//var color = JugglerCanvas.color[i % JugglerCanvas.color.length];
	//this.ctx.fillStyle = toRGB(color);
	//this.ctx.arc(x + this.center, y, size, 0, (360 * Math.PI / 180), true);
	//this.ctx.fill();
	this.setColor();
	this.ctx.putImageData(img.getImage(), x, y);
	//@this.ctx.closePath();
};

Graphics.prototype.beginPath = function() {
	this.ctx.beginPath();
};

Graphics.prototype.closePath = function() {
	this.ctx.closePath();
};
Graphics.prototype.stroke = function() {
	this.ctx.stroke();
};

Graphics.prototype.getWidth = function() {
	return this.canvas.width;
};

Graphics.prototype.getHeight = function() {
	return this.canvas.height;
};

Graphics.prototype.setColor = function(c) {
	if (arguments.length < 1) {
		if (this.isColorSet){
			this.ctx.strokeStyle = this.strokeStyle;
			this.ctx.fillStyle = this.fillStyle;		
		}
		this.isColorSet = false;
	}
	else {
		this.strokeStyle = "rgba(" + c.r + ", " + c.g + ", " + c.b + ", 1.0)";
		this.fillStyle = "rgba(" + c.r + ", " + c.g + ", " + c.b + ", 1.0)";
		this.isColorSet = true;		
	}
};

Graphics.prototype.create = function(x, y, w, h) {
	var g = new Graphics(this.ctx); // x, y, w, hを使用していない
	return g;
};

Graphics.COLOR_BLACK = "rgba(0, 0, 0, 1.0)";
Graphics.COLOR_RED = "rgba(255, 0, 0, 1.0)";
