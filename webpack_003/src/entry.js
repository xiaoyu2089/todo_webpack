//require('./b.js');
var module2 = require('./b.js');
require('./c.js');


//webpack打包的每个js文件都被模块化了,直接访问是不行的。
document.getElementById('btn1').onclick = function() {
	module2.m2();
}