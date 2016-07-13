define('home', ['./service', 'vue'], function(service) {

	var vm = new Vue({
		el: '#home',
		data: {
			message: 'Hello Vue.js!'
		}
	})
	return vm;
});