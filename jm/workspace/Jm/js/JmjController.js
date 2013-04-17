var JmjController = function(jmj, quitflag) {
	this.jmj = null;
	this.jd = null;
	this.new_siteswap_button = null;
	this.juggle_button = null;
	this.pause_button = null;
	this.showerize_button = null;
	this.primarymessage = null;
	this.secondarymessage = null;
	this.pattern_label = null;
	this.pattern_value = null;
	this.motion_label = null;
	this.motion_value = null;
	this.ballno_label = null;
	this.ballno_value = null;
	this.formation_label = null;
	this.formation_value = null;
	this.speed_label = null;
	this.speed_value = null;
	this.height_label = null;
	this.height_value = null;
	this.dwell_label = null;
	this.dwell_value = null;
	this.perno_label = null;
	this.perno_value = null;
	this.speed_gauge = null;
	this.height_gauge = null;
	this.dwell_gauge = null;
	this.perno_gauge = null;
	this.menubar = null;
	this.menu_option = null;
	this.menu_quit = null;
	this.menu_help = null;
	this.dialog_text = null;
	this.patternList = null;
	this.dialog_fileList = null;
	this.dialog_motionList = null;
	this.dialog_didyoumeanList = null;
	this.dialog_cancel = null;
	this.dialog_ok = null;
	this.mirror_box = null;
	this.ss_box = null;
	this.body_box = null;
	this.prevIndex = 0;

	// property
	this.dialog_text = new TextField('page4_text');

    this.patternList = null;
    this.dialog_fileList = new PatternfileList('page4_list', jmj);
    this.dialog_motionList = new MotionList('page4_select', jmj);
    this.dialog_didyoumeanList = new DidyoumeanList('page4_list', jmj);
	
	// Constructor
    this.jmj = jmj;

	this.patternList = new PatternList('patternList');
	
	this.primarymessage = new Label();
    this.secondarymessage = new Label();

    this.new_siteswap_button = new Button(JmjController.TRY_A_NEW_SITESWAP);
    this.juggle_button = new Button("Juggle");
    this.pause_button  = new Button("Pause");
    this.showerize_button = new Button("Showerize");

    this.pattern_label = new Label("Pattern");
    this.motion_label = new Label("Arm motion");
    this.ballno_label = new Label("Ball #");
    this.formation_label = new Label("Formation");
    this.pattern_value = new Label("");
    this.motion_value = new Label("");
    this.ballno_value = new Label("");
    this.formation_value = new Label("");

    this.speed_label = new Label('speed_label', "Speed");
    this.height_label = new Label('height_label', "Height");
    this.dwell_label = new Label('dwell_label', "Dwell ratio");
    this.perno_label = new Label('perno_label', "Person #");

    this.speed_gauge  = new Scrollbar('speed_gauge');
    this.height_gauge = new Scrollbar('height_gauge');
    this.dwell_gauge  = new Scrollbar('dwell_gauge');
    this.perno_gauge  = new Scrollbar('perno_gauge');

    this.speed_value  = new Label("");
    this.height_value = new Label("");
    this.dwell_value  = new Label("");
    this.perno_value  = new Label("");

    this.mirror_box = new Checkbox('mirror_box', 'mirror_box_label', "Mirror image");
    this.ss_box = new Checkbox('ss_box', 'ss_box_label', "Show siteswap");
    this.body_box = new Checkbox('body_box', 'body_box_label', "Show juggler");

    this.new_siteswap_button = new Button();
    this.juggle_button = new Button();
    this.pause_button = new Button();
    this.showerize_button = new Button();
	
	this.menu_quit = new Menu();
	this.menu_option = new Menu();
	
	this.juggle_button.setEnabled(false);
	this.pause_button.setEnabled(false);
	
	var self = this;
	$('#page4_juggle_button').click(function(e) {
		self.actionPerformedForNewSiteswapButton(e);
	}); 
	$('#page4_showerize_button').click(function(e) {
		self.actionPerformedForShowerize(e);
	}); 
	$('#page4_motion_button').click(function(e) {
		self.actionPerformedForMotion(e);
	}); 
	$('#page4_formation_button').click(function(e) {
		self.actionPerformedForFormation(e);
	}); 
	$('#page4_pattern_button').click(function(e) {
		self.actionPerformedForPattern(e);
	}); 
};

JmjController.vanilla_siteswap_check = function(str) {
	for (var i = 0; i < str.length; i++) {
		var c = str.charAt (i);
		if (('0').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('9').charCodeAt (0)) {
	
		} else if (('a').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('z').charCodeAt (0)) {
	
		} else {
			return false;
		}
	}
	return true;
};

JmjController.prototype.actionPerformedForPatternList = function(e) {
	var index = parseId(e.target.id);
	this.patternList.select(index);

	this.patternList.chooseValidIndex();
	//this.juggle_pressed();	
	// 手抜き
	this.jmj.startJuggling(this.patternList.getSelectedIndex(), "");
	
	$.mobile.changePage('#page2');
};

JmjController.prototype.actionPerformedForNewSiteswapButton = function(e) {
	this.jmj.jmjDialog.setStatus(JmjDialog.TRY_SITESWAP);
    this.jmj.jmjDialog.actionPerformed(e);
};

JmjController.prototype.actionPerformedForShowerize = function(e) {
	if (JmjController.vanilla_siteswap_check(this.jmj.siteswap)) {
		var newPatternStr = "";
		for (var i = 0; i < this.jmj.pattw; i++) {
			var d = 2 * this.jmj.patt[i][0] - 1;
			if (this.jmj.patt[i][0] == 0) {
					newPatternStr += "00";
				} else {
					newPatternStr += "1";
				if (d < 10) {
					//newPatternStr += String.valueOf (d);
					newPatternStr += d;
				} else if (d < 36) {
					//newPatternStr += String.valueOf (String.fromCharCode ((('a').charCodeAt (0) + d - 10)));
					newPatternStr += String.fromCharCode(('a').charCodeAt(0) + d - 10);
				} else {
					$.mobile.changePage('#page4_error');
					return ;
				}
			}
		}
		this.dialog_text.setText(newPatternStr);
		this.dialog_text.refresh();
		this.jmj.startJuggling (-3, newPatternStr);
		$.mobile.changePage('#page2');
		return ;
	}
	else {
		$.mobile.changePage('#page4_error');
	}
};

JmjController.prototype.actionPerformedForDialogList = function(e) {
    this.jmj.jmjDialog.actionPerformed(e);
};

JmjController.prototype.actionPerformedForDidyoumeanList = function(e) { // TODO
    this.jmj.jmjDialog.actionPerformed(e);
};

JmjController.prototype.actionPerformedForMotion = function(e) {
	this.jmj.jmjDialog.popup(JmjDialog.CHOOSE_MOTION);
};

JmjController.prototype.actionPerformedForFormation = function(e) {
	this.jmj.jmjDialog.popup(JmjDialog.CHOOSE_FORMATION);
};

JmjController.prototype.actionPerformedForPattern = function(e) {
	this.jmj.jmjDialog.popup(JmjDialog.SELECT_FILE);
};

JmjController.prototype.juggle_pressed = function() {
	this.jmj.startJuggling(this.patternList.getSelectedIndex());
};

JmjController.prototype.setSpeedLabel = function() {
	this.speed_value.setText(String.valueOf(this.getSpeed()));
};

JmjController.prototype.setHeightLabel = function() {
	this.height_value.setText(String.valueOf(this.GetHeight_()));
};

JmjController.prototype.setDwellLabel = function() {
	this.dwell_value.setText(String.valueOf(this.getDwell()));
};

JmjController.prototype.setPernoLabel = function() {
	this.perno_value.setText(String.valueOf(JmjController.iPersonNo));
};

JmjController.prototype.setLabels = function() {
	this.pattern_value.setText(this.jmj.pattern);
	this.ballno_value.setText(String.valueOf(this.jmj.ballno));
	this.formation_value.setText(this.jmj.formation);
	this.motion_value.setText(this.jmj.motion);
};

JmjController.prototype.setSpeed = function(speed) {
	//this.speed_gauge.setValue(Math.round((speed * 10)));
	this.speed_gauge.setValue(speed);
	this.setSpeedLabel();
};

JmjController.prototype.setHeight = function(height) {
	//this.height_gauge.setValue(Math.round((height * 100)));
	this.height_gauge.setValue(height);
	this.setHeightLabel();
};

JmjController.prototype.setDwell = function(dwell) {
	//this.dwell_gauge.setValue(Math.round((dwell * 100)));
	this.dwell_gauge.setValue(dwell);
	this.setDwellLabel();
};

JmjController.prototype.setPerno = function(i) {
	JmjController.iPersonNo = i;
	//this.perno_gauge.setValues(JmjController.iPersonNo, 1, Jmj.PERMIN, Jmj.iPerMax + 1);
	this.perno_gauge.setValues(JmjController.iPersonNo, 1, Jmj.PERMIN, Jmj.iPerMax);
	this.setPernoLabel();
};

JmjController.prototype.getSpeed = function() {
	//return this.speed_gauge.getValue() / 10;
	return this.speed_gauge.getValue();
};

JmjController.prototype.GetHeight_ = function() {
	//return this.height_gauge.getValue() / 100;
	return this.height_gauge.getValue();
};

JmjController.prototype.getDwell = function() {
	//return this.dwell_gauge.getValue() / 100;
	return this.dwell_gauge.getValue();
};

JmjController.prototype.getPerNo = function() {
	return this.perno_gauge.getValue();
};

JmjController.prototype.ifShowBody = function() {
	return this.body_box.getState();
};

JmjController.prototype.ifShowSiteSwap = function() {
	return this.ss_box.getState();
};

JmjController.prototype.ifMirror = function() {
	return this.mirror_box.getState();
};

JmjController.prototype.setIfShowBody = function(f) {
	this.body_box.setState(f);
};

JmjController.prototype.setIfShowSiteSwap = function(f) {
	this.ss_box.setState(f);
};

JmjController.prototype.setIfMirror = function(f) {
	this.mirror_box.setState(f);
};

JmjController.prototype.isNewChoice = function() {
	var b;
	b = (this.prevIndex != this.patternList.getSelectedIndex());
	this.prevIndex = this.patternList.getSelectedIndex();
	return b;
};

JmjController.prototype.enableSwitches = function() {
	this.juggle_button.setEnabled(true);
	this.pause_button.setEnabled(true);
	this.patternList.setEnabled(true);
};

JmjController.prototype.disableSwitches = function() {
	this.juggle_button.setEnabled(false);
	this.pause_button.setEnabled(false);
	this.patternList.setEnabled(false);
};

JmjController.prototype.putMessage = function(s1, s2) {
	this.putPrimaryMessage(s1);
	this.putSecondaryMessage(s2);
};

JmjController.prototype.putPrimaryMessage = function(s) {
	this.primarymessage.setText (s);
};

JmjController.prototype.putSecondaryMessage = function(s) {
	this.secondarymessage.setText(s);
};

JmjController.prototype.enableMenuBar = function() {
	this.menu_option.setEnabled(true);
	this.menu_quit.setEnabled(true);
};

JmjController.prototype.disableMenuBar = function() {
	this.menu_option.setEnabled(false);
	this.menu_quit.setEnabled(true);
};

JmjController.QUIT = "Quit";
JmjController.TRY_A_NEW_SITESWAP = "Try a new siteswap";

JmjController.iPersonNo = 0;

// Super
JmjController.prototype.setLocation = function(x, y) {

};

JmjController.prototype.setVisible = function(b) {

};


