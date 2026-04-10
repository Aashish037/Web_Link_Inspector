import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-cyber-border)",
        marginTop: 48,
        padding: "20px 16px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          fontSize: 11,
          fontFamily: "monospace",
          color: "var(--color-cyber-text-muted)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Shield size={11} color="var(--color-cyber-green)" />
          Web_Link_Inspector — Dissertation Demo Project
        </div>
        <div>Dataset: 11,054 URLs · CNN Model · 20 Selected Features</div>
        <div style={{ color: "var(--color-cyber-green)", opacity: 0.6 }}>
          [ SYSTEM ACTIVE ]
        </div>
      </div>
    </footer>
  );
}
