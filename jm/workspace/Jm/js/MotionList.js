var MotionList = function(id, jmj) {
	if (arguments.length < 1) {
		return;
	}
	ListWithQuicksort.apply(this, [id]);

	this.jmj = jmj;
};
MotionList.prototype = new ListWithQuicksort();

MotionList.prototype.create = function() {
	//if (this.b$["JmjController"].jmj.holder.countMotions() > this.getItemCount()) {
	if (this.jmj.holder.countMotions() > this.getItemCount()) {
		var a;
		this.removeAll();
		//this.b$["JmjController"].jmj.holder.rewindMotion();
		this.jmj.holder.rewindMotion();
		while (true) {
			//a = this.b$["JmjController"].jmj.holder.nextMotion();
			a = this.jmj.holder.nextMotion();
			if (a.length == 0)
				break;
			this.add(a);
		}
		this.quickSort(0, this.getItemCount() - 1);
	}
	
	var v = this.list;
	var l = v.size();
	var s;
	
	for (var i = 0; i < l; i++){
		s = v.elementAt(i);
		this.obj.append('<option value="' + i + '">' + s + '</option> ');
	}
	$('#' + this.id).selectmenu('refresh', true); 
};
