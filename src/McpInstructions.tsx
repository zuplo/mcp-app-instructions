import React from "react";
import { getMcpServerInstructions } from "./index";

interface McpInstructionsProps {
  name: string;
  url: string;
}

export const McpInstructions: React.FC<McpInstructionsProps> = ({
  name,
  url,
}) => {
  const configurations = getMcpServerInstructions({ name, url });

  return (
    <div className="mcp-instructions">
      <h1>MCP Server Setup Instructions</h1>
      <p className="subtitle">
        Connect to <strong>{name}</strong> at <code>{url}</code>
      </p>

      {configurations.map((config, configIndex) => (
        <div key={configIndex} className="mcp-config">
          <h2>{config.name}</h2>

          {config.description && (
            <p className="description">{config.description}</p>
          )}

          {config.officialDocsLink && (
            <p className="docs-link">
              <a
                href={config.officialDocsLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Official Documentation →
              </a>
            </p>
          )}

          {config.installDeepLink && (
            <div className="install-deeplink">
              <a href={config.installDeepLink.link}>
                {config.installDeepLink.label}
              </a>
            </div>
          )}

          {config.hint && (
            <div className={`hint hint-${config.hint.type}`} role="alert">
              {config.hint.title && (
                <strong className="hint-title">{config.hint.title}: </strong>
              )}
              <span className="hint-text">{config.hint.text}</span>
            </div>
          )}

          {config.steps && config.steps.length > 0 && (
            <ol className="steps">
              {config.steps.map((step, stepIndex) => (
                <li key={stepIndex} className="step">
                  <div
                    className="step-text"
                    dangerouslySetInnerHTML={{
                      __html: step.text.replace(
                        /`([^`]+)`/g,
                        "<code>$1</code>"
                      ),
                    }}
                  />
                  {step.files && step.files.length > 0 && (
                    <div className="files">
                      {step.files.map((file, fileIndex) => (
                        <div key={fileIndex} className="file">
                          <div className="file-header">
                            <span className="file-name">{file.name}</span>
                            <span className="file-language">
                              {file.language}
                            </span>
                          </div>
                          <pre className="file-content">
                            <code className={`language-${file.language}`}>
                              {file.content}
                            </code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      ))}
    </div>
  );
};
