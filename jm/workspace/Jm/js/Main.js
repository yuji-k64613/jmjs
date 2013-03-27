/**
 * @author 小西 裕治
 */
var jmj = null;
function initJmj(e) {
	jmj = new Jmj();
	jmj.init();
	initPage(e);
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
