---
name: git-commit
description: 自动分析暂存区变更，生成规范化的 git commit message 并提交
---

# Git Commit 自动提交

自动分析当前 git 暂存区的变更内容，生成符合 conventional commits 规范的中文提交信息，并执行提交。

## 执行步骤

### 1. 检查暂存区状态
先执行 `git diff --cached --stat` 查看已暂存的文件变更概览。

如果暂存区为空，询问用户是否要将所有未暂存的变更 `git add -A` 加入暂存区。

### 2. 分析变更内容
执行 `git diff --cached` 获取详细的变更内容，分析：
- 改动了哪些文件、模块
- 变更类型（新功能、修复、重构、样式、文档等）
- 影响范围和核心改动点

### 3. 生成 commit message

遵循 conventional commits 规范，格式如下：

```
<type>(<scope>): <简短描述>

<详细说明（可选）>
```

type 类型选择：
- `feat`: 新功能
- `fix`: 修复 bug
- `refactor`: 重构（不改变功能）
- `style`: 样式调整
- `docs`: 文档变更
- `chore`: 构建/工具/依赖变更
- `perf`: 性能优化

规则：
- 标题不超过 50 个字符
- 使用中文描述
- scope 使用英文（如 components, pages, utils）
- 如果有多个不相关的改动，建议拆分提交

### 4. 展示并确认
将生成的 commit message 展示给用户，询问是否确认提交。

### 5. 执行提交
用户确认后，执行 `git commit -m "生成的message"`

### 6. 输出结果
显示提交成功信息，包括 commit hash 和简短摘要。
