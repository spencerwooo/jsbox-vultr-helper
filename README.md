![img](https://i.loli.net/2018/06/25/5b30d07d03b86.png)

# :cloud: Vultr Helper

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/spencerwoo98/jsbox-vultr-helper/blob/master/LICENSE)
![love](https://img.shields.io/badge/Made%20with-love-ff69b4.svg)
![jsbox](https://img.shields.io/badge/JSBox-compatible-green.svg)

一款运行在 JSBox (iOS) 上的 Vultr 服务器账户查询小工具。

Vultr Helper 利用 [Vultr](https://vultr.com) 提供的 API 查询您的账户余额、账户信息以及本月花销。

同时以小组件的形式完美的展现在 Today 栏目里面。

[Vultr-Helper 下载地址](https://xteko.com/redir?name=Vultr-Helper&url=https://raw.githubusercontent.com/spencerwoo98/jsbox-vultr-helper/master/vultr-helper.js)

![img](https://i.loli.net/2018/06/27/5b33475402316.png)

<br>

## 1. 申请您自己的 API Key

访问链接 :link: [Vultr API Key](https://my.vultr.com/settings/#settingsapi) 来生成您自己的 API Key，此脚本依赖于 API Key 与 Vultr 账户进行沟通。

![img](https://i.loli.net/2018/06/23/5b2e35fd242b2.jpg)

<br>

## 2. 更改 API 的 IP 使用权限

Vultr 的 API 权限管理很合理。
请在刚刚 API Key 申请页面下面的 Access Control 部分将您自己的 IP 地址添加至白名单（或者允许全部 IPv4 地址访问）。

<br>

## 3. 将代码第一行 `apiKey` 更换成您自己的 API Key

这样运行，就可以显示您 Vultr 云账户中包括账户邮箱、账户姓名、余额、本月使用金额等等信息。

<br>

## 4. 利用 `curl` 请求你的 Server 的唯一识别码 `serverSubId`

> v1.1.0 新版本功能：根据服务器唯一识别码更新服务器信息。

在终端中运行代码：

```shell
curl -H 'API-Key: YOUR_OWN_API_KEY' "https://api.vultr.com/v1/server/list"
```

同样也要将上面命令中的 `API-Key` 后面换成你自己的 `API_Key`，得到返回数据的每个级别就是服务器唯一识别码，即 Server `SUBID`.

![img](https://i.loli.net/2018/06/27/5b334eacc86d5.jpg)

这样找到服务器唯一识别码之后，将此项数据在代码中更新，这样也就得到了服务器的具体信息显示。

推荐如果将本小组件添加至 Today Widget，那么推荐将视图高度设置为 300.

<br>

欢迎来 Star 与 Fork，项目地址位于 --> https://github.com/spencerwoo98/jsbox-vultr-helper

欢迎来我的博客看看，我的博客在 --> https://spencerwoo.com

<br>

# License

This project is published via the [MIT License](https://github.com/spencerwoo98/jsbox-vultr-helper/blob/master/LICENSE)

© Spencer Woo