// package
var java = function() {

};

// TODO Object?
var util = function() {

};

var awt = function() {

};

java.awt = awt;
java.util = util;
java.util.Hashtable = Hashtable;
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

var Enumeration = function() {

};

String.prototype.equals = function(param) {
	if (this == param) {
		return (typeof param === 'string')? true : false;
	}
	return false;
};

var System = function(){
	
};
System.out = function(){
	
};
// TODO prototype.
System.out.println = function(s){
	
};
