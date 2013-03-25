var Graphics = function(ctx) {
	//if (arguments.length < 1) {
	//	return;
	//}
	//Component.apply(this, [id]);
	this.ctx = ctx;

	this.center = 0;

	//this.canvas = this.obj.get(0);
	//this.ctx = this.canvas.getContext('2d');
	//this.ctx.font = "" + Resource.fontSize + "px 'Monotype Corsiva'";
};
//Graphics.prototype = new Component();

Graphics.prototype.getContext = function() {
	return this.ctx;
};

Graphics.prototype.dispose = function() {
	//this.ctx = null;
};

Graphics.prototype.translate = function(center, i) { // TODO 未使用
	this.center = center;
};

Graphics.prototype.clearRect = function(x, y, x2, y2) {
	var width = Math.abs(x2 - x);
	var height = Math.abs(y2 - y);

	this.ctx.beginPath();
	this.ctx.clearRect(x, y, width, height);
	this.ctx.closePath();
	this.ctx.stroke();
	////this.ctx.fill();
	//// this.ctx.stroke(); //いらないの？ TODO
};

Graphics.prototype.fillRect = function(x, y, x2, y2) {
	var width = Math.abs(x2 - x);
	var height = Math.abs(y2 - y);

	this.ctx.beginPath();
	this.ctx.fillRect(x, y, width, height);
	//this.ctx.fill();
	this.ctx.closePath();
	this.ctx.stroke();
};

Graphics.prototype.drawString = function(str, x, y, anchor, color) {
	try {// for IE
		this.ctx.beginPath();
		this.ctx.strokeStyle = color;
		this.ctx.strokeText(str, x + this.center, y);
		this.ctx.closePath();
		this.ctx.stroke();
	} catch (e) {
		;
	}
};

Graphics.prototype.drawLine = function(x1, y1, x2, y2) {
	this.ctx.beginPath();
	//this.ctx.strokeStyle = "rgba(0, 0, 0, 1.0)";
	this.ctx.moveTo(x1 + this.center, y1);
	this.ctx.lineTo(x2 + this.center, y2);
	this.ctx.closePath();
	this.ctx.stroke();
};

Graphics.prototype.drawOval = function(x, y, w, h) {
	x += w / 2;
	y += h / 2;
	var r = Math.floor((w + h) / 4);	
	this.ctx.beginPath();
	this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
	//this.ctx.fill();
	this.ctx.closePath();
	this.ctx.stroke();
};

Graphics.prototype.fillOval = function(x, y, w, h) {
	//x += w / 2 + this.center;
	x += w / 2;
	y += h / 2;
	var r = Math.floor((w + h) / 4);	
	this.ctx.beginPath();
	this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
	this.ctx.fill();
	this.ctx.closePath();
	this.ctx.stroke();
};

Graphics.prototype.drawCircle = function(x, y, r) {
	this.ctx.beginPath();
	//this.ctx.strokeStyle = "rgba(0, 0, 0, 1.0)";
	this.ctx.arc(x + this.center, y, r, 0, (360 * Math.PI / 180), true);
	this.ctx.closePath();
	this.ctx.stroke();
};

//Graphics.prototype.drawImage = function(i, x, y, size) {
Graphics.prototype.drawImage = function(img, x, y, obj) {
	this.ctx.beginPath();
	//var color = JugglerCanvas.color[i % JugglerCanvas.color.length];
	//this.ctx.fillStyle = toRGB(color);
	//this.ctx.arc(x + this.center, y, size, 0, (360 * Math.PI / 180), true);
	//this.ctx.fill();
	this.ctx.putImageData(img.getImage(), x, y);
	this.ctx.closePath();
};

Graphics.prototype.getWidth = function() {
	return this.canvas.width;
};

Graphics.prototype.getHeight = function() {
	return this.canvas.height;
};

Graphics.prototype.setColor = function(c) {
	this.ctx.strokeStyle = "rgba(" + c.r + ", " + c.g + ", " + c.b + ", 1.0)";
	this.ctx.fillStyle = "rgba(" + c.r + ", " + c.g + ", " + c.b + ", 1.0)";
};

Graphics.prototype.create = function(x, y, w, h) {
	var g = new Graphics(this.ctx); // TODO x, y, w, h
	return g;
};

Graphics.COLOR_BLACK = "rgba(0, 0, 0, 1.0)";
Graphics.COLOR_RED = "rgba(255, 0, 0, 1.0)";

//Graphics.instance = null;
//Graphics.getInstance = function(){
//	if (Graphics.instance == null){
//		Graphics.instance = new Graphics();
//	}
//	return Graphics.instance;
//};
