var PatternList = function(id){
	List.apply(this, [id]);
	this.list = new Vector();
};
PatternList.prototype = new List();

PatternList.prototype.chooseValidIndex = function(){

};

/*
PatternList.prototype.add = function(n){
	this.list.addElement(n);
};

PatternList.prototype.removeAll = function(){
	this.list = new Vector();
};

PatternList.prototype.validate = function(){

};
*/
