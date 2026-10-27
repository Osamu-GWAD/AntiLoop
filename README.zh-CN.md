# AntiLoop

**中文** | [English](https://github.com/Osamu-GWAD/AntiLoop/blob/main/readme.md)

> Antigravity IDE 智能多账号轮换、配额管理与网络优化工具。

## 核心特性

1. **零重启多账号无感轮换**：无需重启 IDE，在多个 Google 账号之间秒级热切换。当当前账号配额耗尽或遭遇限频（HTTP 429）时，AntiLoop 自动无缝切换到备用账号。
2. **支持第三方 AI 模型**：支持接入 OpenAI、Anthropic、DeepSeek 等兼容接口，将外部模型与 Google 原生能力统一管理。
3. **高性能本地代理**：内置流式转发代理，支持 SSE 长连接保活与智能重试，有效避免中断。
4. **实时配额状态栏监控**：状态栏实时显示 Claude、Gemini Pro、Gemini Flash 配额百分比、重置倒计时与进度条。
5. **本地安全加密存储**：账号 Token 使用 AES-256-GCM 硬件加速加密保存在本地 SQLite 数据库中。

---

## 快速上手

### 安装
```bash
antigravity-ide --install-extension antiloop-1.0.0.vsix
```
或者在 IDE 扩展面板中选择 **从 VSIX 安装...**。

### 使用
1. 点击活动栏中的 **AntiLoop** 图标打开面板。
2. 插件会自动导入当前 IDE 已登录的 Google 账号。
3. 点击 **添加账号** 登录更多备用 Google 账号。
4. 开启 **启动轮换** 即可享受自动故障转移与配额轮换。

---

## 许可证

MIT License. Copyright (c) 2026 Osamu-GWAD. 详见 [LICENSE.txt](LICENSE.txt)。
