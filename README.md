# Elide Claude Code Plugins

Official [Claude Code](https://claude.ai/code) plugins for the [Elide](https://elide.dev) polyglot runtime.

## Available Plugins

### Elide

A Claude Code plugin for developing polyglot applications with Elide's high-performance multi-language runtime, providing access to:
- Polyglot programming patterns (JS/TS + Python + Ruby in one codebase)
- Cross-language interop without serialization
- Performance optimization guidance (3x faster Python, 800k RPS HTTP)
- WHIPLASH build system integration
- Best practices for the Elide way of building

## Adding to Your Project

To automatically install this marketplace for all team members, add to your project's `.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "elide-plugins": {
      "source": {
        "source": "github",
        "repo": "akapug/claude-plugins"
      }
    }
  }
}
```

## Contributing

To add a new plugin:

1. Create your plugin in the `plugins/` directory
2. Add an entry to `.claude-plugin/marketplace.json`
3. Submit a pull request

## License

MIT - See individual plugin directories for specific licenses.

## Links

- [Elide Runtime](https://elide.dev)
- [Elide Documentation](https://docs.elide.dev)
- [Elide GitHub](https://github.com/elide-dev/elide)
- [Claude Code](https://claude.ai/code)
- [Claude Code Plugin Documentation](https://docs.anthropic.com/en/docs/claude-code/plugins)
