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
