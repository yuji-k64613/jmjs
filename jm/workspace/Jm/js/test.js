/**
 * @author 小西 裕治
 */
function foo(){
	var jmj = new Jmj();
	jmj.init();
}

$(function(){
	// var s = "{ 10,  0}{  5,  0}";
	// var st = new java.util.StringTokenizer(s, " {},\t");
	// var t = "";
	// for (var i = 0; t != null && i < 10; i++){
		// t = st.nextToken();
	// }
	//return;
	loadTextFile('http://localhost:8080/pattern.jm');

	// var id = 'patternList';
	// var obj = $('#' + id);
	// obj.append('<li>Test</li>');
	// obj.append('<li>Test</li>');
	// obj.append('<li>Test</li>');
	// obj.append('<li>Test</li>');
	// obj.append('<li>Test</li>');
	// obj.listview('refresh');
});
