var JmjDialog = function(a) {
	this.setLayout(null);
	this.jc = a;
	this.fileList = this.jc.dialog_fileList;
	this.motionSelect = this.jc.dialog_motionList;
	this.motionList = new MotionList('page4_list', jmj);
	this.didyoumeanList = this.jc.dialog_didyoumeanList;
	//this.formationList = Clazz.innerTypeInstance(JmjController.JmjDialog.FormationList, this, null);
	this.formationList = new FormationList('page4_list', jmj);
	//this.fileList.addActionListener(this);
	//this.motionList.addActionListener(this);
	//this.didyoumeanList.addActionListener(this);
	//this.formationList.addActionListener(this);
	this.label1 = new Label();
	this.label2 = new Label();
	this.label3 = new Label();
	this.label4 = new Label();
	this.label5 = new Label();
	this.ok = this.jc.dialog_ok;
	this.cancel = this.jc.dialog_cancel;
	this.textField = this.jc.dialog_text;
	//this.textField.addActionListener(this);
	this.add(this.ok);
	this.add(this.cancel);
	this.add(this.label1);
	//this.ok.addActionListener(this);
	//this.cancel.addActionListener(this);
	this.setVisible(false);
};

JmjDialog.prototype.popup = function(a) {
	var b;
	switch (this.status = a) {
		case JmjDialog.LOAD_FILE:
			this.setSize(600, 160);
			this.label1.setText("Type in URL or filename to load:");
			this.label1.setBounds(10, 30, 380, 20);
			this.add(this.label1);
			this.textField.setText(String.valueOf(this.jc.jmj.getCodeBase()));
			this.textField.setBounds(10, 60, 580, 25);
			this.add(this.textField);
			this.ok.setLocation(100, 100);
			this.cancel.setLocation(230, 100);
			this.validate();
			this.setVisible(true);
			return;
		case JmjDialog.TRY_SITESWAP:
			this.setSize(600, 260);
			this.label1.setText("Type in a siteswap, and choose the motion if you like:");
			this.label2.setText("Arm motion:");
			//this.label1.setBounds(10, 30, 380, 20);
			//this.label2.setBounds(410, 30, 180, 20);
			this.add(this.label1);
			this.add(this.label2);
			this.motionSelect.create();
			this.motionSelect.createMotionList();
			//this.motionSelect.setBounds(410, 50, 180, 190);
			this.add(this.motionSelect);
			this.textField.setText("");
			//this.textField.setBounds(10, 60, 380, 30);
			this.add(this.textField);
			//this.cancel.setLocation(230, 120);
			//this.ok.setLocation(100, 120);
			this.validate();
			this.setVisible(true);
			//this.textField.requestFocusInWindow();
			return;
		case JmjDialog.CHOOSE_MOTION:
			this.setSize(200, 310);
			this.label1.setText("Choose the motion:");
			//this.label1.setBounds(5, 30, 190, 20);
			this.add(this.label1);
			this.motionList.create();
			//this.motionList.setBounds(5, 50, 190, 190);
			this.add(this.motionList);
			//this.cancel.setLocation(110, 250);
			//this.ok.setLocation(20, 250);
			this.validate();
			this.setVisible(true);
			this.motionList.setCallback('motionList', this.jc.actionPerformedForDialogList);
			this.motionList.createList();
			$('#page4_message').text('Choose the motion:');
			$.mobile.changePage('#page4_dialog');
			$('#page4_list').listview('refresh');
			return;
		case JmjDialog.CHOOSE_FORMATION:
			this.setSize(200, 310);
			this.add(this.formationList);
			this.label1.setText("Choose the formation:");
			//this.label1.setBounds(5, 30, 190, 20);
			this.add(this.label1);
			this.formationList.create();
			//this.formationList.setBounds(5, 50, 190, 190);
			//this.cancel.setLocation(110, 250);
			//this.ok.setLocation(20, 250);
			this.validate();
			this.setVisible(true);
			this.formationList.setCallback('formationList', this.jc.actionPerformedForDialogList);
			this.formationList.createList();
			$('#page4_message').text('Choose the formation:');
			$.mobile.changePage('#page4_dialog');
			$('#page4_list').listview('refresh');
			return;
		case JmjDialog.CHOOSE_ABOUT:
			this.setSize(520, 200);
			this.label1.setText("JuggleMaster Version 1.60 Copyright (C) 1995-1996 Ken Matsuoka");
			this.label2.setText("JuggleMaster X Version 0.42 Copyright (C) 1996 MASUDA Kazuyoshi");
			this.label3.setText("JuggleMaster Java Version 1.03 Copyright (C) 1997-1999 Yuji Konishi,ASANUMA Nobuhiko");
			this.label4.setText("JuggleMaster Java Version 2.05 Copyright (C) 2005 Takumi Okada");
			this.label5.setText("JuggleMaster Java Version 2.13 Copyright (C) 2012 @tatt61880");
			this.label1.setBounds(5, 30, 380, 20);
			this.label2.setBounds(5, 50, 380, 20);
			this.label3.setBounds(5, 70, 500, 20);
			this.label4.setBounds(5, 90, 380, 20);
			this.label5.setBounds(5, 110, 380, 20);
			this.add(this.label1);
			this.add(this.label2);
			this.add(this.label3);
			this.add(this.label4);
			this.add(this.label5);
			this.remove(this.cancel);
			this.ok.setLocation(220, 130);
			this.validate();
			this.setVisible(true);
			return;
		case JmjDialog.CHOOSE_DID_YOU_MEAN:
			//this.remove(this.textField);
			//this.remove(this.motionList);
			//this.remove(this.label2);
			//this.remove(this.label3);
			//this.remove(this.label4);
			//this.remove(this.label5);
			//this.setSize(600, 310);
			//this.label1.setText("Did you mean:");
			//this.label1.setBounds(5, 30, 190, 20);
			//this.add(this.label1);
			//this.add(this.didyoumeanList);
			//this.didyoumeanList.setBounds(10, 50, 580, 190);
			//this.cancel.setLocation(230, 250);
			//this.ok.setLocation(100, 250);
			//this.validate();
			//this.setVisible(true);
			this.didyoumeanList.setCallback('didyoumeanList', this.jc.actionPerformedForDialogList);
			this.didyoumeanList.createList();
			$('#page4_message').text('Did you mean:');
			$.mobile.changePage('#page4_dialog');
			$('#page4_list').listview('refresh');
			return;
		case JmjDialog.SELECT_FILE:
			this.setSize(600, 310);
			this.label1.setText("Select file to load:");
			//this.label1.setBounds(5, 30, 190, 20);
			this.add(this.label1);
			this.fileList.create();
			//this.fileList.setBounds(10, 50, 580, 180);
			this.add(this.fileList);
			//this.cancel.setLocation(230, 250);
			//this.ok.setLocation(100, 250);
			this.validate();
			this.setVisible(true);
			this.fileList.setCallback('fileList', this.jc.actionPerformedForDialogList);
			this.fileList.createList();
			$('#page4_message').text('Select file to load:');
			$.mobile.changePage('#page4_dialog');
			$('#page4_list').listview('refresh');
			return;
	}
};

JmjDialog.prototype.actionPerformed = function(a) {
	//var b = a.getSource();
	var b = a.currentTarget.id;
	var target = a.currentTarget;
	switch (this.status) {
		case JmjDialog.LOAD_FILE:
			if (b === this.textField || b === this.ok) {
				this.setVisible(false);
				if (this.textField.getText().length != 0 && !this.textField.getText().equals(String.valueOf(this.jc.jmj.getCodeBase()))) {
					this.jc.jmj.openFile(this.textField.getText(), true);
					return;
				} else {
					return;
				}
			}
			break;
		case JmjDialog.TRY_SITESWAP:
			//if (b === this.ok || b === this.textField) {
			if (b === 'page4_juggle_button' || b === this.textField) {
				this.setVisible(false);
				if (this.textField.getText().length != 0) {
					if (this.motionSelect.getSelectedIndex() != -1) {
						this.jc.jmj.motion = this.motionSelect.getSelectedItem();
					} else {
						this.jc.jmj.motion = Jmj.NORMAL;
					}
					var c = this.jc.patternList.getSelectedIndex();
					if (c != -1) {
						//this.jc.patternList.deselect(c);
						this.jc.isNewChoice();
					} {
						//var d = this.textField.getText().$replace(" ", "");
						var d = this.textField.getText().replace(" ", "");
						if (this.jc.jmj.startJuggling(Jmj.SITESWAP_MODE, d) == false) {
							if (this.didyoumeanList.create(d)) {
								this.popup(JmjDialog.CHOOSE_DID_YOU_MEAN);
							}
							else {
								// 追加
								$.mobile.changePage('#page4_error');							
							}
						}
						else {
							// 追加
							$.mobile.changePage('#page2');
						}
					}
				}
				return;
			}
			break;
		case JmjDialog.CHOOSE_MOTION:
			//if (b === this.motionList || b === this.ok) {
			if (b === 'motionList' || b === this.ok) {
				this.setVisible(false); 
				{
					var i = target.index;
					this.motionList.select(i);
					this.jc.jmj.startJuggling(Jmj.MOTION_MODE, this.motionList.getSelectedItem());
					$.mobile.changePage('#page2');
				}
				return;
			}
			break;
		case JmjDialog.CHOOSE_FORMATION:
			//if (b === this.formationList || b === this.ok) {
			if (b === 'formationList' || b === this.ok) {
				this.setVisible(false);
				var i = target.index;
				this.formationList.select(i);
				if (this.formationList.getSelectedIndex() != -1) {
					this.jc.jmj.formation = this.formationList.getSelectedItem();
				} else {
					this.jc.jmj.formation = Jmj.FORMATION_BASIC;
				} {
					this.jc.jmj.startJuggling(Jmj.FORMATION_MODE, this.jc.jmj.motion);
				}
				$.mobile.changePage('#page2');
				return;
			}
			break;
		case JmjDialog.CHOOSE_ABOUT:
			if (b === this.ok) {
				this.setVisible(false);
				return;
			}
			break;
		case JmjDialog.CHOOSE_DID_YOU_MEAN:
			//if (b === this.didyoumeanList || b === this.ok) {
			if (b === 'didyoumeanList' || b === this.ok) {
				this.setVisible(false);
				//this.jc.jmj.startJuggling(-3, this.didyoumeanList.getSelectedItem());
				var i = target.index;
				var key = target.key;
				//$('#page4_text').val(key);
				this.jc.dialog_text.setText(key);
				this.jc.dialog_text.refresh();
				this.jc.jmj.startJuggling(Jmj.SITESWAP_MODE, this.didyoumeanList.getItem(i));
				$.mobile.changePage('#page2');
				//$('#page4_dialog').dialog('close');
				return;
			}
			break;
		case JmjDialog.SELECT_FILE:
			if (b === 'fileList' || b === this.ok) {
				this.setVisible(false);
				var i = target.index;
				this.fileList.select(i);
				var e = {
					target: {
						id: ''
					}
				};
				loadTextFile(this.fileList.getSelectedItem(), initJmj, e);
				$.mobile.changePage('#page1');
				return;
			}
			break;
	}
	if (b === this.cancel) {
		this.setVisible(false);
	}
};

JmjDialog.prototype.setStatus = function(s) {
	this.status = s;
};

JmjDialog.prototype.setLayout = function(l) {

};

JmjDialog.prototype.setBackground = function(c) {

};

JmjDialog.prototype.setSize = function(w, h) {

};

JmjDialog.prototype.validate = function() {

};

JmjDialog.prototype.setVisible = function(b) {

};

JmjDialog.prototype.repaint = function() {

};

JmjDialog.prototype.add = function(a) {

};

JmjDialog.LOAD_FILE = 1;
JmjDialog.TRY_SITESWAP = 2;
JmjDialog.CHOOSE_MOTION = 3;
JmjDialog.CHOOSE_FORMATION = 4;
JmjDialog.CHOOSE_ABOUT = 5;
JmjDialog.CHOOSE_DID_YOU_MEAN = 6;
JmjDialog.SELECT_FILE = 7;
