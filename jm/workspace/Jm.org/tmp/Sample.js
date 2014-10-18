var c = 0;
//var audio = new Audio("./sound/" + c + ".wav");
//var audio = new Audio("./tmp/cevio12sec.wav");
//audio.load();
var audio;

var Test = function(){
	
};

var flag = false;
var t = -1;
var currentTimeText;
var countText;
var maxText;
var dx = 1 / 6.0;

Test.prototype.start = function(s) {
	this.kicker = new Thread(this, Test.prototype.run, 100);
	this.kicker.start();
	
	var obj = this;	
	var handler = function() {
		try {
			currentTimeText.value = this.currentTime;
		}
		catch (e){
			return;
		}
		if (start){
countText.value = "...";
		    if (this.currentTime >= t / 3 + dx) {
//currentTimeMaxText.value = t / 3 + dx;
currentTimeMaxText.value = "pauseC";
		        this.pause();
		        start = false;
		        //t++;
		    }
		}
	};
	audio.addEventListener('timeupdate', handler, false);

	// var handler2 = function() {
		// alert('foo');
	// };
	// audio.addEventListener('loadstart', handler2, false);
}

var cnt;
var flag = false;
var start = false;
Test.prototype.run = function() {
	countText.value = "" + cnt;
	
	if (!flag){
		try {
			audio.currentTime = 0;
			flag = true;
		}
		catch (e){
			currentTimeMaxText.value = "error:" + cnt;
			return;
		}
	}

	if (start){
	    if (audio.currentTime >= t / 3 + dx) {
	        audio.pause();
	        start = false;
	        //t++;
currentTimeMaxText.value = "pauseA";
	    }
	}
	if ((cnt++ % 10) != 0){
		return;
	}
	if (start){
		audio.pause();
        start = false;
currentTimeMaxText.value = "pauseB";
	}
	t++;
	audio.currentTime = t / 3;	
	audio.play();
	start = true;
	
	if (cnt >= 90){
		this.kicker.stop();
	}
//currentTimeMaxText.value = "xxx";
}

function bar(){
	if (audio != null){
		foo();
		return;
	}
	audio = new Audio("./tmp/cevio12sec.wav");

	var handler = function() {
		audio.removeEventListener('canplaythrough', handler, false);
		var text = document.getElementById('currentTimeMax');
		text.value = 'canplaythrough';
		foo();
	};
	audio.addEventListener('canplaythrough', handler, false);

	audio.load();
	//audio.play();
}

function foo(){
	currentTimeText = document.getElementById('currentTime');
	currentTimeMaxText = document.getElementById('currentTimeMax');
	countText = document.getElementById('count');
	cnt = 0;
	t = 0;
	start = false;
	flag = false;
currentTimeMaxText.value = "start";

//audio = new Audio("./tmp/cevio12sec.wav");
//audio.load();

	var test = new Test();
	test.start();
}
