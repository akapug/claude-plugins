---
description: Add Elide polyglot knowledge to your project's CLAUDE.md
---

0. Inform the user that this process will give Claude access to Elide's polyglot features, cross-language patterns, and performance guidance by copying the `general-elide-knowledge.md` file into the project directory and importing it into the user's CLAUDE.md file. Use the AskUserQuestion tool to ask the user if they want to continue.

1. Copy the file `${CLAUDE_PLUGIN_ROOT}/general-elide-knowledge.md` from within the plugin's installation directory to the user's project `.claude/elide/knowledge` directory using the Bash tool with `cp` command.

2. Append it to the user's CLAUDE.md file as an import:
```markdown
# Elide Knowledge

Elide polyglot runtime knowledge can be found at @.claude/elide/knowledge/general-elide-knowledge.md
```

3. Check if Elide is installed by running `elide --version`. If not installed, provide installation instructions:
```bash
# macOS/Linux
curl -fsSL https://dl.elide.dev/cli/install.sh | bash

# Or with Homebrew
brew install elide-dev/tap/elide
```

4. Inform the user that the process is complete and they can run `/elide:help` to see the plugin's available commands and skills.

5. Recommend the user do the following for the best Elide development experience with Claude:
   - **Explore the REPL**: Run `elide` to open the polyglot REPL and test cross-language imports
   - **Check documentation**: Run `/elide:docs` to fetch current Elide documentation
   - **Enable Chrome DevTools**: For web projects, prompt Claude to *`use the Chrome DevTools MCP server`* for frontend visibility

   Explain that Elide's polyglot capabilities let you write TypeScript, Python, and Ruby that call each other directly without serialization.
