import { useState } from "react";
import { Search, X, Shield, AlertTriangle, Link2 } from "lucide-react";

/* eslint-disable no-unused-vars */

const SAMPLES = [
  {
    label: "Google (Legit)",
    url: "https://www.google.com",
    icon: Shield,
    color: "var(--color-cyber-green)",
  },
  {
    label: "IP URL (Phish)",
    url: "http://192.168.1.1/login/secure",
    icon: AlertTriangle,
    color: "var(--color-cyber-red)",
  },
  {
    label: "Bit.ly (Suspicious)",
    url: "http://bit.ly/3xK9mPq",
    icon: Link2,
    color: "var(--color-cyber-yellow)",
  },
];

export default function URLInput({ onAnalyze, loading }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (trimmed) onAnalyze(trimmed);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="cyber-card animate-fadeIn" style={{ padding: "2rem" }}>
      <p className="section-title" style={{ marginBottom: "1rem" }}>
        ▸ Enter Target URL
      </p>

      {/* Input Row */}
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--color-cyber-text-muted)",
              pointerEvents: "none",
            }}
          />
          <input
            className="cyber-input"
            type="text"
            placeholder="https://example.com"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={loading}
            style={{
              paddingLeft: "2.5rem",
              paddingRight: input ? "2.5rem" : "1rem",
              width: "100%",
            }}
          />
          {input && (
            <button
              onClick={() => setInput("")}
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--color-cyber-text-muted)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button
          className="btn-cyber"
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          style={{
            whiteSpace: "nowrap",
            opacity: loading || !input.trim() ? 0.5 : 1,
          }}
        >
          {loading ? "Scanning..." : "Analyze →"}
        </button>
      </div>

      {/* Sample URLs */}
      <div
        style={{
          marginTop: "1.25rem",
          display: "flex",
          gap: "0.625rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "0.72rem",
            color: "var(--color-cyber-text-muted)",
            fontFamily: "monospace",
          }}
        >
          Try sample:
        </span>
        {SAMPLES.map(({ label, url, icon: SampleIcon, color }) => (
          <button
            key={url}
            onClick={() => setInput(url)}
            disabled={loading}
            style={{
              background: "var(--color-cyber-card-2)",
              border: `1px solid ${color}44`,
              borderRadius: "4px",
              padding: "0.3rem 0.75rem",
              cursor: "pointer",
              color,
              fontSize: "0.72rem",
              fontFamily: "monospace",
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = color)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = `${color}44`)
            }
          >
            <SampleIcon size={11} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
