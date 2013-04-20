var MotionList = function(id, jmj) {
	if (arguments.length < 1) {
		return;
	}
	ListWithQuicksort.apply(this, [id]);

	this.jmj = jmj;
	this.reload = true;
};
MotionList.prototype = new ListWithQuicksort();

MotionList.prototype.create = function() {
	if (this.reload || this.jmj.holder.countMotions() > this.getItemCount()) {
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
		
		this.reload = false;
	}
};

MotionList.prototype.setReload = function(b) {
	this.reload = b;
};

MotionList.prototype.createMotionList = function() {	
	var v = this.list;
	var l = v.size();
	var s;
	var n = -1;
	
	this.obj.children().remove();
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
