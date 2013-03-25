/**
 * @author 小西 裕治
 */
function foo() {
	var jmj = new Jmj();
	jmj.init();
/*
	var func = function(target) {
		return function(e) {
			target.initPage3(e);
		};
	}(jmj);
	//$('#page2_page3').click(func);
	//$('#page3').live('pagechange', func);
	$(document).live('pagechange', func);
*/
}

//$(document).bind('pageinit', function(e, d) {
//	loadTextFile('http://localhost:8080/pattern.jm');
//});

//$(function() {
//	loadTextFile('http://localhost:8080/pattern.jm');
//});
