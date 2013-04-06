/**
 * @author 小西 裕治
 */
var jmj = null;
function initJmj(e) {
	initCanvas();

	jmj = new Jmj();
	jmj.init();
	initPage(e);
	
	$('#loading1').remove();
}

var canvasScale = 1.0;
function initCanvas(){
	var p1 = $('#page1');
	var w = p1.width();
	var h = p1.height();
	var dx = 1.25;
	var d = 0.95;
	var max = Jmj.IMAGE_WIDTH * dx * d;

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
	h = Jmj.IMAGE_HEIGHT * canvasScale;
	
	w = Math.round(w);
	h = Math.round(h);
	var c1 = $('<canvas id="canvas" class="canvas" width="' + w + 'px" height="' + h + 'px">');
	//var c2 = $('<canvas id="offscrn" class="canvas" width="' + w + 'px" height="' + h + 'px">');

	var m = $('#main2');
	m.append(c1);
	//m.append(c2);
/*
	var pid = 'main2';
	for (var i = 0; i < 16; i++){
		var id = 'offscrn' + i;
		var c = $('<canvas id="' + id + '" class="canvas" width="' + w + 'px" height="' + h + 'px">');
		$('#' + pid).append(c);	
	}
*/
}

var isInit = null;
var startPage = null;

function initPage(e){
	var id = e.target.id;
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
			isInit[id] = false;
		}
	}	
}

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
};

$(document).bind('pageinit', function(e, d) {
	if (isInit == null){
		isInit = new Object();
		isInit['page1'] = true;
		isInit['page2'] = true;
		isInit['page3'] = true;
		
		startPage = e.target.id;
		
		//loadTextFile('http://localhost:8080/pattern.jm', initJmj, e);
		loadTextFile('./pattern.jm', initJmj, e);
		return;
	}
	initPage(e);
});

$(document).bind('pagechange', function(e, d) {
	changePage(e, d);
});
