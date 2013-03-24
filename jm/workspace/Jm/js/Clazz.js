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
function loadTextFile(fileName) {
	httpObj = new XMLHttpRequest();
	httpObj.open('GET', fileName, true);
	httpObj.send(null);
	httpObj.onreadystatechange = function() {
		if ((httpObj.readyState == 4) && (httpObj.status == 200)) {
			var data = httpObj.responseText;
			//alert(JSON.stringify(data, null, '   '));
			Clazz.data = data;
			
			foo();
		}
	}
}

// TODO 不要？
function displayData() {// TODO 名前　http://www.openspc2.org/JavaScript/Ajax/Ajax_study/chapter02/007/index.html
	if ((httpObj.readyState == 4) && (httpObj.status == 200)) {
		alert('done');
	} else {
		// TODO 読み込み中？
	}
}

function parseId(s){
	var n = s.indexOf('_');
	if (n < 0){
		return -1;
	}
	return parseInt(s.substring(n + 1));
}
