var MotionList = function(id, jmj) {
	if (arguments.length < 1) {
		return;
	}
	ListWithQuicksort.apply(this, [id]);

	this.jmj = jmj;
};
MotionList.prototype = new ListWithQuicksort();

MotionList.prototype.create = function() {
	if (this.jmj.holder.countMotions() > this.getItemCount()) {
		var a;
		this.removeAll();
		this.jmj.holder.rewindMotion();
		while (true) {
			a = this.jmj.holder.nextMotion();
			if (a.length == 0)
				break;
			this.add(a);
		}
		this.quickSort(0, this.getItemCount() - 1);
	}
};

MotionList.prototype.createList = function() {	
	var v = this.list;
	var l = v.size();
	var s;
	var n = -1;
	
	for (var i = 0; i < l; i++){
		s = v.elementAt(i);
		if (s == Jmj.NORMAL){
			n = i;
		}
		this.obj.append('<option value="' + i + '">' + s + '</option> ');
	}
	
	var obj = $('#' + this.id);
	if (n >= 0){
		obj.val(n);
	}
	obj.selectmenu('refresh', true); 
};
