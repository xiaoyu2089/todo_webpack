//以前我们一般使用define来定义amd的脚本，为了使用code splitting 需要改成requre模式定义
require(['./service', 'vue'], function() {
	var vm = new Vue({
		el: '#home',
		data: {
			message: 'Hello Vue.js!'
		}
	})
	return vm;
});