var PatternfileList = function(id, jmj) {
	if (arguments.length < 1) {
		return;
	}
	List.apply(this, [id]);

	this.jmj = jmj;
};
PatternfileList.prototype = new List();

PatternfileList.prototype.create = function() {
	this.removeAll();
	
	var str = this.jmj.getParameter('patternfiles');
	var files = str.split(',');
	for (var i = 0; i < files.length; i++){
		this.add(files[i]);
	}
};
