#!/usr/bin/env node

/**
 * Elide Docs Redirect Hook
 * 
 * Intercepts WebFetch calls to Elide documentation and redirects
 * to LLM-friendly versions when available.
 */

const fs = require('fs');
const path = require('path');

// Get the tool input from environment or stdin
async function main() {
  const toolInput = process.env.CLAUDE_TOOL_INPUT;
  if (!toolInput) return;
  
  try {
    const input = JSON.parse(toolInput);
    const url = input.url || '';
    
    // Check if this is an Elide docs URL
    if (url.includes('docs.elide.dev') || url.includes('elide.dev/docs')) {
      // Try to redirect to LLM-friendly version
      const llmUrl = getLlmFriendlyUrl(url);
      
      if (llmUrl && llmUrl !== url) {
        console.log(JSON.stringify({
          decision: "modify",
          modifications: {
            url: llmUrl
          },
          message: `Redirecting to LLM-optimized documentation: ${llmUrl}`
        }));
        return;
      }
    }
    
    // Check if fetching elide.dev HTML (redirect to llms.txt if available)
    if (url === 'https://elide.dev' || url === 'https://elide.dev/') {
      console.log(JSON.stringify({
        decision: "modify",
        modifications: {
          url: "https://elide.dev/llms.txt"
        },
        message: "Redirecting to LLM-optimized documentation at elide.dev/llms.txt"
      }));
      return;
    }
    
    // Allow the fetch to proceed normally
    console.log(JSON.stringify({ decision: "allow" }));
    
  } catch (error) {
    // On error, allow the fetch to proceed
    console.log(JSON.stringify({ decision: "allow" }));
  }
}

function getLlmFriendlyUrl(url) {
  // Get cached version info
  const cacheFile = path.join(
    process.env.HOME || '/tmp',
    '.cache',
    'elide-claude-plugin',
    'version.json'
  );
  
  let version = 'latest';
  if (fs.existsSync(cacheFile)) {
    try {
      const cache = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
      version = cache.version || 'latest';
    } catch (e) {
      // Use latest if cache read fails
    }
  }
  
  // Map documentation paths to LLM-friendly versions
  const docMappings = {
    'docs.elide.dev': `https://docs.elide.dev/llms.txt`,
    'elide.dev/docs': `https://elide.dev/llms.txt`,
  };
  
  for (const [pattern, llmUrl] of Object.entries(docMappings)) {
    if (url.includes(pattern)) {
      return llmUrl;
    }
  }
  
  return null;
}

main();
