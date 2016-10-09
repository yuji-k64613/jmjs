var Ball = function(){
    //Jmj jmj;

    this.bh = 0;
    this.gx = 0;
    this.gy = 0;
    this.gx0 = 0;
    this.gy0 = 0;
    this.gx1 = 0;
    this.gy1 = 0;
    this.c = 0;
    this.c0 = 0;
    this.chand = 0;
    this.thand = 0;
    this.st = 0;

    this.hand_x = 0;
    this.hand_y = 0;

    this.tPer = 0;
    this.cPer = 0;   // tPer : throw person,  cPer : catch person
};

Ball.prototype.juggle = function() {
	var tp;
	var flag = 0;
	var i;
	var tpox = 0;
	var rpox = 0;
	var tpoz = 0;
	var rpoz = 0;
	var x;
	var y;
	var fx;
	
	this.gx0 = this.gx;
	this.gy0 = this.gy;
	var iFlag = this.c;
	
	if (this.c < 0) {
		if (Ball.jmj.time_count >= -this.c * Ball.jmj.tw) {
			this.c = -this.c;
		}
	}
	while (true) {
		tp = (Ball.jmj.time_count - Ball.jmj.tw * Math.abs (this.c));
		if (tp < Ball.jmj.aw) {
			break;
		}
        this.st &= ~Ball.OBJECT_UNDER;
		this.c0 = this.c;
		
        if((this.st & Ball.OBJECT_HAND) != 0) {
			this.c += 2;
			flag = 1;
		} else {
			var t;
			t = this.c;
			if (Ball.jmj.isSync) {
				if (Ball.jmj.mirror && this.chand == 0) {
					t++;
				}
				else if (!Ball.jmj.mirror && this.chand != 0) {
					t++;
				}
			}
			t %= Ball.jmj.pattw;
			this.bh = Ball.jmj.patt[t][Ball.jmj.r[t]];
			this.c += Math.abs (this.bh);
			if (++Ball.jmj.r[t] >= Ball.jmj.patts[t]) {
				Ball.jmj.r[t] = 0;
			}
			this.thand = this.chand;
			if (((this.bh & 1) != 0) || this.bh < 0) {
				this.chand = 1 - this.chand;
			}
			flag = 1;
		}
	}
	if (this.c < 0) {
		this.cPer = (Math.floor (-this.c / 2)) % Jmj.iPerNo;
	} else {
		this.cPer = (Math.floor (this.c / 2)) % Jmj.iPerNo;
	}
	if (this.c0 < 0) {
		this.tPer = (Math.floor (-this.c0 / 2)) % Jmj.iPerNo;
	} else {
		this.tPer = (Math.floor (this.c0 / 2)) % Jmj.iPerNo;
	}
	
	if (iFlag == Math.abs (this.bh)) {
		this.cPer = (Math.floor (Math.abs (this.bh) / 2)) % Jmj.iPerNo;
		this.tPer = (Math.floor (Math.abs (this.bh) / 2)) % Jmj.iPerNo;
	}
	
    if ((this.st & Ball.OBJECT_HAND) != 0) {
		this.tPer = Ball.jmj.jPerNo;
		this.cPer = Ball.jmj.jPerNo;
	}
	
	if (this.c >= 0 && tp >= 0 && (this.st & Ball.OBJECT_UNDER) == 0) {
		this.st |= Ball.OBJECT_UNDER;

        if((this.st & Ball.OBJECT_HAND) != 0) {
			if ((this.st & Ball.OBJECT_MOVE2) != 0) {
				this.st |= Ball.OBJECT_MOVE;
                this.st &= ~Ball.OBJECT_MOVE2;
			} else {
                this.st &= ~Ball.OBJECT_MOVE;
			}
		} else {
			var h;
			var t;
			t = this.c;
			if (Ball.jmj.isSync) {
				if (Ball.jmj.mirror && this.chand == 0) {
					t++;
				} else if (!Ball.jmj.mirror && this.chand != 0) {
					t++;
				}
			}
			t %= Ball.jmj.pattw;
			if (this.bh == 1) {
                this.st |= Ball.OBJECT_MOVE;
			} else {
				//this.st &= -5;
                this.st &= ~Ball.OBJECT_MOVE;
			}
			for (i = 0; i < Ball.jmj.patts[t]; i++) {
				h = Ball.jmj.patt[t][i];
				if (h == 1) {
					if (Ball.jmj.mirror == false) {
						if (this.chand != 0) {
							Ball.jmj.lhand[(this.cPer + 1) % Jmj.iPerNo].st |= Ball.OBJECT_MOVE2;
						} else {
							Ball.jmj.rhand[(this.cPer + 1) % Jmj.iPerNo].st |= Ball.OBJECT_MOVE2;
						}
					} else {
						if (this.chand != 0) {
							Ball.jmj.lhand[(this.cPer + Jmj.iPerNo - 1) % Jmj.iPerNo].st |= Ball.OBJECT_MOVE2;
						} else {
							Ball.jmj.rhand[(this.cPer + Jmj.iPerNo - 1) % Jmj.iPerNo].st |= Ball.OBJECT_MOVE2;
						}
					}
				}
				this.hand_pos (this.c, this.chand, this.cPer);
				tpox = this.hand_x;
				tpoz = this.hand_y;
				this.hand_pos (this.c + Math.abs (h), this.chand, this.cPer);
				rpox = this.hand_x;
				rpoz = this.hand_y;
				if ((Jmj.iPerNo == 1 && h == 2) || (Jmj.iPerNo > 1 && h == Jmj.iPerNo * 2 && tpox == rpox && tpoz == rpoz)) {
		
				} else {
					// ボールを投げる
					if (this.chand != 0) {
						Ball.jmj.rhand[this.cPer].st |= Ball.OBJECT_MOVE2;
					} else {
						Ball.jmj.lhand[this.cPer].st |= Ball.OBJECT_MOVE2;
					}
					//this.st |= 4;
                    this.st |= Ball.OBJECT_MOVE;
				}
			}
		}
	}
	
	if ((this.st & Ball.OBJECT_UNDER) != 0 && this.bh != 1) {
		this.tPer = this.cPer;
	}
	
	if (this.c < 0) this.tPer = this.cPer;

	if ((this.st & Ball.OBJECT_MOVE) == 0) {
		if (this.c < 0) {
			this.hand_pos (-this.c, this.chand, this.tPer);
			tpox = this.hand_x;
			tpoz = this.hand_y;
			rpox = tpox;
			rpoz = tpoz;
		} else {
			//if ((this.st & 2) != 0) {
			if ((this.st & Ball.OBJECT_UNDER) != 0) {
				this.hand_pos (this.c, this.chand, this.tPer);
				tpox = this.hand_x;
				tpoz = this.hand_y;
				this.hand_pos (this.c + 2 * Jmj.iPerNo, this.chand, this.cPer);
				rpox = this.hand_x;
				rpoz = this.hand_y;
				if (tpox != rpox || tpoz != rpoz) {
					this.hand_pos (this.c + 1, this.chand, this.cPer);
					rpox = this.hand_x;
					rpoz = this.hand_y;
					if (tpox != rpox || tpoz != rpoz) {
						this.st |= Ball.OBJECT_MOVE;
					}
				}
			} else {
				this.hand_pos (this.c - 2, this.chand, this.tPer);
				tpox = this.hand_x;
				tpoz = this.hand_y;
				this.hand_pos (this.c, this.chand, this.cPer);
				rpox = this.hand_x;
				rpoz = this.hand_y;
				if (tpox != rpox || tpoz != rpoz) {
					this.hand_pos (this.c - 1, this.chand, this.tPer);
					tpox = this.hand_x;
					tpoz = this.hand_y;
					if (tpox != rpox || tpoz != rpoz) {
						this.st |= Ball.OBJECT_MOVE;
					}
				}
			}
		}
	}
	if ((this.st & Ball.OBJECT_MOVE) != 0) {
		if (this.bh == 1) {
			this.hand_pos (this.c0 + 1, this.thand, this.tPer);
			tpox = this.hand_x;
			tpoz = this.hand_y;
			this.hand_pos (this.c + 1, this.chand, this.cPer);
			rpox = this.hand_x;
			rpoz = this.hand_y;
		//} else if ((this.st & 2) != 0) {
		} else if ((this.st & Ball.OBJECT_UNDER) != 0) {
			this.hand_pos (this.c, this.chand, this.tPer);
			tpox = this.hand_x;
			tpoz = this.hand_y;
			this.hand_pos (this.c + 1, this.chand, this.cPer);
			rpox = this.hand_x;
			rpoz = this.hand_y;
		} else {
			this.hand_pos (this.c0 + 1, this.thand, this.tPer);
			tpox = this.hand_x;
			tpoz = this.hand_y;
			this.hand_pos (this.c, this.chand, this.cPer);
			rpox = this.hand_x;
			rpoz = this.hand_y;
		}
	}
	
    // add position data on Throw & Catch person
    if ((this.st & Ball.OBJECT_HAND) == 0) {
		if (Ball.jmj.mirror == false) {
			tpox += Math.floor (Ball.jmj.iXData[this.tPer] * 40 / Jmj.PXY);
			rpox += Math.floor (Ball.jmj.iXData[this.cPer] * 40 / Jmj.PXY);
		} else {
			tpox -= Math.floor (Ball.jmj.iXData[this.tPer] * 40 / Jmj.PXY);
			rpox -= Math.floor (Ball.jmj.iXData[this.cPer] * 40 / Jmj.PXY);
		}
		tpoz += Math.floor (Ball.jmj.iYData[this.tPer] * 20 / Jmj.PXY);
		rpoz += Math.floor (Ball.jmj.iYData[this.cPer] * 20 / Jmj.PXY);
	} else {
		if (Ball.jmj.mirror == false) {
			tpox += Math.floor (Ball.jmj.iXData[Ball.jmj.jPerNo] * 40 / Jmj.PXY);
			rpox += Math.floor (Ball.jmj.iXData[Ball.jmj.jPerNo] * 40 / Jmj.PXY);
		} else {
			tpox -= Math.floor (Ball.jmj.iXData[Ball.jmj.jPerNo] * 40 / Jmj.PXY);
			rpox -= Math.floor (Ball.jmj.iXData[Ball.jmj.jPerNo] * 40 / Jmj.PXY);
		}
		tpoz += Math.floor (Ball.jmj.iYData[Ball.jmj.jPerNo] * 20 / Jmj.PXY);
		rpoz += Math.floor (Ball.jmj.iYData[Ball.jmj.jPerNo] * 20 / Jmj.PXY);
	}
	
    if((this.st & Ball.OBJECT_HAND) == 0 && this.c < 0 ) {
		if (tpox == 0) {
			fx = 0;
			y = Math.round ((tpoz * Ball.jmj.dpm / 20 - Math.floor (Math.floor (tp * Ball.jmj.dpm / 12) / Ball.jmj.tw)));
		} else {
			if (tpox > 0) {
				fx = tpox / 10 - tp / 6 / Ball.jmj.tw;
			} else {
				fx = tpox / 10 + tp / 6 / Ball.jmj.tw;
			}
			y = Math.round ((tpoz * Ball.jmj.dpm / 20));
		}
	} else if ((this.st & Ball.OBJECT_MOVE) == 0) {
		fx = tpox / 10;
		y = Math.round ((tpoz * Ball.jmj.dpm / 20));
	} else {
		if (this.bh == 1) {
			fx = (tp - Ball.jmj.aw) / Ball.jmj.tw * 2 + 1;
			y = Math.round ((Ball.jmj.high[1] * (1 - this.square (fx))));
		} else if ((this.st & Ball.OBJECT_UNDER) != 0) {
			fx = tp / Ball.jmj.aw * 2 - 1;
			y = Math.round ((Ball.jmj.high[0] * (1 - this.square (fx))));
		} else {
			fx = tp / (Ball.jmj.tw * Math.abs (this.bh) - Ball.jmj.aw) * 2 + 1;
			y = Math.round ((Ball.jmj.high[Math.abs (this.bh)] * (1 - this.square (fx))));
		}
		y += (fx * (rpoz - tpoz) + rpoz + tpoz) * Ball.jmj.dpm / 40;
		fx = (fx * (rpox - tpox) + rpox + tpox) / 20;
	}
	
	x = Math.round ((fx * Ball.jmj.dpm * Jmj.KW));
	this.gx = (x - 11);
	
    if((this.st & Ball.OBJECT_HAND) != 0) {
		if (this.chand != 0) {
			this.gx += Ball.jmj.hand_x;
		} else {
			this.gx -= Ball.jmj.hand_x;
		}
		y -= Ball.jmj.hand_y;
	}
	this.gy = (Ball.jmj.$base - y - 11);
	return flag;
};

Ball.prototype.hand_pos = function(c, h, person) {
	var a;
	var a2;
	var a3;
	
	if (Ball.jmj.mirror) {
		if (!Ball.jmj.isSync && h != 0) {
			c--;
		}
		if ((c & 1) != 0) {
			a2 = (--c + h);
			a3 = Math.floor (a2 / (Jmj.iPerNo * 2));
			a3 = a3 * 2;
			if ((Math.floor (a2 / 2)) * 2 != a2) a3++;
			a = (a3 % (Math.floor (Ball.jmj.motionlength[person] / 4))) * 4 + 2;
		} else {
			a2 = (c + h);
			a3 = Math.floor (a2 / (Jmj.iPerNo * 2));
			a3 = a3 * 2;
			if ((Math.floor (a2 / 2)) * 2 != a2) a3++;
			a = (a3 % (Math.floor (Ball.jmj.motionlength[person] / 4))) * 4;
		}
	} else {
		if (!Ball.jmj.isSync && h == 0) {
			c--;
		}
		if ((c & 1) != 0) {
			a2 = (c - h);
			a3 = Math.floor (a2 / (Jmj.iPerNo * 2));
			a3 = a3 * 2;
			if ((Math.floor (a2 / 2)) * 2 != a2) a3++;
			a = (a3 % (Math.floor (Ball.jmj.motionlength[person] / 4))) * 4 + 2;
		} else {
			a2 = (c + 1 - h);
			a3 = Math.floor (a2 / (Jmj.iPerNo * 2));
			a3 = a3 * 2;
			if ((Math.floor (a2 / 2)) * 2 != a2) a3++;
			a = (a3 % (Math.floor (Ball.jmj.motionlength[person] / 4))) * 4;
		}
	}
	if (h != 0) {
		this.hand_x = Ball.jmj.motionarray2[person][a];
	} else {
		this.hand_x = -Ball.jmj.motionarray2[person][a];
	}
	this.hand_y = Ball.jmj.motionarray2[person][a + 1];
};	

Ball.prototype.square = function(x) {
	return x * x;
};

Ball.OBJECT_HAND = 0x01;
Ball.OBJECT_UNDER = 0x02;
Ball.OBJECT_MOVE = 0x04;
Ball.OBJECT_MOVE2 = 0x08;

Ball.jmj = null;
