define('module2', ['abc'], function(abc) {
	var m2 = function() {
		abc.m1();
		console.log('m2');
	};
	return {
		m2: m2
	}
});