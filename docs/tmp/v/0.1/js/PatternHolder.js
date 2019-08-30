var PatternHolder = function(j) {
	this.jmj = j;

	// Field
	this.motiontable = null;
	this.patternVector = null;
	this.en = null;
	this.xyformation = null;
	this.enXY = null;
	//this.jmj = null;
	this.fline = 0;
	this.tailindex = 0;
	this.readflag = false;
	this.dwell = 0;
	this.height = 0;
	this.cbuf = null;
	this.bbuf = null;
	this.ibuf = null;
	this.pattbarr = null;
	this.motion = Jmj.NORMAL;
	this.motion2 = null;
	this.formation = "1-Person";
	this.s = null;
	this.next = 0;

	// Field init
	this.motiontable = new java.util.Hashtable();
	this.en = this.motiontable.keys();
	this.xyformation = new java.util.Hashtable();
	this.enXY = this.xyformation.keys();
	this.cbuf = Clazz.newArray(256, 0);
	this.bbuf = Clazz.newArray(Jmj.LMAX, 0);
	this.ibuf = Clazz.newArray(256, 0);
	this.motion2 = new Array(Jmj.PERMAX);

	// Constructor
	//this.jmj = j;
	this.motiontable.put(this.motion, [13, 0, 4, 0]);
	this.xyformation.put(this.formation, [0, 0]);
};

PatternHolder.prototype.setHolder = function(fp) {
	this.readflag = true;
	this.dwell = 0.5;
	this.patternVector = new java.util.Vector();
	this.height = 0.2;
	this.fline = 0;
	try {
		this.resetmotion2();
		var fallback_incrementflag = true;
		while (true) {
			if (this.readflag) {
				this.s = fp.readLine();
				this.fline++;
			}
			// Java版では、NullPointerExceptionでループから抜けている
			if (this.s == null){
				break;
			}

			this.readflag = true;
			this.tailindex = this.getTail(this.s);
			if (this.tailindex == 0) {
				this.resetmotion2();
				continue;
			}
			switch (this.s.charAt (0)) {
				case '/':
					this.patternVector.addElement(new PatternHolder.Piece(false, this.s.substring(1, ++this.tailindex)));
					if (fallback_incrementflag) {
						this.jmj.fallback_startindex++;
					}
				case ';':
					continue;
				case '#':
					this.wasParam(fp);
					continue;
				case '%':
					this.wasMotion(fp);
					continue;
				case '!':
					this.setFormation(fp);
					continue;
				case '$':
					var iii = this.motionToken();
					if (iii != 0) {
						var strtt = "error " + iii + " \nline " + this.fline;
						this.jmj.MessageBox(strtt);
					}
					continue;
				default:
					fallback_incrementflag = false;
					this.pattbarr = this.parsePattern(this.s);
					if (this.pattbarr != null) {
						var p = new PatternHolder.Piece(true, this.s.substring(this.next, ++this.tailindex), this.motion, this.pattbarr, this.height, this.dwell, this.formation, this.motion2);
						this.patternVector.addElement(p);
						if (p.name.equals(this.jmj.startpattern)) {
							this.jmj.startindex = this.patternVector.size() - 1;
						}
					} else {
						this.jmj.putError("Bad Pattern Definition in line :" + this.fline, this.s);
					}
			}
		}
	} catch (e$$) {
		// 手抜き
		throw e$$;
	}
	return !this.patternVector.isEmpty();

};

PatternHolder.prototype.wasParam = function(fp) {
	var st = new java.util.StringTokenizer(this.s, "= ;\t");
	var t;
	var i;
	try {
		st.nextToken();
		t = Float.$valueOf(st.nextToken()).floatValue();
	} catch (e) {
		if (Clazz.instanceOf(e, NumberFormatException)) {
			this.jmj.putError("Not Number in line:" + this.fline, this.s);
			return;
		} else {
			throw e;
		}
	}
	this.cbuf[0] = this.s.charAt(1);
	this.cbuf[1] = this.s.charAt(2);
	if ((this.cbuf[0]).charCodeAt(0) == ('D').charCodeAt(0) && (this.cbuf[1]).charCodeAt(0) == ('R').charCodeAt(0) && t >= 0.10 && t <= 0.90) {
		this.dwell = this.fadd(t, 2);
	} else if ((this.cbuf[0]).charCodeAt(0) == ('H').charCodeAt(0) && (this.cbuf[1]).charCodeAt(0) == ('R').charCodeAt(0) && t >= 0.01 && t <= 1.00) {
		this.height = this.fadd(t, 2);
	} else if ((this.cbuf[0]).charCodeAt(0) == ('G').charCodeAt(0) && (this.cbuf[1]).charCodeAt(0) == ('A').charCodeAt(0) && t > 0.00 && t <= 98.00) {
		this.jmj.ga = t;
	} else if ((this.cbuf[0]).charCodeAt(0) == ('S').charCodeAt(0) && (this.cbuf[1]).charCodeAt(0) == ('P').charCodeAt(0) && t >= 0.10 && t <= 2.00) {
		this.jmj.speed = this.fadd(t, 1);
	} else {
		i = Math.round(t);
		if ((this.cbuf[0]).charCodeAt(0) == ('M').charCodeAt(0) && (this.cbuf[1]).charCodeAt(0) == ('R').charCodeAt(0) && (i == 0 || i == 1)) {
			this.jmj.mirror = (i == 1) ? true : false;
		} else if ((this.cbuf[0]).charCodeAt(0) == ('H').charCodeAt(0) && (this.cbuf[1]).charCodeAt(0) == ('D').charCodeAt(0) && (i == 0 || i == 1)) {
			this.jmj.hand_on = (i == 1) ? true : false;
		} else if ((this.cbuf[0]).charCodeAt(0) == ('P').charCodeAt(0) && (this.cbuf[1]).charCodeAt(0) == ('D').charCodeAt(0) && (i == 0 || i == 1)) {
			this.jmj.show_ss = (i == 1) ? true : false;
		} else if ((this.cbuf[0]).charCodeAt(0) == ('B').charCodeAt(0) && (this.cbuf[1]).charCodeAt(0) == ('P').charCodeAt(0)) {
		} else if ((this.cbuf[0]).charCodeAt(0) == ('B').charCodeAt(0) && (this.cbuf[1]).charCodeAt(0) == ('C').charCodeAt(0)) {
		} else {
			this.jmj.putError("Invalid Parameter Value in line:" + this.fline, this.s);
		}
		return;
	}
};

PatternHolder.prototype.wasMotion = function(fp) {
	var tmp = this.s.substring(1, ++this.tailindex);
	this.s = fp.readLine();
	this.fline++;
	this.readflag = false;
	if (this.s.length == 0 || (this.s.charAt(0)).charCodeAt(0) != ('{').charCodeAt(0)) {
		if (this.motiontable.containsKey(tmp)) {
			this.motion = tmp;
		} else {
			this.jmj.putError("Undefined Pattern in line:" + this.fline, this.s);
		}
		return;
	}
	var bindex = 0;
	try {
		var s1;
		while (this.s.length != 0 && (this.s.charAt(0)).charCodeAt(0) == ('{').charCodeAt(0)) {
			var st = new java.util.StringTokenizer(this.s, " {},\t");
			for (var i = 0; i < 4; i++, bindex++) {
				try {
					s1 = st.nextToken();
				} catch (e) {
					if (Clazz.instanceOf(e, java.util.NoSuchElementException)) {
						throw new NumberFormatException();
					} else {
						throw e;
					}
				}
				//this.bbuf[bindex] = Byte.parseByte(s1);
				this.bbuf[bindex] = Integer.$valueOf(s1).intValue();
				if ((this.bbuf[bindex] < PatternHolder.Y_MIN || this.bbuf[bindex] > PatternHolder.Y_MAX) && ((bindex & 1) == 1) && (this.bbuf[bindex] < PatternHolder.X_MIN || this.bbuf[bindex] > PatternHolder.X_MAX)) {
					throw new NumberFormatException();
				}
			}
			this.s = fp.readLine();
			this.fline++;
		}
		this.motion = tmp;
		var b = Clazz.newArray(bindex, 0);
		for (var i = 0; i < bindex; i++) {
			b[i] = this.bbuf[i];
		}
		this.motiontable.put(this.motion, b);
	} catch (e) {
		if (Clazz.instanceOf(e, NumberFormatException)) {
			this.jmj.putError("Bad motion definition in " + tmp + " in line:" + this.fline, this.s);
			while (this.s.length != 0 && (this.s.charAt(0)).charCodeAt(0) == ('{').charCodeAt(0)) {
				this.s = fp.readLine();
				this.fline++;
			}
			this.readflag = false;
		} else {
			throw e;
		}
	}
};

PatternHolder.prototype.parsePattern = function(s) {
	var bindex = 0;
	var c;

	// @FOO start
	this.tailindex = this.getTail(s);
	// @FOO end

	for (this.next = 0; this.next <= this.tailindex; this.next++) {
		if ((( c = s.charAt(this.next))).charCodeAt(0) == (' ').charCodeAt(0) || (c).charCodeAt(0) == ('\t').charCodeAt(0))
			break;
	}
	for (var i = 0; i < this.next; i++, bindex++) {
		switch ((c = s.charAt (i))) {
			case '(':
				this.bbuf[bindex] = PatternHolder.PAR;
				break;
			case ')':
				this.bbuf[bindex] = PatternHolder.ENTHESIS;
				break;
			case ',':
				this.bbuf[bindex] = PatternHolder.COMMA;
				break;
			case '[':
				this.bbuf[bindex] = PatternHolder.BRA;
				break;
			case ']':
				this.bbuf[bindex] = PatternHolder.KET;
				break;
			default:
				if ((c).charCodeAt(0) >= ('0').charCodeAt(0) && (c).charCodeAt(0) <= ('9').charCodeAt(0)) {
					this.bbuf[bindex] = ((c).charCodeAt(0) - ('0').charCodeAt(0));
				} else if ((c).charCodeAt(0) >= ('a').charCodeAt(0) && (c).charCodeAt(0) <= ('z').charCodeAt(0)) {
					this.bbuf[bindex] = ((c).charCodeAt(0) - ('a').charCodeAt(0) + 10);
				} else if ((c).charCodeAt(0) >= ('A').charCodeAt(0) && (c).charCodeAt(0) <= ('Z').charCodeAt(0)) {
					this.bbuf[bindex] = ((c).charCodeAt(0) - ('A').charCodeAt(0) + 10);
				} else {
					return null;
				}
		}
	}
	if (this.next > Jmj.LMAX) {
		this.jmj.putError("Too Long Pattern in line :" + this.fline, s);
		return null;
	}
	var patt = Clazz.newArray(bindex, 0);
	for (var i = 0; i < bindex; i++) {
		patt[i] = this.bbuf[i];
	}
	for (; this.next < this.tailindex; this.next++) {
		if ((s.charAt(this.next)).charCodeAt(0) != (' ').charCodeAt(0) && (s.charAt(this.next)).charCodeAt(0) != ('\t').charCodeAt(0)) {
			break;
		}
	}
	if (this.next >= this.tailindex) {
		this.next = 0;
	}
	return patt;

};

PatternHolder.prototype.isPattern = function(index) {
	return this.patternVector.elementAt(index).isPattern;
};

PatternHolder.prototype.getPattern = function(o, s) {
	if (arguments.length < 2) {
		if ( typeof o == 'string') {
			s = o;
			this.tailindex = this.getTail(s);
			return this.getPattern(-1, s);
		} else {
			var index = o;
			return this.getPattern(index, null);
		}
	}
	var index = o;

	var flag = 0;
	var flag2 = 0;
	var a = 0;
	var j = 0;
	var pattw = 0;

	// @FOO start
/*
	if (s != null) {
		this.pattbarr = this.parsePattern(s);
		if (this.pattbarr == null) {
			return false;
		}
		this.jmj.pattern = s;
	} else {
		if (!this.isPattern(index)) {
			return false;
		}
		var p = this.patternVector.elementAt(index);
		this.jmj.pattern = p.name;
		this.jmj.motion = p.motion;
		this.jmj.$height = p.height;
		this.jmj.dwell = p.dwell;
		this.pattbarr = p.siteswap;
		this.jmj.formation = p.formation;
		var iCnt;
		for ( iCnt = 0; iCnt < Jmj.PERMAX; iCnt++) {
			this.jmj.motion2[iCnt] = p.motion2[iCnt];
		}
	}
*/
	this.jmj.pattern = "Slower 3-Cascade"
	this.jmj.motion = "Shower"
	this.jmj.$height = 0.2
	this.jmj.dwell = 0.75
	this.pattbarr = this.parsePattern(Jmj.siteswap); // p.siteswap;
	this.jmj.formation = "1-Person";
	var iCnt;
	for ( iCnt = 0; iCnt < Jmj.PERMAX; iCnt++) {
		this.jmj.motion2[iCnt] = this.jmj.motion; // p.motion2[iCnt];
	}
	// @FOO end

	if (this.pattbarr[0] == PatternHolder.PAR) {
		this.jmj.isSync = true;
	} else {
		this.jmj.isSync = false;
	}
	while (j < this.pattbarr.length) {
		if (this.pattbarr[j] == PatternHolder.BRA) {
			flag2 = 1;
			this.jmj.patts[pattw] = 0;
			j++;
			continue;
		}
		if (this.pattbarr[j] == PatternHolder.KET) {
			if (flag2 == 0) {
				return false;
			}
			flag2 = 0;
			pattw++;
			j++;
			continue;
		}
		if (this.jmj.isSync) {
			switch (this.pattbarr[j]) {
				case PatternHolder.PAR:
					if (flag != 0) {
						return false;
					}
					flag = 1;
					j++;
					continue;
				case PatternHolder.ENTHESIS:
					if (flag != 5) {
						return false;
					}
					flag = 0;
					j++;
					continue;
				case PatternHolder.COMMA:
					if (flag != 2) {
						return false;
					}
					flag = 4;
					j++;
					continue;
				case PatternHolder.CROSS:
					if (flag != 2 && flag != 5) {
						return false;
					}
					if (flag2 != 0) {
						this.jmj.patt[pattw][this.jmj.patts[pattw] - 1] = -a;
					} else {
						this.jmj.patt[pattw - 1][0] = -a;
					}
					j++;
					continue;
			}
		}
		a = this.pattbarr[j];
		if (this.jmj.isSync) {
			if (a % 2 != 0) {
				return false;
			}
			if (flag2 == 0 && flag != 1 && flag != 4) {
				return false;
			}
			if (flag == 1) {
				flag = 2;
			}
			if (flag == 4) {
				flag = 5;
			}
		}
		if (flag2 != 0) {
			if (a == 0) {
				return false;
			}
			this.jmj.patt[pattw][this.jmj.patts[pattw]++] = a;
			if (this.jmj.patts[pattw] > Jmj.MMAX) {
				return false;
			}
		} else {
			this.jmj.patt[pattw][0] = a;
			if (a == 0) {
				this.jmj.patts[pattw++] = 0;
			} else {
				this.jmj.patts[pattw++] = 1;
			}
		}
		j++;
	}
	if (flag != 0 || flag2 != 0 || pattw == 0) {
		return false;
	}
	this.jmj.pattw = pattw;
	if (this.jmj.TEST_MODE == true) {
		var msg = new MessageBox();
		msg.pattw = pattw;
		msg.isSync = this.jmj.isSync;
		msg.s = s;
		for (var iCnt1 = 0; iCnt1 < pattw; iCnt1++) {
			msg.patts[iCnt1] = this.jmj.patts[iCnt1];
			for (var iCnt2 = 0; iCnt2 < this.jmj.patts[iCnt1]; iCnt2++) {
				msg.patt[iCnt1][iCnt2] = this.jmj.patt[iCnt1][iCnt2];
			}
		}
		msg.chkSSdlg();
	}
	return true;
};

PatternHolder.prototype.nameAt = function(index) {
	// try {
	// return this.patternVector.elementAt(index).name;
	// } catch (e) {
	// if (Clazz.instanceOf(e, ArrayIndexOutOfBoundsException)) {
	// return String.instantialize();
	// } else {
	// throw e;
	// }
	// }
	if (index >= this.patternVector.size()){
		// Java版では、ArrayIndexOutOfBoundsException
		return '';
	}
	return this.patternVector.elementAt(index).name;
};

PatternHolder.prototype.get = function(index) {
	if (index >= this.patternVector.size()){
		return null;
	}
	return this.patternVector.elementAt(index);
};

PatternHolder.prototype.chooseTrickByName = function(trickName) {
	var n = this.patternVector.size();
	for (var i = 0; i < n; i++) {
		if (this.patternVector.elementAt(i).isPattern) {
			if ((this.patternVector.elementAt(i)).name.equals(trickName)) {
				this.jmj.controller.patternList.select(i);
				return i;
			}
		}
	}
	return -1;
};

PatternHolder.prototype.invalidate = function(index) {
	this.patternVector.setElementAt(new PatternHolder.Piece(false, this.patternVector.elementAt(index).name), index);
};

PatternHolder.prototype.getTail = function(str) {
	if (str.length == 0) {
		return 0;
	}
	for (var i = str.length - 1; i > -1; i--) {
		if ((str.charAt(i)).charCodeAt(0) != (' ').charCodeAt(0) && (str.charAt(i)).charCodeAt(0) != ('\t').charCodeAt(0)) {
			return i;
		}
	}
	return 0;
};

PatternHolder.prototype.fadd = function(t, x) {
	return (Math.floor(t * Math.pow(10, x) + .5) / Math.pow(10, x));
};

PatternHolder.prototype.rewindMotion = function() {
	this.en = this.motiontable.keys();
};

PatternHolder.prototype.nextMotion = function() {
	if (this.en.hasMoreElements()) {
		return this.en.nextElement();
	} else {
		return "";
	}
};

PatternHolder.prototype.getMotion = function(motion) {
	// @FOO
	//this.jmj.motionarray = this.motiontable.get(motion);
	this.jmj.motionarray = [13, 0, 4, 0]; //[21,  9,  18,  4];
};

PatternHolder.prototype.getMotion2 = function(motion, iPer) {
	// @FOO
	this.jmj.motionarray2[iPer] = [13, 0, 4, 0]; //[21,  9,  18,  4]; //this.motiontable.get(motion);
	this.jmj.motionlength[iPer] = this.jmj.motionarray2[iPer].length;
};

PatternHolder.prototype.countMotions = function() {
	return this.motiontable.size();
};

PatternHolder.prototype.setFormation = function(fp) {
	var tmp = this.s.substring(1, ++this.tailindex);
	var iTmp;
	var iCnt = 0;
	this.s = fp.readLine();
	this.fline++;
	this.readflag = false;
	if (this.s.length == 0 || (this.s.charAt(0)).charCodeAt(0) != ('{').charCodeAt(0)) {
		if (this.xyformation.containsKey(tmp)) {
			this.formation = tmp;
		} else {
			this.jmj.putError("Undefined Formation in line:" + this.fline, this.s);
		}
		return;
	}
	var bindex = 0;
	try {
		var s1;
		while (this.s.length != 0 && (this.s.charAt(0)).charCodeAt(0) == ('{').charCodeAt(0)) {
			var st = new java.util.StringTokenizer(this.s, " {},\t");
			for (var i = 0; i < 2; i++, bindex++) {
				try {
					s1 = st.nextToken();
				} catch (e) {
					if (Clazz.instanceOf(e, java.util.NoSuchElementException)) {
						throw new NumberFormatException();
					} else {
						throw e;
					}
				}
				this.ibuf[bindex] = Integer.parseInt(s1);
				if ((this.ibuf[bindex] < -1000 || this.ibuf[bindex] > 1000) && ((bindex & 1) == 1) && (this.ibuf[bindex] < -1000 || this.ibuf[bindex] > 1000)) {
					throw new NumberFormatException();
				}
			}
			this.s = fp.readLine();
			this.fline++;
		}
		this.formation = tmp;
		var ib = Clazz.newArray(bindex, 0);
		for (var i = 0; i < bindex; i++) {
			ib[i] = this.ibuf[i];
		}
		this.xyformation.put(this.formation, ib);
	} catch (e) {
		if (Clazz.instanceOf(e, NumberFormatException)) {
			this.jmj.putError("Bad formation definition in " + tmp + " in line:" + this.fline, this.s);
			while (this.s.length != 0 && (this.s.charAt(0)).charCodeAt(0) == ('{').charCodeAt(0)) {
				this.s = fp.readLine();
				this.fline++;
			}
			this.readflag = false;
		} else {
			throw e;
		}
	}
};

PatternHolder.prototype.rewindFormation = function() {
	this.enXY = this.xyformation.keys();
};

PatternHolder.prototype.nextFormation = function() {
	if (this.enXY.hasMoreElements()) {
		return this.enXY.nextElement();
	} else {
		return "";
	}
};

PatternHolder.prototype.getFormation = function(formation) {
	var iCnt;
	var iXYNum;

	// @FOO
	//this.jmj.formationarray = this.xyformation.get(formation);
	this.jmj.formationarray = [0, 0]; //[30, 0,  0, 0];

	//( $t$ = Jmj.iPerMax = Math.floor(this.jmj.formationarray.length / 2), Jmj.prototype.iPerMax = Jmj.iPerMax, $t$);
	Jmj.iPerMax = Math.floor(this.jmj.formationarray.length / 2);
	for ( iCnt = 0; iCnt < Jmj.iPerMax; iCnt++) {
		this.jmj.iXData[iCnt] = this.jmj.formationarray[iCnt * 2];
		this.jmj.iYData[iCnt] = this.jmj.formationarray[iCnt * 2 + 1];
	}
	return;
};

PatternHolder.prototype.countFormation = function(formation) {
	return this.xyformation.size();
};

PatternHolder.prototype.motionToken = function(formation) {
	var strTmp;
	var iCnt;
	var iCnt2;
	var iFlag = Clazz.newArray(Jmj.PERMAX, 0);
	var iCntToken;
	var iCntToken2;
	var iBefore;
	var iAfter;
	var strToken1;
	var strToken2;
	var strToken3;
	var strMotion;
	var stmp = this.s.substring(1);
	var st = new java.util.StringTokenizer(stmp, ",:");
	try {
		for ( iCnt = 0; iCnt < Jmj.PERMAX; iCnt++) {
			iFlag[iCnt] = 0;
		}
		iCntToken = st.countTokens();
		if (iCntToken < 2) {
			return -1;
		}
		for ( iCnt = 0; iCnt < iCntToken - 1; iCnt++) {
			strTmp = st.nextToken();
			var st2 = new java.util.StringTokenizer(strTmp, "-", true);
			iCntToken2 = st2.countTokens();
			if (iCntToken2 > 3)
				return -2;
			switch (iCntToken2) {
				case 1:
					iBefore = Integer.$valueOf(st2.nextToken()).intValue();
					if (iBefore < 1 || Jmj.PERMAX < iBefore)
						return -3;
					iFlag[iBefore - 1] = 1;
					break;
				case 2:
					strToken1 = st2.nextToken();
					strToken2 = st2.nextToken();
					if (strToken1.equals("-")) {
						iAfter = Integer.$valueOf(strToken2).intValue();
						if (iAfter < 1 || Jmj.PERMAX < iAfter)
							return -4;
						iBefore = 1;
						for ( iCnt2 = iBefore; iCnt2 < iAfter + 1; iCnt2++)
							iFlag[iCnt2 - 1] = 1;

					} else if (strToken2.equals("-")) {
						iBefore = Integer.$valueOf(strToken1).intValue();
						if (iBefore < 1 || Jmj.PERMAX < iBefore)
							return -5;
						iAfter = Jmj.PERMAX;
						for ( iCnt2 = iBefore; iCnt2 < iAfter + 1; iCnt2++)
							iFlag[iCnt2 - 1] = 1;

					} else {
						return -123;
					}
					break;
				case 3:
					strToken1 = st2.nextToken();
					strToken2 = st2.nextToken();
					strToken3 = st2.nextToken();
					if (strToken2.equals("-")) {
						iBefore = Integer.$valueOf(strToken1).intValue();
						if (iBefore < 1 || Jmj.PERMAX < iBefore)
							return -6;
						iAfter = Integer.$valueOf(strToken3).intValue();
						if (iAfter < 1 || Jmj.PERMAX < iAfter)
							return -7;
						if (iBefore > iAfter) {
							var iTmp = iAfter;
							iAfter = iBefore;
							iBefore = iAfter;
						}
						for ( iCnt2 = iBefore; iCnt2 < iAfter + 1; iCnt2++)
							iFlag[iCnt2 - 1] = 1;

					} else {
						return -124;
					}
					break;
				default:
					return -8;
			}
		}
		strMotion = st.nextToken().substring(1);
		if (this.motiontable.containsKey(strMotion)) {
			for ( iCnt2 = 0; iCnt2 < Jmj.PERMAX; iCnt2++) {
				if (iFlag[iCnt2] == 1)
					this.motion2[iCnt2] = strMotion;
			}
		} else {
			return -9;
		}
		return 0;
	} catch (e) {
		if (Clazz.instanceOf(e, NumberFormatException)) {
			this.jmj.putError("Motion Error in line:" + this.fline, this.s);
			return -10;
		} else {
			throw e;
		}
	}
};

PatternHolder.prototype.resetmotion2 = function() {
	var iCnt;
	for ( iCnt = 0; iCnt < Jmj.PERMAX; iCnt++) {
		this.motion2[iCnt] = "";
	}
	return;
};

PatternHolder.CROSS = 33;
PatternHolder.COMMA = -1;
PatternHolder.BRA = -2;
PatternHolder.KET = -3;
PatternHolder.PAR = -4;
PatternHolder.ENTHESIS = -5;

PatternHolder.X_MIN = -30;
PatternHolder.X_MAX = 30;
PatternHolder.Y_MIN = -10;
PatternHolder.Y_MAX = 20;

PatternHolder.Piece = function(isPat, nm, mt, ss, hght, ht, fm, mt2) {
	this.name = null;
	this.isPattern = false;
	this.motion = null;
	this.siteswap = null;
	this.height = 0;
	this.dwell = 0;
	this.formation = null;
	this.motion2 = null;

	this.motion2 = new Array(Jmj.PERMAX);

	if (arguments.length > 0) {
		this.name = nm;
		this.isPattern = isPat;
	}
	if (arguments.length > 2) {
		this.motion = mt;
		this.siteswap = ss;
		this.height = hght;
		this.dwell = ht;
		this.formation = fm;

		for (var i = 0; i < Jmj.PERMAX; i++) {
			if (mt2[i] === "") {
				this.motion2[i] = this.motion;
			} else {
				this.motion2[i] = mt2[i];
			}
		}
	}
};
var Piece = PatternHolder.Piece;
