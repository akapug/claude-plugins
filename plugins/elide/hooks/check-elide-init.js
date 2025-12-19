#!/usr/bin/env node

/**
 * Check Elide Init Hook
 * 
 * Checks if the Elide plugin has been initialized for the current project.
 * Prompts user to run /elide:init if not initialized.
 */

const fs = require('fs');
const path = require('path');

async function main() {
  const cwd = process.cwd();
  
  // Check for Elide knowledge directory
  const knowledgePath = path.join(cwd, '.claude', 'elide', 'knowledge');
  const claudeMdPath = path.join(cwd, 'CLAUDE.md');
  
  // Check if knowledge directory exists
  const hasKnowledge = fs.existsSync(path.join(knowledgePath, 'general-elide-knowledge.md'));
  
  // Check if CLAUDE.md references Elide
  let claudeMdHasElide = false;
  if (fs.existsSync(claudeMdPath)) {
    const claudeMd = fs.readFileSync(claudeMdPath, 'utf-8');
    claudeMdHasElide = claudeMd.includes('elide') || claudeMd.includes('Elide');
  }
  
  // Detect if this is an Elide project
  const isElideProject = detectElideProject(cwd);
  
  if (isElideProject && !hasKnowledge) {
    console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡️ ELIDE PROJECT DETECTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This appears to be an Elide polyglot project, but the Elide
plugin hasn't been initialized yet.

Run /elide:init to:
• Import Elide knowledge into your CLAUDE.md
• Enable polyglot development features
• Get cross-language interop guidance

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
  }
}

function detectElideProject(cwd) {
  // Look for signs this is an Elide project
  const indicators = [
    // Cross-language imports in TS/JS files
    () => {
      const tsFiles = findFiles(cwd, ['.ts', '.js'], 3);
      for (const file of tsFiles) {
        const content = fs.readFileSync(file, 'utf-8');
        if (content.includes('import py from') || content.includes('import rb from')) {
          return true;
        }
      }
      return false;
    },
    // Cross-language imports in Python files
    () => {
      const pyFiles = findFiles(cwd, ['.py'], 3);
      for (const file of pyFiles) {
        const content = fs.readFileSync(file, 'utf-8');
        if (content.includes('import js from') || content.includes('import ts from')) {
          return true;
        }
      }
      return false;
    },
    // Elide mentioned in package.json
    () => {
      const pkgPath = path.join(cwd, 'package.json');
      if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
        return JSON.stringify(pkg).toLowerCase().includes('elide');
      }
      return false;
    }
  ];
  
  for (const check of indicators) {
    try {
      if (check()) return true;
    } catch (e) {
      // Ignore errors in detection
    }
  }
  
  return false;
}

function findFiles(dir, extensions, maxDepth, currentDepth = 0) {
  const files = [];
  if (currentDepth >= maxDepth) return files;
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      // Skip node_modules and hidden directories
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
      
      if (entry.isDirectory()) {
        files.push(...findFiles(fullPath, extensions, maxDepth, currentDepth + 1));
      } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  } catch (e) {
    // Ignore permission errors etc.
  }
  
  return files.slice(0, 10); // Limit to 10 files for performance
}

main();
