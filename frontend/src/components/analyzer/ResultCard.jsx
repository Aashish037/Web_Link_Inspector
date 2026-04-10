import { Shield, ShieldAlert, RotateCcw, AlertTriangle } from "lucide-react";
import { FEATURE_INFO } from "../../utils/featureLabels";

function ProgressBar({ label, value, color }) {
  return (
    <div style={{ marginBottom: "0.875rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.375rem",
        }}
      >
        <span
          style={{
            fontSize: "0.72rem",
            fontFamily: "monospace",
            color: "var(--color-cyber-text-dim)",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: "0.72rem",
            fontFamily: "monospace",
            color,
            fontWeight: 700,
          }}
        >
          {value.toFixed(2)}%
        </span>
      </div>
      <div
        style={{
          height: "8px",
          borderRadius: "4px",
          background: "var(--color-cyber-card-2)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${value}%`,
            background: color,
            borderRadius: "4px",
            transition: "width 0.8s ease",
            boxShadow: `0 0 8px ${color}88`,
          }}
        />
      </div>
    </div>
  );
}

export default function ResultCard({ result, onReset }) {
  const isPhishing = result.verdict === "Phishing";
  const accentColor = isPhishing
    ? "var(--color-cyber-red)"
    : "var(--color-cyber-green)";
  const VerdictIcon = isPhishing ? ShieldAlert : Shield;

  return (
    <div
      className="cyber-card animate-fadeIn"
      style={{
        padding: "2rem",
        borderColor: accentColor,
        boxShadow: `0 0 30px ${isPhishing ? "var(--color-cyber-red)" : "var(--color-cyber-green)"}22`,
      }}
    >
      {/* Verdict header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <VerdictIcon
          size={52}
          style={{
            color: accentColor,
            marginBottom: "0.75rem",
            filter: `drop-shadow(0 0 12px ${accentColor})`,
          }}
        />
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: 900,
            letterSpacing: "0.15em",
            fontFamily: "monospace",
            color: accentColor,
            textShadow: `0 0 20px ${accentColor}`,
            margin: "0 0 0.5rem",
          }}
        >
          {result.verdict.toUpperCase()}
        </h2>
        <p
          style={{
            fontSize: "0.72rem",
            color: "var(--color-cyber-text-muted)",
            fontFamily: "monospace",
            wordBreak: "break-all",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          {result.url}
        </p>
      </div>

      {/* Progress bars */}
      <div style={{ marginBottom: "1.5rem" }}>
        <ProgressBar
          label="Phishing Risk"
          value={result.phishing_prob}
          color="var(--color-cyber-red)"
        />
        <ProgressBar
          label="Legitimate Score"
          value={result.legit_prob}
          color="var(--color-cyber-green)"
        />
      </div>

      {/* Stat boxes */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.75rem",
          marginBottom: "1.5rem",
        }}
      >
        {[
          {
            label: "Confidence",
            value: `${result.confidence.toFixed(1)}%`,
            color: accentColor,
          },
          {
            label: "Suspicious",
            value: result.suspicious_count,
            color: "var(--color-cyber-red)",
          },
          {
            label: "Features",
            value: result.feature_count,
            color: "var(--color-cyber-text-dim)",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              background: "var(--color-cyber-card-2)",
              border: "1px solid var(--color-cyber-border)",
              borderRadius: "8px",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                fontFamily: "monospace",
                color,
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontSize: "0.65rem",
                color: "var(--color-cyber-text-muted)",
                marginTop: "0.25rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Suspicious features */}
      {result.suspicious_features?.length > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <p className="section-title" style={{ marginBottom: "0.75rem" }}>
            <AlertTriangle
              size={12}
              style={{ display: "inline", marginRight: "0.375rem" }}
            />
            Suspicious Indicators
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {result.suspicious_features.map(({ feature }) => {
              const info = FEATURE_INFO[feature];
              return (
                <span
                  key={feature}
                  className="badge-red"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  {info?.icon &&
                    (typeof info.icon === "string" ? info.icon : "⚠")}{" "}
                  {info?.label ?? feature}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Reset button */}
      <div style={{ textAlign: "center" }}>
        <button
          className="btn-outline"
          onClick={onReset}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <RotateCcw size={14} /> New Analysis
        </button>
      </div>
    </div>
  );
}
