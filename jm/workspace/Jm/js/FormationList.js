var FormationList = function() {
};
FormationList.prototype = new ListWithQuicksort();

Float.prototype.create = function() {
	if (this.b$["JmjController.JmjDialog"].jc.jmj.holder.countFormation() > this.getItemCount()) {
		var a;
		this.removeAll();
		this.b$["JmjController.JmjDialog"].jc.jmj.holder.rewindFormation();
		while (true) {
			a = this.b$["JmjController.JmjDialog"].jc.jmj.holder.nextFormation();
			if (a.length == 0)
				break;
			this.add(a);
		}
		this.quickSort(0, this.getItemCount() - 1);
	}
};
