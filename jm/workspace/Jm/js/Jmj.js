var Jmj = function() {
	// Field static
	/*
	this.KW = 0.25;
	this.XR = 1024;
	this.DW = 290;
	this.BMAX = 35;
	this.LMAX = 200;
	this.MMAX = 11;
	this.NORMAL = "Normal";
	this.PERMIN = 1;
	this.PERMAX = 10;
	this.iPerNo = 2;
	this.PXY = 30;
	this.IDLE = 0;
	this.PAUSE = 1;
	this.JUGGLING = 2;
	this.SITESWAP_MODE = -3;
	this.MOTION_MODE = -2;
	this.FORMATION_MODE = -1;
	this.Y_OFFSET = 0;
	this.FORMATION_BASIC = "1-Person";
	*/

	// Filed
	this.strVer = "2.13__";
	this.TEST_MODE = false;
	this.redrawrate = 100.0;
	this.iXData = null;
	this.iYData = null;
	this.iMoveX = 0;
	this.iXmin = 0;
	this.iXmax = 0;
	this.imf = null;
	this.controller = null;
	this.holder = null;
	this.kicker = null;
	this.dpm = 0;
	this.hand_x = 0;
	this.hand_y = 0;
	this.arm_x = 0;
	this.arm_y = 0;
	this.gx_max = 0;
	this.gx_min = 0;
	this.tx = 0;
	this.c0 = 0;
	this.status = 0;
	this.ap = null;
	this.gy_max = 0;
	this.gy_min = 0;
	this.ga = 9.8;
	this.dwell = 0;
	this.$height = 0;
	this.speed = 1.0;
	this.$base = 0;
	this.mirror = false;
	this.pattern = null;
	this.siteswap = null;
	this.motion = "Normal";
	this.startpattern = null;
	this.patternfiles = null;
	this.filename = null;
	this.motionarray = null;
	this.motionarray2 = null;
	this.motionlength = null;
	this.motion2 = null;
	this.formationXY = null;
	this.formation = "1-Person";
	this.formationarray = null;
	this.startindex = -1;
	this.fallback_startindex = 0;
	this.time_count = 0;
	this.time_period = 0;
	this.isSync = false;
	this.hand_on = true;
	this.show_ss = true;
	this.intsyn = 0;
	this.rhand = null;
	this.lhand = null;
	this.b = null;
	this.tw = 0;
	this.aw = 0;
	this.ballno = 0;
	this.max_height = 0;
	this.jPerNo = 0;
	this.msg = null;
	this.patt = null;
	this.patts = null;
	this.pattw = 0;
	this.r = null;
	this.high = null;
	this.patt_x = 0;
	this.kw0 = 0;
	this.singless = null;
	this.vsync_Count1 = 0;
	this.color = null;
	this.PM_W = 32;
	this.PM_H = 24;
	this.NCOLOR = 16;
	this.IMAGE_WIDTH = 480;
	this.IMAGE_HEIGHT = 400;
	this.HOR_CENTER = (240);
	this.VER_CENTER = (200);
	this.HOR_MARGIN = 20;
	this.VER_MARGIN = 20;
	this.gg1 = null;
	this.gg2 = null;
	this.bm = null;
	this.r_bm = null;
	this.l_bm = null;
	this.bm_gc = null;
	this.r_bm_gc = null;
	this.l_bm_gc = null;
	this.image_pixmap = null;
	this.image_gc = null;
	this.bm1 = 0;
	this.bm2 = 0;

	// Field Init
	this.iXData = Clazz.newArray(100, 0);
	this.iYData = Clazz.newArray(100, 0);
	this.ap = new Array(10);
	this.motionarray = [13, 0, 4, 0];
	this.motionarray2 = Clazz.newArray(10, 1000, 0);
	// TODO PERMAX
	this.motionlength = Clazz.newArray(10, 0);
	this.motion2 = new Array(10);
	this.formationXY = Clazz.newArray(100, 0);
	this.formationarray = [0, 0];
	this.rhand = new Array(10);
	this.lhand = new Array(10);
	this.b = new Array(35);
	this.msg = new MessageBox();
	this.patt = Clazz.newArray(200, 11, 0);
	this.patts = Clazz.newArray(200, 0);
	this.r = Clazz.newArray(400, 0);
	this.high = Clazz.newArray(36, 0);
	this.singless = new Array(200);
	this.color = [new java.awt.Color(255, 255, 255), new java.awt.Color(80, 80, 80), new java.awt.Color(0, 0, 0), new java.awt.Color(0, 100, 200), new java.awt.Color(200, 0, 100), new java.awt.Color(100, 200, 0), new java.awt.Color(50, 150, 200), new java.awt.Color(200, 50, 150), new java.awt.Color(100, 200, 50), new java.awt.Color(0, 150, 50), new java.awt.Color(50, 0, 150), new java.awt.Color(150, 50, 0), new java.awt.Color(0, 200, 0), new java.awt.Color(255, 200, 0), new java.awt.Color(255, 0, 0), new java.awt.Color(0, 0, 200)];
	this.bm = new Array(16);
	this.r_bm = new Array(16);
	this.l_bm = new Array(16);
	this.bm_gc = new Array(16);
	this.r_bm_gc = new Array(16);
	this.l_bm_gc = new Array(16);
	
	this.data = [0, 18, 0, 23, 17, 23, 20, 22, 22, 20, 23, 17, 23, 12, 18, 12, 18, 16, 16, 18, 0, 18, 12, 15, 23, 17];
}

Jmj.prototype.init = function() {
	var s;
	s = this.getParameter("embed");
	if (s != null && s.equalsIgnoreCase("true")) {
		//( $t$ = Jmj.Y_OFFSET = 0, Jmj.prototype.Y_OFFSET = Jmj.Y_OFFSET, $t$);
		Jmj.Y_OFFSET = 0;
		this.setBackground(java.awt.Color.white);
		this.resize(480, 400 + Jmj.Y_OFFSET + 20);
		this.validate();
		this.setVisible(true);
		this.image_pixmap = this.createImage(480, 420);
		this.image_gc = this.image_pixmap.getGraphics();
	} else {
		//@this.imf = Clazz.innerTypeInstance(Jmj.ImageFrame, this, null, this); 
		this.imf = new Canvas('canvas');
		//( $t$ = Jmj.Y_OFFSET = 20, Jmj.prototype.Y_OFFSET = Jmj.Y_OFFSET, $t$);
		Jmj.Y_OFFSET = 20;
		this.imf.setLayout(null);
		this.imf.setBackground(java.awt.Color.white);
		this.imf.setSize(480, 400 + Jmj.Y_OFFSET + 20);
		this.imf.validate();
		//@var d = this.getToolkit().getScreenSize();
		//@this.imf.setLocation(Math.floor(d.width / 2), 0);
		//@d = null;
		this.imf.setVisible(true);
		this.image_pixmap = this.imf.createImage(480, 420);
		this.image_gc = this.image_pixmap.getGraphics();
	}
	this.holder = new PatternHolder(this);
	var icnt;
	for ( icnt = 0; icnt < 10; icnt++) {
		this.holder.getMotion2("Normal", icnt);
	}
	this.controller = new JmjController(this, this.getParameter("noquit"));
	this.controller.setLocation(0, 0);
	this.controller.setVisible(true);
	this.controller.enableMenuBar();
	for (var i = 0; i < 35; i++) {// PERMAX
		this.b[i] = new Ball();
	}
	//( $t$ = Ball.jmj = this, Ball.prototype.jmj = Ball.jmj, $t$);
	Ball.jmj = this;
	
	var i;
	for ( i = 0; i < 10; i++) {// PERMAX
		this.ap[i] = new Arm();
		this.rhand[i] = new Ball();
		this.lhand[i] = new Ball();
	}
	this.SetXYDummyData();
	this.readParameter();
	if (this.startindex == -1) {
		this.startindex = this.fallback_startindex;
		//this.startJuggling(this.startindex, null);
		//this.controller.patternList.select(this.startindex);
	}
};

Jmj.prototype.stopJuggling = function() {
    if (this.kicker != null) {
    	this.kicker.stop();
        this.kicker = null;
    }
    this.status = Jmj.IDLE;
};

Jmj.prototype.readParameter = function() {
	var s;

	s = this.getParameter("file");
	this.startpattern = this.getParameter("startwith");
	this.patternfiles = this.getParameter("patternfiles");
	if (s != null && s.length != 0) {
		this.openFile(s);
	}
	if (this.startindex >= 0) { {
			this.startJuggling(this.startindex);
		}
		return;
	}
	if (this.startpattern != null && this.startpattern.length > 0) {
		if (!this.startJuggling(-3, this.startpattern)) {
			this.putError("Error in <param> tag with \'startwith\' term.", "Mail this message to the webmaster");
			return;
		}
	}
};

Jmj.prototype.openFile = function(s) {
	var fp = null;
	this.controller.disableSwitches();
	this.stopJuggling();
	this.controller.disableMenuBar();
	this.controller.patternList.removeAll();
	//System.gc();

	fp = new BufferedReader(Clazz.data);
	/*
	 try {
	 var u = new java.net.URL(s);
	 fp = new java.io.BufferedReader(new java.io.InputStreamReader(u.openStream()));
	 } catch (e$$) {
	 if (Clazz.instanceOf(e$$, java.net.MalformedURLException)) {
	 var e1 = e$$;
	 {
	 try {
	 var u = new java.net.URL(this.getCodeBase() + s);
	 fp = new java.io.BufferedReader(new java.io.InputStreamReader(u.openStream()));
	 s = this.getCodeBase() + s;
	 } catch (e$$) {
	 if (Clazz.instanceOf(e$$, java.net.MalformedURLException)) {
	 var e2 = e$$;
	 {
	 try {
	 fp = new java.io.BufferedReader(new java.io.FileReader(s));
	 } catch (e$$) {
	 if (Clazz.instanceOf(e$$, java.io.FileNotFoundException)) {
	 var e3 = e$$;
	 {
	 }
	 } else if (Clazz.instanceOf(e$$, java.io.IOException)) {
	 var e4 = e$$;
	 {
	 }
	 } else {
	 throw e$$;
	 }
	 }
	 }
	 } else if (Clazz.instanceOf(e$$, java.io.IOException)) {
	 var e5 = e$$;
	 {
	 }
	 } else {
	 throw e$$;
	 }
	 }
	 }
	 } else if (Clazz.instanceOf(e$$, java.io.IOException)) {
	 var e6 = e$$;
	 {
	 }
	 } else {
	 throw e$$;
	 }
	 } finally {
	 if (fp == null) {
	 this.putError("File not found or inaccesible URL", s);
	 this.controller.enableMenuBar();
	 return;
	 }
	 }
	 */
	this.controller.putPrimaryMessage("loading" + s);
	try {
		if (!this.holder.setHolder(fp))
			return;
	} finally {
		try {
			fp.close();
		} catch (e) {
			if (Clazz.instanceOf(e, java.io.IOException)) {
			} else {
				throw e;
			}
		}
	}
	this.controller.putMessage("Done loading " + s, "preparing patterns table.wait...");
	this.filename = s;
	for (var i = 0; ; i++) {
		//d = this.holder.nameAt(i);
		var p = this.holder.get(i);
		if (p == null) {
			break;
		}
		s = p.name;
		if (s.length == 0) {
			break;
		}
		var func = function (target) {
    		return function(e) {
        		target.controller.actionPerformedForPatternList(e);
    		};
		}(this);
		this.controller.patternList.add('patternList', i, s, func, p.isPattern);
	}
	this.controller.patternList.add(null, 0, '', func, false);
	this.controller.patternList.validate();
	this.controller.enableSwitches();
	this.controller.putMessage("", "");
	this.controller.enableMenuBar();
	this.controller.setSpeed(this.speed);
	this.controller.setIfShowBody(this.hand_on);
	this.controller.setIfShowSiteSwap(this.show_ss);
	this.controller.setIfMirror(this.mirror);
	this.controller.setPerno(Jmj.iPerNo);
	this.controller.patternList.select(this.startindex);
	//System.gc();
};

Jmj.prototype.set_dpm = function() {
	var i;
	this.speed = 2;
	this.$base = 0;
	this.dpm = 400;
	this.gy_max = -20000;
	this.gy_min = 20000;
	this.gx_max = -20000;
	this.gx_min = 20000;
	this.iMoveX = 0;
	if (!this.pattInitialize())
		return;
	this.set_xmin_xmax();
	if (this.gy_max - this.gy_min > 0) {
		this.dpm = Math.round((136000.0 / (this.gy_max - this.gy_min)));
		if (this.dpm > 290) {
			this.dpm = 290;
		}
		var xdpm = (480 - this.HOR_MARGIN * 2) / (this.gx_max - this.gx_min);
		if (xdpm > 1)
			xdpm = 1;
		this.dpm = Math.min(Math.round((xdpm * 290)), this.dpm);
		this.gx_min = Math.floor(this.gx_min * 290 / 400);
		this.gx_max = Math.floor(this.gx_max * 290 / 400);
		this.iXmax = Math.floor((this.gx_max - this.gx_min) * this.dpm / (580)) + 240;
		this.iXmin = 480 - this.iXmax;
		var DPM = this.dpm / 290;
		this.iMoveX = 240 - Math.floor(Math.floor((this.gx_max + this.gx_min) / 2) * this.dpm / 290);
		this.$base = Math.round((370 - this.gy_max * this.dpm / 400));
	}
};

Jmj.prototype.set_xmin_xmax = function() {
	var i;
	for (this.time_count = 0; this.time_count < this.tw * (this.pattw + this.max_height + (Math.floor(this.motionarray.length / 4))); this.time_count++) {
		for ( i = 0; i < this.ballno; i++) {
			this.b[i].juggle();
			this.gy_max = Math.max(this.gy_max, this.b[i].gy);
			this.gy_min = Math.min(this.gy_min, this.b[i].gy);
			this.gx_max = Math.max(this.gx_max, this.b[i].gx);
			this.gx_min = Math.min(this.gx_min, this.b[i].gx);
		}
		for (this.jPerNo = 0; this.jPerNo < Jmj.iPerNo; this.jPerNo++) {
			this.rhand[this.jPerNo].juggle();
			this.lhand[this.jPerNo].juggle();
			this.gy_max = Math.max(this.gy_max, this.rhand[this.jPerNo].gy);
			this.gy_min = Math.min(this.gy_min, this.rhand[this.jPerNo].gy);
			this.gy_max = Math.max(this.gy_max, this.lhand[this.jPerNo].gy);
			this.gy_min = Math.min(this.gy_min, this.lhand[this.jPerNo].gy);
			this.gx_max = Math.max(this.gx_max, this.rhand[this.jPerNo].gx);
			this.gx_min = Math.min(this.gx_min, this.rhand[this.jPerNo].gx);
			this.gx_max = Math.max(this.gx_max, this.lhand[this.jPerNo].gx);
			this.gx_min = Math.min(this.gx_min, this.lhand[this.jPerNo].gx);
			this.ap[this.jPerNo].rx[0] = this.rhand[this.jPerNo].gx + 11 + this.arm_x;
			this.ap[this.jPerNo].ry[0] = this.rhand[this.jPerNo].gy + 11 + this.arm_y;
			this.ap[this.jPerNo].lx[0] = this.lhand[this.jPerNo].gx + 11 - this.arm_x;
			this.ap[this.jPerNo].ly[0] = this.lhand[this.jPerNo].gy + 11 + this.arm_y;
			this.arm_line(this.jPerNo);
			for ( i = 0; i < 5; i++) {
				this.gx_max = Math.max(this.gx_max, this.ap[this.jPerNo].rx[i]);
				this.gx_max = Math.max(this.gx_max, this.ap[this.jPerNo].lx[i]);
				this.gx_min = Math.min(this.gx_min, this.ap[this.jPerNo].rx[i]);
				this.gx_min = Math.min(this.gx_min, this.ap[this.jPerNo].lx[i]);
				this.gy_max = Math.max(this.gy_max, this.ap[this.jPerNo].ry[i]);
				this.gy_max = Math.max(this.gy_max, this.ap[this.jPerNo].ly[i]);
				this.gy_min = Math.min(this.gy_min, this.ap[this.jPerNo].ry[i]);
				this.gy_min = Math.min(this.gy_min, this.ap[this.jPerNo].ly[i]);
			}
		}
	}
};

Jmj.prototype.arm_line = function(j) {
	var mx;
	var my;
	var k;
	var sx;
	var sy;
	var iXhosei = 0;
	var iYhosei = 0;
	if (this.mirror == false) {
		iXhosei = Math.floor(this.iXData[j] * this.dpm / 30);
	} else {
		iXhosei = Math.floor(-this.iXData[j] * this.dpm / 30);
	}
	iYhosei = Math.floor(this.iYData[j] * this.dpm / 30);
	sx = (Math.floor(this.dpm * 1024 / this.kw0));
	sy = this.$base - Math.floor(this.dpm / 3) - iYhosei;
	this.ap[j].rx[1] = Math.floor((this.ap[j].rx[0] + (iXhosei + sx) * 2) / 3) + Math.floor(this.dpm / 12);
	this.ap[j].lx[1] = Math.floor((this.ap[j].lx[0] + (iXhosei - sx) * 2) / 3) - Math.floor(this.dpm / 12);
	this.ap[j].ry[1] = Math.floor((this.ap[j].ry[0] + sy) / 2) + Math.floor(this.dpm / 8);
	this.ap[j].ly[1] = Math.floor((this.ap[j].ly[0] + sy) / 2) + Math.floor(this.dpm / 8);
	this.ap[j].rx[2] = Math.floor((this.ap[j].rx[1] + (iXhosei + sx) * 3) / 4);
	this.ap[j].lx[2] = Math.floor((this.ap[j].lx[1] + (iXhosei - sx) * 3) / 4);
	this.ap[j].ry[2] = Math.floor((this.ap[j].ry[1] + sy * 2) / 3) - Math.floor(this.dpm / 25);
	this.ap[j].ly[2] = Math.floor((this.ap[j].ly[1] + sy * 2) / 3) - Math.floor(this.dpm / 25);
	this.ap[j].rx[3] = Math.floor((this.ap[j].rx[2] + (iXhosei + sx) * 2) / 3) - Math.floor(this.dpm / 13);
	this.ap[j].lx[3] = Math.floor((this.ap[j].lx[2] + (iXhosei - sx) * 2) / 3) + Math.floor(this.dpm / 13);
	this.ap[j].ry[3] = Math.floor((this.ap[j].ry[2] + sy * 2) / 3) - Math.floor(this.dpm / 40);
	this.ap[j].ly[3] = Math.floor((this.ap[j].ly[2] + sy * 2) / 3) - Math.floor(this.dpm / 40);
	mx = Math.floor((this.ap[j].rx[3] + this.ap[j].lx[3]) / 2);
	my = Math.floor((this.ap[j].ry[3] + this.ap[j].ly[3]) / 2);
	this.ap[j].rx[4] = Math.floor((mx * 2 + this.ap[j].rx[3]) / 3);
	this.ap[j].lx[4] = Math.floor((mx * 2 + this.ap[j].lx[3]) / 3);
	this.ap[j].ry[4] = Math.floor((my * 2 + this.ap[j].ry[3]) / 3);
	this.ap[j].ly[4] = Math.floor((my * 2 + this.ap[j].ly[3]) / 3);
	this.ap[j].hx = mx;
	this.ap[j].hy = Math.floor((my * 2 - Math.floor(this.dpm * 2 / 3) + this.$base - iYhosei) / 3);
	this.ap[j].hr = Math.floor(this.dpm / 11);
	this.ap[j].rx[5] = this.ap[j].hx + Math.floor(this.dpm / 20);
	this.ap[j].lx[5] = this.ap[j].hx - Math.floor(this.dpm / 20);
	this.ap[j].ry[5] = this.ap[j].hy + Math.floor(this.dpm / 13);
	this.ap[j].ly[5] = this.ap[j].ry[5];
};

Jmj.prototype.pattInitialize = function() {
	var i;
	var j;
	var k;
	var tw0;
	var aw0;
	this.ballno = 0;
	this.max_height = 0;
	for ( i = 0; i < this.pattw; i++) {
		for ( j = 0; j < this.patts[i]; j++) {
			this.ballno += Math.abs(this.patt[i][j]);
			this.max_height = Math.max(this.max_height, Math.abs(this.patt[i][j]));
		}
	}
	if (this.ballno % this.pattw != 0) {
		System.out.println("ballno % pattw != 0");
		return false;
	}
	this.ballno /= this.pattw;
	if (this.ballno > 35) {
		System.out.println("Too many balls");
		return false;
	}
	for ( i = 0; i < 400; i++) {
		this.r[i] = 0;
	}
	for ( i = 0; i <= this.ballno; i++) {
		j = 0;
		while (this.r[j] == this.patts[j % this.pattw] && j < this.pattw + this.max_height) {
			j++;
		}
		if (i == this.ballno) {
			if (j == this.pattw + this.max_height) {
				break;
			} else {
				System.out.println("Mulitplex error");
				return false;
			}
		}
		this.b[i].st = 0;
		if (this.mirror) {
			if ((j + this.intsyn) % 2 != 0) {
				this.b[i].thand = 1;
				this.b[i].chand = 1;
			} else {
				this.b[i].thand = 0;
				this.b[i].chand = 0;
			}
		} else {
			if ((j + this.intsyn) % 2 != 0) {
				this.b[i].thand = 0;
				this.b[i].chand = 0;
			} else {
				this.b[i].thand = 1;
				this.b[i].chand = 1;
			}
		}
		if (this.isSync) {
			this.b[i].c = -((Math.floor(j / 2))) * 2;
		} else {
			this.b[i].c = -j;
		}
		while (j < this.pattw + this.max_height) {
			if (this.r[j] == this.patts[j % this.pattw]) {
				return false;
			} else {
				this.r[j]++;
			}
			k = this.patt[j % this.pattw][this.patts[j % this.pattw] - this.r[j]];
			if (this.isSync && k < 0) {
				if (j % 2 == 0) {
					j += -k + 1;
				} else {
					j += -k - 1;
				}
			} else {
				j += k;
			}
		}
	}
	if (this.max_height < 3) {
		this.max_height = 3;
	}
	tw0 = Math.sqrt(2 / this.ga * this.max_height * this.$height) * 2 / (this.max_height - this.dwell * 2) * 100.0 / this.speed;
	this.tw = Math.round(this.fadd(tw0, 0));
	if (this.tw == 0) {
		System.out.println("tw = 0");
		return false;
	}
	aw0 = tw0 * this.dwell * 2;
	this.aw = Math.round(this.fadd(aw0, 0));
	if (this.aw < 1) {
		this.aw = 1;
	}
	if (this.aw > this.tw * 2 - 1) {
		this.aw = this.tw * 2 - 1;
	}
	this.patt_x = 30 - Math.floor(this.siteswap.length / 2);
	this.kw0 = Math.round((4096.0));
	this.high[0] = -0.2 * this.dpm;
	this.high[1] = Math.round((this.ga * this.square(tw0 / 100.0 * this.speed) / 8 * this.dpm));
	for ( i = 2; i <= this.max_height; i++) {
		this.high[i] = Math.round((this.ga * this.square((tw0 * i - aw0) / 100.0 * this.speed) / 8 * this.dpm));
	}
	for ( i = 0; i < this.ballno; i++) {
		this.b[i].bh = 0;
		this.b[i].gx = 0;
		this.b[i].gy = 200;
		this.b[i].gx0 = 0;
		this.b[i].gy0 = 200;
		this.b[i].gx1 = 0;
		this.b[i].gy1 = 200;
	}
	for (this.jPerNo = 0; this.jPerNo < Jmj.iPerNo; this.jPerNo++) {
		if (this.mirror) {
			this.lhand[this.jPerNo].c = 0;
			if (this.isSync) {
				this.rhand[this.jPerNo].c = 0;
			} else {
				this.rhand[this.jPerNo].c = -1;
			}
		} else {
			this.rhand[this.jPerNo].c = 0;
			if (this.isSync) {
				this.lhand[this.jPerNo].c = 0;
			} else {
				this.lhand[this.jPerNo].c = -1;
			}
		}
		this.rhand[this.jPerNo].bh = 2;
		this.rhand[this.jPerNo].st = 1;
		this.rhand[this.jPerNo].thand = 1;
		this.rhand[this.jPerNo].chand = 1;
		this.rhand[this.jPerNo].gx = 0;
		this.rhand[this.jPerNo].gy = 200;
		this.rhand[this.jPerNo].gx0 = 0;
		this.rhand[this.jPerNo].gy0 = 200;
		this.rhand[this.jPerNo].gx1 = 0;
		this.rhand[this.jPerNo].gy1 = 200;
		this.lhand[this.jPerNo].bh = 2;
		this.lhand[this.jPerNo].st = 1;
		this.lhand[this.jPerNo].thand = 0;
		this.lhand[this.jPerNo].chand = 0;
		this.lhand[this.jPerNo].gx = 0;
		this.lhand[this.jPerNo].gy = 200;
		this.lhand[this.jPerNo].gx0 = 0;
		this.lhand[this.jPerNo].gy0 = 200;
		this.lhand[this.jPerNo].gx1 = 0;
		this.lhand[this.jPerNo].gy1 = 200;
	}
	for ( i = 0; i < 400; i++) {
		this.r[i] = 0;
	}
	return true;
};

Jmj.prototype.square = function(x) {
	return x * x;
};

Jmj.prototype.getSingless = function(i) {
	var p = Clazz.newArray(256, 0);
	var j;
	var t;
	var index = 0;
	if (this.isSync) {
		p[index++] = '(';
	}
	for ( t = 0; t <= this.intsyn; t++) {
		if (t != 0) {
			p[index++] = ',';
		}
		if (this.patts[i] == 0) {
			p[index++] = '0';
		} else {
			if (this.patts[i] > 1) {
				p[index++] = '[';
			}
			for ( j = 0; j < this.patts[i]; j++) {
				if (Math.abs(this.patt[i][j]) < 10) {
					p[index++] = String.fromCharCode((('0').charCodeAt(0) + Math.abs(this.patt[i][j])));
				} else {
					p[index++] = String.fromCharCode((('a').charCodeAt(0) + Math.abs(this.patt[i][j]) - 10));
				}
				if (this.patt[i][j] < 0) {
					p[index++] = 'x';
				}
			}
			if (this.patts[i] > 1) {
				p[index++] = ']';
			}
		}
		i++;
	}
	if (this.isSync) {
		p[index++] = ')';
	}
	
	//return String.instantialize(p, 0, index);
	var s = "";
	for (var i = 0; i < index; i++){
		//s += String.fromCharCode(p[i]);
		s += p[i];
	}
	return s;
};

//Jmj.prototype.patt_print = function(mode_) {
Jmj.prototype.patt_print = function(mode_, isUpdate) {
	var i;
	var c;
	if (mode_ == 1) {
		//if (this.pattw > this.c0 && this.pattw > this.intsyn + 1) {
			//this.drawSiteswap(this.patt_x + this.tx, this.singless[this.c0], false);
			//this.tx += this.singless[this.c0].length;
		//}
		//c = this.time_period;
		//if (c <= this.c0) {
		//	this.tx = 0;
		//}
		//this.drawSiteswap(this.patt_x + this.tx, this.singless[c], true);
		//this.c0 = c;
		this.drawSiteswap(this.patt_x + this.tx, this.singless[this.c0], true);
		if (isUpdate){
			this.tx += this.singless[this.c0].length;
			this.c0 += 1 + this.intsyn;;
			if (this.c0 > this.time_period){
				this.c0 = 0;
				this.tx = 0;
			}
		}
		return;
	}
	if (mode_ == 0) {
		// this.tx = 0;
		//for ( i = 0; i < this.pattw; i += this.intsyn + 1) {
		//	this.drawSiteswap(this.patt_x + this.tx, this.singless[i], false);
		//	this.tx += this.singless[i].length;
		//}
		//this.c0 = this.pattw;
		var x = 0;
		for ( i = 0; i < this.pattw; i += this.intsyn + 1) {
			this.drawSiteswap(this.patt_x + x, this.singless[i], false);
			x += this.singless[i].length;
		}
	}
};

Jmj.prototype.chooseTrickByName = function(trickName) {
	var i;
	if (trickName == null || trickName.length == 0) {
		return;
	}
	if (this.holder != null) {
		i = this.holder.chooseTrickByName(trickName);
		if (i != -1) {
			this.startJuggling(i, trickName);
		}
	}
};

var self = null; // 手抜き

Jmj.prototype.startJuggling = function(index, s) {
	if (arguments.length < 2) {
		s = null;
	}

	var i;
	var iCnt;
	this.stopJuggling();
	this.clearImage();
	this.speed = this.controller.getSpeed();
	this.mirror = this.controller.ifMirror();
	this.show_ss = this.controller.ifShowSiteSwap();
	this.hand_on = this.controller.ifShowBody();
	//( $t$ = Jmj.iPerNo = this.controller.getPerNo(), Jmj.prototype.iPerNo = Jmj.iPerNo, $t$);
	Jmj.iPerNo = this.controller.getPerNo();
	if (this.controller.isNewChoice() || index == -3) {
		if (index == -3) {
			this.holder.getPattern(s);
			this.$height = this.controller.GetHeight_();
			this.dwell = this.controller.getDwell();
			for ( iCnt = 0; iCnt < Jmj.iPerNo; iCnt++) {
				this.motion2[iCnt] = this.motion;
			}
		} else {
			if (index == -1 || !this.holder.isPattern(index))
				return false;
			this.holder.getPattern(index);
			var strs = "";
			var icnt;
			for ( icnt = 0; icnt < 10; icnt++) {
				strs += "motion2[" + icnt + "] = " + this.motion2[icnt] + "\n";
			}
			strs += "Formation : " + this.formation + "\n";
			strs += "Pattern : " + this.pattern + "\n";
			strs += "Motion : " + this.motion + "\n";
		}
		this.holder.getMotion(this.motion);
		for ( iCnt = 0; iCnt < 10; iCnt++) {
			this.holder.getMotion2(this.motion2[iCnt], iCnt);
		}
		this.holder.getFormation(this.formation);
		//( $t$ = Jmj.iPerNo = Jmj.iPerMax, Jmj.prototype.iPerNo = Jmj.iPerNo, $t$);
		Jmj.iPerNo = Jmj.iPerMax;
		this.controller.setPerno(Jmj.iPerNo);
		if (this.isSync) {
			this.intsyn = 1;
		} else {
			this.intsyn = 0;
		}
		this.siteswap = "";
		for ( i = 0; i < this.pattw; i += this.intsyn + 1) {
			this.singless[i] = this.getSingless(i);
			this.siteswap = this.siteswap + this.singless[i];
		}
		this.set_dpm();
		this.speed = this.controller.getSpeed();
		if (this.pattInitialize()) {
			this.removeErrorMessage();
		} else {
			if (index != -3)
				this.holder.invalidate(index);
			this.putError("Wrong siteswap", this.pattern);
			return false;
		}
		this.controller.enableSwitches();
		this.controller.setHeight(this.$height);
		this.controller.setDwell(this.dwell);
	} else {
		this.$height = this.controller.GetHeight_();
		this.dwell = this.controller.getDwell();
		if (index == -2) {
			this.motion = s;
			this.holder.getMotion(s);
			for ( iCnt = 0; iCnt < 10; iCnt++) {
				this.holder.getMotion2(this.motion, iCnt);
			}
			this.holder.getFormation(this.formation);
			//( $t$ = Jmj.iPerNo = Jmj.iPerMax, Jmj.prototype.iPerNo = Jmj.iPerNo, $t$);
			Jmj.iPerNo = Jmj.iPerMax;
			this.controller.setPerno(Jmj.iPerNo);
			this.controller.setLabels();
		} else if (index == -1 && s != null) {
			this.motion = s;
			this.holder.getMotion(s);
			this.holder.getFormation(this.formation);
			//( $t$ = Jmj.iPerNo = Jmj.iPerMax, Jmj.prototype.iPerNo = Jmj.iPerNo, $t$);
			Jmj.iPerNo = Jmj.iPerMax;
			this.controller.setPerno(Jmj.iPerNo);
			this.controller.setLabels();
		}
		else if (s != null && s.length == 0 && index >= 0){
			// Java版には無い
			// 前回と同じパターンを選択した場合
			Jmj.iPerNo = Jmj.iPerMax;
			this.holder.getPattern(index);
			this.controller.setPerno(Jmj.iPerNo);
			this.controller.setLabels();
			this.controller.setHeight(this.$height);
			this.controller.setDwell(this.dwell);		
		}
		this.set_dpm();
		this.speed = this.controller.getSpeed();
		this.pattInitialize();
	}
	if (this.show_ss) {
		this.patt_print(0);
	}
	this.controller.setLabels();
	this.initBallGraphics();
	this.initGraphics();
	this.time_count = 0;
	this.time_period = 0;
	//this.kicker = new Thread(this);
	this.kicker = new Thread(this, Jmj.prototype.run, 1000 / this.redrawrate);
	this.kicker.start();
	self = this;
	this.status = 2;
	return true;
};

Jmj.prototype.run = function() {
	if (self.kicker != null){
		self.do_juggle();
		self.count_up_timer();
	}
};

Jmj.prototype.do_juggle = function() {
	var i;
	if (this.status == 1 || this.status == 0) {
		this.vsync_Count1 = 0;
		return ;
	}
	this.time_count += this.vsync_Count1;
	this.vsync_Count1 = 0;
	if (this.time_count < this.aw) {
		this.time_count = this.aw;
	}
	this.time_period = (Math.floor ((this.time_count - this.aw) / this.tw));
	this.time_period %= this.pattw;
	this.drawStatus ();
	for (i = 0; i < this.ballno; i++) {
		this.b[i].juggle ();
	}
	var iCnt = 0;
	for (this.jPerNo = 0; this.jPerNo < Jmj.iPerNo; this.jPerNo++) {
		iCnt += this.rhand[this.jPerNo].juggle () + this.lhand[this.jPerNo].juggle ();
	}
	//if (iCnt > 0) {
	//	if (this.show_ss) {
	//		this.patt_print (1);
	//	}
	//}
	this.eraseBalls ();
	if (this.show_ss) {
		this.patt_print(0);
		this.patt_print(1, iCnt > 0);
	}
	for (var jPerNo = 0; jPerNo < Jmj.iPerNo; jPerNo++) {
		this.ap[jPerNo].rx[0] = this.rhand[jPerNo].gx + 11 + this.arm_x;
		this.ap[jPerNo].ry[0] = this.rhand[jPerNo].gy + 11 + this.arm_y;
		this.ap[jPerNo].lx[0] = this.lhand[jPerNo].gx + 11 - this.arm_x;
		this.ap[jPerNo].ly[0] = this.lhand[jPerNo].gy + 11 + this.arm_y;
		this.arm_line (jPerNo);
	}
	this.putBalls ();
	if (this.imf != null) {
		this.imf.repaint ();
	} else {
		this.repaint ();
	}
};

Jmj.prototype.count_up_timer = function() {
	this.vsync_Count1++;
};

Jmj.prototype.removeErrorMessage = function() {
	this.controller.putMessage ("", "");
};

Jmj.prototype.putError = function(s1, s2) {

};

Jmj.prototype.fadd = function(t, x) {
	return (Math.floor (t * Math.pow (10, x) + .5) / Math.pow (10, x));
};

Jmj.prototype.update = function(g) {
	this.paint (g);
};

Jmj.prototype.paint = function(g) {
	if (this.gg1 != null) {
		this.gg1.drawImage (this.image_pixmap, 0, 0, null);
	}
	if (this.gg2 != null) {
		this.gg2.drawImage (this.image_pixmap, 20 - this.iXmin, -20, null);
	}
};

Jmj.prototype.initGraphics = function() {
	var g;

	if (this.imf != null) {
		g = this.imf.getGraphics ();
	} else {
		g = this.getGraphics ();
	}if (this.gg1 != null) {
		this.gg1.dispose ();
	}
	this.gg1 = g.create (0, Jmj.Y_OFFSET, 480, 20);
	if (this.gg2 != null) {
		this.gg2.dispose ();
	}
	this.gg2 = g.create (this.iXmin - 20, 20 + Jmj.Y_OFFSET, this.iXmax - this.iXmin + 41, 380);
	g.dispose ();
};

Jmj.prototype.disposeGraphics = function() {
	if (this.image_gc != null) {
		this.image_gc.dispose ();
	}
	try {
		for (var i = 0; i < 16; i++) {
			this.bm_gc[i].dispose ();
			this.r_bm_gc[i].dispose ();
			this.l_bm_gc[i].dispose ();
		}
	} catch (e) {
		if (Clazz.instanceOf (e, Throwable)) {

		} else {
			throw e;
		}
	}
	if (this.gg1 != null) {
		this.gg1.dispose ();
	}
	if (this.gg2 != null) {
		this.gg2.dispose ();
	}
};

Jmj.prototype.drawSiteswap = function(x, str, is_red) {
	if (this.image_gc == null) return ;
	if (is_red) {
		this.image_gc.setColor (java.awt.Color.red);
	} else {
		this.image_gc.setColor (java.awt.Color.black);
	}
	this.image_gc.drawString (str, x * 8, 20);
};
	
Jmj.prototype.drawBall = function(bm, x, y, hand, color) {
	if (x < -this.iMoveX || x > 480 - this.iMoveX || y < 0 || y > 376) {
		return ;
	}
/* Java版では、イメージのコピーで描画しているが、手抜きして直接描画している
	var g = this.image_gc.create (this.fx (x + this.bm1), y + this.bm1, this.bm2 - this.bm1 + 1, this.bm2 - this.bm1 + 1);
	g.drawImage (bm, -this.bm1, -this.bm1, null);
	g.dispose ();
*/
	this.image_gc.setColor(color);
	if (hand == 0){
		var r = Math.floor(11 * this.dpm / Jmj.DW);
		x = this.fx(x + this.bm1);
		y += this.bm1;
		this.image_gc.fillOval(x, y, r * 2, r * 2);
		//this.image_gc.fillRect(x, y, x + r * 2, y + r * 2);
	}
	else {
		var data = clone(this.data);
	
		var i;
		for (i = 0; i < data.length; i++) {
			data[i] = Math.floor ((data[i] - 11) * this.dpm / 290);
		}
		this.hand_x = data[i - 4] + 2;
		this.hand_y = data[i - 3] + 2;
		this.arm_x = data[i - 2];
		this.arm_y = data[i - 1];
		
		x = this.fx(x);
		
		for (i = 0; i + 6 < data.length; i += 2) {
			//this.r_bm_gc[1].setColor (this.color[1]);
			//this.r_bm_gc[1].drawLine (11 + data[i], 10 + data[i + 1], 11 + data[i + 2], 10 + data[i + 3]);
			//this.l_bm_gc[1].setColor (this.color[1]);
			//this.l_bm_gc[1].drawLine (12 - data[i], 10 + data[i + 1], 12 - data[i + 2], 10 + data[i + 3]);
			if (hand == 1){
				this.image_gc.drawLine (x + 11 + data[i], y + 10 + data[i + 1], x + 11 + data[i + 2], y + 10 + data[i + 3]);
			}
			else {
				this.image_gc.drawLine (x + 12 - data[i], y + 10 + data[i + 1], x + 12 - data[i + 2], y + 10 + data[i + 3]);
			}
		}	
	}
};

Jmj.prototype.drawLine = function(x1, y1, x2, y2) {
	this.image_gc.drawLine (this.fx (x1), y1, this.fx (x2), y2);
};

Jmj.prototype.drawCircle = function(x, y, r) {
	this.image_gc.drawOval (this.fx (x - r), y - r, 2 * r, 2 * r);
};
	
Jmj.prototype.fillBox = function(x1_b, y1, x2_b, y2) {
	this.image_gc.fillRect (this.fx ((x1_b - (x2_b - x1_b)) * 8), y1, (x2_b - x1_b + 1) * 8 * 2, y2 - y1 + 1);
};

Jmj.prototype.initBallGraphics = function() {
	var i;
	var data = clone(this.data);
/*	
	if (this.bm[0] == null) {
		if (this.imf != null) {
			this.l_bm[1] = this.imf.createImage (32, 24);
			this.r_bm[1] = this.imf.createImage (32, 24);
		} else {
			this.l_bm[1] = this.createImage (32, 24);
			this.r_bm[1] = this.createImage (32, 24);
		}
		this.l_bm_gc[1] = this.l_bm[1].getGraphics ();
		this.r_bm_gc[1] = this.r_bm[1].getGraphics ();
		for (i = 0; i < 16; i++) {
			if (this.imf != null) {
				this.bm[i] = this.imf.createImage (32, 24);
			} else {
				this.bm[i] = this.createImage (32, 24);
			}
			this.bm_gc[i] = this.bm[i].getGraphics ();
			this.l_bm[i] = this.l_bm[1];
			this.l_bm_gc[i] = this.l_bm_gc[1];
			this.r_bm[i] = this.r_bm[1];
			this.r_bm_gc[i] = this.r_bm_gc[1];
		}
	}
	for (i = 0; i < 16; i++) {
		this.bm_gc[i].setColor (java.awt.Color.white);
		this.bm_gc[i].fillRect (0, 0, 32, 24);
	}
	this.l_bm_gc[1].setColor (java.awt.Color.white);
	this.l_bm_gc[1].fillRect (0, 0, 32, 24);
	this.r_bm_gc[1].setColor (java.awt.Color.white);
	this.r_bm_gc[1].fillRect (0, 0, 32, 24);
*/
	for (i = 0; i < data.length; i++) {
		data[i] = Math.floor ((data[i] - 11) * this.dpm / 290);
	}
	this.hand_x = data[i - 4] + 2;
	this.hand_y = data[i - 3] + 2;
	this.arm_x = data[i - 2];
	this.arm_y = data[i - 1];
/*
	for (i = 0; i + 6 < data.length; i += 2) {
		this.r_bm_gc[1].setColor (this.color[1]);
		this.r_bm_gc[1].drawLine (11 + data[i], 10 + data[i + 1], 11 + data[i + 2], 10 + data[i + 3]);
		this.l_bm_gc[1].setColor (this.color[1]);
		this.l_bm_gc[1].drawLine (12 - data[i], 10 + data[i + 1], 12 - data[i + 2], 10 + data[i + 3]);
	}
	var r = Math.floor (11 * this.dpm / 290);
	for (i = 0; i < 16; i++) {
		this.bm_gc[i].setColor (this.color[i]);
		this.bm_gc[i].fillOval (11 - r, 11 - r, 2 * r, 2 * r);
	}
*/
	this.bm1 = 11 - Math.floor (11 * this.dpm / 290);
	this.bm2 = 11 + Math.floor (11 * this.dpm / 290) + 1;
};
	
Jmj.prototype.clearImage = function() {
	this.image_gc.setColor(this.color[0]);
	this.image_gc.clearRect(0, 0, 480, 400); // TODO

	var g;
	if (this.imf != null) {
		g = this.imf.getGraphics ();
	} else {
		g = this.getGraphics ();
	}
	g.drawImage (this.image_pixmap, 0, 0, 480, 400, null);
	g.dispose ();
};

Jmj.prototype.eraseBalls = function() {
	var i;
	var j;

	// 全体を消す
	this.image_gc.clearRect(0, 0, 480, 400); // TODO
	return;
/*
	this.image_gc.setColor (this.color[0]);
	if (this.hand_on) {
		for (j = 0; j < Jmj.iPerNo; j++) {
			for (i = 0; i < 5; i++) {
				this.drawLine (this.ap[j].rx[i], this.ap[j].ry[i], this.ap[j].rx[i + 1], this.ap[j].ry[i + 1]);
				this.drawLine (this.ap[j].lx[i], this.ap[j].ly[i], this.ap[j].lx[i + 1], this.ap[j].ly[i + 1]);
			}
			this.drawCircle (this.ap[j].hx, this.ap[j].hy, this.ap[j].hr);
			this.fillBox (Math.floor (this.rhand[j].gx0 / 8), this.rhand[j].gy0 + this.bm1, Math.floor (this.rhand[j].gx0 / 8) + 3, this.rhand[j].gy0 + this.bm2);
			this.fillBox (Math.floor (this.lhand[j].gx0 / 8), this.lhand[j].gy0 + this.bm1, Math.floor (this.lhand[j].gx0 / 8) + 3, this.lhand[j].gy0 + this.bm2);
		}
	}
	for (i = this.ballno - 1; i >= 0; i--) {
		this.fillBox (Math.floor (this.b[i].gx0 / 8), this.b[i].gy0 + this.bm1, Math.floor (this.b[i].gx0 / 8) + 3, this.b[i].gy0 + this.bm2);
	}
	return ;
*/
};

Jmj.prototype.putBalls = function() {
	var i;
	var j;

	if (this.hand_on) {
		this.image_gc.setColor (this.color[1]);
		for (j = 0; j < Jmj.iPerNo; j++) {
			this.drawBall (this.r_bm[1], this.rhand[j].gx, this.rhand[j].gy, 1, this.color[1]);
			this.drawBall (this.l_bm[1], this.lhand[j].gx, this.lhand[j].gy, 2, this.color[1]);
			for (i = 0; i < 5; i++) {
				this.drawLine (this.ap[j].rx[i], this.ap[j].ry[i], this.ap[j].rx[i + 1], this.ap[j].ry[i + 1]);
				this.drawLine (this.ap[j].lx[i], this.ap[j].ly[i], this.ap[j].lx[i + 1], this.ap[j].ly[i + 1]);
			}
			this.drawCircle (this.ap[j].hx, this.ap[j].hy, this.ap[j].hr);
		}
	}
	for (i = this.ballno - 1; i >= 0; i--) {
		this.drawBall (this.bm[15 - i % 13], this.b[i].gx, this.b[i].gy, 0, this.getColor(i));
	}
};

Jmj.prototype.MessageBox = function(str) {

};

Jmj.prototype.SetXYDummyData = function() {
	var iXDummy = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270];
	var iYDummy = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var iCnt;
	for ( iCnt = 0; iCnt < 10; iCnt++) {
		this.iXData[iCnt] = iXDummy[iCnt];
		this.iYData[iCnt] = iYDummy[iCnt];
	}
	return;
};

Jmj.prototype.fx = function(x) {
	return x + this.iMoveX;
};

Jmj.prototype.drawStatus = function() {
	var iSt =  Clazz.newArray (7, 21, 0);
	var iCnt;
	var iCnt2;
	var strTmp;
	var strSts = ["OBJECT_HAND ", "OBJECT_MOVE ", "OBJECT_MOVE2", "OBJECT_UNDER", "b[0]tP,cP,c ", "b[1]tP,cP,c ", "b[2]tP,cP,c "];

	if (this.TEST_MODE == false) return ;
	if (this.image_gc == null) return ;
	this.image_gc.drawString ("0ABCDEFGHIJKLMNOPQRSTUVWXYZ1ABCDEFGHIJKLMNOPQRSTUVWXYZ2ABCDEFGHIJKLMNOPQRSTUVWXYZ3ABCDEFGHIJKLMNOPQRSTUVWXYZ4ABCDEFGHIJKLMNOPQRSTUVWXYZ5ABCDEFGHIJKLMNOPQRSTUVWXYZ", 0, 20);
	for (iCnt = 0; iCnt < Jmj.iPerNo; iCnt++) {
		iSt[0][iCnt * 2] = Math.floor ((this.lhand[Jmj.iPerNo - iCnt - 1].st & this.b[0].OBJECT_HAND) / this.b[0].OBJECT_HAND);
		iSt[0][iCnt * 2 + 1] = Math.floor ((this.rhand[Jmj.iPerNo - iCnt - 1].st & this.b[0].OBJECT_HAND) / this.b[0].OBJECT_HAND);
		iSt[1][iCnt * 2] = Math.floor ((this.lhand[Jmj.iPerNo - iCnt - 1].st & this.b[0].OBJECT_MOVE) / this.b[0].OBJECT_MOVE);
		iSt[1][iCnt * 2 + 1] = Math.floor ((this.rhand[Jmj.iPerNo - iCnt - 1].st & this.b[0].OBJECT_MOVE) / this.b[0].OBJECT_MOVE);
		iSt[2][iCnt * 2] = Math.floor ((this.lhand[Jmj.iPerNo - iCnt - 1].st & this.b[0].OBJECT_MOVE2) / this.b[0].OBJECT_MOVE);
		iSt[2][iCnt * 2 + 1] = Math.floor ((this.rhand[Jmj.iPerNo - iCnt - 1].st & this.b[0].OBJECT_MOVE2) / this.b[0].OBJECT_MOVE);
		iSt[3][iCnt * 2] = Math.floor ((this.lhand[Jmj.iPerNo - iCnt - 1].st & this.b[0].OBJECT_UNDER) / this.b[0].OBJECT_UNDER);
		iSt[3][iCnt * 2 + 1] = Math.floor ((this.rhand[Jmj.iPerNo - iCnt - 1].st & this.b[0].OBJECT_UNDER) / this.b[0].OBJECT_UNDER);
	}
	iSt[4][0] = Math.floor ((this.b[0].st & this.b[0].OBJECT_MOVE) / this.b[0].OBJECT_MOVE);
	iSt[5][0] = Math.floor ((this.b[0].st & this.b[0].OBJECT_MOVE2) / this.b[0].OBJECT_MOVE2);
	iSt[6][0] = Math.floor ((this.b[0].st & this.b[0].OBJECT_UNDER) / this.b[0].OBJECT_UNDER);
	iSt[4][1] = Math.floor ((this.b[1].st & this.b[0].OBJECT_MOVE) / this.b[1].OBJECT_MOVE);
	iSt[5][1] = Math.floor ((this.b[1].st & this.b[0].OBJECT_MOVE2) / this.b[1].OBJECT_MOVE2);
	iSt[6][1] = Math.floor ((this.b[1].st & this.b[0].OBJECT_UNDER) / this.b[1].OBJECT_UNDER);
	iSt[4][2] = Math.floor ((this.b[2].st & this.b[0].OBJECT_MOVE) / this.b[2].OBJECT_MOVE);
	iSt[5][2] = Math.floor ((this.b[2].st & this.b[0].OBJECT_MOVE2) / this.b[2].OBJECT_MOVE2);
	iSt[6][2] = Math.floor ((this.b[2].st & this.b[0].OBJECT_UNDER) / this.b[2].OBJECT_UNDER);
	this.image_gc.setColor (java.awt.Color.white);
	this.image_gc.fillRect (0, 0, 420, 200);
	this.image_gc.setColor (java.awt.Color.black);
	this.image_gc.drawString ("0 1 2 ", 122, 20);
	for (iCnt = 0; iCnt < 7; iCnt++) {
		if (iCnt > 3) this.image_gc.setColor (this.color[16 - (iCnt - 3)]);
		this.image_gc.drawString (strSts[iCnt], 10, 30 + iCnt * 10);
	}
	for (iCnt = 0; iCnt < 4; iCnt++) {
		for (iCnt2 = 0; iCnt2 < Jmj.iPerNo * 2; iCnt2++) {
			if (iSt[iCnt][iCnt2] == 1) {
				this.image_gc.setColor (java.awt.Color.red);
			} else {
				this.image_gc.setColor (java.awt.Color.black);
			}
			strTmp = "" + iSt[iCnt][iCnt2];
			this.image_gc.drawString (strTmp, 122 + iCnt2 * 16, 30 + iCnt * 10);
		}
	}
	for (iCnt = 4; iCnt < 7; iCnt++) {
		for (iCnt2 = 0; iCnt2 < 3; iCnt2++) {
			if (iSt[iCnt][iCnt2] == 1) {
				this.image_gc.setColor (java.awt.Color.red);
			} else {
				this.image_gc.setColor (java.awt.Color.black);
			}
			strTmp = "" + iSt[iCnt][iCnt2];
			this.image_gc.drawString (strTmp, 122 + iCnt2 * 16, 50 + iCnt * 10);
		}
	}
};

Jmj.prototype.getColor = function(i) {
	var n = 3;
	var c = this.color;
	var l = c.length;
	return c[(l - 1) - i % (l - n)];
};

Jmj.prototype.initPage = function(e) {

};

Jmj.prototype.initPage1 = function(e) {

};

Jmj.prototype.initPage2 = function(e) {

};

Jmj.prototype.initPage3 = function(e) {
	this.controller.speed_gauge.refresh(true);
	this.controller.height_gauge.refresh(true);
	this.controller.dwell_gauge.refresh(true);
	this.controller.perno_gauge.refresh(true);
}

Jmj.prototype.changePage1 = function(e) {
	this.stopJuggling();
};

Jmj.prototype.changePage2 = function(e) {
	if (this.kicker == null) {
		this.controller.juggle_pressed();
	}
};

Jmj.prototype.changePage3 = function(e) {
	this.stopJuggling();
	this.controller.speed_gauge.refresh(true);
	this.controller.height_gauge.refresh(true);
	this.controller.dwell_gauge.refresh(true);
	this.controller.perno_gauge.refresh(true);
};

// Applet
Jmj.prototype.getParameter = function(s) {
	if (s == 'file') {
		return 'pattern.jm';
		//return 'https://dl.dropbox.com/u/9975638/juggling/jmj/pattern.jm';
	}
	if (s == 'startwith') {
		return 'Throw Twice';
		//return '35-Cascade';
	}
	if (s == '') {
		return 'pattern.jm,pattern_ja.jm';
	}
	return null;
};

Jmj.prototype.repaint = function() {
	var g = this.imf.getGraphics();
	this.paint(g);
};

Jmj.prototype.getGraphics = function() {
	var g = this.imf.getGraphics();
	return g;
};

Jmj.KW = 0.25;
Jmj.XR = 1024;
Jmj.DW = 290;
Jmj.BMAX = 35;
Jmj.LMAX = 200;
Jmj.MMAX = 11;
Jmj.NORMAL = "Normal";
Jmj.PERMIN = 1;
Jmj.PERMAX = 10;

Jmj.iPerNo = 2;
Jmj.iPerMax = Jmj.iPerNo;

Jmj.PXY = 30;
Jmj.IDLE = 0;
Jmj.PAUSE = 1;
Jmj.JUGGLING = 2;
Jmj.SITESWAP_MODE = -3;
Jmj.MOTION_MODE = -2;
Jmj.FORMATION_MODE = -1;
Jmj.Y_OFFSET = 0;
Jmj.FORMATION_BASIC = "1-Person";
