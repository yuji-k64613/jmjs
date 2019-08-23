var FormationList = function(id, jmj) {
	if (arguments.length < 1) {
		return;
	}
	List.apply(this, [id]);
	
	this.jmj = jmj;
	this.reload = true;
};

FormationList.prototype = new ListWithQuicksort();

FormationList.prototype.create = function() {
	if (this.reload || this.jmj.holder.countFormation() > this.getItemCount()) {
		var a;
		this.removeAll();
		this.jmj.holder.rewindFormation();
		while (true) {
			a = this.jmj.holder.nextFormation();
			if (a.length == 0)
				break;
			this.add(a);
		}
		this.quickSort(0, this.getItemCount() - 1);
		
		this.reload = false;
	}
};

FormationList.prototype.setReload = function(b) {
	this.reload = b;
};



