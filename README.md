# :cloud: Vultr Helper

一款运行在 JSBox (iOS) 上的 Vultr 服务器账户查询小工具

Vultr Helper 利用 [Vultr](https://vultr.com) 提供的 API 查询您的账户余额、账户信息以及本月花销。

同时以小组件的形式完美的展现在 Today 栏目里面。

![img](https://i.loli.net/2018/06/23/5b2e36cb25d0a.png)

## 1. 申请您自己的 API Key

访问链接 :link: [Vultr API Key](https://my.vultr.com/settings/#settingsapi) 来生成您自己的 API Key，此脚本依赖于 API Key 与 Vultr 账户进行沟通。

![img](https://i.loli.net/2018/06/23/5b2e35fd242b2.jpg)

## 2. 更改 API 的 IP 使用权限

Vultr 的 API 权限管理很合理。
请在刚刚 API Key 申请页面下面的 Access Control 部分将您自己的 IP 地址添加至白名单（或者允许全部 IPv4 地址访问）。

## 3. 将代码第一行 `apiKey` 更换成您自己的 API Key

这样运行，就可以显示您 Vultr 云账户中包括账户邮箱、账户姓名、余额、本月使用金额等等信息。

欢迎来 Star 与 Fork，项目地址位于 --> https://github.com/spencerwoo98/jsbox-vultr-helper

欢迎来我的博客看看，我的博客在 --> https://spencerwoo.com

# License

This project is published via the [MIT License](https://github.com/spencerwoo98/jsbox-vultr-helper/blob/master/LICENSE)

© Spencer Woo