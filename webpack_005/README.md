## CommonJS 

CommonJs 是服务器端模块的规范，Node.js采用了这个规范。 
根据CommonJS规范，一个单独的文件就是一个模块。加载模块使用require方法，该方法读取一个文件并执行，最后返回文件内部的exports对象。 

CommonJS 加载模块是同步的，所以只有加载完成才能执行后面的操作。
像Node.js主要用于服务器的编程，加载的模块文件一般都已经存在本地硬盘，所以加载起来比较快，不用考虑异步加载的方式，所以CommonJS规范比较适用。
但如果是浏览器环境，要从服务器加载模块，这是就必须采用异步模式。所以就有了 AMD  CMD 解决方案。 

----

## AMD((Asynchromous Module Definition) 

AMD 是 RequireJS 在推广过程中对模块定义的规范化产出 

AMD异步加载模块。它的模块支持对象 函数 构造器 字符串 JSON等各种类型的模块。 

适用AMD规范适用define方法定义模块。 

//通过数组引入依赖 ，回调函数通过形参传入依赖 

```js
define(['someModule1', ‘someModule2’], function (someModule1, someModule2) { 

    function foo () { 
        /// someing 
        someModule1.test(); 
    } 

    return {foo: foo} 
}); 
```

AMD规范允许输出模块兼容CommonJS规范，这时define方法如下： 

```js
define(function (require, exports, module) { 
     
    var reqModule = require("./someModule"); 
    requModule.test(); 
     
    exports.asplode = function () { 
        //someing 
    } 
}); 
```

----

## CMD 

CMD是SeaJS 在推广过程中对模块定义的规范化产出 

## 本例子意图：用webpack实现按需加载

使用到了webpack的 code splitting ，下面是对code splitting的介绍

For big web apps it’s not efficient to put all code into a single file, especially if some blocks of code are only required under some circumstances. Webpack has a feature to split your codebase into “chunks” which are loaded on demand. Some other bundlers call them “layers”, “rollups”, or “fragments”. This feature is called “code splitting”.
It’s an opt-in feature. You can define split points in your code base. Webpack takes care of the dependencies, output files and runtime stuff.
To clarify a common misunderstanding: Code Splitting is not just about extracting common code into a shared chunk. The more notable feature is that Code Splitting can be used to split code into an on demand loaded chunk. This can keep the initial download small and downloads code on demand when requested by the application.

Defining a split point
AMD and CommonJs specify different methods to load code on demand. Both are supported and act as split points:

###CommonJs: require.ensure
require.ensure(dependencies, callback)
The require.ensure method ensures that every dependency in dependencies can be synchronously required when calling the callback. callback is called with the require function as parameter.

Example:
```js
require.ensure(["module-a", "module-b"], function(require) {
    var a = require("module-a");
    // ...
});
```
Note: require.ensure only loads the modules, it doesn’t evaluate them.

###AMD: require
The AMD spec defines an asynchronous require method with this definition:

```js
require(dependencies, callback)
```

When called, all dependencies are loaded and the callback is called with the exports of the loaded dependencies.

Example:
```js
require(["module-a", "module-b"], function(a, b) {
    // ...
});
```
Note: AMD require loads and evaluate the modules. In webpack modules are evaluated left to right.

Note: It’s allowed to omit the callback.

以前我们一般使用define来定义amd的脚本，为了使用code splitting 需要改成requre模式定义

###Chunk content
All dependencies at a split point go into a new chunk. Dependencies are also recursively added.

If you pass a function expression (or bound function expression) as callback to the split point, webpack automatically puts all dependencies required in this function expression into the chunk too.

###Chunk optimization
If two chunks contain the same modules, they are merged into one. This can cause chunks to have multiple parents.

If a module is available in all parents of a chunk, it’s removed from that chunk.

If a chunk contains all modules of another chunk, this is stored. It fulfills multiple chunks.

###Chunk loading
Depending on the configuration option target a runtime logic for chunk loading is added to the bundle. I. e. for the web target chunks are loaded via jsonp. A chunk is only loaded once and parallel requests are merged into one. The runtime checks for loaded chunks whether they fulfill multiple chunks.

###Chunk types

####Entry chunk
An entry chunk contains the runtime plus a bunch of modules. If the chunk contains the module 0 the runtime executes it. If not, it waits for chunks that contains the module 0 and executes it (every time when there is a chunk with a module 0).

####Normal chunk
A normal chunk contains no runtime. It only contains a bunch of modules. The structure depends on the chunk loading algorithm. I. e. for jsonp the modules are wrapped in a jsonp callback function. The chunk also contains a list of chunk id that it fulfills.

####Initial chunk (non-entry)
An initial chunk is a normal chunk. The only difference is that optimization treats it as more important because it counts toward the initial loading time (like entry chunks). That chunk type can occur in combination with the CommonsChunkPlugin.

###Split app and vendor code
To split your app into 2 files, say app.js and vendor.js, you can require the vendor files in vendor.js. Then pass this name to the CommonsChunkPlugin as shown below.

```js
var webpack = require("webpack");

module.exports = {
  entry: {
    app: "./app.js",
    vendor: ["jquery", "underscore", ...],
  },
  output: {
    filename: "bundle.js"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
  ]
};
```

This will remove all modules in the vendor chunk from the app chunk. The bundle.js will now contain just your app code, without any of its dependencies. These are in vendor.bundle.js.

In your HTML page load vendor.bundle.js before bundle.js.

<script src="vendor.bundle.js"></script>
<script src="bundle.js"></script>


###Multiple entry chunks
It’s possible to configure multiple entry points that will result in multiple entry chunks. The entry chunk contains the runtime and there must only be one runtime on a page (there are exceptions).

###Running multiple entry points
With the CommonsChunkPlugin the runtime is moved to the commons chunk. The entry points are now in initial chunks. While only one initial chunk can be loaded, multiple entry chunks can be loaded. This exposes the possibility to run multiple entry points in a single page.

Example:

var webpack = require("webpack");
module.exports = {
    entry: { a: "./a", b: "./b" },
    output: { filename: "[name].js" },
    plugins: [ new webpack.optimize.CommonsChunkPlugin("init.js") ]
}
<script src="init.js"></script>
<script src="a.js"></script>
<script src="b.js"></script>
Commons chunk
The CommonsChunkPlugin can move modules that occur in multiple entry chunks to a new entry chunk (the commons chunk). The runtime is moved to the commons chunk too. This means the old entry chunks are initial chunks now. See all options in the list of plugins.

Optimization
There are optimizing plugins that can merge chunks depending on specific criteria. See list of plugins.

LimitChunkCountPlugin
MinChunkSizePlugin
AggressiveMergingPlugin
Named chunks
The require.ensure function accepts an additional 3rd parameter. This must be a string. If two split point pass the same string they use the same chunk.

require.include
require.include(request)
require.include is a webpack specific function that adds a module to the current chunk, but doesn’t evaluate it (The statement is removed from the bundle).

Example:

require.ensure(["./file"], function(require) {
  require("./file2");
});

// is equals to

require.ensure([], function(require) {
  require.include("./file");
  require("./file2");
});
require.include can be useful if a module is in multiple child chunks. A require.include in the parent would include the module and the instances of the modules in the child chunks would disappear.



