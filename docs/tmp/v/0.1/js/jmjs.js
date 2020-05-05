var Enumeration = function(array){
	this.array = array;
	this.length = array.length;
	this.index = 0;
};

Enumeration.prototype.hasMoreElements = function() {
	if (this.index >= this.length){
		return false;
	}
	return true;
};

Enumeration.prototype.nextElement = function() {
	if (this.index >= this.length){
		return null;
	}
	return this.array[this.index++];
};

Enumeration.prototype.hasNext = function() {
	return this.hasMoreElements();
};

Enumeration.prototype.next = function() {
	return this.nextElement();
};
var Hashtable = function(/*obj*/) {
	this.length = 0;
	this.items = {};
/*
	for (var p in obj) {
		if (obj.hasOwnProperty(p)) {
			this.items[p] = obj[p];
			this.length++;
		}
	}
*/
};

Hashtable.prototype.put = function(key, value) {
	var previous = undefined;
	if (this.containsKey(key)) {
		previous = this.items[key];
	} else {
		this.length++;
	}
	this.items[key] = value;
	return previous;
};

Hashtable.prototype.get = function(key) {
	return this.containsKey(key) ? this.items[key] : undefined;
};

Hashtable.prototype.containsKey = function(key) {
	return this.items.hasOwnProperty(key);
};

Hashtable.prototype.removeItem = function(key) {
	if (this.containsKey(key)) {
		previous = this.items[key];
		this.length--;
		delete this.items[key];
		return previous;
	} else {
		return undefined;
	}
};

Hashtable.prototype.keys = function() {
	var keys = [];
	for (var k in this.items) {
		if (this.containsKey(k)) {
			keys.push(k);
		}
	}
	return new Enumeration(keys);
};

Hashtable.prototype.values = function() {
	var values = [];
	for (var k in this.items) {
		if (this.containsKey(k)) {
			values.push(this.items[k]);
		}
	}
	return values;
};

Hashtable.prototype.each = function(fn) {
	for (var k in this.items) {
		if (this.containsKey(k)) {
			fn(k, this.items[k]);
		}
	}
};

Hashtable.prototype.clear = function() {
	this.items = {};
	this.length = 0;
};

Hashtable.prototype.size = function() {
	return this.length;
};

var HashSet = function() {
	this.hash = new Hashtable();
};

HashSet.prototype.add = function(key) {
	this.hash.put(key, null);
};

HashSet.prototype.iterator = function() {
	var keys = this.hash.keys();
	return keys;
};

HashSet.prototype.hashtable = function() {
	return this.hash;
};
var Vector = function(vec){
	if (arguments.length < 1) {
		this.vec = new Array();
	}
	else {
		this.vec = vec;
	}
};

Vector.prototype.addElement = function(elm) {
	this.vec.push(elm);
};

Vector.prototype.elementAt = function(i) {
	return this.vec[i];
};

Vector.prototype.set = function(i, val) {
	this.vec[i] = val;
	return val;
};

Vector.prototype.size = function() {
	return this.vec.length;
};

Vector.prototype.isEmpty = function() {
	return this.size() == 0;
};


var BufferedReader = function(data){
	this.data = data;
	
	this.length = data.length;
	this.pos = 0;
};

BufferedReader.prototype.readLine = function() {
	if (this.pos >= this.length){
		return null;
	}
	// Windows改行のみ（手抜き）
	var n = this.data.indexOf('\r\n', this.pos);
	var m = this.pos;
	if (n < 0){
		this.pos = this.length;
		return this.data.substring(m);
	}
	else {
		this.pos = n + 2;
		return this.data.substring(m, n);		
	}
};

BufferedReader.prototype.close = function() {
	this.data = null;
	this.length = null;
	this.pos = null;
};
var StringTokenizer = function(s, t) {
	this.s = s;
	this.t = t;
	this.pos = 0;
};

StringTokenizer.prototype.nextToken = function() {
	var l = this.s.length;

	while (true) {
		if (this.pos >= l) {
			return null;
		}
		var t = l;
		for (var i = 0; i < this.t.length; i++) {
			var u = this.s.indexOf(this.t.charAt(i), this.pos);
			if (u >= 0 && u < t) {
				t = u;
			}
		}
		var m = this.pos;
		if (t > this.pos) {
			this.pos = t + 1;
			var v = this.s.substring(m, t);
			if (v.length > 0){
				return v;
			}
		}
		this.pos++;
	}
};

StringTokenizer.prototype.countTokens = function() {
	var t = this.pos;
	
	this.pos = 0;
	var i = 0;
	for (i = 0; this.nextToken() !== null; i++){
		;
	}
	this.pos = t;
	return i;
};
var Integer = function(i){
	this.n = i;
};

Integer.prototype.intValue = function() {
	return this.n;
};

Integer.parseInt = function(s) {
	return parseInt(s, 10);
};

Integer.$valueOf = function(v){
	var i = parseInt(v, 10);
	if (isNaN(i)){
		throw new TypeError();
	}
	return new Integer(i);
};

var Float = function(i){
	this.n = i;
};

Float.prototype.floatValue = function() {
	return this.n;
};

Float.parseFloat = function(s) {
	return parseFloat(s);
};

Float.$valueOf = function(v){
	var i = parseFloat(v);
	if (isNaN(i)){
		throw new TypeError();
	}
	return new Float(i);
};

var Thread = function(obj, func, t){
	this.obj = obj;
	this.func = func;
	this.interval = t;
	this.id = 0;
	this.t = 0;
};

Thread.prototype.start = function() {
	//this.id = setInterval(this.func, this.interval);
	if (this.func == null){
		return;
	}
	var now = +(new Date());
	if (this.t <= 0){
		this.t = now;
	}
	var old = this.t;
	//var dt = now - old;
	var dt = now - (old + this.interval);
	if (dt < 0){
		dt = 0;
	}
	this.t = now;
	var itval = this.interval - dt;
	if (itval < 10){
		itval = 10;
	}

	var target = this;
	setTimeout(function(){
			Thread.prototype.start.apply(target);
		}, itval);
	var f = this.func;
	var o = this.obj;
	f.apply(o);
};

Thread.prototype.stop = function() {
	//clearInterval(this.id);
	this.func = null;
};
var Component = function(id){
	this.id = id;
	// @FOO
	//this.obj = $('#' + id);
};

Component.prototype.setEnabled = function(b) {

};
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
var Graphics = function(ctx, visible) {
	//if (arguments.length < 1) {
	//	return;
	//}
	//Component.apply(this, [id]);
	this.ctx = ctx;
	this.strokeStyle = Graphics.COLOR_BLACK;
	this.fillStyle = Graphics.COLOR_BLACK;
	this.isColorSet = false;
	this.center = 0;
	this.ctx.lineWidth = 1;

	this.visible = visible;
};
//Graphics.prototype = new Component();
Graphics.off_x = 0;
Graphics.off_y = 0;
Graphics.canvasScale = 0;

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
	if (this.visible){
		x += Graphics.off_x;
		y += Graphics.off_y;
		x2 += Graphics.off_x;
		y2 += Graphics.off_y;
	}

	x *= Graphics.canvasScale;
	y *= Graphics.canvasScale;
	x2 *= Graphics.canvasScale;
	y2 *= Graphics.canvasScale;

	x = x | 0;
	y = y | 0;
	x2 = x2 | 0;
	y2 = y2 | 0;

	var width = Math.abs(x2 - x);
	var height = Math.abs(y2 - y);

	//@this.ctx.beginPath();
	this.setColor();
	this.ctx.clearRect(x, y, width, height);
	//@this.ctx.closePath();
	//@this.ctx.stroke();
};

Graphics.prototype.fillRect = function(x, y, x2, y2) {
	if (this.visible){
		x += Graphics.off_x;
		y += Graphics.off_y;
		x2 += Graphics.off_x;
		y2 += Graphics.off_y;
	}

	x *= Graphics.canvasScale;
	y *= Graphics.canvasScale;
	x2 *= Graphics.canvasScale;
	y2 *= Graphics.canvasScale;

	x = x | 0;
	y = y | 0;
	x2 = x2 | 0;
	y2 = y2 | 0;

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
	if (this.visible){
		x += Graphics.off_x;
		y += Graphics.off_y;
	}

	x *= Graphics.canvasScale;
	y *= Graphics.canvasScale;

	x = x | 0;
	y = y | 0;

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

Graphics.prototype.drawLine = function(x1, y1, x2, y2, b) {
	if (this.visible){
		x1 += Graphics.off_x;
		y1 += Graphics.off_y;
		x2 += Graphics.off_x;
		y2 += Graphics.off_y;
	}

	if (arguments.length < 5) {
		b = true;
	}

	x1 *= Graphics.canvasScale;
	y1 *= Graphics.canvasScale;
	x2 *= Graphics.canvasScale;
	y2 *= Graphics.canvasScale;

	if (b){
		x1 = x1 | 0;
		y1 = y1 | 0;
		x2 = x2 | 0;
		y2 = y2 | 0;
	}

	//@this.ctx.beginPath();
	//this.ctx.strokeStyle = "rgba(0, 0, 0, 1.0)";
	this.setColor();
	this.ctx.moveTo(x1 + this.center, y1);
	this.ctx.lineTo(x2 + this.center, y2);
	//@this.ctx.closePath();
};

Graphics.prototype.drawOval = function(x, y, w, h) {
	if (this.visible){
		x += Graphics.off_x;
		y += Graphics.off_y;
	}

	x += w / 2;
	y += h / 2;
	var r = Math.floor((w + h) / 4);

	x *= Graphics.canvasScale;
	y *= Graphics.canvasScale;
	r *= Graphics.canvasScale;

	x = x | 0;
	y = y | 0;
	r = r | 0;

	//@this.ctx.beginPath();
	this.setColor();
	this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
	//this.ctx.fill();
	//@this.ctx.closePath();
	//@this.ctx.stroke();
};

Graphics.prototype.fillOval = function(x, y, w, h) {
	if (this.visible){
		x += Graphics.off_x;
		y += Graphics.off_y;
	}

	x += w / 2;
	y += h / 2;
	var r = Math.floor((w + h) / 4);

	x *= Graphics.canvasScale;
	y *= Graphics.canvasScale;
	r *= Graphics.canvasScale;

	x = x | 0;
	y = y | 0;
	r = r | 0;
	x += 1;
	y += 1;
	if (r < 1){
		r = 1;
	}

	//@this.ctx.beginPath();
	this.setColor();
	this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
	//@this.ctx.closePath();
	//@this.ctx.stroke();
};

Graphics.prototype.drawCircle = function(x, y, r) {
	if (this.visible){
		x += Graphics.off_x;
		y += Graphics.off_y;
	}

	x *= Graphics.canvasScale;
	y *= Graphics.canvasScale;
	r *= Graphics.canvasScale;

	x = x | 0;
	y = y | 0;
	r = r | 0;

	//@this.ctx.beginPath();
	this.setColor();
	this.ctx.arc(x + this.center, y, r, 0, (360 * Math.PI / 180), true);
	//@this.ctx.closePath();
	//@this.ctx.stroke();
};

//Graphics.prototype.drawImage = function(i, x, y, size) {
Graphics.prototype.putImageData = function(img, x, y, obj) {
	if (this.visible){
		x += Graphics.off_x;
		y += Graphics.off_y;
	}

	x *= Graphics.canvasScale;
	y *= Graphics.canvasScale;

	x = x | 0;
	y = y | 0;

	//@this.ctx.beginPath();
	//var color = JugglerCanvas.color[i % JugglerCanvas.color.length];
	//this.ctx.fillStyle = toRGB(color);
	//this.ctx.arc(x + this.center, y, size, 0, (360 * Math.PI / 180), true);
	//this.ctx.fill();
	this.setColor();
	this.ctx.putImageData(img.getImage(), x, y);
	//@this.ctx.closePath();
};

Graphics.prototype.drawImage = function(offscrn, x, y){
	if (this.visible){
		x += Graphics.off_x;
		y += Graphics.off_y;
	}

	x *= Graphics.canvasScale;
	y *= Graphics.canvasScale;
	x = x | 0;
	y = y | 0;
	this.ctx.drawImage(offscrn.getCanvas(), x, y);
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

Graphics.prototype.fill = function() {
	this.ctx.stroke(); // なぜかしら、drawImage()で輪郭が描画されないため
	this.ctx.fill();
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
		var ss = "rgba(" + c.r + ", " + c.g + ", " + c.b + ", 1.0)";
		var fs = "rgba(" + c.r + ", " + c.g + ", " + c.b + ", 1.0)";
		if (this.strokeStyle != ss || this.fillStyle != fs){
			this.strokeStyle = ss;
			this.fillStyle = fs;
			this.isColorSet = true;
		}
	}
};

Graphics.prototype.create = function(x, y, w, h) {
	var g = new Graphics(this.ctx); // x, y, w, hを使用していない
	return g;
};

Graphics.COLOR_BLACK = "rgba(0, 0, 0, 1.0)";
Graphics.COLOR_RED = "rgba(255, 0, 0, 1.0)";
Graphics.COLOR_WHITE = "rgba(255, 255, 255, 1.0)";
var Clazz = function(){
	
};

Clazz.newArray = function(v1, v2, v3) {
	var a = new Array(v1);
	
	if (arguments.length < 3){
		this.arrayInit(a, v2);
	}
	else {
		for (var i = 0; i < v1; i++){
			var b = new Array(v2);
			this.arrayInit(b, v3);
			a[i] = b;
		}
	}
	return a;
};

Clazz.instanceOf = function(e, t){
	return false;
};

Clazz.arrayInit = function(n, v){
	for (var i = 0; i < n.length; i++){
		n[i] = v;
	}
};

function parseId(s){
	var n = s.indexOf('_');
	if (n < 0){
		return -1;
	}
	return parseInt(s.substring(n + 1), 10);
}

function clone(o)
{
    var f = function(){};
    f.prototype = o;
    return new f();
}

function isUndefined(obj) {
	return typeof obj == 'undefined';
}
// package
var java = function() {

};

var util = function() {

};

var awt = function() {

};

java.awt = awt;
java.util = util;
java.util.Hashtable = Hashtable;
java.util.HashSet = HashSet;
java.util.Vector = Vector;
java.util.StringTokenizer = StringTokenizer;

// function
java.awt.Color = function(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
};

java.awt.Color.prototype.put = function(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
};

java.awt.Color.white = new java.awt.Color(255, 255, 255);
java.awt.Color.black = new java.awt.Color(0, 0, 0);
java.awt.Color.red = new java.awt.Color(255, 0, 0);

//var Enumeration = function() {
//
//};

String.prototype.equals = function(param) {
	if (this == param) {
		return (typeof param === 'string')? true : false;
	}
	return false;
};

String.prototype.compareTo = function(b) {
	var a = this;
	
	if (a < b){
		return -1;
	}
	if (a > b){
		return 1;
	}
	return 0;
};

var System = function(){
	
};
System.out = function(){
	
};

System.out.println = function(s){
	
};

System.arraycopy = function(src, srcPos, dest, destPos, length) {
	for (var i = 0; i < length; i++) {
		dest[destPos + i] = src[srcPos + i];
	}
};

var Throwable = function(){
	
};
var Resource = function(){

};
Resource.fontSize = 14;
var Arm = function(){
	this.rx = new Array(6);
	this.ry = new Array(6);
	this.lx = new Array(6);
	this.ly = new Array(6);
	this.hx = 0;
	this.hy = 0;
	this.hr = 0;	
};

var Ball = function(){
    //Jmj jmj;

    this.bh = 0;
    this.gx = 0;
    this.gy = 0;
    this.gx0 = 0;
    this.gy0 = 0;
    this.gx1 = 0;
    this.gy1 = 0;
    this.c = 0;
    this.c0 = 0;
    this.chand = 0;
    this.thand = 0;
    this.st = 0;

    this.hand_x = 0;
    this.hand_y = 0;

    this.tPer = 0;
    this.cPer = 0;   // tPer : throw person,  cPer : catch person
};

Ball.prototype.juggle = function() {
	var tp;
	var flag = 0;
	var i;
	var tpox = 0;
	var rpox = 0;
	var tpoz = 0;
	var rpoz = 0;
	var x;
	var y;
	var fx;
	
	this.gx0 = this.gx;
	this.gy0 = this.gy;
	var iFlag = this.c;
	
	if (this.c < 0) {
		if (Ball.jmj.time_count >= -this.c * Ball.jmj.tw) {
			this.c = -this.c;
		}
	}
	while (true) {
		tp = (Ball.jmj.time_count - Ball.jmj.tw * Math.abs (this.c));
		if (tp < Ball.jmj.aw) {
			break;
		}
        this.st &= ~Ball.OBJECT_UNDER;
		this.c0 = this.c;
		
        if((this.st & Ball.OBJECT_HAND) != 0) {
			this.c += 2;
			flag = 1;
		} else {
			var t;
			t = this.c;
			if (Ball.jmj.isSync) {
				if (Ball.jmj.mirror && this.chand == 0) {
					t++;
				}
				else if (!Ball.jmj.mirror && this.chand != 0) {
					t++;
				}
			}
			t %= Ball.jmj.pattw;
			this.bh = Ball.jmj.patt[t][Ball.jmj.r[t]];
			this.c += Math.abs (this.bh);
			if (++Ball.jmj.r[t] >= Ball.jmj.patts[t]) {
				Ball.jmj.r[t] = 0;
			}
			this.thand = this.chand;
			if (((this.bh & 1) != 0) || this.bh < 0) {
				this.chand = 1 - this.chand;
			}
			flag = 1;
		}
	}
	if (this.c < 0) {
		this.cPer = (Math.floor (-this.c / 2)) % Jmj.iPerNo;
	} else {
		this.cPer = (Math.floor (this.c / 2)) % Jmj.iPerNo;
	}
	if (this.c0 < 0) {
		this.tPer = (Math.floor (-this.c0 / 2)) % Jmj.iPerNo;
	} else {
		this.tPer = (Math.floor (this.c0 / 2)) % Jmj.iPerNo;
	}
	
	if (iFlag == Math.abs (this.bh)) {
		this.cPer = (Math.floor (Math.abs (this.bh) / 2)) % Jmj.iPerNo;
		this.tPer = (Math.floor (Math.abs (this.bh) / 2)) % Jmj.iPerNo;
	}
	
    if ((this.st & Ball.OBJECT_HAND) != 0) {
		this.tPer = Ball.jmj.jPerNo;
		this.cPer = Ball.jmj.jPerNo;
	}
	
	if (this.c >= 0 && tp >= 0 && (this.st & Ball.OBJECT_UNDER) == 0) {
		this.st |= Ball.OBJECT_UNDER;

        if((this.st & Ball.OBJECT_HAND) != 0) {
			if ((this.st & Ball.OBJECT_MOVE2) != 0) {
				this.st |= Ball.OBJECT_MOVE;
                this.st &= ~Ball.OBJECT_MOVE2;
			} else {
                this.st &= ~Ball.OBJECT_MOVE;
			}
		} else {
			var h;
			var t;
			t = this.c;
			if (Ball.jmj.isSync) {
				if (Ball.jmj.mirror && this.chand == 0) {
					t++;
				} else if (!Ball.jmj.mirror && this.chand != 0) {
					t++;
				}
			}
			t %= Ball.jmj.pattw;
			if (this.bh == 1) {
                this.st |= Ball.OBJECT_MOVE;
			} else {
				//this.st &= -5;
                this.st &= ~Ball.OBJECT_MOVE;
			}
			for (i = 0; i < Ball.jmj.patts[t]; i++) {
				h = Ball.jmj.patt[t][i];
				if (h == 1) {
					if (Ball.jmj.mirror == false) {
						if (this.chand != 0) {
							Ball.jmj.lhand[(this.cPer + 1) % Jmj.iPerNo].st |= Ball.OBJECT_MOVE2;
						} else {
							Ball.jmj.rhand[(this.cPer + 1) % Jmj.iPerNo].st |= Ball.OBJECT_MOVE2;
						}
					} else {
						if (this.chand != 0) {
							Ball.jmj.lhand[(this.cPer + Jmj.iPerNo - 1) % Jmj.iPerNo].st |= Ball.OBJECT_MOVE2;
						} else {
							Ball.jmj.rhand[(this.cPer + Jmj.iPerNo - 1) % Jmj.iPerNo].st |= Ball.OBJECT_MOVE2;
						}
					}
				}
				this.hand_pos (this.c, this.chand, this.cPer);
				tpox = this.hand_x;
				tpoz = this.hand_y;
				this.hand_pos (this.c + Math.abs (h), this.chand, this.cPer);
				rpox = this.hand_x;
				rpoz = this.hand_y;
				if ((Jmj.iPerNo == 1 && h == 2) || (Jmj.iPerNo > 1 && h == Jmj.iPerNo * 2 && tpox == rpox && tpoz == rpoz)) {
		
				} else {
					// ボールを投げる
					if (this.chand != 0) {
						Ball.jmj.rhand[this.cPer].st |= Ball.OBJECT_MOVE2;
					} else {
						Ball.jmj.lhand[this.cPer].st |= Ball.OBJECT_MOVE2;
					}
					//this.st |= 4;
                    this.st |= Ball.OBJECT_MOVE;
				}
			}
		}
	}
	
	if ((this.st & Ball.OBJECT_UNDER) != 0 && this.bh != 1) {
		this.tPer = this.cPer;
	}
	
	if (this.c < 0) this.tPer = this.cPer;

	if ((this.st & Ball.OBJECT_MOVE) == 0) {
		if (this.c < 0) {
			this.hand_pos (-this.c, this.chand, this.tPer);
			tpox = this.hand_x;
			tpoz = this.hand_y;
			rpox = tpox;
			rpoz = tpoz;
		} else {
			//if ((this.st & 2) != 0) {
			if ((this.st & Ball.OBJECT_UNDER) != 0) {
				this.hand_pos (this.c, this.chand, this.tPer);
				tpox = this.hand_x;
				tpoz = this.hand_y;
				this.hand_pos (this.c + 2 * Jmj.iPerNo, this.chand, this.cPer);
				rpox = this.hand_x;
				rpoz = this.hand_y;
				if (tpox != rpox || tpoz != rpoz) {
					this.hand_pos (this.c + 1, this.chand, this.cPer);
					rpox = this.hand_x;
					rpoz = this.hand_y;
					if (tpox != rpox || tpoz != rpoz) {
						this.st |= Ball.OBJECT_MOVE;
					}
				}
			} else {
				this.hand_pos (this.c - 2, this.chand, this.tPer);
				tpox = this.hand_x;
				tpoz = this.hand_y;
				this.hand_pos (this.c, this.chand, this.cPer);
				rpox = this.hand_x;
				rpoz = this.hand_y;
				if (tpox != rpox || tpoz != rpoz) {
					this.hand_pos (this.c - 1, this.chand, this.tPer);
					tpox = this.hand_x;
					tpoz = this.hand_y;
					if (tpox != rpox || tpoz != rpoz) {
						this.st |= Ball.OBJECT_MOVE;
					}
				}
			}
		}
	}
	if ((this.st & Ball.OBJECT_MOVE) != 0) {
		if (this.bh == 1) {
			this.hand_pos (this.c0 + 1, this.thand, this.tPer);
			tpox = this.hand_x;
			tpoz = this.hand_y;
			this.hand_pos (this.c + 1, this.chand, this.cPer);
			rpox = this.hand_x;
			rpoz = this.hand_y;
		//} else if ((this.st & 2) != 0) {
		} else if ((this.st & Ball.OBJECT_UNDER) != 0) {
			this.hand_pos (this.c, this.chand, this.tPer);
			tpox = this.hand_x;
			tpoz = this.hand_y;
			this.hand_pos (this.c + 1, this.chand, this.cPer);
			rpox = this.hand_x;
			rpoz = this.hand_y;
		} else {
			this.hand_pos (this.c0 + 1, this.thand, this.tPer);
			tpox = this.hand_x;
			tpoz = this.hand_y;
			this.hand_pos (this.c, this.chand, this.cPer);
			rpox = this.hand_x;
			rpoz = this.hand_y;
		}
	}
	
    // add position data on Throw & Catch person
    if ((this.st & Ball.OBJECT_HAND) == 0) {
		if (Ball.jmj.mirror == false) {
			tpox += Math.floor (Ball.jmj.iXData[this.tPer] * 40 / Jmj.PXY);
			rpox += Math.floor (Ball.jmj.iXData[this.cPer] * 40 / Jmj.PXY);
		} else {
			tpox -= Math.floor (Ball.jmj.iXData[this.tPer] * 40 / Jmj.PXY);
			rpox -= Math.floor (Ball.jmj.iXData[this.cPer] * 40 / Jmj.PXY);
		}
		tpoz += Math.floor (Ball.jmj.iYData[this.tPer] * 20 / Jmj.PXY);
		rpoz += Math.floor (Ball.jmj.iYData[this.cPer] * 20 / Jmj.PXY);
	} else {
		if (Ball.jmj.mirror == false) {
			tpox += Math.floor (Ball.jmj.iXData[Ball.jmj.jPerNo] * 40 / Jmj.PXY);
			rpox += Math.floor (Ball.jmj.iXData[Ball.jmj.jPerNo] * 40 / Jmj.PXY);
		} else {
			tpox -= Math.floor (Ball.jmj.iXData[Ball.jmj.jPerNo] * 40 / Jmj.PXY);
			rpox -= Math.floor (Ball.jmj.iXData[Ball.jmj.jPerNo] * 40 / Jmj.PXY);
		}
		tpoz += Math.floor (Ball.jmj.iYData[Ball.jmj.jPerNo] * 20 / Jmj.PXY);
		rpoz += Math.floor (Ball.jmj.iYData[Ball.jmj.jPerNo] * 20 / Jmj.PXY);
	}
	
    if((this.st & Ball.OBJECT_HAND) == 0 && this.c < 0 ) {
		if (tpox == 0) {
			fx = 0;
			y = Math.round ((tpoz * Ball.jmj.dpm / 20 - Math.floor (Math.floor (tp * Ball.jmj.dpm / 12) / Ball.jmj.tw)));
		} else {
			if (tpox > 0) {
				fx = tpox / 10 - tp / 6 / Ball.jmj.tw;
			} else {
				fx = tpox / 10 + tp / 6 / Ball.jmj.tw;
			}
			y = Math.round ((tpoz * Ball.jmj.dpm / 20));
		}
	} else if ((this.st & Ball.OBJECT_MOVE) == 0) {
		fx = tpox / 10;
		y = Math.round ((tpoz * Ball.jmj.dpm / 20));
	} else {
		if (this.bh == 1) {
			fx = (tp - Ball.jmj.aw) / Ball.jmj.tw * 2 + 1;
			y = Math.round ((Ball.jmj.high[1] * (1 - this.square (fx))));
		} else if ((this.st & Ball.OBJECT_UNDER) != 0) {
			fx = tp / Ball.jmj.aw * 2 - 1;
			y = Math.round ((Ball.jmj.high[0] * (1 - this.square (fx))));
		} else {
			fx = tp / (Ball.jmj.tw * Math.abs (this.bh) - Ball.jmj.aw) * 2 + 1;
			y = Math.round ((Ball.jmj.high[Math.abs (this.bh)] * (1 - this.square (fx))));
		}
		y += (fx * (rpoz - tpoz) + rpoz + tpoz) * Ball.jmj.dpm / 40;
		fx = (fx * (rpox - tpox) + rpox + tpox) / 20;
	}
	
	x = Math.round ((fx * Ball.jmj.dpm * Jmj.KW));
	this.gx = (x - 11);
	
    if((this.st & Ball.OBJECT_HAND) != 0) {
		if (this.chand != 0) {
			this.gx += Ball.jmj.hand_x;
		} else {
			this.gx -= Ball.jmj.hand_x;
		}
		y -= Ball.jmj.hand_y;
	}
	this.gy = (Ball.jmj.$base - y - 11);
	return flag;
};

Ball.prototype.hand_pos = function(c, h, person) {
	var a;
	var a2;
	var a3;
	
	if (Ball.jmj.mirror) {
		if (!Ball.jmj.isSync && h != 0) {
			c--;
		}
		if ((c & 1) != 0) {
			a2 = (--c + h);
			a3 = Math.floor (a2 / (Jmj.iPerNo * 2));
			a3 = a3 * 2;
			if ((Math.floor (a2 / 2)) * 2 != a2) a3++;
			a = (a3 % (Math.floor (Ball.jmj.motionlength[person] / 4))) * 4 + 2;
		} else {
			a2 = (c + h);
			a3 = Math.floor (a2 / (Jmj.iPerNo * 2));
			a3 = a3 * 2;
			if ((Math.floor (a2 / 2)) * 2 != a2) a3++;
			a = (a3 % (Math.floor (Ball.jmj.motionlength[person] / 4))) * 4;
		}
	} else {
		if (!Ball.jmj.isSync && h == 0) {
			c--;
		}
		if ((c & 1) != 0) {
			a2 = (c - h);
			a3 = Math.floor (a2 / (Jmj.iPerNo * 2));
			a3 = a3 * 2;
			if ((Math.floor (a2 / 2)) * 2 != a2) a3++;
			a = (a3 % (Math.floor (Ball.jmj.motionlength[person] / 4))) * 4 + 2;
		} else {
			a2 = (c + 1 - h);
			a3 = Math.floor (a2 / (Jmj.iPerNo * 2));
			a3 = a3 * 2;
			if ((Math.floor (a2 / 2)) * 2 != a2) a3++;
			a = (a3 % (Math.floor (Ball.jmj.motionlength[person] / 4))) * 4;
		}
	}
	if (h != 0) {
		this.hand_x = Ball.jmj.motionarray2[person][a];
	} else {
		this.hand_x = -Ball.jmj.motionarray2[person][a];
	}
	this.hand_y = Ball.jmj.motionarray2[person][a + 1];
};	

Ball.prototype.square = function(x) {
	return x * x;
};

Ball.OBJECT_HAND = 0x01;
Ball.OBJECT_UNDER = 0x02;
Ball.OBJECT_MOVE = 0x04;
Ball.OBJECT_MOVE2 = 0x08;

Ball.jmj = null;
var Jmj = function() {
	// Filed
	//this.strVer = "2.20__";
	this.TEST_MODE = false;
	//this.redrawrate = 100.0;
	this.redrawrate = 25.0;
	this.iXData = null;
	this.iYData = null;
	this.iMoveX = 0;
	this.iXmin = 0;
	this.iXmax = 0;
	this.imf = null;
	this.controller = null;
	this.holder = null;
	this.kicker = null;
	this.dpm = 0;
	this.hand_x = 0;
	this.hand_y = 0;
	this.arm_x = 0;
	this.arm_y = 0;
	this.gx_max = 0;
	this.gx_min = 0;
	this.tx = 0;
	this.c0 = 0;
	this.status = 0;
	this.ap = null;
	this.gy_max = 0;
	this.gy_min = 0;
	this.ga = 9.8;
	this.dwell = 0;
	this.$height = 0;
	this.speed = 1.0;
	this.$base = 0;
	this.mirror = false;
	this.pattern = null;
	this.siteswap = null;
	this.motion = Jmj.NORMAL;
	this.startpattern = null;
	this.patternfiles = null;
	this.filename = null;
	this.motionarray = null;
	this.motionarray2 = null;
	this.motionlength = null;
	this.motion2 = null;
	this.formationXY = null;
	this.formation = Jmj.FORMATION_BASIC;
	this.formationarray = null;
	this.startindex = -1;
	this.fallback_startindex = 0;
	this.time_count = 0;
	this.time_period = 0;
	this.isSync = false;
	this.bSound = false;
	this.hand_on = true;
	this.show_ss = true;
	this.intsyn = 0;
	this.rhand = null;
	this.lhand = null;
	this.b = null;
	this.tw = 0;
	this.aw = 0;
	this.ballno = 0;
	this.max_height = 0;
	this.jPerNo = 0;
	this.msg = null;
	this.patt = null;
	this.patts = null;
	this.pattw = 0;
	this.r = null;
	this.high = null;
	this.patt_x = 0;
	this.kw0 = 0;
	this.singless = null;
	this.vsync_Count1 = 0;
	this.audioClip = null;
	this.color = null;
	this.gg1 = null;
	this.gg2 = null;
	this.bm = null;
	this.r_bm = null;
	this.l_bm = null;
	this.bm_gc = null;
	this.r_bm_gc = null;
	this.l_bm_gc = null;
	this.image_pixmap = null;
	this.image_gc = null;
	this.bm1 = 0;
	this.bm2 = 0;

	// Field Init
	this.iXData = Clazz.newArray(100, 0);
	this.iYData = Clazz.newArray(100, 0);
	this.ap = new Array(Jmj.PERMAX);
	this.motionarray = [ 13, 0, 4, 0 ];
	this.motionarray2 = Clazz.newArray(Jmj.PERMAX, 1000, 0);
	this.motionlength = Clazz.newArray(Jmj.PERMAX, 0);
	this.motion2 = new Array(Jmj.PERMAX);
	this.formationXY = Clazz.newArray(100, 0);
	this.formationarray = [ 0, 0 ];
	this.rhand = new Array(Jmj.PERMAX);
	this.lhand = new Array(Jmj.PERMAX);
	this.b = new Array(35);
	// @FOO
	//this.msg = new MessageBox();
	this.patt = Clazz.newArray(Jmj.LMAX, Jmj.MMAX, 0);
	this.patts = Clazz.newArray(Jmj.LMAX, 0);
	this.r = Clazz.newArray(Jmj.LMAX * 2, 0);
	this.high = Clazz.newArray(Jmj.BMAX + 1, 0);
	this.singless = new Array(Jmj.LMAX);
	this.color = [ new java.awt.Color(255, 255, 255),
			new java.awt.Color(80, 80, 80), new java.awt.Color(0, 0, 0),
			new java.awt.Color(0, 100, 200), new java.awt.Color(200, 0, 100),
			new java.awt.Color(100, 200, 0), new java.awt.Color(50, 150, 200),
			new java.awt.Color(200, 50, 150), new java.awt.Color(100, 200, 50),
			new java.awt.Color(0, 150, 50), new java.awt.Color(50, 0, 150),
			new java.awt.Color(150, 50, 0), new java.awt.Color(0, 200, 0),
			new java.awt.Color(255, 200, 0), new java.awt.Color(255, 0, 0),
			new java.awt.Color(0, 0, 200) ];
	this.bm = new Array(Jmj.NCOLOR);
	this.r_bm = new Array(Jmj.NCOLOR);
	this.l_bm = new Array(Jmj.NCOLOR);
	this.bm_gc = new Array(Jmj.NCOLOR);
	this.r_bm_gc = new Array(Jmj.NCOLOR);
	this.l_bm_gc = new Array(Jmj.NCOLOR);

	this.data = [ 0, 18, 0, 23, 17, 23, 20, 22, 22, 20, 23, 17, 23, 12, 18, 12,
			18, 16, 16, 18, 0, 18, 12, 15, 23, 17 ];

	this.sbm = new Array();
};

Jmj.prototype.init = function(isInit) {
	var s;
	s = Jmj.getParameter("embed");
	if (s != null && s.equalsIgnoreCase("true")) {
		//( $t$ = Jmj.Y_OFFSET = 0, Jmj.prototype.Y_OFFSET = Jmj.Y_OFFSET, $t$);
		Jmj.Y_OFFSET = 0;
		this.setBackground(java.awt.Color.white);
		this.resize(Jmj.IMAGE_WIDTH, Jmj.IMAGE_HEIGHT + Jmj.Y_OFFSET + 20);
		this.validate();
		this.setVisible(true);
		this.image_pixmap = this.createImage(Jmj.IMAGE_WIDTH,
				Jmj.IMAGE_HEIGHT + 20);
		this.image_gc = this.image_pixmap.getGraphics();
	} else {
		//@this.imf = Clazz.innerTypeInstance(Jmj.ImageFrame, this, null, this);
		// @FOO
		//this.imf = new Canvas('canvas');
		this.imf = new Canvas(Jmj.canvas, true);
		//( $t$ = Jmj.Y_OFFSET = 20, Jmj.prototype.Y_OFFSET = Jmj.Y_OFFSET, $t$);
		Jmj.Y_OFFSET = 20;
		this.imf.setLayout(null);
		this.imf.setBackground(java.awt.Color.white);
		this.imf.setSize(Jmj.IMAGE_WIDTH, Jmj.IMAGE_HEIGHT + Jmj.Y_OFFSET + 20);
		this.imf.validate();
		//@var d = this.getToolkit().getScreenSize();
		//@this.imf.setLocation(Math.floor(d.width / 2), 0);
		//@d = null;
		this.imf.setVisible(true);
		this.image_pixmap = this.imf.createImage(Jmj.IMAGE_WIDTH,
				Jmj.IMAGE_HEIGHT + 20);
		this.image_gc = this.image_pixmap.getGraphics();
	}

	this.holder = new PatternHolder(this);

	//motionarray2[][] にノーマルのパターンを入れておく
	var icnt;
	for (icnt = 0; icnt < Jmj.PERMAX; icnt++) {
		this.holder.getMotion2(Jmj.NORMAL, icnt);
	}
	if (isInit) {
		this.controller = new JmjController(this, Jmj.getParameter("noquit"),
				isInit);
		// @FOO
		/*
		this.controller.setLocation(0, 0);
		this.controller.setVisible(true);
		this.controller.enableMenuBar();
		*/
	}
	for ( var i = 0; i < Jmj.BMAX; i++) {
		this.b[i] = new Ball();
	}
	//( $t$ = Ball.jmj = this, Ball.prototype.jmj = Ball.jmj, $t$);
	Ball.jmj = this;

	var i;
	for (i = 0; i < Jmj.PERMAX; i++) {
		this.ap[i] = new Arm();
		this.rhand[i] = new Ball();
		this.lhand[i] = new Ball();
	}
	this.SetXYDummyData();
	this.readParameter(isInit);
	if (this.startindex == -1) {
		this.startindex = this.fallback_startindex;
		//this.startJuggling(this.startindex, null);
		//this.controller.patternList.select(this.startindex);
	}
};

Jmj.prototype.stopJuggling = function() {
	if (this.kicker != null) {
		this.kicker.stop();
		this.kicker = null;
	}
	this.status = Jmj.IDLE;
};

Jmj.prototype.readParameter = function(isInit) {
	// @FOO
	return;
	var s;

	s = Jmj.getParameter("file");
	this.startpattern = Jmj.getParameter("startwith");
	this.patternfiles = Jmj.getParameter("patternfiles");
	if (s != null && s.length != 0) {
		this.openFile(s, isInit);
	}
	if (!isInit) {
		// 初回だけ実行させる(初期化のため。手抜き)
		return;
	}

	var orgPattern = this.startpattern;
	var query = getQueryString();
	var pattern = null;
	var siteswap = null;
	if (query != null) {
		siteswap = query["siteswap"];
		if (!siteswap) {
			pattern = query["startwith"];
			if (pattern) {
				this.startpattern = pattern;
			}
		}
	}

	if (!pattern && !siteswap) {
		if (this.startindex >= 0) {
			{
				this.startJuggling(this.startindex);
			}
			return;
		}
		if (this.startpattern != null && this.startpattern.length > 0) {
			if (!this.startJuggling(Jmj.SITESWAP_MODE, this.startpattern)) {
				this.putError("Error in <param> tag with \'startwith\' term.",
						"Mail this message to the webmaster");
				return;
			}
		}
	} else if (siteswap) {
		if (!this.startJuggling(Jmj.SITESWAP_MODE, siteswap)) {
			this.startpattern = orgPattern;
			this.controller.forceNewChoice();
			if (!this.chooseTrickByName(this.startpattern)) {
				return;
			}
			return;
		}
	} else {
		if (!this.chooseTrickByName(this.startpattern)) {
			this.startpattern = orgPattern;
			this.controller.forceNewChoice();
			if (!this.chooseTrickByName(this.startpattern)) {
				return;
			}
			return;
		}
	}

	if (pattern || siteswap) {
		$.mobile.changePage('#page2');
	}
};

Jmj.prototype.openFile = function(s, isInit) {
	var fp = null;
	this.controller.disableSwitches();
	this.stopJuggling();
	this.controller.disableMenuBar();
	this.controller.patternList.removeAll();
	//System.gc();

	fp = new BufferedReader(Clazz.data);
	this.controller.putPrimaryMessage("loading" + s);
	try {
		if (!this.holder.setHolder(fp))
			return;
	} finally {
		try {
			fp.close();
		} catch (e) {
			if (Clazz.instanceOf(e, java.io.IOException)) {
			} else {
				throw e;
			}
		}
	}
	this.controller.putMessage("Done loading " + s,
			"preparing patterns table.wait...");
	this.filename = s;
	for ( var i = 0;; i++) {
		//d = this.holder.nameAt(i);
		var p = this.holder.get(i);
		if (p == null) {
			break;
		}
		s = p.name;
		if (s.length == 0) {
			break;
		}
		var func = function(target) {
			return function(e) {
				target.controller.actionPerformedForPatternList(e);
			};
		}(this);
		this.controller.patternList.add('patternList', i, s, func, p.isPattern);
	}
	this.controller.patternList.add(null, 0, '', func, false);
	this.controller.patternList.validate();
	this.controller.enableSwitches();
	this.controller.putMessage("", "");
	this.controller.enableMenuBar();
	// Ver1.2.1
	if (!isInit) {
		this.resetCheckBoxValue();
	}
	this.controller.setSpeed(this.speed);
	this.controller.setIfShowBody(this.hand_on);
	this.controller.setIfShowSiteSwap(this.show_ss);
	this.controller.setIfMirror(this.mirror);
	this.controller.setIfSound(this.bSound);
	this.controller.setPerno(Jmj.iPerNo);
	this.controller.patternList.select(this.startindex);
	//System.gc();
};

Jmj.prototype.set_dpm = function() {
	var i;
	this.speed = 2;
	this.$base = 0;
	this.dpm = 400;
	this.gy_max = -20000;
	this.gy_min = 20000;
	this.gx_max = -20000;
	this.gx_min = 20000;
	this.iMoveX = 0;
	if (!this.pattInitialize())
		return;
	this.set_xmin_xmax();
	if (this.gy_max - this.gy_min > 0) {
		this.dpm = Math.round((136000.0 / (this.gy_max - this.gy_min)));
		if (this.dpm > Jmj.DW) {
			this.dpm = Jmj.DW;
		}

		var xdpm = (Jmj.IMAGE_WIDTH - Jmj.HOR_MARGIN * 2)
				/ (this.gx_max - this.gx_min);
		if (xdpm > 1)
			xdpm = 1;

		this.dpm = Math.min(Math.round((xdpm * Jmj.DW)), this.dpm);

		this.gx_min = Math.floor(this.gx_min * Jmj.DW / 400);
		this.gx_max = Math.floor(this.gx_max * Jmj.DW / 400);
		this.iXmax = Math.floor((this.gx_max - this.gx_min) * this.dpm
				/ (Jmj.DW * 2))
				+ Jmj.HOR_CENTER;
		this.iXmin = Jmj.IMAGE_WIDTH - this.iXmax;
		var DPM = this.dpm / Jmj.DW;
		this.iMoveX = Jmj.HOR_CENTER
				- Math.floor(Math.floor((this.gx_max + this.gx_min) / 2)
						* this.dpm / Jmj.DW);
		this.$base = Math.round((370 - this.gy_max * this.dpm / 400));
	}
};

Jmj.prototype.set_xmin_xmax = function() {
	var i;
	for (this.time_count = 0; this.time_count < this.tw
			* (this.pattw + this.max_height + (Math
					.floor(this.motionarray.length / 4))); this.time_count++) {
		for (i = 0; i < this.ballno; i++) {
			this.b[i].juggle();
			this.gy_max = Math.max(this.gy_max, this.b[i].gy);
			this.gy_min = Math.min(this.gy_min, this.b[i].gy);
			this.gx_max = Math.max(this.gx_max, this.b[i].gx);
			this.gx_min = Math.min(this.gx_min, this.b[i].gx);
		}
		for (this.jPerNo = 0; this.jPerNo < Jmj.iPerNo; this.jPerNo++) {
			this.rhand[this.jPerNo].juggle();
			this.lhand[this.jPerNo].juggle();
			this.gy_max = Math.max(this.gy_max, this.rhand[this.jPerNo].gy);
			this.gy_min = Math.min(this.gy_min, this.rhand[this.jPerNo].gy);
			this.gy_max = Math.max(this.gy_max, this.lhand[this.jPerNo].gy);
			this.gy_min = Math.min(this.gy_min, this.lhand[this.jPerNo].gy);
			this.gx_max = Math.max(this.gx_max, this.rhand[this.jPerNo].gx);
			this.gx_min = Math.min(this.gx_min, this.rhand[this.jPerNo].gx);
			this.gx_max = Math.max(this.gx_max, this.lhand[this.jPerNo].gx);
			this.gx_min = Math.min(this.gx_min, this.lhand[this.jPerNo].gx);
			this.ap[this.jPerNo].rx[0] = this.rhand[this.jPerNo].gx + 11
					+ this.arm_x;
			this.ap[this.jPerNo].ry[0] = this.rhand[this.jPerNo].gy + 11
					+ this.arm_y;
			this.ap[this.jPerNo].lx[0] = this.lhand[this.jPerNo].gx + 11
					- this.arm_x;
			this.ap[this.jPerNo].ly[0] = this.lhand[this.jPerNo].gy + 11
					+ this.arm_y;
			this.arm_line(this.jPerNo);
			for (i = 0; i < 5; i++) {
				this.gx_max = Math.max(this.gx_max, this.ap[this.jPerNo].rx[i]);
				this.gx_max = Math.max(this.gx_max, this.ap[this.jPerNo].lx[i]);
				this.gx_min = Math.min(this.gx_min, this.ap[this.jPerNo].rx[i]);
				this.gx_min = Math.min(this.gx_min, this.ap[this.jPerNo].lx[i]);
				this.gy_max = Math.max(this.gy_max, this.ap[this.jPerNo].ry[i]);
				this.gy_max = Math.max(this.gy_max, this.ap[this.jPerNo].ly[i]);
				this.gy_min = Math.min(this.gy_min, this.ap[this.jPerNo].ry[i]);
				this.gy_min = Math.min(this.gy_min, this.ap[this.jPerNo].ly[i]);
			}
		}
	}
};

Jmj.prototype.arm_line = function(j) {
	var mx;
	var my;
	var k;
	var sx;
	var sy;
	var iXhosei = 0;
	var iYhosei = 0;
	if (this.mirror == false) {
		iXhosei = Math.floor(this.iXData[j] * this.dpm / Jmj.PXY);
	} else {
		iXhosei = Math.floor(-this.iXData[j] * this.dpm / Jmj.PXY);
	}
	iYhosei = Math.floor(this.iYData[j] * this.dpm / Jmj.PXY);

	sx = (Math.floor(this.dpm * Jmj.XR / this.kw0));
	sy = this.$base - Math.floor(this.dpm / 3) - iYhosei;

	this.ap[j].rx[1] = Math.floor((this.ap[j].rx[0] + (iXhosei + sx) * 2) / 3)
			+ Math.floor(this.dpm / 12);
	this.ap[j].lx[1] = Math.floor((this.ap[j].lx[0] + (iXhosei - sx) * 2) / 3)
			- Math.floor(this.dpm / 12);
	this.ap[j].ry[1] = Math.floor((this.ap[j].ry[0] + sy) / 2)
			+ Math.floor(this.dpm / 8);
	this.ap[j].ly[1] = Math.floor((this.ap[j].ly[0] + sy) / 2)
			+ Math.floor(this.dpm / 8);
	this.ap[j].rx[2] = Math.floor((this.ap[j].rx[1] + (iXhosei + sx) * 3) / 4);
	this.ap[j].lx[2] = Math.floor((this.ap[j].lx[1] + (iXhosei - sx) * 3) / 4);
	this.ap[j].ry[2] = Math.floor((this.ap[j].ry[1] + sy * 2) / 3)
			- Math.floor(this.dpm / 25);
	this.ap[j].ly[2] = Math.floor((this.ap[j].ly[1] + sy * 2) / 3)
			- Math.floor(this.dpm / 25);
	this.ap[j].rx[3] = Math.floor((this.ap[j].rx[2] + (iXhosei + sx) * 2) / 3)
			- Math.floor(this.dpm / 13);
	this.ap[j].lx[3] = Math.floor((this.ap[j].lx[2] + (iXhosei - sx) * 2) / 3)
			+ Math.floor(this.dpm / 13);
	this.ap[j].ry[3] = Math.floor((this.ap[j].ry[2] + sy * 2) / 3)
			- Math.floor(this.dpm / 40);
	this.ap[j].ly[3] = Math.floor((this.ap[j].ly[2] + sy * 2) / 3)
			- Math.floor(this.dpm / 40);
	mx = Math.floor((this.ap[j].rx[3] + this.ap[j].lx[3]) / 2);
	my = Math.floor((this.ap[j].ry[3] + this.ap[j].ly[3]) / 2);
	this.ap[j].rx[4] = Math.floor((mx * 2 + this.ap[j].rx[3]) / 3);
	this.ap[j].lx[4] = Math.floor((mx * 2 + this.ap[j].lx[3]) / 3);
	this.ap[j].ry[4] = Math.floor((my * 2 + this.ap[j].ry[3]) / 3);
	this.ap[j].ly[4] = Math.floor((my * 2 + this.ap[j].ly[3]) / 3);
	this.ap[j].hx = mx;
	this.ap[j].hy = Math.floor((my * 2 - Math.floor(this.dpm * 2 / 3)
			+ this.$base - iYhosei) / 3);
	this.ap[j].hr = Math.floor(this.dpm / 11);
	this.ap[j].rx[5] = this.ap[j].hx + Math.floor(this.dpm / 20);
	this.ap[j].lx[5] = this.ap[j].hx - Math.floor(this.dpm / 20);
	this.ap[j].ry[5] = this.ap[j].hy + Math.floor(this.dpm / 13);
	this.ap[j].ly[5] = this.ap[j].ry[5];
};

Jmj.prototype.pattInitialize = function() {
	var i;
	var j;
	var k;
	var tw0;
	var aw0;
	this.ballno = 0;
	this.max_height = 0;
	for (i = 0; i < this.pattw; i++) {
		for (j = 0; j < this.patts[i]; j++) {
			this.ballno += Math.abs(this.patt[i][j]);
			this.max_height = Math.max(this.max_height, Math
					.abs(this.patt[i][j]));
		}
	}
	if (this.ballno % this.pattw != 0) {
		System.out.println("ballno % pattw != 0");
		return false;
	}
	this.ballno /= this.pattw;
	if (this.ballno > Jmj.BMAX) {
		System.out.println("Too many balls");
		return false;
	}
	for (i = 0; i < Jmj.LMAX * 2; i++) {
		this.r[i] = 0;
	}
	for (i = 0; i <= this.ballno; i++) {
		j = 0;
		while (this.r[j] == this.patts[j % this.pattw]
				&& j < this.pattw + this.max_height) {
			j++;
		}
		if (i == this.ballno) {
			if (j == this.pattw + this.max_height) {
				break;
			} else {
				System.out.println("Mulitplex error");
				return false;
			}
		}
		this.b[i].st = 0;
		if (this.mirror) {
			if ((j + this.intsyn) % 2 != 0) {
				this.b[i].thand = 1;
				this.b[i].chand = 1;
			} else {
				this.b[i].thand = 0;
				this.b[i].chand = 0;
			}
		} else {
			if ((j + this.intsyn) % 2 != 0) {
				this.b[i].thand = 0;
				this.b[i].chand = 0;
			} else {
				this.b[i].thand = 1;
				this.b[i].chand = 1;
			}
		}
		if (this.isSync) {
			this.b[i].c = -((Math.floor(j / 2))) * 2;
		} else {
			this.b[i].c = -j;
		}
		while (j < this.pattw + this.max_height) {
			if (this.r[j] == this.patts[j % this.pattw]) {
				return false;
			} else {
				this.r[j]++;
			}
			k = this.patt[j % this.pattw][this.patts[j % this.pattw]
					- this.r[j]];
			if (this.isSync && k < 0) {
				if (j % 2 == 0) {
					j += -k + 1;
				} else {
					j += -k - 1;
				}
			} else {
				j += k;
			}
		}
	}
	if (this.max_height < 3) {
		this.max_height = 3;
	}
	tw0 = Math.sqrt(2 / this.ga * this.max_height * this.$height) * 2
			/ (this.max_height - this.dwell * 2) * this.redrawrate / this.speed;
	this.tw = Math.round(this.fadd(tw0, 0));
	if (this.tw == 0) {
		//System.out.println("tw = 0");
		//return false;
		this.tw = 1;
	}
	aw0 = tw0 * this.dwell * 2;
	this.aw = Math.round(this.fadd(aw0, 0));
	if (this.aw < 1) {
		this.aw = 1;
	}
	if (this.aw > this.tw * 2 - 1) {
		this.aw = this.tw * 2 - 1;
	}
	this.patt_x = Math.round(Jmj.HOR_CENTER / 8)
			- Math.floor(this.siteswap.length / 2);

	this.kw0 = Math.round(Jmj.XR / Jmj.KW);

	this.high[0] = -0.2 * this.dpm;
	this.high[1] = Math.round((this.ga
			* this.square(tw0 / this.redrawrate * this.speed) / 8 * this.dpm));
	for (i = 2; i <= this.max_height; i++) {
		this.high[i] = Math.round((this.ga
				* this.square((tw0 * i - aw0) / this.redrawrate * this.speed)
				/ 8 * this.dpm));
	}
	for (i = 0; i < this.ballno; i++) {
		this.b[i].bh = 0;
		this.b[i].gx = 0;
		this.b[i].gy = Jmj.VER_CENTER;
		this.b[i].gx0 = 0;
		this.b[i].gy0 = Jmj.VER_CENTER;
		this.b[i].gx1 = 0;
		this.b[i].gy1 = Jmj.VER_CENTER;
	}
	for (this.jPerNo = 0; this.jPerNo < Jmj.iPerNo; this.jPerNo++) {
		if (this.mirror) {
			this.lhand[this.jPerNo].c = 0;
			if (this.isSync) {
				this.rhand[this.jPerNo].c = 0;
			} else {
				this.rhand[this.jPerNo].c = -1;
			}
		} else {
			this.rhand[this.jPerNo].c = 0;
			if (this.isSync) {
				this.lhand[this.jPerNo].c = 0;
			} else {
				this.lhand[this.jPerNo].c = -1;
			}
		}
		this.rhand[this.jPerNo].bh = 2;
		this.rhand[this.jPerNo].st = 1;
		this.rhand[this.jPerNo].thand = 1;
		this.rhand[this.jPerNo].chand = 1;
		this.rhand[this.jPerNo].gx = 0;
		this.rhand[this.jPerNo].gy = Jmj.VER_CENTER;
		this.rhand[this.jPerNo].gx0 = 0;
		this.rhand[this.jPerNo].gy0 = Jmj.VER_CENTER;
		this.rhand[this.jPerNo].gx1 = 0;
		this.rhand[this.jPerNo].gy1 = Jmj.VER_CENTER;
		this.lhand[this.jPerNo].bh = 2;
		this.lhand[this.jPerNo].st = 1;
		this.lhand[this.jPerNo].thand = 0;
		this.lhand[this.jPerNo].chand = 0;
		this.lhand[this.jPerNo].gx = 0;
		this.lhand[this.jPerNo].gy = Jmj.VER_CENTER;
		this.lhand[this.jPerNo].gx0 = 0;
		this.lhand[this.jPerNo].gy0 = Jmj.VER_CENTER;
		this.lhand[this.jPerNo].gx1 = 0;
		this.lhand[this.jPerNo].gy1 = Jmj.VER_CENTER;
	}
	for (i = 0; i < Jmj.LMAX * 2; i++) {
		this.r[i] = 0;
	}
	return true;
};

Jmj.prototype.square = function(x) {
	return x * x;
};

Jmj.prototype.getSingless = function(i) {
	var p = Clazz.newArray(256, 0);
	var j;
	var t;
	var index = 0;
	if (this.isSync) {
		p[index++] = '(';
	}
	for (t = 0; t <= this.intsyn; t++) {
		if (t != 0) {
			p[index++] = ',';
		}
		if (this.patts[i] == 0) {
			p[index++] = '0';
		} else {
			if (this.patts[i] > 1) {
				p[index++] = '[';
			}
			for (j = 0; j < this.patts[i]; j++) {
				if (Math.abs(this.patt[i][j]) < 10) {
					p[index++] = String
							.fromCharCode((('0').charCodeAt(0) + Math
									.abs(this.patt[i][j])));
				} else {
					p[index++] = String.fromCharCode((('a').charCodeAt(0)
							+ Math.abs(this.patt[i][j]) - 10));
				}
				if (this.patt[i][j] < 0) {
					p[index++] = 'x';
				}
			}
			if (this.patts[i] > 1) {
				p[index++] = ']';
			}
		}
		i++;
	}
	if (this.isSync) {
		p[index++] = ')';
	}

	//return String.instantialize(p, 0, index);
	var s = "";
	for ( var i = 0; i < index; i++) {
		//s += String.fromCharCode(p[i]);
		s += p[i];
	}
	return s;
};

//Jmj.prototype.patt_print = function(mode_) {
Jmj.prototype.patt_print = function(mode_, isUpdate) {
	var i;
	var c;
	if (mode_ == 1) {
		this.drawSiteswap(this.patt_x + this.tx, this.singless[this.c0],
				this.c0, true);
		if (isUpdate) {
			this.tx += this.singless[this.c0].length;
			this.c0 += 1 + this.intsyn;
			if (this.c0 > this.time_period) {
				this.c0 = 0;
				this.tx = 0;
			}
		}
		return;
	}
	if (mode_ == 0) {
		// for ( i = 0; i < this.pattw; i += this.intsyn + 1) {
		// this.drawSiteswap(this.patt_x + x, this.singless[i], i, false);
		// x += this.singless[i].length;
		// }
		for ( var j = 0; j < this.pattw; j += this.intsyn + 1) {
			var x = 0;
			for (i = 0; i < this.pattw; i += this.intsyn + 1) {
				this.drawSiteswap(this.patt_x + x, this.singless[i], j, false);
				x += this.singless[i].length;
			}
		}
	}
};

Jmj.prototype.chooseTrickByName = function(trickName) {
	var i;
	if (trickName == null || trickName.length == 0) {
		return false;
	}
	if (this.holder != null) {
		i = this.holder.chooseTrickByName(trickName);
		if (i != -1) {
			this.startJuggling(i, trickName);
			return true;
		}
	}
	return false;
};

var self = null; // 手抜き

Jmj.prototype.startJuggling = function(index, s) {
	// @FOO start
	index = index || {};
	Jmj.siteswap = index.siteswap || "3";
	Jmj.showSiteswap = (index.showSiteswap != null)? index.showSiteswap : true;
	// @FOO end

	if (arguments.length < 2) {
		s = null;
	}

	var i;
	var iCnt;
	this.stopJuggling();
	this.clearImage();
	this.speed = this.controller.getSpeed();
	this.mirror = this.controller.ifMirror();
	this.show_ss = this.controller.ifShowSiteSwap();
	this.hand_on = this.controller.ifShowBody();
	this.bSound = this.controller.ifSound();
	//( $t$ = Jmj.iPerNo = this.controller.getPerNo(), Jmj.prototype.iPerNo = Jmj.iPerNo, $t$);
	Jmj.iPerNo = this.controller.getPerNo();
// @FOO start
	//if (this.controller.isNewChoice() || index == Jmj.SITESWAP_MODE) {
	if (true) {
// @FOO end
		// @Foo start
		/*
		if (index == Jmj.SITESWAP_MODE) {
			//this.holder.getPattern(s);
			if (!this.holder.getPattern(s)) {
				return false;
			}
			this.$height = this.controller.GetHeight_();
			this.dwell = this.controller.getDwell();

			// JuggleMaster Java Ver2.05では、
			// JmjDialog.actionPerformed()が2回呼ばれるため、偶然動いている(たぶん)
			// 2回目のactionPerformedは、
			// status = JmjDialog.CHOOSE_MOTION
			// である(前回のaddActionListenerが残っているから2回呼ばれる？)。
			//for ( iCnt = 0; iCnt < Jmj.iPerNo; iCnt++) {
			for (iCnt = 0; iCnt < Jmj.PERMAX; iCnt++) {
				this.motion2[iCnt] = this.motion;
			}
		} else {
			if (index == -1 || !this.holder.isPattern(index))
				return false;
*/
			this.holder.getPattern(index);
			var strs = "";
			var icnt;
			for (icnt = 0; icnt < 10; icnt++) {
				strs += "motion2[" + icnt + "] = " + this.motion2[icnt] + "\n";
			}
/*
			strs += "Formation : " + this.formation + "\n";
			strs += "Pattern : " + this.pattern + "\n";
			strs += "Motion : " + this.motion + "\n";
			// ここで motion2[]を技リストで選択された技のモーションに戻す
		}
		*/
		// @FOO end

		this.holder.getMotion(this.motion);
		for (iCnt = 0; iCnt < Jmj.PERMAX; iCnt++) {
			this.holder.getMotion2(this.motion2[iCnt], iCnt);
		}
		this.holder.getFormation(this.formation);
		//( $t$ = Jmj.iPerNo = Jmj.iPerMax, Jmj.prototype.iPerNo = Jmj.iPerNo, $t$);
		Jmj.iPerNo = Jmj.iPerMax;
		this.controller.setPerno(Jmj.iPerNo);
		if (this.isSync) {
			this.intsyn = 1;
		} else {
			this.intsyn = 0;
		}
		this.siteswap = "";
		for (i = 0; i < this.pattw; i += this.intsyn + 1) {
			this.singless[i] = this.getSingless(i);
			this.siteswap = this.siteswap + this.singless[i];
		}
		this.set_dpm();
		this.speed = this.controller.getSpeed();
		if (this.pattInitialize()) {
			this.removeErrorMessage();
		} else {
			this.putError("Wrong siteswap", this.pattern);
			return false;
		}
		this.controller.enableSwitches();
		this.controller.setHeight(this.$height);
		this.controller.setDwell(this.dwell);
	} else {
		this.$height = this.controller.GetHeight_();
		this.dwell = this.controller.getDwell();
		if (index == Jmj.MOTION_MODE) {
			this.motion = s;
			this.holder.getMotion(s);
			for (iCnt = 0; iCnt < Jmj.PERMAX; iCnt++) {
				this.holder.getMotion2(this.motion, iCnt);
			}
			this.holder.getFormation(this.formation);
			//( $t$ = Jmj.iPerNo = Jmj.iPerMax, Jmj.prototype.iPerNo = Jmj.iPerNo, $t$);
			Jmj.iPerNo = Jmj.iPerMax;
			this.controller.setPerno(Jmj.iPerNo);
			this.controller.setLabels();
		} else if (index == Jmj.FORMATION_MODE && s != null) {
			this.motion = s;

			//
			// JuggleMaster Java Ver2.05の不具合？
			//
			//this.holder.getMotion(s);
			//this.holder.getFormation(this.formation);
			////( $t$ = Jmj.iPerNo = Jmj.iPerMax, Jmj.prototype.iPerNo = Jmj.iPerNo, $t$);
			this.holder.getFormation(this.formation);
			for (iCnt = 0; iCnt < Jmj.iPerMax; iCnt++) {
				this.motion2[iCnt] = this.motion;
			}
			this.holder.getMotion(s);
			for (iCnt = 0; iCnt < Jmj.PERMAX; iCnt++) {
				this.holder.getMotion2(this.motion2[iCnt], iCnt);
			}

			Jmj.iPerNo = Jmj.iPerMax;
			this.controller.setPerno(Jmj.iPerNo);
			this.controller.setLabels();
		} else if (s != null && s.length == 0 && index >= 0) {
			// Java版には無い
			// 前回と同じパターンを選択した場合
			this.holder.getPattern(index);
			this.holder.getMotion(this.motion);
			for (iCnt = 0; iCnt < Jmj.PERMAX; iCnt++) {
				this.holder.getMotion2(this.motion2[iCnt], iCnt);
			}
			this.holder.getFormation(this.formation);
			Jmj.iPerNo = Jmj.iPerMax;

			// Ver1.1.0不具合
			// (1)Newタブを選択
			// (2)「1」を入力して、Juggle
			// (3)Patternsタブを選択
			// (4)「Throw Twice」を選択
			// 表示されるサイトスワップが「13022」となっている。先頭の「1」がおかしい」。
			if (this.isSync) {
				this.intsyn = 1;
			} else {
				this.intsyn = 0;
			}
			this.siteswap = "";
			for (i = 0; i < this.pattw; i += this.intsyn + 1) {
				this.singless[i] = this.getSingless(i);
				this.siteswap = this.siteswap + this.singless[i];
			}

			this.controller.setPerno(Jmj.iPerNo);
			this.controller.setLabels();
			this.controller.setHeight(this.$height);
			this.controller.setDwell(this.dwell);
		}
		this.set_dpm();
		this.speed = this.controller.getSpeed();
		this.pattInitialize();
	}
	if (this.show_ss) {
		this.initSiteswapGraphics();
		this.patt_print(0);
		this.tx = 0;
		for ( var i = 0; i < this.pattw; i += 1 + this.intsyn) {
			this.c0 = i;
			this.patt_print(1, false);
			this.tx += this.singless[i].length;
		}
	}
	this.controller.setLabels();
	this.initBallGraphics();
	this.initGraphics();
	this.time_count = 0;
	this.time_period = 0;

	if (this.bSound) {
		return this.readySound();
	} else {
		return this.startThread();
	}
};

Jmj.prototype.readySound = function() {
	if (this.audioClip == null) {
		this.audioClip = new AudioClip("./sound/cevio12sec.wav");
		//this.audioClip = new AudioClip("./sound/cevio12sec.mp3");
		//this.audioClip = new AudioClip("./sound/cevio12sec.ogg");
		var audio = this.audioClip.getAudio();

		if (isAndroid || isIE) {
			this.startSound(true);
		} else {
			$('#loading2').show();

			var self = this;
			var handler = function() {
				audio.removeEventListener('canplaythrough', handler, false);
				self.startSound(true);
			};
			audio.addEventListener('canplaythrough', handler, false);
			if (isIOS) {
				audio.load();
			}
		}
	} else {
		this.startSound(false);
	}
	this.isAudioEnd = false;
	return true;
};

Jmj.prototype.startSound = function(isInit) {
	if (isInit) {
		this.isCanplaythrough = false;
		var self = this;
		var audio = this.audioClip.getAudio();

		var handler = function() {
			if (!self.isAudioInit) {
				try {
					audio.currentTime = audio.currentTime;
					self.isAudioInit = true;
				} catch (e) {
					return;
				}
			}
			if (self.isAudioPlay) {
				if (audio.currentTime >= self.startPlayTime / 3
						+ self.playTimeDx) {
					audio.pause();
					self.isAudioPlay = false;
				}
			}
		};
		audio.addEventListener('timeupdate', handler, false);

		if (isAndroid || isIE) {
			this.isCanplaythrough = true;
		} else {
			var h1 = function() {
				$('#loading2').hide();
				self.isCanplaythrough = true;
			};
			audio.addEventListener('canplaythrough', h1, false);
			var h2 = function() {
				$('#loading2').show();
				self.isCanplaythrough = false;
			};
			audio.addEventListener('canplay', h2, false);

			$("#page2_ul").click(function() {
				if (self.isAudioPlay) {
					audio.pause();
					self.isAudioPlay = false;
				}
				self.isAudioEnd = true;
			});
		}
		audio.load();
		this.isAudioInit = false;
		if (isIE) {
			this.isAudioInit = true;
		}
	}
	this.isAudioPlay = false;
	this.playTimeDx = 1 / 6.0 * 0.9;
	this.startPlayTime = 0;

	this.startThread();
};

Jmj.prototype.startThread = function() {
	this.kicker = new Thread(this, Jmj.prototype.run, 1000 / this.redrawrate);
	this.kicker.start();
	self = null;
	this.status = Jmj.JUGGLING;

	return true;
};

Jmj.prototype.run = function() {
	if (self == null) {
		self = this;
	}
	if (self.kicker != null) {
		self.do_juggle();
		self.count_up_timer();
	}
};

Jmj.prototype.do_juggle = function() {
	var i;

	if (this.bSound) {
		if (!this.isCanplaythrough) {
			return;
		}
		var audio = this.audioClip.getAudio();
		if (!this.isAudioInit) {
			try {
				audio.currentTime = audio.currentTime;
				this.isAudioInit = true;
			} catch (e) {
				return;
			}
		}
		if (this.isAudioInit) {
			if (this.isAudioPlay) {
				if (audio.currentTime >= this.startPlayTime / 3
						+ this.playTimeDx) {
					audio.pause();
					this.isAudioPlay = false;
				}
			}
		}
	}
	if (this.status == Jmj.PAUSE || this.status == Jmj.IDLE) {
		this.vsync_Count1 = 0;
		return;
	}
	this.time_count += this.vsync_Count1;
	this.vsync_Count1 = 0;
	if (this.time_count < this.aw) {
		this.time_count = this.aw;
	}
	this.time_period = (Math.floor((this.time_count - this.aw) / this.tw));
	this.time_period %= this.pattw;
	this.drawStatus();
	for (i = 0; i < this.ballno; i++) {
		this.b[i].juggle();
	}
	var iCnt = 0;
	for (this.jPerNo = 0; this.jPerNo < Jmj.iPerNo; this.jPerNo++) {
		iCnt += this.rhand[this.jPerNo].juggle()
				+ this.lhand[this.jPerNo].juggle();
	}
	//if (iCnt > 0) {
	//	if (this.show_ss) {
	//		this.patt_print (1);
	//	}
	//}
	this.eraseBalls();
	this.drawSiteswapImage(this.show_ss, iCnt > 0);
	this.playSiteswap(this.bSound, iCnt > 0);
	for ( var jPerNo = 0; jPerNo < Jmj.iPerNo; jPerNo++) {
		this.ap[jPerNo].rx[0] = this.rhand[jPerNo].gx + 11 + this.arm_x;
		this.ap[jPerNo].ry[0] = this.rhand[jPerNo].gy + 11 + this.arm_y;
		this.ap[jPerNo].lx[0] = this.lhand[jPerNo].gx + 11 - this.arm_x;
		this.ap[jPerNo].ly[0] = this.lhand[jPerNo].gy + 11 + this.arm_y;
		this.arm_line(jPerNo);
	}
	this.putBalls();
	if (this.imf != null) {
		this.imf.repaint();
	} else {
		this.repaint();
	}
};

Jmj.prototype.count_up_timer = function() {
	this.vsync_Count1++;
};

Jmj.prototype.removeErrorMessage = function() {
	this.controller.putMessage("", "");
};

Jmj.prototype.putError = function(s1, s2) {

};

Jmj.prototype.fadd = function(t, x) {
	return (Math.floor(t * Math.pow(10, x) + .5) / Math.pow(10, x));
};

Jmj.prototype.update = function(g) {
	this.paint(g);
};

Jmj.prototype.paint = function(g) {
	//if (this.gg1 != null) {
	//	this.gg1.putImageData (this.image_pixmap, 0, 0, null);
	//}
	//if (this.gg2 != null) {
	//	this.gg2.putImageData (this.image_pixmap, 20 - this.iXmin, -20, null);
	//}
};

Jmj.prototype.initGraphics = function() {
	var g;

	if (this.imf != null) {
		g = this.imf.getGraphics();
	} else {
		g = this.getGraphics();
	}
	if (this.gg1 != null) {
		this.gg1.dispose();
	}
	this.gg1 = g.create(0, Jmj.Y_OFFSET, Jmj.IMAGE_WIDTH, 20);
	if (this.gg2 != null) {
		this.gg2.dispose();
	}
	this.gg2 = g.create(this.iXmin - 20, 20 + Jmj.Y_OFFSET, this.iXmax
			- this.iXmin + 41, Jmj.IMAGE_HEIGHT - 20);
	g.dispose();
};

Jmj.prototype.disposeGraphics = function() {
	if (this.image_gc != null) {
		this.image_gc.dispose();
	}
	try {
		for ( var i = 0; i < Jmj.NCOLOR; i++) {
			this.bm_gc[i].dispose();
			this.r_bm_gc[i].dispose();
			this.l_bm_gc[i].dispose();
		}
	} catch (e) {
		if (Clazz.instanceOf(e, Throwable)) {

		} else {
			throw e;
		}
	}
	if (this.gg1 != null) {
		this.gg1.dispose();
	}
	if (this.gg2 != null) {
		this.gg2.dispose();
	}
};

Jmj.prototype.toIndex = function(c) {
	if (c >= '0' && c <= '9') {
		return c.charCodeAt(0) - '0'.charCodeAt(0);
	} else if (c >= 'a' && c <= 'z') {
		return c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
	} else {
		return 0;
	}
};

Jmj.prototype.drawSiteswap = function(x, str, i, is_red) {
	if (this.image_gc == null)
		return;

	var c = this.sbm[i];
	var g = c.getGraphics();
	if (is_red) {
		g.setColor(java.awt.Color.red);
		// 音声出力
		// 移動する
	} else {
		g.setColor(java.awt.Color.black);
	}
	g.drawString(str, x * 8, 20);
};

Jmj.prototype.drawSiteswapImage = function(isDraw, isUpdate) {
	if (isDraw) {
		var c = this.sbm[this.c0];
		var g = c.getGraphics();
		this.image_gc.drawImage(c, 0, 0);
	}
	if (isUpdate) {
		this.tx += this.singless[this.c0].length;
		this.c0 += 1 + this.intsyn;
		if (this.c0 > this.time_period) {
			this.c0 = 0;
			this.tx = 0;
		}
	}
};

Jmj.prototype.playSiteswap = function(isPlay, isUpdate) {
	if (this.isAudioEnd) {
		return;
	}
	if (isPlay && isUpdate) {
		// 音声出力
		if (this.bSound) {
			var str = this.singless[this.c0];
			if (str.length == 1) {
				var n = this.toIndex(str.charAt(0));
				this.playAudio(n, true);
			} else {
				for ( var i = 0; i < str.length; i++) {
					var c = str.charAt(i);
					if ((c >= '0' && c <= '9')
							|| (c >= 'a' && c <= 'z' && c != 'x')) {
						var n = this.toIndex(c);
						this.playAudio(n, i >= str.length - 1);
					}
				}
			}
		}
	}
};

Jmj.prototype.playAudio = function(n, isLast) {
	var audio = this.audioClip.getAudio();
	if (this.isAudioPlay && isLast) {
		audio.pause();
		this.isAudioPlay = false;
	}
	audio.currentTime = n / 3;
	audio.play();
	this.isAudioPlay = true;
	this.startPlayTime = n;
};

Jmj.prototype.drawBall = function(bm, x, y, hand, color) {
	if (x < -this.iMoveX || x > Jmj.IMAGE_WIDTH - this.iMoveX || y < 0
			|| y > Jmj.IMAGE_HEIGHT - 24) {
		return;
	}
	//var g = this.image_gc.create (this.fx (x + this.bm1), y + this.bm1, this.bm2 - this.bm1 + 1, this.bm2 - this.bm1 + 1);
	//g.drawImage (bm, -this.bm1, -this.bm1, null);
	//g.dispose ();

	if (hand >= 0) {
		var r = Math.floor(11 * this.dpm / Jmj.DW);
		x = this.fx(x + this.bm1);
		y += this.bm1;
		//this.image_gc.fillOval(x, y, r * 2, r * 2);
		this.image_gc.drawImage(bm, x, y);
	} else {
		// このルートは未使用
		this.image_gc.setColor(color);
		var data = clone(this.data);

		var i;
		for (i = 0; i < data.length; i++) {
			data[i] = Math.floor((data[i] - 11) * this.dpm / Jmj.DW);
		}
		this.hand_x = data[i - 4] + 2;
		this.hand_y = data[i - 3] + 2;
		this.arm_x = data[i - 2];
		this.arm_y = data[i - 1];

		x = this.fx(x);

		for (i = 0; i + 6 < data.length; i += 2) {
			//this.r_bm_gc[1].setColor (this.color[1]);
			//this.r_bm_gc[1].drawLine (11 + data[i], 10 + data[i + 1], 11 + data[i + 2], 10 + data[i + 3]);
			//this.l_bm_gc[1].setColor (this.color[1]);
			//this.l_bm_gc[1].drawLine (12 - data[i], 10 + data[i + 1], 12 - data[i + 2], 10 + data[i + 3]);
			if (hand == 1) {
				this.image_gc.drawLine(x + 11 + data[i], y + 10 + data[i + 1],
						x + 11 + data[i + 2], y + 10 + data[i + 3]);
			} else {
				this.image_gc.drawLine(x + 12 - data[i], y + 10 + data[i + 1],
						x + 12 - data[i + 2], y + 10 + data[i + 3]);
			}
		}
	}
};

Jmj.prototype.drawLine = function(x1, y1, x2, y2) {
	this.image_gc.drawLine(this.fx(x1), y1, this.fx(x2), y2);
};

Jmj.prototype.drawCircle = function(x, y, r) {
	this.image_gc.drawOval(this.fx(x - r), y - r, 2 * r, 2 * r);
};

Jmj.prototype.fillBox = function(x1_b, y1, x2_b, y2) {
	this.image_gc.fillRect(this.fx((x1_b - (x2_b - x1_b)) * 8), y1, (x2_b
			- x1_b + 1) * 8 * 2, y2 - y1 + 1);
};

Jmj.prototype.initSiteswapGraphics = function() {
	// @FOO
	//var pid = 'page4_content';
	var pid = 'page2_content';

	var id;
	var i;
	var obj;
	// @FOO start
	//var c = $('#canvas');
	//var w = c.attr('width');
	//w = w.replace('px', '');
	//w = Integer.parseInt(w);
	var c = Jmj.canvas; //document.getElementById("canvas");
	var w = c.width;// c.getAttribute("width");
	// @FOO end

	for (i = 0; i < this.pattw; i++) {
		obj = this.sbm[i];
		if (isUndefined(obj)) {
			id = 'offscrn' + 's' + i;
			this.sbm[i] = this.imf.createImage2(pid, id, w, Jmj.OFF_H);
		}
		var c = this.sbm[i];
		var g = c.getGraphics();
		g.clearRect(0, 0, Jmj.IMAGE_WIDTH, Jmj.OFF_H);
	}
};

Jmj.prototype.initBallGraphics = function() {
	var i;
	var data = clone(this.data);
	var g;

	//begin
	var pid = 'page2_content';
	var pid;
	if (this.bm[0] == null) {
		if (this.imf != null) {
			id = 'offscrn' + 'l';
			this.l_bm[1] = this.imf.createImage2(pid, id, Jmj.OFF_W, Jmj.OFF_H);
			id = 'offscrn' + 'r';
			this.r_bm[1] = this.imf.createImage2(pid, id, Jmj.OFF_W, Jmj.OFF_H);
		} else {
			this.l_bm[1] = this.createImage(32, 24);
			this.r_bm[1] = this.createImage(32, 24);
		}
		this.l_bm_gc[1] = this.l_bm[1].getGraphics();
		this.r_bm_gc[1] = this.r_bm[1].getGraphics();
		for (i = 0; i < 16; i++) {
			id = 'offscrn' + i;
			if (this.imf != null) {
				this.bm[i] = this.imf.createImage2(pid, id, Jmj.OFF_W,
						Jmj.OFF_H);
			} else {
				this.bm[i] = this.createImage2(pid, id, 32, 24);
			}
			this.bm_gc[i] = this.bm[i].getGraphics();
			this.l_bm[i] = this.l_bm[1];
			this.l_bm_gc[i] = this.l_bm_gc[1];
			this.r_bm[i] = this.r_bm[1];
			this.r_bm_gc[i] = this.r_bm_gc[1];
		}
	}
	for (i = 0; i < 16; i++) {
		//this.bm_gc[i].setColor (java.awt.Color.white);
		// this.bm_gc[i].fillRect (0, 0, 32, 24);
		this.bm_gc[i].clearRect(0, 0, Jmj.OFF_W, Jmj.OFF_H);
	}
	//this.l_bm_gc[1].setColor (java.awt.Color.white);
	//this.l_bm_gc[1].fillRect (0, 0, 32, 24);
	g = this.l_bm_gc[1];
	g.beginPath();
	g.clearRect(0, 0, Jmj.OFF_W, Jmj.OFF_H);
	g.closePath();
	g.fill();

	g = this.r_bm_gc[1];
	//this.r_bm_gc[1].setColor (java.awt.Color.white);
	//this.r_bm_gc[1].fillRect (0, 0, 32, 24);
	g.beginPath();
	g.clearRect(0, 0, Jmj.OFF_W, Jmj.OFF_H);
	g.closePath();
	g.fill();
	//end

	for (i = 0; i < data.length; i++) {
		//data[i] = Math.floor ((data[i] - 11) * this.dpm / Jmj.DW);
		data[i] = (data[i] - 11) * this.dpm / Jmj.DW;
	}
	this.hand_x = data[i - 4] + 2;
	this.hand_y = data[i - 3] + 2;
	this.arm_x = data[i - 2];
	this.arm_y = data[i - 1];

	//begin
	for (i = 0; i + 6 < data.length; i += 2) {
		//this.r_bm_gc[1].setColor (this.color[1]);
		//this.r_bm_gc[1].drawLine (11 + data[i], 10 + data[i + 1], 11 + data[i + 2], 10 + data[i + 3]);
		//this.l_bm_gc[1].setColor (this.color[1]);
		//this.l_bm_gc[1].drawLine (12 - data[i], 10 + data[i + 1], 12 - data[i + 2], 10 + data[i + 3]);
		//var r = Math.floor (11 * this.dpm / Jmj.DW) | 0;
		var r = 11 * this.dpm / Jmj.DW;
		g = this.r_bm_gc[1];
		g.beginPath();
		g.setColor(this.color[1]);
		//g.drawLine (11 + data[i], 10 + data[i + 1], 11 + data[i + 2], 10 + data[i + 3]);
		g.drawLine(r + data[i], (r - 1) + data[i + 1], r + data[i + 2], (r - 1)
				+ data[i + 3], false);
		g.closePath();
		g.stroke();
		g = this.l_bm_gc[1];
		g.setColor(this.color[1]);
		//g.drawLine (12 - data[i], 10 + data[i + 1], 12 - data[i + 2], 10 + data[i + 3]);
		//g.drawLine (11 - data[i], 10 + data[i + 1], 11 - data[i + 2], 10 + data[i + 3]);
		g.drawLine((r + 1) - data[i], (r - 1) + data[i + 1], (r + 1)
				- data[i + 2], (r - 1) + data[i + 3], false);
		g.closePath();
		g.stroke();
	}
	var r = Math.floor(11 * this.dpm / Jmj.DW);
	for (i = 0; i < 16; i++) {
		//this.bm_gc[i].setColor (this.color[i]);
		//this.bm_gc[i].fillOval (11 - r, 11 - r, 2 * r, 2 * r);
		g = this.bm_gc[i];
		g.beginPath();
		g.setColor(this.color[i]);
		g.fillOval(0, 0, 2 * r, 2 * r);
		g.closePath();
		g.fill();
	}
	//end

	this.bm1 = 11 - Math.floor(11 * this.dpm / Jmj.DW);
	this.bm2 = 11 + Math.floor(11 * this.dpm / Jmj.DW) + 1;
};

Jmj.prototype.clearImage = function() {
	this.image_gc.setColor(this.color[0]);
	this.image_gc.clearRect(0, 0, Jmj.IMAGE_WIDTH, Jmj.IMAGE_HEIGHT);

	//var g;
	//if (this.imf != null) {
	//	g = this.imf.getGraphics ();
	//} else {
	//	g = this.getGraphics ();
	//}
	////c g.drawImage (this.image_pixmap, 0, 0, 480, 400, null);
	//g.putImageData (this.image_pixmap, 0, 0, Jmj.IMAGE_WIDTH, Jmj.IMAGE_HEIGHT, null);
	//g.dispose ();
};

Jmj.prototype.eraseBalls = function() {
	var i;
	var j;

	// 全体を消す
	this.image_gc.clearRect(0, 0, Jmj.IMAGE_WIDTH, Jmj.IMAGE_HEIGHT);
	return;
	/*
	 this.image_gc.setColor (this.color[0]);
	 if (this.hand_on) {
	 for (j = 0; j < Jmj.iPerNo; j++) {
	 for (i = 0; i < 5; i++) {
	 this.drawLine (this.ap[j].rx[i], this.ap[j].ry[i], this.ap[j].rx[i + 1], this.ap[j].ry[i + 1]);
	 this.drawLine (this.ap[j].lx[i], this.ap[j].ly[i], this.ap[j].lx[i + 1], this.ap[j].ly[i + 1]);
	 }
	 this.drawCircle (this.ap[j].hx, this.ap[j].hy, this.ap[j].hr);
	 this.fillBox (Math.floor (this.rhand[j].gx0 / 8), this.rhand[j].gy0 + this.bm1, Math.floor (this.rhand[j].gx0 / 8) + 3, this.rhand[j].gy0 + this.bm2);
	 this.fillBox (Math.floor (this.lhand[j].gx0 / 8), this.lhand[j].gy0 + this.bm1, Math.floor (this.lhand[j].gx0 / 8) + 3, this.lhand[j].gy0 + this.bm2);
	 }
	 }
	 for (i = this.ballno - 1; i >= 0; i--) {
	 this.fillBox (Math.floor (this.b[i].gx0 / 8), this.b[i].gy0 + this.bm1, Math.floor (this.b[i].gx0 / 8) + 3, this.b[i].gy0 + this.bm2);
	 }
	 return ;
	 */
};

Jmj.prototype.putBalls = function() {
	var i;
	var j;

	if (this.hand_on) {
		this.image_gc.setColor(this.color[1]);
		for (j = 0; j < Jmj.iPerNo; j++) {
			this.drawBall(this.r_bm[1], this.rhand[j].gx, this.rhand[j].gy, 1,
					this.color[1]);
			//this.drawBall (this.l_bm[1], this.lhand[j].gx, this.lhand[j].gy, 2, this.color[1]);
			this.drawBall(this.l_bm[1], this.lhand[j].gx - 1, this.lhand[j].gy,
					2, this.color[1]); // 微調整

			this.image_gc.beginPath();
			for (i = 0; i < 5; i++) {
				this.drawLine(this.ap[j].rx[i], this.ap[j].ry[i],
						this.ap[j].rx[i + 1], this.ap[j].ry[i + 1]);
				this.drawLine(this.ap[j].lx[i], this.ap[j].ly[i],
						this.ap[j].lx[i + 1], this.ap[j].ly[i + 1]);
			}
			this.image_gc.closePath();
			this.image_gc.stroke();

			this.image_gc.beginPath();
			this.drawCircle(this.ap[j].hx, this.ap[j].hy, this.ap[j].hr);
			this.image_gc.closePath();
			this.image_gc.stroke();
		}
	}
	for (i = this.ballno - 1; i >= 0; i--) {
		this.drawBall(this.bm[15 - i % 13], this.b[i].gx, this.b[i].gy, 0, this
				.getColor(i));
	}
};

Jmj.prototype.MessageBox = function(str) {

};

Jmj.prototype.SetXYDummyData = function() {
	var iXDummy = [ 0, 30, 60, 90, 120, 150, 180, 210, 240, 270 ];
	var iYDummy = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
	var iCnt;
	for (iCnt = 0; iCnt < 10; iCnt++) {
		this.iXData[iCnt] = iXDummy[iCnt];
		this.iYData[iCnt] = iYDummy[iCnt];
	}
	return;
};

Jmj.prototype.fx = function(x) {
	return x + this.iMoveX;
};

Jmj.prototype.drawStatus = function() {
	var iSt = Clazz.newArray(7, 21, 0);
	var iCnt;
	var iCnt2;
	var strTmp;
	var strSts = [ "OBJECT_HAND ", "OBJECT_MOVE ", "OBJECT_MOVE2",
			"OBJECT_UNDER", "b[0]tP,cP,c ", "b[1]tP,cP,c ", "b[2]tP,cP,c " ];

	if (this.TEST_MODE == false)
		return;
	if (this.image_gc == null)
		return;
	this.image_gc
			.drawString(
					"0ABCDEFGHIJKLMNOPQRSTUVWXYZ1ABCDEFGHIJKLMNOPQRSTUVWXYZ2ABCDEFGHIJKLMNOPQRSTUVWXYZ3ABCDEFGHIJKLMNOPQRSTUVWXYZ4ABCDEFGHIJKLMNOPQRSTUVWXYZ5ABCDEFGHIJKLMNOPQRSTUVWXYZ",
					0, 20);
	for (iCnt = 0; iCnt < Jmj.iPerNo; iCnt++) {
		iSt[0][iCnt * 2] = Math
				.floor((this.lhand[Jmj.iPerNo - iCnt - 1].st & Ball.OBJECT_HAND)
						/ Ball.OBJECT_HAND);
		iSt[0][iCnt * 2 + 1] = Math
				.floor((this.rhand[Jmj.iPerNo - iCnt - 1].st & Ball.OBJECT_HAND)
						/ Ball.OBJECT_HAND);
		iSt[1][iCnt * 2] = Math
				.floor((this.lhand[Jmj.iPerNo - iCnt - 1].st & Ball.OBJECT_MOVE)
						/ Ball.OBJECT_MOVE);
		iSt[1][iCnt * 2 + 1] = Math
				.floor((this.rhand[Jmj.iPerNo - iCnt - 1].st & Ball.OBJECT_MOVE)
						/ Ball.OBJECT_MOVE);
		iSt[2][iCnt * 2] = Math
				.floor((this.lhand[Jmj.iPerNo - iCnt - 1].st & Ball.OBJECT_MOVE2)
						/ Ball.OBJECT_MOVE);
		iSt[2][iCnt * 2 + 1] = Math
				.floor((this.rhand[Jmj.iPerNo - iCnt - 1].st & Ball.OBJECT_MOVE2)
						/ Ball.OBJECT_MOVE);
		iSt[3][iCnt * 2] = Math
				.floor((this.lhand[Jmj.iPerNo - iCnt - 1].st & Ball.OBJECT_UNDER)
						/ Ball.OBJECT_UNDER);
		iSt[3][iCnt * 2 + 1] = Math
				.floor((this.rhand[Jmj.iPerNo - iCnt - 1].st & Ball.OBJECT_UNDER)
						/ Ball.OBJECT_UNDER);
	}
	iSt[4][0] = Math
			.floor((this.b[0].st & Ball.OBJECT_MOVE) / Ball.OBJECT_MOVE);
	iSt[5][0] = Math.floor((this.b[0].st & Ball.OBJECT_MOVE2)
			/ Ball.OBJECT_MOVE2);
	iSt[6][0] = Math.floor((this.b[0].st & Ball.OBJECT_UNDER)
			/ Ball.OBJECT_UNDER);
	iSt[4][1] = Math
			.floor((this.b[1].st & Ball.OBJECT_MOVE) / Ball.OBJECT_MOVE);
	iSt[5][1] = Math.floor((this.b[1].st & Ball.OBJECT_MOVE2)
			/ Ball.OBJECT_MOVE2);
	iSt[6][1] = Math.floor((this.b[1].st & Ball.OBJECT_UNDER)
			/ Ball.OBJECT_UNDER);
	iSt[4][2] = Math
			.floor((this.b[2].st & Ball.OBJECT_MOVE) / Ball.OBJECT_MOVE);
	iSt[5][2] = Math.floor((this.b[2].st & Ball.OBJECT_MOVE2)
			/ Ball.OBJECT_MOVE2);
	iSt[6][2] = Math.floor((this.b[2].st & Ball.OBJECT_UNDER)
			/ Ball.OBJECT_UNDER);
	this.image_gc.setColor(java.awt.Color.white);
	this.image_gc.fillRect(0, 0, 420, 200);
	this.image_gc.setColor(java.awt.Color.black);
	this.image_gc.drawString("0 1 2 ", 122, 20);
	for (iCnt = 0; iCnt < 7; iCnt++) {
		if (iCnt > 3)
			this.image_gc.setColor(this.color[16 - (iCnt - 3)]);
		this.image_gc.drawString(strSts[iCnt], 10, 30 + iCnt * 10);
	}
	for (iCnt = 0; iCnt < 4; iCnt++) {
		for (iCnt2 = 0; iCnt2 < Jmj.iPerNo * 2; iCnt2++) {
			if (iSt[iCnt][iCnt2] == 1) {
				this.image_gc.setColor(java.awt.Color.red);
			} else {
				this.image_gc.setColor(java.awt.Color.black);
			}
			strTmp = "" + iSt[iCnt][iCnt2];
			this.image_gc.drawString(strTmp, 122 + iCnt2 * 16, 30 + iCnt * 10);
		}
	}
	for (iCnt = 4; iCnt < 7; iCnt++) {
		for (iCnt2 = 0; iCnt2 < 3; iCnt2++) {
			if (iSt[iCnt][iCnt2] == 1) {
				this.image_gc.setColor(java.awt.Color.red);
			} else {
				this.image_gc.setColor(java.awt.Color.black);
			}
			strTmp = "" + iSt[iCnt][iCnt2];
			this.image_gc.drawString(strTmp, 122 + iCnt2 * 16, 50 + iCnt * 10);
		}
	}
};

Jmj.prototype.getColor = function(i) {
	var n = 3;
	var c = this.color;
	var l = c.length;
	return c[(l - 1) - i % (l - n)];
};

Jmj.prototype.resetCheckBoxValue = function() {
	// Ver1.2.1
	this.mirror = this.controller.mirror_box.obj.is(':checked');
	this.show_ss = this.controller.ss_box.obj.is(':checked');
	this.hand_on = this.controller.body_box.obj.is(':checked');
	this.bSound = this.controller.sound_box.obj.is(':checked');
};

Jmj.prototype.initPage = function(e) {

};

Jmj.prototype.initPage1 = function(e) {

};

Jmj.prototype.initPage2 = function(e) {

};

// 初期起動時にバーを右に寄せるために無理矢理
Jmj.prototype.changePage3PernoGauge = function() {
	var pg = this.controller.perno_gauge;
	var v = pg.value;
	var minimum = pg.minimum;
	var maximum = pg.maximum;

	pg.obj.attr('min', 1);
	pg.obj.attr('max', 2);
	pg.value = 2;
	pg.refresh(true);

	pg.obj.attr('min', 1);
	pg.obj.attr('max', 1);
	pg.obj.val(1);

	if (!isUndefined(minimum)) {
		pg.minimum = minimum;
		pg.obj.attr('min', minimum);
	}
	if (!isUndefined(maximum)) {
		pg.obj.attr('max', maximum);
		pg.maximum = maximum;
	}
	pg.value = v;
	pg.obj.val(v);
};

Jmj.prototype.initPage3 = function(e) {
	this.controller.speed_gauge.refresh(true);
	this.controller.height_gauge.refresh(true);
	this.controller.dwell_gauge.refresh(true);
	this.controller.perno_gauge.refresh(true);
}

Jmj.prototype.initPage4 = function(e) {
	this.jmjDialog = new JmjDialog(this.controller);
	this.jmjDialog.popup(JmjDialog.TRY_SITESWAP);
	$('#page4_error_ok').click(function(e) {
		$('#page4_error').dialog('close');
	});
	$('#page4_text').val('');
};

Jmj.prototype.changePage1 = function(e) {
	this.stopJuggling();
};

Jmj.prototype.changePage2 = function(e) {
	// Ver1.2.0不具合
	// (1)page3から開く
	// (2)チェックを変更
	// (3)Juggle
	//    pagebeforechangeにstopjuggling()を追加
	//if (this.kicker == null) {
	//	this.controller.juggle_pressed();
	//}
	this.controller.juggle_pressed();
};

Jmj.prototype.changePage3 = function(e) {
	this.stopJuggling();

	this.changePage3PernoGauge();

	this.controller.speed_gauge.refresh(true);
	this.controller.height_gauge.refresh(true);
	this.controller.dwell_gauge.refresh(true);
	this.controller.perno_gauge.refresh(true);

	this.controller.mirror_box.refresh(true);
	this.controller.ss_box.refresh(true);
	this.controller.body_box.refresh(true);
	this.controller.sound_box.refresh(true);
};

Jmj.prototype.changePage4 = function(e) {
	this.stopJuggling();

	this.jmjDialog.setStatus(JmjDialog.TRY_SITESWAP);
};

Jmj.prototype.pagebeforechange = function(e, d) {
	if (this.audioClip != null && this.bSound) {
		if (!/#page2/i.test(d.absUrl)) {
			if (this.isAudioPlay) {
				var audio = this.audioClip.getAudio();
				audio.pause();
				this.isAudioPlay = false;
			}
			this.isAudioEnd = true;
		}
	}
	this.stopJuggling();
};

Jmj.prototype.reload = function() {
	this.jmjDialog.motionSelect.setReload(true);
	this.jmjDialog.motionSelect.create();
	this.jmjDialog.motionSelect.createMotionList();
	this.jmjDialog.motionList.setReload(true);
	this.jmjDialog.formationList.setReload(true);
};

// Applet
//Jmj.prototype.getParameter = function(s) {
Jmj.getParameter = function(s) {
	if (s == 'file') {
		return $('#param_file').val();
	}
	if (s == 'startwith') {
		return $('#param_startwith').val();
	}
	if (s == 'patternfiles') {
		return $('#param_patternfiles').val();
	}
	return null;
};

Jmj.prototype.repaint = function() {
	var g = this.imf.getGraphics();
	this.paint(g);
};

Jmj.prototype.getGraphics = function() {
	var g = this.imf.getGraphics();
	return g;
};

Jmj.prototype.initCanvas = function() {
	// @FOO start
//	var p1 = $('#page1');
//	var w = p1.width();
//	var h = p1.height();
	var w = Jmj.canvas.width; //480;
	var h = Jmj.canvas.height; //600;
	// @FOO end
	var dx = 1.25;
	var d = 0.95;
	//var max = Jmj.IMAGE_WIDTH * dx * d;

// @FOO start
	/*
		if (w >= Jmj.IMAGE_WIDTH * dx / d){
			w = Jmj.IMAGE_WIDTH * dx;
		}
		else if (w >= Jmj.IMAGE_WIDTH){
			w *= d;
		}
		else {
			w *= d;
		}
		canvasScale = w / Jmj.IMAGE_WIDTH;
	*/
	// 480x400が基本のサイズ
	if (w / h > Jmj.IMAGE_WIDTH / Jmj.IMAGE_HEIGHT){
		// 横に長い
		Graphics.canvasScale = (h / Jmj.IMAGE_HEIGHT) * d;
		var diff = (w - Jmj.IMAGE_WIDTH * (h / Jmj.IMAGE_HEIGHT))
		Graphics.off_x = ((diff / 2) / Graphics.canvasScale) | 0;
	}
	else {
		// 縦に長い
		Graphics.canvasScale = (w / Jmj.IMAGE_WIDTH) * d;
		var diff = (h - Jmj.IMAGE_HEIGHT * (w / Jmj.IMAGE_WIDTH))
		Graphics.off_y = ((diff / 2) / Graphics.canvasScale) | 0;
	}
	return;
// @FOO end

	h = Jmj.IMAGE_HEIGHT * canvasScale;

	w = Math.round(w);
	h = Math.round(h);
	var c1 = $('<canvas id="canvas" class="canvas" width="' + w + 'px" height="' + h + 'px">');

	var m = $('#page2_content');
	m.append(c1);
}

Jmj.KW = 0.25;
Jmj.XR = 1024;
Jmj.DW = 290;
Jmj.BMAX = 35;
Jmj.LMAX = 200;
Jmj.MMAX = 11;
Jmj.NORMAL = "Normal";
Jmj.PERMIN = 1;
Jmj.PERMAX = 10;

Jmj.iPerNo = 2;
Jmj.iPerMax = Jmj.iPerNo;

Jmj.PXY = 30;

Jmj.IDLE = 0;
Jmj.PAUSE = 1;
Jmj.JUGGLING = 2;
Jmj.SITESWAP_MODE = -3;
Jmj.MOTION_MODE = -2;
Jmj.FORMATION_MODE = -1;
Jmj.Y_OFFSET = 0;
Jmj.FORMATION_BASIC = "1-Person";

Jmj.PM_W = 32;
Jmj.PM_H = 24;
Jmj.NCOLOR = 16;
Jmj.IMAGE_WIDTH = 480;
Jmj.IMAGE_HEIGHT = 400;
Jmj.HOR_CENTER = Math.round(Jmj.IMAGE_WIDTH / 2);
Jmj.VER_CENTER = Math.round(Jmj.IMAGE_HEIGHT / 2);
Jmj.HOR_MARGIN = 20;
Jmj.VER_MARGIN = 20;

// オフスクリーン用(大きめ(2倍)に取得)
Jmj.OFF_W = Jmj.PM_W * 2;
Jmj.OFF_H = Jmj.PM_H * 2;
var PatternHolder = function(j) {
	this.jmj = j;

	// Field
	this.motiontable = null;
	this.patternVector = null;
	this.en = null;
	this.xyformation = null;
	this.enXY = null;
	//this.jmj = null;
	this.fline = 0;
	this.tailindex = 0;
	this.readflag = false;
	this.dwell = 0;
	this.height = 0;
	this.cbuf = null;
	this.bbuf = null;
	this.ibuf = null;
	this.pattbarr = null;
	this.motion = Jmj.NORMAL;
	this.motion2 = null;
	this.formation = "1-Person";
	this.s = null;
	this.next = 0;

	// Field init
	this.motiontable = new java.util.Hashtable();
	this.en = this.motiontable.keys();
	this.xyformation = new java.util.Hashtable();
	this.enXY = this.xyformation.keys();
	this.cbuf = Clazz.newArray(256, 0);
	this.bbuf = Clazz.newArray(Jmj.LMAX, 0);
	this.ibuf = Clazz.newArray(256, 0);
	this.motion2 = new Array(Jmj.PERMAX);

	// Constructor
	//this.jmj = j;
	this.motiontable.put(this.motion, [13, 0, 4, 0]);
	this.xyformation.put(this.formation, [0, 0]);
};

PatternHolder.prototype.setHolder = function(fp) {
	this.readflag = true;
	this.dwell = 0.5;
	this.patternVector = new java.util.Vector();
	this.height = 0.2;
	this.fline = 0;
	try {
		this.resetmotion2();
		var fallback_incrementflag = true;
		while (true) {
			if (this.readflag) {
				this.s = fp.readLine();
				this.fline++;
			}
			// Java版では、NullPointerExceptionでループから抜けている
			if (this.s == null){
				break;
			}

			this.readflag = true;
			this.tailindex = this.getTail(this.s);
			if (this.tailindex == 0) {
				this.resetmotion2();
				continue;
			}
			switch (this.s.charAt (0)) {
				case '/':
					this.patternVector.addElement(new PatternHolder.Piece(false, this.s.substring(1, ++this.tailindex)));
					if (fallback_incrementflag) {
						this.jmj.fallback_startindex++;
					}
				case ';':
					continue;
				case '#':
					this.wasParam(fp);
					continue;
				case '%':
					this.wasMotion(fp);
					continue;
				case '!':
					this.setFormation(fp);
					continue;
				case '$':
					var iii = this.motionToken();
					if (iii != 0) {
						var strtt = "error " + iii + " \nline " + this.fline;
						this.jmj.MessageBox(strtt);
					}
					continue;
				default:
					fallback_incrementflag = false;
					this.pattbarr = this.parsePattern(this.s);
					if (this.pattbarr != null) {
						var p = new PatternHolder.Piece(true, this.s.substring(this.next, ++this.tailindex), this.motion, this.pattbarr, this.height, this.dwell, this.formation, this.motion2);
						this.patternVector.addElement(p);
						if (p.name.equals(this.jmj.startpattern)) {
							this.jmj.startindex = this.patternVector.size() - 1;
						}
					} else {
						this.jmj.putError("Bad Pattern Definition in line :" + this.fline, this.s);
					}
			}
		}
	} catch (e$$) {
		// 手抜き
		throw e$$;
	}
	return !this.patternVector.isEmpty();

};

PatternHolder.prototype.wasParam = function(fp) {
	var st = new java.util.StringTokenizer(this.s, "= ;\t");
	var t;
	var i;
	try {
		st.nextToken();
		t = Float.$valueOf(st.nextToken()).floatValue();
	} catch (e) {
		if (Clazz.instanceOf(e, NumberFormatException)) {
			this.jmj.putError("Not Number in line:" + this.fline, this.s);
			return;
		} else {
			throw e;
		}
	}
	this.cbuf[0] = this.s.charAt(1);
	this.cbuf[1] = this.s.charAt(2);
	if ((this.cbuf[0]).charCodeAt(0) == ('D').charCodeAt(0) && (this.cbuf[1]).charCodeAt(0) == ('R').charCodeAt(0) && t >= 0.10 && t <= 0.90) {
		this.dwell = this.fadd(t, 2);
	} else if ((this.cbuf[0]).charCodeAt(0) == ('H').charCodeAt(0) && (this.cbuf[1]).charCodeAt(0) == ('R').charCodeAt(0) && t >= 0.01 && t <= 1.00) {
		this.height = this.fadd(t, 2);
	} else if ((this.cbuf[0]).charCodeAt(0) == ('G').charCodeAt(0) && (this.cbuf[1]).charCodeAt(0) == ('A').charCodeAt(0) && t > 0.00 && t <= 98.00) {
		this.jmj.ga = t;
	} else if ((this.cbuf[0]).charCodeAt(0) == ('S').charCodeAt(0) && (this.cbuf[1]).charCodeAt(0) == ('P').charCodeAt(0) && t >= 0.10 && t <= 2.00) {
		this.jmj.speed = this.fadd(t, 1);
	} else {
		i = Math.round(t);
		if ((this.cbuf[0]).charCodeAt(0) == ('M').charCodeAt(0) && (this.cbuf[1]).charCodeAt(0) == ('R').charCodeAt(0) && (i == 0 || i == 1)) {
			this.jmj.mirror = (i == 1) ? true : false;
		} else if ((this.cbuf[0]).charCodeAt(0) == ('H').charCodeAt(0) && (this.cbuf[1]).charCodeAt(0) == ('D').charCodeAt(0) && (i == 0 || i == 1)) {
			this.jmj.hand_on = (i == 1) ? true : false;
		} else if ((this.cbuf[0]).charCodeAt(0) == ('P').charCodeAt(0) && (this.cbuf[1]).charCodeAt(0) == ('D').charCodeAt(0) && (i == 0 || i == 1)) {
			this.jmj.show_ss = (i == 1) ? true : false;
		} else if ((this.cbuf[0]).charCodeAt(0) == ('B').charCodeAt(0) && (this.cbuf[1]).charCodeAt(0) == ('P').charCodeAt(0)) {
		} else if ((this.cbuf[0]).charCodeAt(0) == ('B').charCodeAt(0) && (this.cbuf[1]).charCodeAt(0) == ('C').charCodeAt(0)) {
		} else {
			this.jmj.putError("Invalid Parameter Value in line:" + this.fline, this.s);
		}
		return;
	}
};

PatternHolder.prototype.wasMotion = function(fp) {
	var tmp = this.s.substring(1, ++this.tailindex);
	this.s = fp.readLine();
	this.fline++;
	this.readflag = false;
	if (this.s.length == 0 || (this.s.charAt(0)).charCodeAt(0) != ('{').charCodeAt(0)) {
		if (this.motiontable.containsKey(tmp)) {
			this.motion = tmp;
		} else {
			this.jmj.putError("Undefined Pattern in line:" + this.fline, this.s);
		}
		return;
	}
	var bindex = 0;
	try {
		var s1;
		while (this.s.length != 0 && (this.s.charAt(0)).charCodeAt(0) == ('{').charCodeAt(0)) {
			var st = new java.util.StringTokenizer(this.s, " {},\t");
			for (var i = 0; i < 4; i++, bindex++) {
				try {
					s1 = st.nextToken();
				} catch (e) {
					if (Clazz.instanceOf(e, java.util.NoSuchElementException)) {
						throw new NumberFormatException();
					} else {
						throw e;
					}
				}
				//this.bbuf[bindex] = Byte.parseByte(s1);
				this.bbuf[bindex] = Integer.$valueOf(s1).intValue();
				if ((this.bbuf[bindex] < PatternHolder.Y_MIN || this.bbuf[bindex] > PatternHolder.Y_MAX) && ((bindex & 1) == 1) && (this.bbuf[bindex] < PatternHolder.X_MIN || this.bbuf[bindex] > PatternHolder.X_MAX)) {
					throw new NumberFormatException();
				}
			}
			this.s = fp.readLine();
			this.fline++;
		}
		this.motion = tmp;
		var b = Clazz.newArray(bindex, 0);
		for (var i = 0; i < bindex; i++) {
			b[i] = this.bbuf[i];
		}
		this.motiontable.put(this.motion, b);
	} catch (e) {
		if (Clazz.instanceOf(e, NumberFormatException)) {
			this.jmj.putError("Bad motion definition in " + tmp + " in line:" + this.fline, this.s);
			while (this.s.length != 0 && (this.s.charAt(0)).charCodeAt(0) == ('{').charCodeAt(0)) {
				this.s = fp.readLine();
				this.fline++;
			}
			this.readflag = false;
		} else {
			throw e;
		}
	}
};

PatternHolder.prototype.parsePattern = function(s) {
	var bindex = 0;
	var c;

	// @FOO start
	this.tailindex = this.getTail(s);
	// @FOO end

	for (this.next = 0; this.next <= this.tailindex; this.next++) {
		if ((( c = s.charAt(this.next))).charCodeAt(0) == (' ').charCodeAt(0) || (c).charCodeAt(0) == ('\t').charCodeAt(0))
			break;
	}
	for (var i = 0; i < this.next; i++, bindex++) {
		switch ((c = s.charAt (i))) {
			case '(':
				this.bbuf[bindex] = PatternHolder.PAR;
				break;
			case ')':
				this.bbuf[bindex] = PatternHolder.ENTHESIS;
				break;
			case ',':
				this.bbuf[bindex] = PatternHolder.COMMA;
				break;
			case '[':
				this.bbuf[bindex] = PatternHolder.BRA;
				break;
			case ']':
				this.bbuf[bindex] = PatternHolder.KET;
				break;
			default:
				if ((c).charCodeAt(0) >= ('0').charCodeAt(0) && (c).charCodeAt(0) <= ('9').charCodeAt(0)) {
					this.bbuf[bindex] = ((c).charCodeAt(0) - ('0').charCodeAt(0));
				} else if ((c).charCodeAt(0) >= ('a').charCodeAt(0) && (c).charCodeAt(0) <= ('z').charCodeAt(0)) {
					this.bbuf[bindex] = ((c).charCodeAt(0) - ('a').charCodeAt(0) + 10);
				} else if ((c).charCodeAt(0) >= ('A').charCodeAt(0) && (c).charCodeAt(0) <= ('Z').charCodeAt(0)) {
					this.bbuf[bindex] = ((c).charCodeAt(0) - ('A').charCodeAt(0) + 10);
				} else {
					return null;
				}
		}
	}
	if (this.next > Jmj.LMAX) {
		this.jmj.putError("Too Long Pattern in line :" + this.fline, s);
		return null;
	}
	var patt = Clazz.newArray(bindex, 0);
	for (var i = 0; i < bindex; i++) {
		patt[i] = this.bbuf[i];
	}
	for (; this.next < this.tailindex; this.next++) {
		if ((s.charAt(this.next)).charCodeAt(0) != (' ').charCodeAt(0) && (s.charAt(this.next)).charCodeAt(0) != ('\t').charCodeAt(0)) {
			break;
		}
	}
	if (this.next >= this.tailindex) {
		this.next = 0;
	}
	return patt;

};

PatternHolder.prototype.isPattern = function(index) {
	return this.patternVector.elementAt(index).isPattern;
};

PatternHolder.prototype.getPattern = function(o, s) {
	if (arguments.length < 2) {
		if ( typeof o == 'string') {
			s = o;
			this.tailindex = this.getTail(s);
			return this.getPattern(-1, s);
		} else {
			var index = o;
			return this.getPattern(index, null);
		}
	}
	var index = o;

	var flag = 0;
	var flag2 = 0;
	var a = 0;
	var j = 0;
	var pattw = 0;

	// @FOO start
/*
	if (s != null) {
		this.pattbarr = this.parsePattern(s);
		if (this.pattbarr == null) {
			return false;
		}
		this.jmj.pattern = s;
	} else {
		if (!this.isPattern(index)) {
			return false;
		}
		var p = this.patternVector.elementAt(index);
		this.jmj.pattern = p.name;
		this.jmj.motion = p.motion;
		this.jmj.$height = p.height;
		this.jmj.dwell = p.dwell;
		this.pattbarr = p.siteswap;
		this.jmj.formation = p.formation;
		var iCnt;
		for ( iCnt = 0; iCnt < Jmj.PERMAX; iCnt++) {
			this.jmj.motion2[iCnt] = p.motion2[iCnt];
		}
	}
*/
	this.jmj.pattern = "Slower 3-Cascade"
	this.jmj.motion = "Shower"
	this.jmj.$height = 0.2
	this.jmj.dwell = 0.75
	this.pattbarr = this.parsePattern(Jmj.siteswap); // p.siteswap;
	this.jmj.formation = "1-Person";
	var iCnt;
	for ( iCnt = 0; iCnt < Jmj.PERMAX; iCnt++) {
		this.jmj.motion2[iCnt] = this.jmj.motion; // p.motion2[iCnt];
	}
	// @FOO end

	if (this.pattbarr[0] == PatternHolder.PAR) {
		this.jmj.isSync = true;
	} else {
		this.jmj.isSync = false;
	}
	while (j < this.pattbarr.length) {
		if (this.pattbarr[j] == PatternHolder.BRA) {
			flag2 = 1;
			this.jmj.patts[pattw] = 0;
			j++;
			continue;
		}
		if (this.pattbarr[j] == PatternHolder.KET) {
			if (flag2 == 0) {
				return false;
			}
			flag2 = 0;
			pattw++;
			j++;
			continue;
		}
		if (this.jmj.isSync) {
			switch (this.pattbarr[j]) {
				case PatternHolder.PAR:
					if (flag != 0) {
						return false;
					}
					flag = 1;
					j++;
					continue;
				case PatternHolder.ENTHESIS:
					if (flag != 5) {
						return false;
					}
					flag = 0;
					j++;
					continue;
				case PatternHolder.COMMA:
					if (flag != 2) {
						return false;
					}
					flag = 4;
					j++;
					continue;
				case PatternHolder.CROSS:
					if (flag != 2 && flag != 5) {
						return false;
					}
					if (flag2 != 0) {
						this.jmj.patt[pattw][this.jmj.patts[pattw] - 1] = -a;
					} else {
						this.jmj.patt[pattw - 1][0] = -a;
					}
					j++;
					continue;
			}
		}
		a = this.pattbarr[j];
		if (this.jmj.isSync) {
			if (a % 2 != 0) {
				return false;
			}
			if (flag2 == 0 && flag != 1 && flag != 4) {
				return false;
			}
			if (flag == 1) {
				flag = 2;
			}
			if (flag == 4) {
				flag = 5;
			}
		}
		if (flag2 != 0) {
			if (a == 0) {
				return false;
			}
			this.jmj.patt[pattw][this.jmj.patts[pattw]++] = a;
			if (this.jmj.patts[pattw] > Jmj.MMAX) {
				return false;
			}
		} else {
			this.jmj.patt[pattw][0] = a;
			if (a == 0) {
				this.jmj.patts[pattw++] = 0;
			} else {
				this.jmj.patts[pattw++] = 1;
			}
		}
		j++;
	}
	if (flag != 0 || flag2 != 0 || pattw == 0) {
		return false;
	}
	this.jmj.pattw = pattw;
	if (this.jmj.TEST_MODE == true) {
		var msg = new MessageBox();
		msg.pattw = pattw;
		msg.isSync = this.jmj.isSync;
		msg.s = s;
		for (var iCnt1 = 0; iCnt1 < pattw; iCnt1++) {
			msg.patts[iCnt1] = this.jmj.patts[iCnt1];
			for (var iCnt2 = 0; iCnt2 < this.jmj.patts[iCnt1]; iCnt2++) {
				msg.patt[iCnt1][iCnt2] = this.jmj.patt[iCnt1][iCnt2];
			}
		}
		msg.chkSSdlg();
	}
	return true;
};

PatternHolder.prototype.nameAt = function(index) {
	// try {
	// return this.patternVector.elementAt(index).name;
	// } catch (e) {
	// if (Clazz.instanceOf(e, ArrayIndexOutOfBoundsException)) {
	// return String.instantialize();
	// } else {
	// throw e;
	// }
	// }
	if (index >= this.patternVector.size()){
		// Java版では、ArrayIndexOutOfBoundsException
		return '';
	}
	return this.patternVector.elementAt(index).name;
};

PatternHolder.prototype.get = function(index) {
	if (index >= this.patternVector.size()){
		return null;
	}
	return this.patternVector.elementAt(index);
};

PatternHolder.prototype.chooseTrickByName = function(trickName) {
	var n = this.patternVector.size();
	for (var i = 0; i < n; i++) {
		if (this.patternVector.elementAt(i).isPattern) {
			if ((this.patternVector.elementAt(i)).name.equals(trickName)) {
				this.jmj.controller.patternList.select(i);
				return i;
			}
		}
	}
	return -1;
};

PatternHolder.prototype.getTail = function(str) {
	if (str.length == 0) {
		return 0;
	}
	for (var i = str.length - 1; i > -1; i--) {
		if ((str.charAt(i)).charCodeAt(0) != (' ').charCodeAt(0) && (str.charAt(i)).charCodeAt(0) != ('\t').charCodeAt(0)) {
			return i;
		}
	}
	return 0;
};

PatternHolder.prototype.fadd = function(t, x) {
	return (Math.floor(t * Math.pow(10, x) + .5) / Math.pow(10, x));
};

PatternHolder.prototype.rewindMotion = function() {
	this.en = this.motiontable.keys();
};

PatternHolder.prototype.nextMotion = function() {
	if (this.en.hasMoreElements()) {
		return this.en.nextElement();
	} else {
		return "";
	}
};

PatternHolder.prototype.getMotion = function(motion) {
	// @FOO
	//this.jmj.motionarray = this.motiontable.get(motion);
	this.jmj.motionarray = [13, 0, 4, 0]; //[21,  9,  18,  4];
};

PatternHolder.prototype.getMotion2 = function(motion, iPer) {
	// @FOO
	this.jmj.motionarray2[iPer] = [13, 0, 4, 0]; //[21,  9,  18,  4]; //this.motiontable.get(motion);
	this.jmj.motionlength[iPer] = this.jmj.motionarray2[iPer].length;
};

PatternHolder.prototype.countMotions = function() {
	return this.motiontable.size();
};

PatternHolder.prototype.setFormation = function(fp) {
	var tmp = this.s.substring(1, ++this.tailindex);
	var iTmp;
	var iCnt = 0;
	this.s = fp.readLine();
	this.fline++;
	this.readflag = false;
	if (this.s.length == 0 || (this.s.charAt(0)).charCodeAt(0) != ('{').charCodeAt(0)) {
		if (this.xyformation.containsKey(tmp)) {
			this.formation = tmp;
		} else {
			this.jmj.putError("Undefined Formation in line:" + this.fline, this.s);
		}
		return;
	}
	var bindex = 0;
	try {
		var s1;
		while (this.s.length != 0 && (this.s.charAt(0)).charCodeAt(0) == ('{').charCodeAt(0)) {
			var st = new java.util.StringTokenizer(this.s, " {},\t");
			for (var i = 0; i < 2; i++, bindex++) {
				try {
					s1 = st.nextToken();
				} catch (e) {
					if (Clazz.instanceOf(e, java.util.NoSuchElementException)) {
						throw new NumberFormatException();
					} else {
						throw e;
					}
				}
				this.ibuf[bindex] = Integer.parseInt(s1);
				if ((this.ibuf[bindex] < -1000 || this.ibuf[bindex] > 1000) && ((bindex & 1) == 1) && (this.ibuf[bindex] < -1000 || this.ibuf[bindex] > 1000)) {
					throw new NumberFormatException();
				}
			}
			this.s = fp.readLine();
			this.fline++;
		}
		this.formation = tmp;
		var ib = Clazz.newArray(bindex, 0);
		for (var i = 0; i < bindex; i++) {
			ib[i] = this.ibuf[i];
		}
		this.xyformation.put(this.formation, ib);
	} catch (e) {
		if (Clazz.instanceOf(e, NumberFormatException)) {
			this.jmj.putError("Bad formation definition in " + tmp + " in line:" + this.fline, this.s);
			while (this.s.length != 0 && (this.s.charAt(0)).charCodeAt(0) == ('{').charCodeAt(0)) {
				this.s = fp.readLine();
				this.fline++;
			}
			this.readflag = false;
		} else {
			throw e;
		}
	}
};

PatternHolder.prototype.rewindFormation = function() {
	this.enXY = this.xyformation.keys();
};

PatternHolder.prototype.nextFormation = function() {
	if (this.enXY.hasMoreElements()) {
		return this.enXY.nextElement();
	} else {
		return "";
	}
};

PatternHolder.prototype.getFormation = function(formation) {
	var iCnt;
	var iXYNum;

	// @FOO
	//this.jmj.formationarray = this.xyformation.get(formation);
	this.jmj.formationarray = [0, 0]; //[30, 0,  0, 0];

	//( $t$ = Jmj.iPerMax = Math.floor(this.jmj.formationarray.length / 2), Jmj.prototype.iPerMax = Jmj.iPerMax, $t$);
	Jmj.iPerMax = Math.floor(this.jmj.formationarray.length / 2);
	for ( iCnt = 0; iCnt < Jmj.iPerMax; iCnt++) {
		this.jmj.iXData[iCnt] = this.jmj.formationarray[iCnt * 2];
		this.jmj.iYData[iCnt] = this.jmj.formationarray[iCnt * 2 + 1];
	}
	return;
};

PatternHolder.prototype.countFormation = function(formation) {
	return this.xyformation.size();
};

PatternHolder.prototype.motionToken = function(formation) {
	var strTmp;
	var iCnt;
	var iCnt2;
	var iFlag = Clazz.newArray(Jmj.PERMAX, 0);
	var iCntToken;
	var iCntToken2;
	var iBefore;
	var iAfter;
	var strToken1;
	var strToken2;
	var strToken3;
	var strMotion;
	var stmp = this.s.substring(1);
	var st = new java.util.StringTokenizer(stmp, ",:");
	try {
		for ( iCnt = 0; iCnt < Jmj.PERMAX; iCnt++) {
			iFlag[iCnt] = 0;
		}
		iCntToken = st.countTokens();
		if (iCntToken < 2) {
			return -1;
		}
		for ( iCnt = 0; iCnt < iCntToken - 1; iCnt++) {
			strTmp = st.nextToken();
			var st2 = new java.util.StringTokenizer(strTmp, "-", true);
			iCntToken2 = st2.countTokens();
			if (iCntToken2 > 3)
				return -2;
			switch (iCntToken2) {
				case 1:
					iBefore = Integer.$valueOf(st2.nextToken()).intValue();
					if (iBefore < 1 || Jmj.PERMAX < iBefore)
						return -3;
					iFlag[iBefore - 1] = 1;
					break;
				case 2:
					strToken1 = st2.nextToken();
					strToken2 = st2.nextToken();
					if (strToken1.equals("-")) {
						iAfter = Integer.$valueOf(strToken2).intValue();
						if (iAfter < 1 || Jmj.PERMAX < iAfter)
							return -4;
						iBefore = 1;
						for ( iCnt2 = iBefore; iCnt2 < iAfter + 1; iCnt2++)
							iFlag[iCnt2 - 1] = 1;

					} else if (strToken2.equals("-")) {
						iBefore = Integer.$valueOf(strToken1).intValue();
						if (iBefore < 1 || Jmj.PERMAX < iBefore)
							return -5;
						iAfter = Jmj.PERMAX;
						for ( iCnt2 = iBefore; iCnt2 < iAfter + 1; iCnt2++)
							iFlag[iCnt2 - 1] = 1;

					} else {
						return -123;
					}
					break;
				case 3:
					strToken1 = st2.nextToken();
					strToken2 = st2.nextToken();
					strToken3 = st2.nextToken();
					if (strToken2.equals("-")) {
						iBefore = Integer.$valueOf(strToken1).intValue();
						if (iBefore < 1 || Jmj.PERMAX < iBefore)
							return -6;
						iAfter = Integer.$valueOf(strToken3).intValue();
						if (iAfter < 1 || Jmj.PERMAX < iAfter)
							return -7;
						if (iBefore > iAfter) {
							var iTmp = iAfter;
							iAfter = iBefore;
							iBefore = iAfter;
						}
						for ( iCnt2 = iBefore; iCnt2 < iAfter + 1; iCnt2++)
							iFlag[iCnt2 - 1] = 1;

					} else {
						return -124;
					}
					break;
				default:
					return -8;
			}
		}
		strMotion = st.nextToken().substring(1);
		if (this.motiontable.containsKey(strMotion)) {
			for ( iCnt2 = 0; iCnt2 < Jmj.PERMAX; iCnt2++) {
				if (iFlag[iCnt2] == 1)
					this.motion2[iCnt2] = strMotion;
			}
		} else {
			return -9;
		}
		return 0;
	} catch (e) {
		if (Clazz.instanceOf(e, NumberFormatException)) {
			this.jmj.putError("Motion Error in line:" + this.fline, this.s);
			return -10;
		} else {
			throw e;
		}
	}
};

PatternHolder.prototype.resetmotion2 = function() {
	var iCnt;
	for ( iCnt = 0; iCnt < Jmj.PERMAX; iCnt++) {
		this.motion2[iCnt] = "";
	}
	return;
};

PatternHolder.CROSS = 33;
PatternHolder.COMMA = -1;
PatternHolder.BRA = -2;
PatternHolder.KET = -3;
PatternHolder.PAR = -4;
PatternHolder.ENTHESIS = -5;

PatternHolder.X_MIN = -30;
PatternHolder.X_MAX = 30;
PatternHolder.Y_MIN = -10;
PatternHolder.Y_MAX = 20;

PatternHolder.Piece = function(isPat, nm, mt, ss, hght, ht, fm, mt2) {
	this.name = null;
	this.isPattern = false;
	this.motion = null;
	this.siteswap = null;
	this.height = 0;
	this.dwell = 0;
	this.formation = null;
	this.motion2 = null;

	this.motion2 = new Array(Jmj.PERMAX);

	if (arguments.length > 0) {
		this.name = nm;
		this.isPattern = isPat;
	}
	if (arguments.length > 2) {
		this.motion = mt;
		this.siteswap = ss;
		this.height = hght;
		this.dwell = ht;
		this.formation = fm;

		for (var i = 0; i < Jmj.PERMAX; i++) {
			if (mt2[i] === "") {
				this.motion2[i] = this.motion;
			} else {
				this.motion2[i] = mt2[i];
			}
		}
	}
};
var Piece = PatternHolder.Piece;
var JmjController = function(jmj, quitflag, isInit) {
	this.jmj = null;
	this.jd = null;
	this.new_siteswap_button = null;
	this.juggle_button = null;
	this.pause_button = null;
	this.showerize_button = null;
	this.primarymessage = null;
	this.secondarymessage = null;
	this.pattern_label = null;
	this.pattern_value = null;
	this.motion_label = null;
	this.motion_value = null;
	this.ballno_label = null;
	this.ballno_value = null;
	this.formation_label = null;
	this.formation_value = null;
	this.speed_label = null;
	this.speed_value = null;
	this.height_label = null;
	this.height_value = null;
	this.dwell_label = null;
	this.dwell_value = null;
	this.perno_label = null;
	this.perno_value = null;
	this.speed_gauge = null;
	this.height_gauge = null;
	this.dwell_gauge = null;
	this.perno_gauge = null;
	this.menubar = null;
	this.menu_option = null;
	this.menu_quit = null;
	this.menu_help = null;
	this.dialog_text = null;
	this.patternList = null;
	this.dialog_fileList = null;
	this.dialog_motionList = null;
	this.dialog_didyoumeanList = null;
	this.dialog_cancel = null;
	this.dialog_ok = null;
	this.mirror_box = null;
	this.ss_box = null;
	this.body_box = null;
	this.sound_box = null;
	this.prevIndex = 0;

	// @FOO
	return;

	// property
	this.dialog_text = new TextField('page4_text');

    this.patternList = null;
    this.dialog_fileList = new PatternfileList('page4_list', jmj);
    this.dialog_motionList = new MotionList('page4_select', jmj);
    this.dialog_didyoumeanList = new DidyoumeanList('page4_list', jmj);

	// Constructor
    this.jmj = jmj;

	this.patternList = new PatternList('patternList');

	this.primarymessage = new Label();
    this.secondarymessage = new Label();

    this.new_siteswap_button = new Button(JmjController.TRY_A_NEW_SITESWAP);
    this.juggle_button = new Button("Juggle");
    this.pause_button  = new Button("Pause");
    this.showerize_button = new Button("Showerize");

    this.pattern_label = new Label("Pattern");
    this.motion_label = new Label("Arm motion");
    this.ballno_label = new Label("Ball #");
    this.formation_label = new Label("Formation");
    this.pattern_value = new Label("");
    this.motion_value = new Label("");
    this.ballno_value = new Label("");
    this.formation_value = new Label("");

    this.speed_label = new Label('speed_label', "Speed");
    this.height_label = new Label('height_label', "Height");
    this.dwell_label = new Label('dwell_label', "Dwell ratio");
    this.perno_label = new Label('perno_label', "Person #");

    this.speed_gauge  = new Scrollbar('speed_gauge', 10 / 10.0);
    this.height_gauge = new Scrollbar('height_gauge', 20 / 100.0);
    this.dwell_gauge  = new Scrollbar('dwell_gauge', 20 / 100.0);
    this.perno_gauge  = new Scrollbar('perno_gauge', JmjController.iPersonNo);

    this.speed_value  = new Label("");
    this.height_value = new Label("");
    this.dwell_value  = new Label("");
    this.perno_value  = new Label("");

    this.mirror_box = new Checkbox('mirror_box', 'mirror_box_label', "Mirror image");
    this.ss_box = new Checkbox('ss_box', 'ss_box_label', "Show siteswap");
    this.body_box = new Checkbox('body_box', 'body_box_label', "Show juggler");
    this.sound_box = new Checkbox('sound_box', 'sound_box_label', "Sound");

    this.new_siteswap_button = new Button();
    this.juggle_button = new Button();
    this.pause_button = new Button();
    this.showerize_button = new Button();

	this.menu_quit = new Menu();
	this.menu_option = new Menu();

	this.juggle_button.setEnabled(false);
	this.pause_button.setEnabled(false);

	if (isInit){
		var self = this;
		$('#page4_juggle_button').click(function(e) {
			self.actionPerformedForNewSiteswapButton(e);
		});
		$('#page4_showerize_button').click(function(e) {
			self.actionPerformedForShowerize(e);
		});
		$('#page4_motion_button').click(function(e) {
			self.actionPerformedForMotion(e);
		});
		$('#page4_formation_button').click(function(e) {
			self.actionPerformedForFormation(e);
		});
		$('#page4_pattern_button').click(function(e) {
			self.actionPerformedForPattern(e);
		});
	}
};

JmjController.vanilla_siteswap_check = function(str) {
	for (var i = 0; i < str.length; i++) {
		var c = str.charAt (i);
		if (('0').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('9').charCodeAt (0)) {

		} else if (('a').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('z').charCodeAt (0)) {

		} else {
			return false;
		}
	}
	return true;
};

JmjController.prototype.actionPerformedForPatternList = function(e) {
	var index = parseId(e.target.id);
	this.patternList.select(index);

	this.patternList.chooseValidIndex();
	//this.juggle_pressed();
	// 手抜き
	this.jmj.startJuggling(this.patternList.getSelectedIndex(), "");

	$.mobile.changePage('#page2');
};

JmjController.prototype.actionPerformedForNewSiteswapButton = function(e) {
	this.jmj.jmjDialog.setStatus(JmjDialog.TRY_SITESWAP);
    this.jmj.jmjDialog.actionPerformed(e);
};

JmjController.prototype.actionPerformedForShowerize = function(e) {
	if (JmjController.vanilla_siteswap_check(this.jmj.siteswap)) {
		var newPatternStr = "";
		for (var i = 0; i < this.jmj.pattw; i++) {
			var d = 2 * this.jmj.patt[i][0] - 1;
			if (this.jmj.patt[i][0] == 0) {
					newPatternStr += "00";
				} else {
					newPatternStr += "1";
				if (d < 10) {
					//newPatternStr += String.valueOf (d);
					newPatternStr += d;
				} else if (d < 36) {
					//newPatternStr += String.valueOf (String.fromCharCode ((('a').charCodeAt (0) + d - 10)));
					newPatternStr += String.fromCharCode(('a').charCodeAt(0) + d - 10);
				} else {
					$.mobile.changePage('#page4_error');
					return ;
				}
			}
		}
		this.dialog_text.setText(newPatternStr);
		this.dialog_text.refresh();
		this.jmj.startJuggling (-3, newPatternStr);
		$.mobile.changePage('#page2');
		return ;
	}
	else {
		$.mobile.changePage('#page4_error');
	}
};

JmjController.prototype.actionPerformedForDialogList = function(e) {
    this.jmj.jmjDialog.actionPerformed(e);
};

JmjController.prototype.actionPerformedForMotion = function(e) {
	this.jmj.jmjDialog.popup(JmjDialog.CHOOSE_MOTION);
};

JmjController.prototype.actionPerformedForFormation = function(e) {
	this.jmj.jmjDialog.popup(JmjDialog.CHOOSE_FORMATION);
};

JmjController.prototype.actionPerformedForPattern = function(e) {
	this.jmj.jmjDialog.popup(JmjDialog.SELECT_FILE);
};

JmjController.prototype.juggle_pressed = function() {
	this.jmj.startJuggling(this.patternList.getSelectedIndex());
};

JmjController.prototype.setSpeedLabel = function() {
	this.speed_value.setText(String.valueOf(this.getSpeed()));
};

JmjController.prototype.setHeightLabel = function() {
	this.height_value.setText(String.valueOf(this.GetHeight_()));
};

JmjController.prototype.setDwellLabel = function() {
	this.dwell_value.setText(String.valueOf(this.getDwell()));
};

JmjController.prototype.setPernoLabel = function() {
	this.perno_value.setText(String.valueOf(JmjController.iPersonNo));
};

JmjController.prototype.setLabels = function() {
	// @FOO
	return;

	this.pattern_value.setText(this.jmj.pattern);
	this.ballno_value.setText(String.valueOf(this.jmj.ballno));
	this.formation_value.setText(this.jmj.formation);
	this.motion_value.setText(this.jmj.motion);
};

JmjController.prototype.setSpeed = function(speed) {
	//this.speed_gauge.setValue(Math.round((speed * 10)));
	this.speed_gauge.setValue(speed);
	this.setSpeedLabel();
};

JmjController.prototype.setHeight = function(height) {
	// @FOO
	return;

	//this.height_gauge.setValue(Math.round((height * 100)));
	this.height_gauge.setValue(height);
	this.setHeightLabel();
};

JmjController.prototype.setDwell = function(dwell) {
	// @FOO
	return;

	//this.dwell_gauge.setValue(Math.round((dwell * 100)));
	this.dwell_gauge.setValue(dwell);
	this.setDwellLabel();
};

JmjController.prototype.setPerno = function(i) {
	// @FOO
	return;

	JmjController.iPersonNo = i;
	//this.perno_gauge.setValues(JmjController.iPersonNo, 1, Jmj.PERMIN, Jmj.iPerMax + 1);
	this.perno_gauge.setValues(JmjController.iPersonNo, 1, Jmj.PERMIN, Jmj.iPerMax);
	this.setPernoLabel();
};

JmjController.prototype.getSpeed = function() {
	//return this.speed_gauge.getValue() / 10;
	// @FOO
	//return this.speed_gauge.getValue();
	return 0.5;
};

JmjController.prototype.GetHeight_ = function() {
	//return this.height_gauge.getValue() / 100;
	return this.height_gauge.getValue();
};

JmjController.prototype.getDwell = function() {
	//return this.dwell_gauge.getValue() / 100;
	return this.dwell_gauge.getValue();
};

JmjController.prototype.getPerNo = function() {
	// @FOO
	//return this.perno_gauge.getValue();
	return 0;
};

JmjController.prototype.ifShowBody = function() {
	// @FOO
	//return this.body_box.getState();
	return true;
};

JmjController.prototype.ifShowSiteSwap = function() {
	// @FOO
	//return this.ss_box.getState();
	return Jmj.showSiteswap;
};

JmjController.prototype.ifMirror = function() {
	// @FOO
	//return this.mirror_box.getState();
	return false;
};

JmjController.prototype.ifSound = function() {
	// @FOO
	//return this.sound_box.getState();
	return false;
};

JmjController.prototype.setIfShowBody = function(f) {
	this.body_box.setState(f);
};

JmjController.prototype.setIfShowSiteSwap = function(f) {
	this.ss_box.setState(f);
};

JmjController.prototype.setIfMirror = function(f) {
	this.mirror_box.setState(f);
};

JmjController.prototype.setIfSound = function(f) {
	this.sound_box.setState(f);
};

JmjController.prototype.isNewChoice = function() {
	var b;
	b = (this.prevIndex != this.patternList.getSelectedIndex());
	this.prevIndex = this.patternList.getSelectedIndex();
	return b;
};

JmjController.prototype.forceNewChoice = function() {
	this.prevIndex = -1;
};

JmjController.prototype.enableSwitches = function() {
	// @FOO
	return;

	this.juggle_button.setEnabled(true);
	this.pause_button.setEnabled(true);
	this.patternList.setEnabled(true);
};

JmjController.prototype.disableSwitches = function() {
	this.juggle_button.setEnabled(false);
	this.pause_button.setEnabled(false);
	this.patternList.setEnabled(false);
};

JmjController.prototype.putMessage = function(s1, s2) {
	// @FOO
	return;

	this.putPrimaryMessage(s1);
	this.putSecondaryMessage(s2);
};

JmjController.prototype.putPrimaryMessage = function(s) {
	this.primarymessage.setText (s);
};

JmjController.prototype.putSecondaryMessage = function(s) {
	this.secondarymessage.setText(s);
};

JmjController.prototype.enableMenuBar = function() {
	this.menu_option.setEnabled(true);
	this.menu_quit.setEnabled(true);
};

JmjController.prototype.disableMenuBar = function() {
	this.menu_option.setEnabled(false);
	this.menu_quit.setEnabled(true);
};

JmjController.QUIT = "Quit";
JmjController.TRY_A_NEW_SITESWAP = "Try a new siteswap";

JmjController.iPersonNo = 0;

// Super
JmjController.prototype.setLocation = function(x, y) {

};

JmjController.prototype.setVisible = function(b) {

};
var jmj = null;
function initJmj(e) {
	// @FOO start
	Jmj.canvas = e.canvas;
	// @FOO ebd

	// @FOO start
	// if (jmj == null){
	// 	initCanvas();
	// }
	// @FOO end

	// @FOO start
	//// page1のリストを削除
	//$('#patternList').children().remove();
	//$('#patternList').show();
	// @FOO end

	// リストの作成開始のフラグを初期化
	// @FOO start
	// if (jmj != null){
	// 	jmj.controller.patternList.data = null;
	// }

	// @FOO start
	//$('#page2_content').show();
	//$('#page3_content').show();
	//$('#page4_content').show();
	// @FOO end

	// @FOO start
	// if (jmj == null){
	// 	jmj = new Jmj();
	// 	jmj.init(true);
	// }
	// else {
	// 	//jmj.openFile('');
	// 	jmj.init(false);
	// 	jmj.reload();
	//
	// 	if (startPage != 'page1'){
	// 		var main = $("#main");
	// 		main.find("div[data-role=collapsible-set]").collapsibleset({refresh:true});
	// 		main.find("div[data-role=collapsible]").collapsible({refresh:true});
	// 		main.find("ul[data-role=listview]").listview({refresh:true});
	// 	}
	// }
	jmj = new Jmj();
	jmj.initCanvas();
	jmj.init(true);
	// @FOO end
	//initPage(e);
	jmj.initPage(e);

	// @FOO start
	//$('#loading1').hide();
	//$('#loading2').hide();
	// @FOO end
	return jmj;
}

// @FOO start
/*
var isInit = null;
var startPage = null;

function initPage(e){
	// @FOO start
	//var id = e.target.id;
	// @FOO end
	if (jmj != null){
		jmj.initPage(e);
		if (isInit[id]){
			if (id == 'page1'){
				jmj.initPage1();
			}
			else if (id == 'page2'){
				jmj.initPage2();
			}
			else if (id == 'page3'){
				jmj.initPage3();
			}
			else if (id == 'page4'){
				jmj.initPage4();
			}
			isInit[id] = false;
		}
	}
}
*/
// @FOO end

// @FOO
/*
function changePage(e, d){
	//var id = e.target.id;
	var id = d.toPage.get(0).id;
	if (isInit[id]){
		return;
	}

	if (id == 'page1'){
		jmj.changePage1();
	}
	else if (id == 'page2'){
		jmj.changePage2();
	}
	else if (id == 'page3'){
		jmj.changePage3();
	}
	else if (id == 'page4'){
		jmj.changePage4();
	}
};

var isMobile = false;
var isAndroid = false;
var isIOS = false;
var isIE = false;
$(document).bind('pageinit', function(e, d) {
	if (isInit == null){
		isInit = new Object();
		isInit['page1'] = true;
		isInit['page2'] = true;
		isInit['page3'] = true;
		isInit['page4'] = true;

		var userAgent = navigator.userAgent.toLowerCase();
		isAndroid = /android/i.test(userAgent);
		isIOS = /iphone|ipad|ipod/i.test(userAgent);
		isIE = /MSIE/i.test(userAgent);
		isMobile = isAndroid || isIOS;
		if (isMobile){
			$.mobile.defaultPageTransition = 'none';
			$.mobile.buttonMarkup.hoverDelay = 10;
		}

		startPage = e.target.id;

		$('#loading2').hide();

		loadTextFile(Jmj.getParameter('file'), initJmj, e);
		return;
	}
	initPage(e);
});

Clazz.data = null;
function loadTextFile(fileName, callback, e) {
	$('#loading1').show();
	$('#patternList').hide();

	$('#page2_content').hide();
	$('#page3_content').hide();
	$('#page4_content').hide();

	httpObj = new XMLHttpRequest();
	httpObj.open('GET', fileName, true);
	httpObj.send(null);
	Clazz.data = null;

	httpObj.onreadystatechange = function() {
		if (httpObj.readyState == 4){
			if (httpObj.status == 200) {
				var data = httpObj.responseText;
				Clazz.data = data;

				callback(e);
			}
			else {
				$('#loading1').hide();
			}
		}
	};
}

$(document).bind('pagechange', function(e, d) {
	changePage(e, d);
});

$(document).bind('pagebeforechange', function(e, d) {
	if (jmj != null){
		jmj.pagebeforechange(e, d);
	}
});

function getQueryString() {
  if (1 < document.location.search.length) {
     var query = document.location.search.substring(1);

     var parameters = query.split('&');

    var result = new Object();
    for (var i = 0; i < parameters.length; i++) {
       var element = parameters[i].split('=');

      var paramName = decodeURIComponent(element[0]);
      var paramValue = decodeURIComponent(element[1]);

       result[paramName] = decodeURIComponent(paramValue);
    }
    return result;
  }
  return null;
}
*/

// @FOO start
/*
$(function(){
	$(document).ready(function(){
		initJmj(null);
	});
})
*/
// @FOO end
