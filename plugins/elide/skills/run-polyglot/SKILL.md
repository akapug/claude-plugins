---
name: run-polyglot
description: Execute polyglot code with Elide. Use when the user wants to run TypeScript, Python, Ruby, or mixed-language code with Elide's runtime.
---

# run-polyglot

## Before Running

1. Use the Glob tool to detect the project structure and identify:
   - Main entrypoint files (*.ts, *.py, *.rb)
   - Cross-language imports (look for `import py from`, `import js from`, etc.)

2. Verify Elide is installed: `elide --version`

3. If the user hasn't specified a file, detect the likely entrypoint:
   - Look for `src/index.ts`, `src/main.ts`, `main.py`, `app.py`
   - Check package.json scripts for configured entrypoints

## Workflow

### Step 1: Detect Language

Determine the primary language from file extension:
- `.ts`, `.tsx`, `.mts` → TypeScript
- `.js`, `.jsx`, `.mjs` → JavaScript
- `.py` → Python
- `.rb` → Ruby

### Step 2: Check for Cross-Language Dependencies

Scan the file for cross-language imports:
```typescript
// Look for patterns like:
import py from "./module.py"
import rb from "./config.rb"
```

If found, inform the user that Elide will handle cross-language imports automatically.

### Step 3: Run the Code

Execute with Elide:
```bash
elide run <filename>
```

For specific language modes:
```bash
elide run:js script.js      # Force JavaScript mode
elide run:python script.py  # Force Python mode
elide run:ruby script.rb    # Force Ruby mode
```

### Step 4: Handle Output

1. Display stdout/stderr to the user
2. If errors occur at language boundaries, explain the cross-language type coercion rules
3. Suggest optimizations if performance warnings appear

## Common Issues

| Issue | Solution |
|-------|----------|
| Import not found | Ensure relative path includes file extension |
| Type mismatch | Check Elide's type coercion documentation |
| Module not installed | Use `pnpm install` (JS) or `uv pip install` (Python) |

## Examples

**Running TypeScript that imports Python:**
```bash
elide run src/api/server.ts
# Automatically handles: import py from "./ml/model.py"
```

**Running Python that imports TypeScript:**
```bash
elide run src/pipeline.py
# Automatically handles: import js from "./utils.ts"
```
