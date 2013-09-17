Bodule
======

Bodule是一个浏览器端JavaScript模块化的解决方案。以CommonJS标准编写模块，一处编写，到处使用（服务端和客户端）。提供[bodule.org](http://bodule.org)云服务，无需下载管理第三方类库。

### 目前Bodule包含：

#### 1. 干净的模块加载器
[bodule.js](https://github.com/Bodule/bodule-engine)，模块规范与AMD、CMD类似；但：

- 没有匿名模块
- 没有浏览器兼容性
- 没有插件

使用CoffeeScript编写，用Uglify压缩后6.1k；

#### 2. 构建工具

[grunt-bodule-wrapping](https://github.com/Bodule/grunt-bodule-wrapping)，可以把标准的CommonJS模块wrapping成bodule.js可加载的模块。

> 一次编写，到处执行；

#### 3. express中间件

[bodule-middleware](https://github.com/island205/bodule-middleware)，搭建起服务端模块和客户端模块的桥梁，只需要编写CommonJS模块，其他全部都由nodule搞定；

#### CommonJS模块云服务

[bodule.org](http://bodule.org)，在npm源中有大量优秀模块，bodule-cloud通过bodule.js为大家桥接出来，非常方便的在客户端使用！

### Bodule还想做：

- Bower模块云服务：兼容Bower模块；
- 云服务CDN化：提供CDN话的云服务，让Bodule.js可以直接用于生产环境中；
- 基于Bodule的前端开发解决方案，倾向于云化。