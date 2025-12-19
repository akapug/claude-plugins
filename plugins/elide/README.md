# Elide Claude Code Plugin

A Claude Code plugin for polyglot development with Elide's high-performance multi-language runtime, providing optimized documentation, cross-language patterns, and performance guidance.

## Features

- **Polyglot Expertise**: Claude understands JS/TS, Python, Ruby interop without serialization
- **Performance Guidance**: Leverage Elide's 3x Python speedup and 800k RPS HTTP capabilities
- **WHIPLASH Integration**: Build system patterns for polyglot projects
- **Cross-Language Patterns**: Direct function calls between languages, no marshaling
- **Version-Aware Docs**: Points Claude to the right documentation for your Elide version

## Installation

### Add the Elide marketplace

```bash
claude plugin marketplace add elide-dev/claude-plugins
```

### Install the Elide plugin

```bash
claude plugin install elide@elide-plugins --scope project
```

> [!NOTE]
> We suggest installing the plugin at the `project` scope (`settings.json` are committed to git).
> Or by using the `local` scope (`settings.local.json` are not committed to git).

### Configure and Initialize the plugin

After installing, in an active session, run:
```bash
/plugin
```
- select `elide-plugins` under the `marketplaces` tab
- select the `auto-update` option to enable automatic updates

Then run the initialize command to import curated Elide resources into your project's CLAUDE.md file.

```bash
/elide:init
```

## Commands

- `/elide:init` - Initialize the plugin and import Elide knowledge
- `/elide:help` - Show the plugin's features, commands, and skills
- `/elide:run` - Run polyglot code with Elide
- `/elide:benchmark` - Benchmark your code against Node/CPython

## Skills

This plugin provides skills that Claude will automatically invoke when appropriate:

### 1. Run Polyglot (`run-polyglot`)
Execute code across JavaScript/TypeScript, Python, and Ruby with automatic language detection and cross-language import handling.

### 2. Configure Elide (`configure-elide`)
Set up Elide projects with proper polyglot structure and dependencies.

### 3. Performance Optimization (`optimize-performance`)
Analyze code for performance bottlenecks and suggest language-optimal implementations leveraging Elide's speed advantages.

### 4. Cross-Language Interop (`cross-language-interop`)
Guide developers through importing Python from TypeScript, passing functions across language boundaries, and optimal interop patterns.

## Background Hooks

The plugin includes background hooks that:
- Automatically redirect to LLM-friendly Elide docs instead of HTML pages
- Detect your project's Elide version for versioned documentation
- Check plugin initialization status on session start

## Recommended Permissions

For the best experience, add these permissions to your project or user settings:

```json
{
  "permissions": {
    "allow": [
      "Bash(elide run:*)",
      "Bash(elide repl)",
      "Bash(elide serve)",
      "WebFetch(domain:elide.dev)",
      "WebFetch(domain:docs.elide.dev)",
      "WebFetch(domain:raw.githubusercontent.com)",
      "Skill(elide:run-polyglot)",
      "Skill(elide:configure-elide)"
    ]
  }
}
```

## License

MIT
