下了点歌，但歌曲文件未进行目录分类，神烦。
所以写了这仅针对目录（排除子目录）进行分类处理，将同一个演唱者的歌曲归类到同一个目录下。

歌曲分类
==============
对某个目录下的歌曲进行分类


归类规则
==============
匹配规则为
> [音轨.]演唱者 [& 演唱者2] - 歌曲名[其他].[扩展]

通过正则匹配出文件名中的演唱者，然后创建对应的目录，将文件移动到文件夹中

注：合唱的歌曲名字，会将文件归类到第一个演唱者的目录下（个人爱好）


效果
===============
归类前目录文件结构
````
DIR
│  01.Amy Diamond - Heartbeats - 副本 - 副本.mp3
│  01.Amy Diamond - Heartbeats.mp3
│  02.泳儿 - 原来爱情那么难 - 副本 - 副本.mp3
│  02.泳儿 - 原来爱情那么难.mp3
│  03.Joel Hanson & Sara Groves - Traveling Light - 副本.mp3
│  03.Joel Hanson & Sara Groves - Traveling Light.mp3
│  Amy Diamond - Heartbeats - 副本.mp3
│  Amy Diamond - Heartbeats.mp3
│  app.js
│  Joel Hanson & Sara Groves - Traveling Light - 副本 - 副本.mp3
│  Joel Hanson & Sara Groves - Traveling Light.mp3
│  泳儿 - 原来爱情那么难 - 副本.mp3
│  泳儿 - 原来爱情那么难.mp3
│
├─泳儿
│      泳儿 - 原来爱情那么难.mp3
│
└─临时目录
````


归类后的目录结构
````
DIR
│  app.js
│
├─Amy Diamond
│      01.Amy Diamond - Heartbeats - 副本 - 副本.mp3
│      01.Amy Diamond - Heartbeats.mp3
│      Amy Diamond - Heartbeats - 副本.mp3
│      Amy Diamond - Heartbeats.mp3
│
├─Joel Hanson
│      03.Joel Hanson & Sara Groves - Traveling Light - 副本.mp3
│      03.Joel Hanson & Sara Groves - Traveling Light.mp3
│      Joel Hanson & Sara Groves - Traveling Light - 副本 - 副本.mp3
│      Joel Hanson & Sara Groves - Traveling Light.mp3
│
├─泳儿
│      02.泳儿 - 原来爱情那么难 - 副本 - 副本.mp3
│      02.泳儿 - 原来爱情那么难.mp3
│      泳儿 - 原来爱情那么难 - 副本.mp3
│      泳儿 - 原来爱情那么难.mp3
│
└─临时目录
````
