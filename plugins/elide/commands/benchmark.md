---
description: Benchmark your code against Node.js or CPython to show Elide's performance advantage
---

1. Ask the user which file or code snippet they want to benchmark.

2. Determine the language from the file extension:
   - `.ts`, `.js` → Compare against Node.js
   - `.py` → Compare against CPython

3. Create a simple benchmark that:
   - Runs the code N times (default: 1000) with Elide
   - Runs the same code N times with the reference runtime
   - Reports timing comparison

4. Use hyperfine if available for more accurate benchmarking:
```bash
hyperfine --warmup 3 'elide run script.py' 'python script.py'
```

5. Present results showing Elide's performance advantage (typically 3x for Python, faster for JS/TS).

6. Suggest optimization opportunities based on the code patterns.
