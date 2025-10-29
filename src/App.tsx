import React from "react";
import { McpInstructions } from "./McpInstructions";

/**
 * Demo app showing how to use the McpInstructions component
 */
export const App: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <McpInstructions
        name="My Awesome API"
        url="https://api.mycompany.com/mcp"
      />
    </div>
  );
};

export default App;
