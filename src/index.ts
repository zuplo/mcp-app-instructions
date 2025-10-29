type MCPConfiguration = {
  name: string;
  description?: string;
  officialDocsLink: string;
  installDeepLink?: {
    link: string;
    label: string;
  };
  hint?: {
    type: "info" | "warning";
    title?: string;
    text: string;
  };
  steps?: {
    text: string;
    files?: {
      name: string;
      content: string;
      language: "json" | "typescript";
    }[];
  }[];
};

export const getMcpServerInstructions = ({
  name,
  url,
}: {
  name: string;
  url: string;
}): MCPConfiguration[] => [
  {
    name: "Claude",
    description:
      "OpenAI is a cloud-based AI platform that provides a range of AI services, including natural language processing, machine learning, and computer vision.",
    officialDocsLink: "https://openai.com/api-docs",
    steps: [
      {
        text: "Open Claude Desktop and click Settings in the lower corner",
        files: [
          {
            name: "main.ts",
            language: "typescript",
            content: `import { OpenAI } from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});`,
          },
        ],
      },
      {
        text: "Navigate to *Developer* tab → *Edit Config*",
      },
      {
        text: "Add this configuration to `claude_desktop_config.json`:",
      },
      {
        text: `Save the file and restart Claude Desktop. Look for the 🔨 icon in the bottom-right corner.`,
      },
    ],
  },
  {
    name: "ChatGPT",
    officialDocsLink:
      "https://help.openai.com/en/articles/11487775-connectors-in-chatgpt",
    hint: {
      title: "Requirements",
      text: "ChatGPT Pro, Team, Enterprise, or Edu subscription. Note: MCP support is limited to read-only operations through Deep Research.",
      type: "info",
    },
    steps: [
      {
        text: "Go to Settings → Connectors → Connect",
      },
      {
        text: "Click Custom and add your MCP URL: `https://api.cosmocargo.space/ai/v1/mcp`",
      },
      {
        text: "Provide a name and description for your connector",
      },
      {
        text: "Save and enable the connector. Users must authenticate with the connector before first use.",
      },
      {
        text: "Access through Deep Research in your chat interface",
      },
    ],
  },
  {
    name: "Cursor",
    officialDocsLink: "https://docs.cursor.com/en/context/mcp",
    installDeepLink: {
      link: `cursor://anysphere.cursor-deeplink/mcp/install?name=${name}&config=${btoa(
        JSON.stringify({ url })
      )}`,
      label: "Install MCP in Cursor",
    },
    steps: [
      {
        text: "Create or edit:` ~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (project)",
        files: [
          {
            language: "json",
            name: "mcp.json",
            content: `{
  "mcpServers": {
    "${name}": {
      "url": "${url}"
    }
  }
}`,
          },
        ],
      },
      {
        text: `Restart Cursor to apply the configuration`,
      },
    ],
  },
  {
    name: "VS Code",
    officialDocsLink:
      "https://code.visualstudio.com/docs/copilot/chat/mcp-servers",
    steps: [
      {
        text: "Create .vscode/mcp.json in your workspace (or user-level mcp.json):",
        files: [
          {
            language: "json",
            name: "mcp.json",
            content: `{
  "servers": {
    "${name}": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "${url}"
      ]
    }
  }
}`,
          },
        ],
      },
      {
        text: "Restart VS Code to apply the configuration",
      },
      {
        text: "Use MCP tools in GitHub Copilot Chat by selecting Agent mode",
      },
    ],
  },
];
