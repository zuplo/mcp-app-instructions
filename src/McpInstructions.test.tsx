import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { McpInstructions } from "./McpInstructions";

describe("McpInstructions", () => {
  const defaultProps = {
    name: "Test MCP Server",
    url: "https://api.example.com/mcp",
  };

  it("renders correctly with default props", () => {
    const { container } = render(<McpInstructions {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with special characters in name and URL", () => {
    const { container } = render(
      <McpInstructions
        name="My & Company's <Special> API"
        url="https://api.example.com/v1/mcp?key=test&value=123"
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with minimal name and localhost URL", () => {
    const { container } = render(
      <McpInstructions name="API" url="http://localhost:3000" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with long server name", () => {
    const { container } = render(
      <McpInstructions
        name="My Very Long Server Name With Multiple Words"
        url="https://api.example.com/mcp/v2/endpoint"
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with URL containing port", () => {
    const { container } = render(
      <McpInstructions
        name="Local Dev Server"
        url="http://localhost:8080/mcp"
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with HTTPS URL and path", () => {
    const { container } = render(
      <McpInstructions
        name="Production API"
        url="https://api.production.example.com/v1/mcp/server"
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with URL containing hyphens and underscores", () => {
    const { container } = render(
      <McpInstructions
        name="My-Server_Name"
        url="https://my-api-server.example.com/mcp_endpoint"
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with single character name", () => {
    const { container } = render(
      <McpInstructions name="X" url="https://x.com/mcp" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with numeric characters in name", () => {
    const { container } = render(
      <McpInstructions name="API-V2" url="https://api.example.com/v2/mcp" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with emoji in name", () => {
    const { container } = render(
      <McpInstructions name="🚀 Rocket API" url="https://api.example.com/mcp" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
