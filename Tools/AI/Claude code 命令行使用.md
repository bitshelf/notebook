---
tags:
  - Claude
---
## Claude Code 跳过登录
```json title:~/.claude.json
"hasCompletedOnboarding": true,
```

## 更换大模型
```shell
export ANTHROPIC_AUTH_TOKEN=sk-4f0356be411646fd9ed6fb5001f08e7b
export API_TIMEOUT_MS=600000
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_OPUS_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_SONNET_MODEL=deepseek-v4-pro[1m]
export ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-v4-flash
export CLAUDE_CODE_SUBAGENT_MODEL=deepseek-v4-flash
export CLAUDE_CODE_EFFORT_LEVEL=max
```

## Link
- [Claude Code - 智谱AI开放文档](https://docs.bigmodel.cn/cn/coding-plan/tool/claude#%E6%96%B9%E5%BC%8F%E4%B8%89%EF%BC%9A%E6%89%8B%E5%8A%A8%E9%85%8D%E7%BD%AE)
- [接入 Claude Code \| DeepSeek API Docs](https://api-docs.deepseek.com/zh-cn/guides/agent_integrations/claude_code)