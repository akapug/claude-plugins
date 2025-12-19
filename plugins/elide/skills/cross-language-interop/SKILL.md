---
name: cross-language-interop
description: Guide developers through Elide's cross-language interop patterns - importing Python from TypeScript, passing functions across boundaries, and optimal interop patterns. Use when the user asks about mixing languages.
---

# cross-language-interop

## Core Concept

Elide's key differentiator: **No serialization between languages.**

Traditional polyglot:
```
TypeScript → JSON.stringify → IPC → JSON.parse → Python
(~1-10ms overhead per call)
```

Elide polyglot:
```
TypeScript → direct call → Python
(~0.1μs overhead per call)
```

## Interop Patterns

### Pattern 1: Import Module

**TypeScript importing Python:**
```typescript
// Relative path with extension is required
import py from "./data_processor.py"

// Access functions directly
const result = py.process(data)

// Access classes
const processor = new py.DataProcessor()
```

**Python importing TypeScript:**
```python
# Relative path with extension is required
import js from "./utils.ts"

# Access functions directly
formatted = js.format_output(raw_data)

# Access objects
config = js.load_config()
```

### Pattern 2: Pass Functions Across Boundaries

```typescript
// Define a TypeScript function
const transformer = (x: number): number => x * 2

// Pass it to Python
import py from "./processor.py"
const results = py.map_with_transform(data, transformer)
// Python calls transformer() directly - no serialization!
```

```python
# processor.py
def map_with_transform(data: list, transform_fn) -> list:
    # transform_fn is a live TypeScript function
    return [transform_fn(x) for x in data]
```

### Pattern 3: Pass Objects and Classes

```typescript
// TypeScript class
class DataPoint {
  constructor(public x: number, public y: number) {}
  magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
}

import py from "./analyzer.py"
const point = new DataPoint(3, 4)
const analysis = py.analyze_point(point)
// Python receives the actual TypeScript object
```

```python
# analyzer.py
def analyze_point(point) -> dict:
    # point is the actual TypeScript object
    # Can call TypeScript methods!
    mag = point.magnitude()
    return {"x": point.x, "y": point.y, "magnitude": mag}
```

### Pattern 4: Async/Await Across Languages

```typescript
import py from "./async_processor.py"

async function processAsync() {
  // Await Python async functions
  const result = await py.async_process(data)
  return result
}
```

```python
# async_processor.py
async def async_process(data):
    # Python async works with TypeScript await
    await some_io_operation()
    return processed_data
```

## Type Coercion Rules

| TypeScript Type | Python Type | Notes |
|----------------|-------------|-------|
| `number` | `int` or `float` | Based on value |
| `string` | `str` | Direct |
| `boolean` | `bool` | Direct |
| `Array<T>` | `list` | Elements coerced recursively |
| `object` | `dict` | Keys become strings |
| `null` | `None` | Direct |
| `undefined` | `None` | Coerced to None |
| `function` | `callable` | Live reference, no serialization |
| `class instance` | `object` | Methods accessible |

## Best Practices

### DO:
- ✅ Use batch operations across language boundaries
- ✅ Keep tight loops in a single language
- ✅ Pass functions for flexibility
- ✅ Use TypeScript for HTTP, Python for data processing

### DON'T:
- ❌ Call across languages in tight loops
- ❌ Assume Python performance matches CPython (it's faster!)
- ❌ Forget file extensions in imports
- ❌ Mix sync and async incorrectly

## Debugging Interop Issues

| Error | Cause | Fix |
|-------|-------|-----|
| `Module not found` | Missing file extension | Add `.py` or `.ts` to import |
| `Function is not callable` | Async/sync mismatch | Check if function needs `await` |
| `TypeError at boundary` | Type coercion issue | Check type coercion rules |
| `Undefined attribute` | Python `None` vs TS `undefined` | Handle both cases |
