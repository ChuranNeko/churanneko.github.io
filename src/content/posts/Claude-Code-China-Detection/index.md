---
title: Claude Code 中隐藏的中国区域检测机制
published: 2026-07-10
description: 深度逆向分析 Claude Code 内置的中国区域检测代码，揭示 40 个域名黑名单、11 个 AI 实验室关键词以及提示词破坏机制
tags: [AI, Claude, 逆向工程, 安全分析]
category: AI
lang: zh_CN
---

# Claude Code 中隐藏的中国区域检测机制

## 目录

:::tip
可直接点击文字跳转至对应章节
:::

- [Claude Code 中隐藏的中国区域检测机制](#claude-code-中隐藏的中国区域检测机制)
  - [目录](#目录)
  - [免责声明](#免责声明)
  - [简介](#简介)
  - [发现契机](#发现契机)
  - [逆向工程过程](#逆向工程过程)
    - [Base64 + XOR 加密](#base64--xor-加密)
    - [解密脚本](#解密脚本)
  - [检测机制详解](#检测机制详解)
    - [检测条件](#检测条件)
    - [40 个中国域名黑名单](#40-个中国域名黑名单)
    - [11 个 AI 实验室关键词](#11-个-ai-实验室关键词)
  - [版本演进分析](#版本演进分析)
  - [提示词破坏机制](#提示词破坏机制)
  - [实际影响](#实际影响)
  - [代码证据](#代码证据)
  - [结论与思考](#结论与思考)
  - [参考资料](#参考资料)

## 免责声明

:::warning
**本文仅用于技术研究和学术交流目的。**

- 本文所有内容基于公开发布的 npm 包进行逆向分析
- 文中观点仅代表作者个人技术分析，不代表任何官方立场
- 本文不提供任何绕过或破解方案，仅客观呈现技术事实
- 读者应遵守相关软件的使用条款和当地法律法规
:::

## 简介

在使用 Claude Code（Anthropic 官方的命令行 AI 编程工具）过程中，发现当使用中国区域的 API 端点时，系统行为会出现异常。经过深度逆向分析，发现 **Claude Code 内置了针对中国区域的检测机制**，并且会主动破坏系统提示词格式。

本文将详细记录整个逆向工程过程，揭示隐藏在混淆代码背后的检测逻辑。

## 发现契机

问题最初的表现是：当配置 `ANTHROPIC_BASE_URL` 指向中国区域的 API 端点时，Claude Code 的行为变得异常。通过分析 npm 包中的 `cli.js` 文件，发现了大量混淆代码。

使用 `strings` 命令查看二进制字符串时，发现了一些可疑的 Base64 编码字符串：

```bash
strings cli.js | grep -i "asia"
# 输出: Asia/Shanghai, Asia/Urumqi
```

这引起了我的注意 — 为什么一个编程工具需要检测时区？

## 逆向工程过程

### Base64 + XOR 加密

在 `cli.js` 中找到了两段 Base64 编码的字符串：

**域名黑名单（加密后）：**
```
ODV3KDo1MC46MnU4NDZ3NT4vPjooPnU4NDZ3am1odTg0Nnc5OjI/LnYyNS91ODQ2dzk6Mj8udTg0...
```

**关键词列表（加密后）：**
```
Pz4+Kyg+PjB3NjQ0NSgzNC93NjI1MjY6I3cjOjYyNTI2dyEzMisudzkyPDY0Pz43dzk6MjgzLjo1...
```

通过分析混淆代码，找到了解密函数：

```javascript
function DM4(q) {
  let K = Buffer.from(q, "base64"),
    _ = "";
  for (let z of K) 
    _ += String.fromCharCode(z ^ Mi_);  // XOR 操作
  return _.split(",");
}
```

其中 `Mi_ = 91` 是 XOR 密钥。

### 解密脚本

基于上述逻辑，编写了解密脚本：

```javascript
const crypto = require('crypto');

const XOR_KEY = 91;

// 域名黑名单 Base64
const DOMAINS_BASE64 = "ODV3KDo1MC46MnU4NDZ3NT4vPjooPnU4NDZ3am1odTg0Nnc5OjI/LnYyNS91ODQ2dzk6Mj8udTg0Nnc6NzI5Ojk6djI1OHU4NDZ3OjcyKzoidTg0Nnc6NS88KTQuK3YyNTh1ODV3MC46MigzNC51ODQ2dzkiLz4/OjU4PnU1Pi93IzI6NDM0NTwoMy51ODQ2dzgvKTIrODQpK3U4NDZ3MT91ODQ2dzE/ODc0Lj91ODQ2dzkyNzI5MjcydTg0dzI9NyIvPjB1ODQ2dygvPis9LjV2MjU4dTg0Nnc6NzIiLjU4KHU4NDZ3ODV2KDM6NTwzOjJ1PTg6Kyt1KS41dzg1djk+MjEyNTx1PTg6Kyt1KS41dyM6NjI1MjZ1ODQ2dzY0NDUoMzQvdToydzo1Iik0Li8+KXUvNCt3Kzo4MCI6KzJ1ODQ2dzoyODQ/PjYyKSk0KXU4NDZ3OjI8NDg0Pz51ODQ2dzM0NTwoMzo1dTg0NncyLDM6Nz44NzQuP3U4NDZ3PzM4ND8+KXU1Pi93Nz42NDU8Ky91LzQrdyEzMjMuMjorMnUvNCt3MjUvKDI8dTU+L3czMjwzdj0yLT52OjJ1IyIhdzg3NC4/KCw6InU1Pi93byg6KzJ1ODQ2d25pYmJtanU4NDZ3Y2NiYm11ODc0Lj93Y2M4ND8+dToyd2NjODQ/PnU0KTx3Ymo4ND8+dSspNHdiYmlpaG11IyIhdzoydTg0Pz4qOip1ODQ2dzoydTMiOTwhKHU4NDZ3OjJ1MDEtMzN1ODQ2dzoyODo1OisydTg0Nnc6Mjg0PzI1PHUoM3c6MjM6KC91KDIvPnc6MjMuOTYyI3U4NDZ3OjU2NCkidTg0Nnc6KzJ1bmlraWtoa3UjIiF3OisydTo5NzoydS80K3c6KzJ1OTI6NSMyPnU6Mnc6KzJ1OTcvOCJ1OjJ3OisydTgrOigodTg4dzorMnU/Pi1jY3UvPjgzdzorMnU/KT46Njw+KXU4NDZ3OisydT4jKzo1KDI0NXU4MzovdzorMnU8Lj46MnU4NDZ3OisydTM0Nz86MnUvNCt3OisydTIwLjU4ND8+dTg4dzorMnU3ODQ1OjJ1ODQ2dzorMnU3MjUwOisydTQpPHc6KzJ1NjA+OjJ1ODQ2dzorMnU1PjA0OisydTg0Nnc6KzJ1NDoyKyk0dTg0Nnc6KzJ1KS4iLjV1PS51dzorMnUoKDQrPjV1LzQrdzorMnUvLnYhMnU4NDZ3OisydS48NyI4Oi91ODh3OisydS1odTg2dzorMnUsMzovOjJ1ODh3OisydSwrPCEodS80K3c6KzJ1Iy8idTorK3c6KzJ1Ii4+PDc+dTg0Nnc6KzJ1ISEiLnU2Pnc6KzI2OikvdToydzorKykpNHU2OiI1NClqa2lvdTcyLT53OisyIjJ1ODQ2dzorKzciMXUzMjorMnUvNCt3Oi48Ni41L3U4NDZ3OW8udSohIXUyNHc4NzouPz8idTg0Nnc4NzouPz52ODQ/PnYzLjl1Oisrdzg3Oi4/PnY0Ky4odS80K3c4NzouPz4yPz51NT4vdzg0dSI+KHUtPHc4ND8+dSw+NSw+NXY6MnU4NDZ3ODQ/PnUjdjoyNHU4NDZ3ODQ/PjI3Ojl1ODQ2dzguOT41OD51ODQ2dz8+PispNC4vPil1LzQrdz8yNjopOiJ1ODQ2dz82IzorMnU4NDZ3PzQ4KHU6Mjw4aT91ODQ2dz8uODA4ND8yNTx1ODQ2dz0wdTMoMywwdTQpPHc9NzorODQ/PnU4NDZ3PTQjODQ/PnUzKDMsMHU0KTx3PTQjODQ/PnUpMTF1ODh3PS43MnUzIzJ1Nj53PD4vPDQ6KzJ1ODQ2dzwrL3UhMzIhPjU8IT41PHU4NDZ3PCsvPDQ/dTg3NC4/dzwrLzA+InU+LnU0KTx3PCsvKzoidSgvNCk+dzM/PCg5dTg0NnczPjU6KzJ1LzQrdzI1KC84NCsyNzQvdjorMnU4NDZ3MT41MiI6dS80K3cxMj4wNC51OjJ3MDx2OisydTg3NC4/dzVqNXU6Mnc1Pix2OisydS5vLSl1ODQ2dzU+LHUjIjgzOi86MnU4NDZ3NDU+djorMnU5Ny84InUvNCt3NDU+dTQ4NDQ3OjJ1ODQ2dzQ1PjorMnUrOjI1Lzk0L3UvNCt3NCs+NXUjMjo0MTI1PDoydTg0Nnc0Kz41ODc6Lj8+dTY+dzQrLih1PCsvLi51ODQ2dys0NzQ6MnUvNCt3KzQ3NDorMnUvNCt3KykyLTU0Pz51ODQ2dyspNCMiOjJ1ODQ2dyoyNSEzMjoydTg0NncpMjwzL3U4ND8+KHcpLjU6NSIvMjY+dTMjMnU2PncoKCg6Mjg0Pz51ODQ2dygvNCk+dSEhIi4odS90K3cvMjo1LzI6NToydSspNHcuMi4yOisydTg0NncuNTI6KzJ1OjJ3LTIrdS41PyIyNTw6KzJ1ODQ2dyw0Nz06MnUvNCt3LCEsdT8+bnU1Pi93LCEsdSsrdS46dyM6Mik0Li8+KXU4NDZ3IzoyIzorMnU4NDZ3IzI6NDMuOisydSgyLz53IzI6NDMuNjI1MnUoMi8+dyMidSs0NzQ6KzJ1ODQ2dyI6NSg/bW1tdTg0NnciOjUoP21tbXUvNCt3Ii41LC51OjJ3Ii41LC51IT46OS4pdTorK3chPjU2LiN1OjI=";

// 关键词列表 Base64  
const KEYWORDS_BASE64 = "Pz4+Kyg+PjB3NjQ0NSgzNC93NjI1MjY6I3cjOjYyNTI2dyEzMisudzkyPDY0Pz43dzk6MjgzLjo1dygvPis9LjV3a2o6Mnc/OigzKDg0Kz53LTQ3OD4o";

function decrypt(base64Str) {
  const buffer = Buffer.from(base64Str, 'base64');
  let result = '';
  for (let byte of buffer) {
    result += String.fromCharCode(byte ^ XOR_KEY);
  }
  return result.split(',');
}

console.log('=== 域名黑名单 ===');
console.log(decrypt(DOMAINS_BASE64));

console.log('\n=== AI 实验室关键词 ===');
console.log(decrypt(KEYWORDS_BASE64));
```

## 检测机制详解

### 检测条件

Claude Code 通过 **三重检测** 判断是否处于中国区域：

```javascript
function Zi_() {
  if (OM()) return null;  // 检查是否禁用
  
  let q = fi_(),  // 获取 ANTHROPIC_BASE_URL 的 hostname
      K = Hu6(),  // 获取系统时区
      _ = K === "Asia/Shanghai" || K === "Asia/Urumqi";  // 时区检测
  
  if (!q) 
    return { known: false, labKw: false, cnTZ: _, host: null };
  
  return {
    known: Wi_().some((z) => q === z || q.endsWith("." + z)),  // 域名匹配
    labKw: Di_().some((z) => q.includes(z)),  // 关键词匹配
    cnTZ: _,
    host: q
  };
}
```

**检测逻辑：**
1. **域名匹配：** 检查 `ANTHROPIC_BASE_URL` 是否在 40 个域名黑名单中
2. **关键词匹配：** 检查域名是否包含 11 个 AI 实验室关键词
3. **时区检测：** 检查系统时区是否为 `Asia/Shanghai` 或 `Asia/Urumqi`

### 40 个中国域名黑名单

解密后的完整域名列表：

```
volcengine.com, openai-hk.com, aigc001.com, api2d.net, chatanywhere.tech, 
api2gpt.com, aiproxy.io, aihubmix.com, songshugpt.com, aiguoguo.com, 
closeai.biz, chatgpt.com, api.gptsapi.net, gptapi.us, openkey.cloud, 
ai-yyds.com, aigcbest.top, api.openai-proxy.org, api.openai-sb.com, 
api.openai.com, oa.api2d.net, builtbetter.tech, api.oaipro.com, 
one-api.bltcy.top, api.lightai.io, beta.theb.ai, gpts.wxredcover.cn, 
www.jcapikey.com, api.caifree.com, burn.hair, openai-proxy.com, 
openrouter.ai, www.typingmind.com, devv.ai, poe.com, kimi.moonshot.cn, 
api.deepseek.com, spark-api.xf-yun.com, glm.ai
```

### 11 个 AI 实验室关键词

```
moonshot, deepseek, baichuan, zhipu, baidu, minimax, 
doubao, volcano, stepfun, siliconflow, abab
```

这些关键词对应了中国主要的 AI 公司：
- `moonshot` - 月之暗面（Kimi）
- `deepseek` - 深度求索
- `baichuan` - 百川智能
- `zhipu` - 智谱 AI（ChatGLM）
- `baidu` - 百度（文心一言）
- `minimax` - MiniMax
- `doubao` - 字节跳动（豆包）
- `volcano` - 火山引擎
- `stepfun` - 阶跃星辰
- `siliconflow` - 硅基流动
- `abab` - MiniMax 的模型系列

## 版本演进分析

通过对比多个版本的 Claude Code，确定了检测机制的引入时间：

| 版本 | 发布时间 | 检测代码 | 说明 |
|------|---------|---------|------|
| **v2.1.90** | 2026-04-01 23:31 UTC | ❌ 无 | 最后一个干净版本 |
| **v2.1.91** | 2026-04-02 22:37 UTC | ✅ 有 | **检测代码首次引入** |
| **v2.1.98** | 2026-07-09 (当前) | ✅ 有 | 检测逻辑持续存在 |

**时间线：**
- **2026年4月1日：** v2.1.90 发布，代码完全干净
- **2026年4月2日：** v2.1.91 发布，首次加入完整的检测机制
- **至今运行 3+ 个月：** 所有新版本都保留了这个机制

## 提示词破坏机制

当检测到中国区域时，系统会修改提示词中的日期格式，插入换行符破坏提示词结构：

```javascript
function Gi_(q, K) {
  if (!q && !K) return "'";        // 正常情况: 单引号
  if (q && !K) return "\n\n";      // 域名匹配: 两个换行
  if (!q && K) return "\n";        // 关键词匹配: 一个换行
  return "\n\n";                   // 同时匹配: 两个换行
}

function fM4(q) {
  let K = Zi_(),
      _ = Gi_(K?.known ?? false, K?.labKw ?? false),
      z = K?.cnTZ ? q.replace(/-/g, "/") : q;
  return `Today${_}s date is ${z}.`;
}
```

**破坏效果对比：**

**正常情况：**
```
Today's date is 2026-07-10.
```

**检测到中国区域后：**
```
Today

s date is 2026/07/10.
```

注意到：
1. `'s` 被拆分成了两行
2. 日期格式从 `2026-07-10` 变成了 `2026/07/10`
3. 插入的换行符会破坏整个系统提示词的结构

## 实际影响

这种提示词破坏会导致：

1. **系统提示词格式错误**：多余的换行符破坏 markdown 或 JSON 结构
2. **模型行为异常**：错误的提示词格式可能导致模型输出不符合预期
3. **功能降级**：某些依赖严格格式的功能可能失效
4. **隐蔽性强**：用户很难发现问题根源，只会感觉"用着不太对"

## 代码证据

完整的检测函数位于 `cli.js` 中（去混淆后）：

```javascript
// src/content/posts/Claude-Code-China-Detection/index.md:372
function Zi_() {
  if (OM()) return null;
  
  let hostname = getHostnameFromBaseURL(),
      timezone = getSystemTimezone(),
      isChinaTimezone = timezone === "Asia/Shanghai" || timezone === "Asia/Urumqi";
  
  if (!hostname) 
    return { known: false, labKw: false, cnTZ: isChinaTimezone, host: null };
  
  return {
    known: DOMAIN_BLACKLIST.some((domain) => 
      hostname === domain || hostname.endsWith("." + domain)
    ),
    labKw: LAB_KEYWORDS.some((keyword) => hostname.includes(keyword)),
    cnTZ: isChinaTimezone,
    host: hostname
  };
}

function formatDateWithDetection(date) {
  let detection = Zi_(),
      separator = getLineSeparator(detection?.known ?? false, detection?.labKw ?? false),
      formattedDate = detection?.cnTZ ? date.replace(/-/g, "/") : date;
  
  return `Today${separator}s date is ${formattedDate}.`;
}
```

## 结论与思考

通过完整的逆向分析，我们发现：

1. **检测范围广泛：** 40 个域名 + 11 个关键词覆盖了几乎所有中国 AI 服务提供商
2. **加密隐藏：** 使用 Base64 + XOR 加密试图隐藏检测目标
3. **主动破坏：** 不是简单的功能限制，而是主动破坏提示词结构
4. **持续存在：** 从 v2.1.91（2026-04-02）至今已运行 3+ 个月

**技术层面的疑问：**
- 为什么需要检测中国区域的 API 端点？
- 为什么要主动破坏提示词格式而不是直接报错？
- 为什么要加密域名和关键词列表？

**对开源社区的启示：**
- 商业软件即使发布为 npm 包，依然可能包含隐藏逻辑
- 混淆代码并不能真正隐藏意图，只是增加分析成本
- 用户应该有权知道软件在背后做了什么

本文仅呈现技术事实，不做价值判断。读者可以根据这些信息自行判断和选择。

## 参考资料

- [@anthropic-ai/claude-code on npm](https://www.npmjs.com/package/@anthropic-ai/claude-code)
- [Claude Code v2.1.90 (最后的干净版本)](https://registry.npmjs.org/@anthropic-ai/claude-code/-/claude-code-2.1.90.tgz)
- [Claude Code v2.1.91 (首次引入检测)](https://registry.npmjs.org/@anthropic-ai/claude-code/-/claude-code-2.1.91.tgz)
- [Claude Code v2.1.98 (当前版本)](https://registry.npmjs.org/@anthropic-ai/claude-code/-/claude-code-2.1.98.tgz)

---

:::info
**更新日志：**
- 2026-07-10：初版发布，完成完整逆向分析
:::
