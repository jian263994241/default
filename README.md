# scaffold-default

## 目录结构

#### /mod - 模块

- /mod/index/index.js  index 脚本模块

- /mod/index/index.tpl.html  index 动态模块 pack时并入 main.js


#### /page - Ajax page

- /page/index.html - index 模块入口

#### /res - 全局资源

- /res/css/ - 全局样式(CSS,less)

- /res/image/ - 图片

- /res/icon/ - icon

#### /third/ - 第三方 模块以外的资源 cue 优化时会忽略改目录
- /third/framework7 - 框架

#### main.entry.js - App 入口

## 编译

- `c release build` - 编译
- `c release dist` - 编译&压缩
- `c release prod` - 编译&压缩&md5
