---
name: optimize-performance
description: Analyze code for performance bottlenecks and suggest language-optimal implementations leveraging Elide's speed advantages. Use when the user asks about performance or when code seems suboptimal.
---

# optimize-performance

## Before Optimizing

1. Identify the code or file to analyze
2. Determine the current language composition
3. Ask the user about their performance goals:
   - Throughput (requests/second)
   - Latency (response time)
   - Compute efficiency (CPU usage)
   - Memory usage

## Analysis Workflow

### Step 1: Profile Current Performance

Suggest profiling tools:
```bash
# For microbenchmarks
hyperfine 'elide run script.py' 'python script.py'

# For HTTP throughput
wrk -t12 -c400 -d30s http://localhost:3000/api

# For detailed profiling
elide run --profile script.ts
```

### Step 2: Identify Bottlenecks

Look for common performance anti-patterns:

| Pattern | Issue | Fix |
|---------|-------|-----|
| Cross-language calls in tight loops | Overhead per call | Batch operations, keep loop in one language |
| Python for HTTP handling | Not using Elide's HTTP optimization | Use TypeScript for HTTP layer |
| TypeScript for heavy computation | V8 slower than optimized Python in some cases | Profile and consider language switch |
| Synchronous I/O in hot paths | Blocking the event loop | Use async patterns |
| Large object serialization | Unnecessary copying | Pass by reference across languages |

### Step 3: Suggest Language Optimization

**Move to TypeScript when:**
- HTTP endpoint handling (800k RPS capability)
- JSON processing and API responses
- Async orchestration and coordination
- Real-time streaming

**Move to Python when:**
- Data transformation pipelines (3x faster)
- ML model inference
- Numerical computation (NumPy, pandas)
- Batch processing

**Keep in current language when:**
- Code is already in the optimal language for the task
- Optimization would reduce code clarity significantly
- Performance difference is <10%

### Step 4: Optimize Cross-Language Boundaries

```typescript
// ❌ Bad: Many small cross-language calls
for (const item of items) {
  results.push(py.process_one(item))  // N calls!
}

// ✅ Good: Batch operation
const results = py.process_batch(items)  // 1 call
```

### Step 5: Provide Benchmarks

After optimization, show before/after comparison:
```
Before: 1,234 ops/sec (Node baseline)
After:  3,702 ops/sec (Elide optimized) - 3x improvement
```

## Performance Reference

| Operation | Elide Advantage |
|-----------|-----------------|
| Python compute | Up to 3x vs CPython |
| HTTP requests | 800k+ RPS (TechEmpower verified) |
| Cross-language call | ~0.1μs overhead (no serialization) |
| Dependency install | 10-100x faster (orogene/uv) |
