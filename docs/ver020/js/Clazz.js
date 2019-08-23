var Clazz = function(){
	
};

Clazz.newArray = function(v1, v2, v3) {
	var a = new Array(v1);
	
	if (arguments.length < 3){
		arrayInit(a, v2);	
	}
	else {
		for (var i = 0; i < v1; i++){
			var b = new Array(v2);
			arrayInit(b, v3);
			a[i] = b;
		}
	}
	return a;
};

var arrayInit = function(n, v){
	for (var i = 0; i < n.length; i++){
		n[i] = v;
	}
};

Clazz.data = null;
function loadTextFile(fileName, callback, e) {
	httpObj = new XMLHttpRequest();
	httpObj.open('GET', fileName, true);
	httpObj.send(null);
	httpObj.onreadystatechange = function() {
		if ((httpObj.readyState == 4) && (httpObj.status == 200)) {
			var data = httpObj.responseText;
			Clazz.data = data;
			
			callback(e);
		}
	}
}

Clazz.instanceOf = function(e, t){
	return false;
};

function parseId(s){
	var n = s.indexOf('_');
	if (n < 0){
		return -1;
	}
	return parseInt(s.substring(n + 1));
}

function clone(o)
{
    var f = function(){};
    f.prototype = o;
    return new f();
};
