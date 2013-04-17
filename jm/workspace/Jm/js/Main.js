var jmj = null;
function initJmj(e) {
	if (jmj == null){
		initCanvas();
	}
	// page1のリストを削除
	$('#patternList').children().remove();
	$('#patternList').show();
	// TODO
	if (jmj != null){
		jmj.controller.patternList.data = null;
	}

	if (jmj == null){
		jmj = new Jmj();
		jmj.init();
	}
	else {
		jmj.openFile(''); // TODO どのファイルを読んでるの？
	}
	initPage(e);
	
	$('#loading1').hide();
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

	var m = $('#main2');
	m.append(c1);
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
			else if (id == 'page4'){
				jmj.initPage4();
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
	else if (id == 'page4'){
		jmj.changePage4();
	}
};

/*
$(document).delegate('a', 'vclick', function(e){
    e.preventDefault();
    var link = $(this);
    $.mobile.changePage(link.attr('href'), {
        transition: link.jqmData('transition')
    });
});
*/

var isMobile = false;
$(document).bind('pageinit', function(e, d) {
	if (isInit == null){
		isInit = new Object();
		isInit['page1'] = true;
		isInit['page2'] = true;
		isInit['page3'] = true;
		isInit['page4'] = true;
		
		isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())
		if (isMobile){
			$.mobile.defaultPageTransition = 'none';
			$.mobile.buttonMarkup.hoverDelay = 10;
		}
		
		startPage = e.target.id;
		
		loadTextFile('./pattern.jm', initJmj, e);
		return;
	}
	initPage(e);
});

Clazz.data = null;
function loadTextFile(fileName, callback, e) {
	$('#loading1').show();
	$('#patternList').hide();


	httpObj = new XMLHttpRequest();
	httpObj.open('GET', fileName, true);
//TODO
//httpObj.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
//httpObj.setRequestHeader("Content-Type","text/plain; charset=UTF-8");
//httpObj.overrideMimeType("text/plain; charset=UTF-8");
	httpObj.send(null);
	Clazz.data = null;
	
	httpObj.onreadystatechange = function() {
		if ((httpObj.readyState == 4) && (httpObj.status == 200)) {
			var data = httpObj.responseText;
			Clazz.data = data;
			
			callback(e);
		}
	}
}

$(document).bind('pagechange', function(e, d) {
	changePage(e, d);
});
