var AudioClip = function(f){
	if (arguments.length < 1) {
		return;
	}
	//Component.apply(this, [id]);
	this.audio = new Audio(f);
};
AudioClip.prototype = new Component();

//AudioClip.prototype.play = function() {
//	this.obj.get(0).play();
//};

AudioClip.prototype.getAudio = function() {
	return this.audio;
};


