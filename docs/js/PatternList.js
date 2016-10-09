var PatternList = function(id){
	List.apply(this, [id]);
	//this.list = new Vector();
	
	this.data = null;	
};
PatternList.prototype = new List();

PatternList.prototype.chooseValidIndex = function(){

};

PatternList.prototype.add = function(id, index, n, func, isPattern) {
	//this.list.addElement(n);
	List.prototype.add.call(this, n);

	if (id == null){
		if (this.data == null){
			return;
		}
		//this.data += '</ul></li>';
		this.data += '</ul></div>';
		//this.data += '</div>';

		$(this.obj).append(this.data);

		var main = $("#main");
		if (startPage == 'page1'){
			main.find("div[data-role=collapsible-set]").collapsibleset({refresh:true}); 
			main.find("div[data-role=collapsible]").collapsible({refresh:true}); 
			main.find("ul[data-role=listview]").listview({refresh:true}); 
		}
		main.find("li").click(func);
		//main.find("li").on('vclick', null, func);
				
		this.data = null;
	}
	if (id == null){
		return;
	}
	var l = n.length;
	var ids = 'id="' + id + '_' + index + '"';
/*
	// リストバージョン
	if (!isPattern) {
		n = n.substring(1, l - 2)
		this.obj.append('<li ' + ids + ' data-role="list-divider">' + n + '</li>');
	} else {
		this.obj.append('<li><a ' + ids + ' href="#">' + n + '</a></li>');
		this.obj.click(func);
	}
*/
/*
	// 階層付きリストバージョン
	if (!isPattern) {
		n = n.substring(1, l - 2)
		if (this.data == null){
			this.data = '';
		}
		else {
			this.data += '</ul></li>';
		}
		this.data += '<li ' + ids + '>' + n + '<ul>';
	} else {
		this.data += '<li><a ' + ids + ' href="#">' + n + '</a></li>';
		//this.obj.click(func);
	}
*/
	// 最終行を取り除く
	if (l > 0 && n.charAt(0) == '-'){
		return;
	}
	
	// アコーディオンバージョン
	var collapsed = true;
	if (!isPattern) {
		n = n.substring(1, l - 2);
		if (this.data == null){
			this.data = '';
			//this.data = '<div id="patternList" data-role="collapsible-set" data-collapsed="false">';
			collapsed = false;
		}
		else {
			if (this.data == null){
				return;
			}
			this.data += '</ul></div>';
		}
		if (this.data == null){
			return;
		}
		if (collapsed){
			this.data += '<div data-role="collapsible" data-theme="b" data-content-theme="c">';			
		}
		else {
			this.data += '<div data-role="collapsible" data-collapsed="false" data-theme="b" data-content-theme="c">';			
		}
		this.data += '<h3>' + n + '</h3>';
		this.data += '<ul data-role="listview" data-inset="true">';
	} else {
		if (this.data == null){
			return;
		}
		this.data += '<li><a ' + ids + ' href="#">' + n + '</a></li>';
		//this.obj.click(func);
	}
};
