# Elide Polyglot Runtime

This project uses Elide, a high-performance polyglot runtime that runs JavaScript/TypeScript, Python, and Ruby code in a unified interpreter with zero-copy cross-language interop.

## Session Setup

**At the start of any Elide development session, proactively suggest:**

1. **Check Elide version** - Run `elide --version` to confirm Elide is installed and detect the version
2. **Start REPL for exploration** - Use `elide` to open the polyglot REPL for testing cross-language patterns
3. **Enable Chrome DevTools** - For web projects, use Chrome DevTools MCP for full frontend visibility

## Core Concepts

### What Makes Elide Different

| Feature | Traditional | Elide |
|---------|-------------|-------|
| Cross-language calls | Serialize to JSON, IPC overhead | Direct call, no marshaling |
| Python performance | CPython baseline | Up to 3x faster |
| HTTP throughput | ~100k RPS (Node) | 800k+ RPS (benchmarked) |
| Multi-language | Separate processes | Single unified interpreter |
| Dependency install | npm/pip (slow) | orogene/uv (extremely fast) |

### Language Support Matrix

| Language | Status | Compatibility | Best For |
|----------|--------|---------------|----------|
| JavaScript/TypeScript | ✅ Stable | ECMA2024, Node API, WinterTC | HTTP APIs, orchestration, UI |
| Python | ✅ Stable | CPython 3.11.x | Data processing, ML, scripts |
| Ruby | 🧪 Experimental | MRI 3.2 | Scripting, DSLs |
| JVM (Java/Kotlin/Scala) | 🧪 Experimental | Via GraalVM | Enterprise integration |
| LLVM (Swift/C++/Rust) | 🧪 Experimental | Via GraalVM | Performance-critical |
| WASM | 🧪 Experimental | WebAssembly | Sandboxed computation |

## Polyglot Patterns

### Cross-Language Imports

```typescript
// TypeScript importing Python
import py from "./data_processor.py"
const result = py.process_data(largeArray)

// TypeScript importing Ruby
import rb from "./config.rb"
const settings = rb.load_config()
```

```python
# Python importing TypeScript
import js from "./utils.ts"
formatted = js.format_output(raw_data)
```

### Passing Functions Across Languages

```typescript
// Pass a TypeScript callback to Python
import py from "./processor.py"

const transformer = (x: number) => x * 2
const results = py.map_with_transform(data, transformer)
// Python receives and calls the TypeScript function directly!
```

### When to Use Polyglot

✅ **Good polyglot use cases:**
- TypeScript HTTP layer + Python ML/data processing
- TypeScript orchestration + Ruby DSL configuration
- Python data pipeline + TypeScript JSON API output
- Gradual migration from Node/Python to Elide

❌ **Avoid polyglot for:**
- Tight loops with frequent cross-language calls (keep in one language)
- Simple scripts that don't need multiple languages
- When code clarity matters more than capability

## Development Workflow

### Workflow Checklist

1. [ ] Verify Elide installation: `elide --version`
2. [ ] Check for existing patterns in codebase
3. [ ] Identify language choice: orchestration (TS), data (Python), scripting (Ruby)
4. [ ] Plan polyglot boundaries (minimize cross-language call frequency in hot paths)
5. [ ] Run and verify: `elide run entrypoint.ts` or `elide run main.py`

### Project Structure

```
.
├── src/
│   ├── api/              # TypeScript HTTP endpoints
│   │   ├── server.ts     # Main entrypoint
│   │   └── routes.ts     # Route handlers
│   ├── processing/       # Python data processing
│   │   ├── pipeline.py   # Data pipeline
│   │   └── ml.py         # ML models
│   └── config/           # Ruby configuration DSL
│       └── settings.rb   # Config loader
└── package.json          # Node dependencies (optional)
```

### Language Selection Guide

| Task Type | Recommended Language | Reason |
|-----------|---------------------|--------|
| HTTP API endpoints | TypeScript | 800k RPS capability, async patterns |
| Data transformation | Python | 3x faster than CPython, pandas/polars |
| ML inference | Python | Ecosystem (PyTorch, scikit-learn) |
| Orchestration/glue | TypeScript | Clean async/await, type safety |
| Config DSL | Ruby | Expressive syntax (experimental) |
| Performance-critical | TypeScript/LLVM | Optimized execution |

## CLI Reference

```bash
# Run code (auto-detects language from extension)
elide run script.ts
elide run script.py
elide run script.rb

# Interactive REPL (supports all languages)
elide

# Start HTTP server
elide serve app.ts

# Run with specific language flags
elide run:js script.js
elide run:python script.py
elide run:ruby script.rb

# Check version
elide --version
```

## Performance Optimization

### Baseline Performance Facts

- **Python**: Up to 3x faster than CPython
- **JavaScript/TypeScript**: Faster than Node v20
- **HTTP**: Up to 800k RPS (TechEmpower benchmarked)
- **Cross-language**: Near-zero overhead (no serialization)
- **Dependencies**: Extremely fast install (orogene, uv)

### Optimization Patterns

1. **Keep hot paths in one language** - Cross-language calls are fast but not free
2. **Use TypeScript for I/O** - Elide's async runtime is highly optimized
3. **Use Python for batch processing** - 3x speedup on compute-heavy work
4. **Profile with hyperfire** - For microbenchmarks
5. **Profile with wrk2** - For HTTP throughput

### What NOT to Optimize

- Don't switch languages for micro-optimizations (<1ms)
- Don't avoid polyglot just to save CPU when clarity matters
- Don't assume language performance matches standard runtimes

## Common Mistakes & Fixes

| Symptom | Fix |
|---------|-----|
| Import not found across languages | Use relative path with extension: `import py from "./module.py"` |
| Slow cross-language calls | Batch calls, keep hot loops in one language |
| Type errors at language boundary | Check type coercion rules in docs |
| Python packages not found | Install with `uv pip install` or check virtual env |
| Node packages not found | Install with `pnpm` or `orogene` |

## Security Model

Elide provides strong isolation:

- **Memory-safe core**: Written in Kotlin and Rust
- **Filesystem isolation**: Virtualized filesystem support
- **Environment isolation**: Restricted host access by default
- **Per-language boundaries**: Security enforced at language level

## Documentation

Fetch and verify your knowledge against current Elide documentation:

- https://docs.elide.dev (latest)
- https://github.com/elide-dev/elide (source + examples)
- https://elide.dev/llms.txt (LLM-optimized, when available)

## Troubleshooting

### Debugging

1. Check Elide version matches expected: `elide --version`
2. Run in verbose mode: `elide run --verbose script.ts`
3. Check for import errors at language boundaries
4. For web apps, use Chrome DevTools for frontend errors

### Getting Help

- GitHub Issues: https://github.com/elide-dev/elide/issues
- Discord: https://discord.gg/elide
- Documentation: https://docs.elide.dev
