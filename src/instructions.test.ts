import { describe, it, expect } from "vitest";
import { getMcpServerInstructions } from "./index.js";

describe("getMcpServerInstructions", () => {
  const testName = "TestServer";
  const testUrl = "https://api.example.com/mcp";

  it("should return an array of configurations", () => {
    const result = getMcpServerInstructions({ name: testName, url: testUrl });
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should return exactly 4 configurations (Claude, ChatGPT, Cursor, VS Code)", () => {
    const result = getMcpServerInstructions({ name: testName, url: testUrl });
    expect(result).toHaveLength(4);
  });

  describe("Claude configuration", () => {
    it("should have correct structure and properties", () => {
      const result = getMcpServerInstructions({ name: testName, url: testUrl });
      const claudeConfig = result.find((config) => config.name === "Claude");

      expect(claudeConfig).toBeDefined();
      expect(claudeConfig?.name).toBe("Claude");
      expect(claudeConfig?.description).toContain("OpenAI");
      expect(claudeConfig?.officialDocsLink).toBe(
        "https://openai.com/api-docs"
      );
    });

    it("should have installation steps", () => {
      const result = getMcpServerInstructions({ name: testName, url: testUrl });
      const claudeConfig = result.find((config) => config.name === "Claude");

      expect(claudeConfig?.steps).toBeDefined();
      expect(claudeConfig?.steps?.length).toBeGreaterThan(0);
    });

    it("should include code example in first step", () => {
      const result = getMcpServerInstructions({ name: testName, url: testUrl });
      const claudeConfig = result.find((config) => config.name === "Claude");
      const firstStep = claudeConfig?.steps?.[0];

      expect(firstStep?.files).toBeDefined();
      expect(firstStep?.files?.[0].name).toBe("main.ts");
      expect(firstStep?.files?.[0].language).toBe("typescript");
      expect(firstStep?.files?.[0].content).toContain("import { OpenAI }");
    });
  });

  describe("ChatGPT configuration", () => {
    it("should have correct structure and properties", () => {
      const result = getMcpServerInstructions({ name: testName, url: testUrl });
      const chatgptConfig = result.find((config) => config.name === "ChatGPT");

      expect(chatgptConfig).toBeDefined();
      expect(chatgptConfig?.name).toBe("ChatGPT");
      expect(chatgptConfig?.officialDocsLink).toBe(
        "https://help.openai.com/en/articles/11487775-connectors-in-chatgpt"
      );
    });

    it("should have a hint about requirements", () => {
      const result = getMcpServerInstructions({ name: testName, url: testUrl });
      const chatgptConfig = result.find((config) => config.name === "ChatGPT");

      expect(chatgptConfig?.hint).toBeDefined();
      expect(chatgptConfig?.hint?.type).toBe("info");
      expect(chatgptConfig?.hint?.title).toBe("Requirements");
      expect(chatgptConfig?.hint?.text).toContain("ChatGPT Pro");
    });

    it("should have installation steps", () => {
      const result = getMcpServerInstructions({ name: testName, url: testUrl });
      const chatgptConfig = result.find((config) => config.name === "ChatGPT");

      expect(chatgptConfig?.steps).toBeDefined();
      expect(chatgptConfig?.steps?.length).toBe(5);
    });
  });

  describe("Cursor configuration", () => {
    it("should have correct structure and properties", () => {
      const result = getMcpServerInstructions({ name: testName, url: testUrl });
      const cursorConfig = result.find((config) => config.name === "Cursor");

      expect(cursorConfig).toBeDefined();
      expect(cursorConfig?.name).toBe("Cursor");
      expect(cursorConfig?.officialDocsLink).toBe(
        "https://docs.cursor.com/en/context/mcp"
      );
    });

    it("should have install deep link", () => {
      const result = getMcpServerInstructions({ name: testName, url: testUrl });
      const cursorConfig = result.find((config) => config.name === "Cursor");

      expect(cursorConfig?.installDeepLink).toBeDefined();
      expect(cursorConfig?.installDeepLink?.label).toBe(
        "Install MCP in Cursor"
      );
      expect(cursorConfig?.installDeepLink?.link).toContain("cursor://");
    });

    it("should interpolate name and url in deep link", () => {
      const result = getMcpServerInstructions({ name: testName, url: testUrl });
      const cursorConfig = result.find((config) => config.name === "Cursor");

      expect(cursorConfig?.installDeepLink?.link).toContain(testName);
      // URL is base64 encoded in the deep link
      const decodedUrl = atob(
        cursorConfig?.installDeepLink?.link.split("config=")[1] || ""
      );
      expect(decodedUrl).toContain(testUrl);
    });

    it("should have MCP configuration file in steps", () => {
      const result = getMcpServerInstructions({ name: testName, url: testUrl });
      const cursorConfig = result.find((config) => config.name === "Cursor");
      const firstStep = cursorConfig?.steps?.[0];

      expect(firstStep?.files).toBeDefined();
      expect(firstStep?.files?.[0].name).toBe("mcp.json");
      expect(firstStep?.files?.[0].language).toBe("json");
      expect(firstStep?.files?.[0].content).toContain(testName);
      expect(firstStep?.files?.[0].content).toContain(testUrl);
    });
  });

  describe("VS Code configuration", () => {
    it("should have correct structure and properties", () => {
      const result = getMcpServerInstructions({ name: testName, url: testUrl });
      const vscodeConfig = result.find((config) => config.name === "VS Code");

      expect(vscodeConfig).toBeDefined();
      expect(vscodeConfig?.name).toBe("VS Code");
      expect(vscodeConfig?.officialDocsLink).toBe(
        "https://code.visualstudio.com/docs/copilot/chat/mcp-servers"
      );
    });

    it("should have installation steps", () => {
      const result = getMcpServerInstructions({ name: testName, url: testUrl });
      const vscodeConfig = result.find((config) => config.name === "VS Code");

      expect(vscodeConfig?.steps).toBeDefined();
      expect(vscodeConfig?.steps?.length).toBe(3);
    });

    it("should have MCP configuration file with mcp-remote", () => {
      const result = getMcpServerInstructions({ name: testName, url: testUrl });
      const vscodeConfig = result.find((config) => config.name === "VS Code");
      const firstStep = vscodeConfig?.steps?.[0];

      expect(firstStep?.files).toBeDefined();
      expect(firstStep?.files?.[0].name).toBe("mcp.json");
      expect(firstStep?.files?.[0].language).toBe("json");
      expect(firstStep?.files?.[0].content).toContain("mcp-remote");
      expect(firstStep?.files?.[0].content).toContain(testName);
      expect(firstStep?.files?.[0].content).toContain(testUrl);
    });
  });

  describe("dynamic parameter interpolation", () => {
    it("should interpolate custom name and URL in Cursor config", () => {
      const customName = "MyAwesomeServer";
      const customUrl = "https://my-server.example.com/v1/mcp";
      const result = getMcpServerInstructions({
        name: customName,
        url: customUrl,
      });
      const cursorConfig = result.find((config) => config.name === "Cursor");
      const fileContent = cursorConfig?.steps?.[0].files?.[0].content;

      expect(fileContent).toContain(customName);
      expect(fileContent).toContain(customUrl);
    });

    it("should interpolate custom name and URL in VS Code config", () => {
      const customName = "AnotherServer";
      const customUrl = "https://another-server.dev/mcp";
      const result = getMcpServerInstructions({
        name: customName,
        url: customUrl,
      });
      const vscodeConfig = result.find((config) => config.name === "VS Code");
      const fileContent = vscodeConfig?.steps?.[0].files?.[0].content;

      expect(fileContent).toContain(customName);
      expect(fileContent).toContain(customUrl);
    });

    it("should handle special characters in name and URL", () => {
      const specialName = "Server-123_Test";
      const specialUrl = "https://api.example.com/v2/mcp?key=value&foo=bar";
      const result = getMcpServerInstructions({
        name: specialName,
        url: specialUrl,
      });
      const cursorConfig = result.find((config) => config.name === "Cursor");
      const fileContent = cursorConfig?.steps?.[0].files?.[0].content;

      expect(fileContent).toContain(specialName);
      expect(fileContent).toContain(specialUrl);
    });
  });

  describe("configuration consistency", () => {
    it("should ensure all configurations have required name field", () => {
      const result = getMcpServerInstructions({ name: testName, url: testUrl });
      result.forEach((config) => {
        expect(config.name).toBeDefined();
        expect(typeof config.name).toBe("string");
        expect(config.name.length).toBeGreaterThan(0);
      });
    });

    it("should ensure all configurations have officialDocsLink", () => {
      const result = getMcpServerInstructions({ name: testName, url: testUrl });
      result.forEach((config) => {
        expect(config.officialDocsLink).toBeDefined();
        expect(typeof config.officialDocsLink).toBe("string");
        expect(config.officialDocsLink).toMatch(/^https?:\/\//);
      });
    });

    it("should ensure all configurations have steps or other installation info", () => {
      const result = getMcpServerInstructions({ name: testName, url: testUrl });
      result.forEach((config) => {
        const hasSteps = config.steps && config.steps.length > 0;
        const hasDeepLink = config.installDeepLink !== undefined;
        expect(hasSteps || hasDeepLink).toBe(true);
      });
    });
  });

  describe("edge cases", () => {
    it("should handle empty string parameters", () => {
      const result = getMcpServerInstructions({ name: "", url: "" });
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(4);
    });

    it("should handle very long name and URL", () => {
      const longName = "A".repeat(1000);
      const longUrl = "https://example.com/" + "b".repeat(1000);
      const result = getMcpServerInstructions({ name: longName, url: longUrl });

      expect(result).toBeInstanceOf(Array);
      const cursorConfig = result.find((config) => config.name === "Cursor");
      expect(cursorConfig?.steps?.[0].files?.[0].content).toContain(longName);
    });

    it("should handle URLs with various protocols", () => {
      const protocols = ["http://", "https://", "ws://", "wss://"];
      protocols.forEach((protocol) => {
        const url = `${protocol}example.com/mcp`;
        const result = getMcpServerInstructions({ name: testName, url });
        const cursorConfig = result.find((config) => config.name === "Cursor");
        expect(cursorConfig?.steps?.[0].files?.[0].content).toContain(url);
      });
    });
  });

  describe("JSON validity", () => {
    it("should generate valid JSON for Cursor configuration", () => {
      const result = getMcpServerInstructions({ name: testName, url: testUrl });
      const cursorConfig = result.find((config) => config.name === "Cursor");
      const jsonContent = cursorConfig?.steps?.[0].files?.[0].content;

      expect(() => JSON.parse(jsonContent || "")).not.toThrow();
      const parsed = JSON.parse(jsonContent || "");
      expect(parsed.mcpServers).toBeDefined();
      expect(parsed.mcpServers[testName]).toBeDefined();
      expect(parsed.mcpServers[testName].url).toBe(testUrl);
    });

    it("should generate valid JSON for VS Code configuration", () => {
      const result = getMcpServerInstructions({ name: testName, url: testUrl });
      const vscodeConfig = result.find((config) => config.name === "VS Code");
      const jsonContent = vscodeConfig?.steps?.[0].files?.[0].content;

      expect(() => JSON.parse(jsonContent || "")).not.toThrow();
      const parsed = JSON.parse(jsonContent || "");
      expect(parsed.servers).toBeDefined();
      expect(parsed.servers[testName]).toBeDefined();
      expect(parsed.servers[testName].args).toContain(testUrl);
    });
  });
});
