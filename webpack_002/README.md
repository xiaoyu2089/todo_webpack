
##webpack的入口文件
>'webpack.config.js':webpack 命令会尝试加载当前目录下的 `webpack.config.js` 文件。

----

##更友好的输出

```bash
$ webpack --progress --colors
```

----

##监控模式
我们并不希望每一个变更都需要去手动编译，则可以通过以下命令来改善。

```bash
$ webpack --progress --colors --watch
```

这样，webpack 会缓存未变更的模块而输出变更的模块。

> 开启 webpack 监控模式后，webpack 会给所有文件添加用于编译的文件监控。如果有任何变更，将会触发编译。当缓存开启时，webpack 会在内存中保存所有模块内容并在没变更时直接重用。

-----

## 开发服务器

开发服务器是一个更好的选择

```bash
$ npm install webpack-dev-server -g
```

然后

```bash
$ webpack-dev-server --progress --colors
```

这会在 localhost:8080 提供一个小的 express 服务器来提供静态资源以及自动编译的套件。当有套件重新编译后，会通过 socket.io 来自动更新浏览器页面。在浏览器中打开  http://localhost:8080/webpack-dev-server/bundle 。

> webpack-dev-server 使用了 webpack 监控模式，同时也阻止了 webpack 生成结果文件到硬盘，而是直接通过内存来提供服务。
