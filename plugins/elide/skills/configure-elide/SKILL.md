---
name: configure-elide
description: Set up an Elide polyglot project with proper structure and dependencies. Use when the user wants to create a new Elide project or convert an existing Node/Python project.
---

# configure-elide

## Before Configuring

1. Ask the user what type of project they want to create:
   - **HTTP API** - TypeScript server with Python processing
   - **Data Pipeline** - Python entrypoint with TypeScript utilities
   - **CLI Tool** - Single or polyglot command-line application
   - **Custom** - User-defined structure

2. Ask which languages they want to use:
   - TypeScript/JavaScript (default: enabled)
   - Python (optional)
   - Ruby (experimental, optional)

## Workflow

### Step 1: Create Project Structure

For an HTTP API project:
```
project/
├── src/
│   ├── api/
│   │   ├── server.ts       # Main HTTP entrypoint
│   │   └── routes.ts       # Route handlers
│   ├── processing/
│   │   └── pipeline.py     # Python data processing
│   └── shared/
│       └── types.ts        # Shared type definitions
├── package.json            # Node dependencies
├── pyproject.toml          # Python dependencies (optional)
├── whiplash.toml           # WHIPLASH config (optional)
└── CLAUDE.md               # Project context
```

### Step 2: Initialize Package Managers

**For TypeScript/JavaScript:**
```bash
pnpm init
# or
npm init -y
```

**For Python:**
```bash
uv init
# or
python -m venv .venv && source .venv/bin/activate
```

### Step 3: Create Sample Cross-Language Code

**src/api/server.ts:**
```typescript
import py from "../processing/pipeline.py"

const app = {
  async handleRequest(req: Request): Promise<Response> {
    const data = await req.json()
    const result = py.process_data(data)
    return new Response(JSON.stringify(result))
  }
}

// Start server on port 3000
console.log("Server starting on http://localhost:3000")
```

**src/processing/pipeline.py:**
```python
def process_data(data: dict) -> dict:
    """Process data with Python's data handling capabilities."""
    # Elide runs this 3x faster than CPython
    result = {
        "processed": True,
        "items": len(data.get("items", [])),
        "summary": summarize(data)
    }
    return result

def summarize(data: dict) -> str:
    return f"Processed {len(data)} fields"
```

### Step 5: Update CLAUDE.md

Append Elide-specific context to the project's CLAUDE.md:

```markdown
## Elide Polyglot Project

This project uses Elide for polyglot development.

### Running
\`\`\`bash
elide run src/api/server.ts
\`\`\`

### Cross-Language Pattern
- TypeScript handles HTTP and orchestration
- Python handles data processing
- Imports work directly: `import py from "./module.py"`

### Performance
- Python code runs 3x faster than CPython
- HTTP endpoints can reach 800k RPS
```

### Step 6: Verify Setup

1. Run `elide --version` to confirm installation
2. Run `elide run src/api/server.ts` to test the setup
3. Check for any import errors or missing dependencies
