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
	this.add('pattern.jm');
	this.add('pattern_ja.jm');
};
