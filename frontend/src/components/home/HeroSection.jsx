import { Link } from "react-router-dom";
import { Search, Shield, ArrowRight, Zap } from "lucide-react";

const STEPS = [
  {
    n: "01",
    emoji: "🔗",
    title: "Paste URL",
    desc: "Enter any URL you want to check for phishing",
  },
  {
    n: "02",
    emoji: "🔍",
    title: "Extract Features",
    desc: "30 features auto-detected from URL structure",
  },
  {
    n: "03",
    emoji: "🛡️",
    title: "Get Verdict",
    desc: "CNN model returns Phishing / Legitimate + confidence score",
  },
];

export default function HeroSection() {
  return (
    <section
      style={{
        padding: "80px 16px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "var(--color-cyber-green)",
          opacity: 0.04,
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "4px 14px",
          borderRadius: 999,
          border: "1px solid rgba(0,230,118,0.3)",
          background: "rgba(27,94,32,0.4)",
          color: "var(--color-cyber-green)",
          fontSize: 12,
          fontFamily: "monospace",
          marginBottom: 24,
        }}
      >
        <Zap size={11} /> CNN-Powered Phishing Detector
      </div>

      <h1
        style={{
          fontSize: "clamp(40px,7vw,72px)",
          fontWeight: 900,
          fontFamily: "monospace",
          lineHeight: 1.1,
          marginBottom: 16,
        }}
      >
        <span
          style={{ color: "var(--color-cyber-green)" }}
          className="glow-text"
        >
          PHISH
        </span>
        <span style={{ color: "var(--color-cyber-text)" }}>GUARD</span>
      </h1>

      <p
        style={{
          color: "var(--color-cyber-text-dim)",
          fontSize: 16,
          maxWidth: 520,
          margin: "0 auto 12px",
          lineHeight: 1.7,
        }}
      >
        Detect phishing URLs using a{" "}
        <span style={{ color: "var(--color-cyber-green)" }}>
          trained CNN model
        </span>{" "}
        — analyzes 30 URL features with 91%+ accuracy.
      </p>
      <p
        style={{
          color: "var(--color-cyber-text-muted)",
          fontSize: 12,
          fontFamily: "monospace",
          marginBottom: 40,
        }}
      >
        Trained on 11,054 real-world phishing &amp; legitimate URLs
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "center",
          marginBottom: 64,
        }}
      >
        <Link
          to="/analyzer"
          className="btn-cyber"
          style={{ fontSize: 15, padding: "12px 28px" }}
        >
          <Search size={16} /> Analyze a URL <ArrowRight size={14} />
        </Link>
        <Link
          to="/features"
          className="btn-outline"
          style={{ fontSize: 15, padding: "12px 28px" }}
        >
          <Shield size={16} /> View Feature Analysis
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 16,
          maxWidth: 760,
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        {STEPS.map(({ n, emoji, title, desc }) => (
          <div key={n} className="cyber-card" style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                top: 12,
                right: 16,
                fontFamily: "monospace",
                fontWeight: 900,
                fontSize: 28,
                color: "var(--color-cyber-green)",
                opacity: 0.08,
              }}
            >
              {n}
            </span>
            <div style={{ fontSize: 26, marginBottom: 10 }}>{emoji}</div>
            <h3
              style={{
                color: "var(--color-cyber-text)",
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              {title}
            </h3>
            <p
              style={{
                color: "var(--color-cyber-text-muted)",
                fontSize: 13,
                lineHeight: 1.6,
              }}
            >
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
