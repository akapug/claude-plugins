#!/usr/bin/env node

/**
 * Elide Version Cache Hook
 * 
 * Detects and caches the Elide version for the current project.
 * This enables version-aware documentation and feature guidance.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function main() {
  try {
    // Try to get Elide version
    const version = execSync('elide --version 2>/dev/null', { encoding: 'utf-8' }).trim();
    
    // Parse version (format: "elide 1.0.0-beta10" or similar)
    const versionMatch = version.match(/(\d+\.\d+\.\d+(?:-[a-zA-Z0-9]+)?)/);
    const elideVersion = versionMatch ? versionMatch[1] : 'unknown';
    
    // Cache the version for other hooks/skills to use
    const cacheDir = path.join(process.env.HOME || '/tmp', '.cache', 'elide-claude-plugin');
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
    
    const cacheFile = path.join(cacheDir, 'version.json');
    const cacheData = {
      version: elideVersion,
      detectedAt: new Date().toISOString(),
      cwd: process.cwd()
    };
    
    fs.writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2));
    
    // Output for Claude to see
    console.log(`Elide version ${elideVersion} detected and cached.`);
    
  } catch (error) {
    // Elide not installed or not in PATH
    console.log('Elide not detected. Install with: curl -fsSL https://dl.elide.dev/cli/install.sh | bash');
  }
}

main();
