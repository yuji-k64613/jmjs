HashtableTest = TestCase("HashtableTest");

HashtableTest.prototype.testPut001 = function() {
  var hash = new Hashtable();
  
  hash.put("foo", "bar");  
  assertEquals("bar", hash.get("foo"));
  assertEquals(null, hash.get("FOO"));
  assertEquals(1, hash.size());
  
  //jstestdriver.console.log("JsTestDriver", "World");
  //console.log("Browser");
};

HashtableTest.prototype.testPut002 = function() {
	var hash = new Hashtable();

	hash.put("foo1", "bar1");
	hash.put("foo2", "bar2");
	assertEquals("bar1", hash.get("foo1"));
	assertEquals("bar2", hash.get("foo2"));
	assertEquals(null, hash.get("FOO"));
	assertEquals(2, hash.size());
};

HashtableTest.prototype.testContainsKey001 = function() {
	var hash = new Hashtable();

	hash.put("foo1", "bar1");
	hash.put("foo2", "bar2");
	assertEquals(true, hash.containsKey("foo1"));
	assertEquals(true, hash.containsKey("foo2"));
	assertEquals(false, hash.containsKey("FOO"));
};

HashtableTest.prototype.testRemoveItem001 = function() {
	var hash = new Hashtable();

	hash.put("foo1", "bar1");
	hash.put("foo2", "bar2");

	assertEquals(undefined, hash.removeItem("FOO"));
	assertEquals("bar1", hash.removeItem("foo1"));
	assertEquals(1, hash.size());
	assertEquals("bar2", hash.removeItem("foo2"));
	assertEquals(0, hash.size());
};

HashtableTest.prototype.testKeys001 = function() {
	var hash = new Hashtable();

	hash.put("foo1", "bar1");
	hash.put("foo2", "bar2");
	var em = hash.keys();
	var item1 = em.nextElement();
	var item2 = em.nextElement();
		
	assertEquals(false, em.hasMoreElements());
	if (!(item1 == "foo1" && item2 == "foo2" || item1 == "foo2" && item2 == "foo1")){
		fail();
	}
};

HashtableTest.prototype.testValues001 = function() {
	var hash = new Hashtable();

	hash.put("foo1", "bar1");
	hash.put("foo2", "bar2");
	var v = hash.values();
	var item1 = v[0];
	var item2 = v[1];
		
	if (!(item1 == "bar1" && item2 == "bar2" || item1 == "bar2" && item2 == "bar1")){
		fail();
	}
};

HashtableTest.prototype.testEach001 = function() {
	var hash = new Hashtable();

	hash.put("foo1", "bar1");
	hash.put("foo2", "bar2");
	var v = [];
	
	hash.each(function(key, value){ v.push(key); });
	
	var item1 = v[0];
	var item2 = v[1];
	if (!(item1 == "foo1" && item2 == "foo2" || item1 == "foo2" && item2 == "foo1")){
		fail();
	}
};

HashtableTest.prototype.testEach002 = function() {
	var hash = new Hashtable();

	hash.put("foo1", "bar1");
	hash.put("foo2", "bar2");
	var v = [];
	
	hash.each(function(key, value){ v.push(value); });
	
	var item1 = v[0];
	var item2 = v[1];
	if (!(item1 == "bar1" && item2 == "bar2" || item1 == "bar2" && item2 == "bar1")){
		fail();
	}
};

HashtableTest.prototype.testClear001 = function() {
	var hash = new Hashtable();

	hash.put("foo1", "bar1");
	hash.put("foo2", "bar2");
	
	hash.clear();
	assertEquals(0, hash.size());
};
