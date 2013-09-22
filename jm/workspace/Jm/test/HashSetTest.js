HashSetTest = TestCase("HashSetTest");

HashSetTest.prototype.testIterator001 = function() {
	// スタブ、メソッドの戻り値を変更
	var hash = new HashSet();
	var stub = sinon.stub(hash, "iterator"); // hashインスタンスのiterator()

	//stub.withArgs("hello").returns(true);
	stub.returns(new Enumeration([1, 2, 3])); // メソッドの戻り値を偽装
	
	var it = hash.iterator();
	assertEquals(1, it.next());
	assertEquals(2, it.next());
	assertEquals(3, it.next());
	assertEquals(false, it.hasNext());
};

HashSetTest.prototype.testadd001 = function() {
	// メソッドが呼ばれた時の引数や戻り値、エラーなどを監視
	var hash = new HashSet();
    var spy = sinon.spy(hash.hash, "put"); // hash.hashインスタンスのput()が呼ばれたとき

	hash.add(1);
	
	assertEquals(true, spy.calledOnce); // 一回呼ばれた
	assertEquals(1, spy.getCall(0).args[0]); // 第1引数
	assertEquals(null, spy.getCall(0).args[1]); // 第2引数
};
