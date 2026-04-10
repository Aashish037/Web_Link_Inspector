import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import FeatureToggle from "./FeatureToggle";
import { FEATURE_INFO } from "../../utils/featureLabels";

export default function FeaturePanel({
  features,
  autoFeatures,
  manualFeatures,
  suspiciousCount,
  onUpdate,
}) {
  const [manualOpen, setManualOpen] = useState(true);

  const safeCount = Object.values(features).filter((v) => v === 1).length;
  const neutralCount = Object.values(features).filter((v) => v === 0).length;
  const total = Object.keys(features).length;

  return (
    <div
      className="cyber-card animate-fadeIn"
      style={{
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      {/* Summary bar */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <p className="section-title" style={{ marginRight: "auto" }}>
          ▸ Feature Analysis
        </p>
        <span className="badge-red">⚠ {suspiciousCount} Suspicious</span>
        <span className="badge-yellow">◈ {neutralCount} Neutral</span>
        <span className="badge-green">✓ {safeCount} Safe</span>
        <span className="badge-gray">{total} Total</span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: "6px",
          borderRadius: "3px",
          background: "var(--color-cyber-card-2)",
          overflow: "hidden",
          display: "flex",
        }}
      >
        <div
          style={{
            width: `${(suspiciousCount / total) * 100}%`,
            background: "var(--color-cyber-red)",
            transition: "width 0.5s",
          }}
        />
        <div
          style={{
            width: `${(neutralCount / total) * 100}%`,
            background: "var(--color-cyber-yellow)",
            transition: "width 0.5s",
          }}
        />
        <div
          style={{
            width: `${(safeCount / total) * 100}%`,
            background: "var(--color-cyber-green)",
            transition: "width 0.5s",
          }}
        />
      </div>

      {/* Auto-detected section */}
      <div>
        <p className="section-title" style={{ marginBottom: "0.875rem" }}>
          Auto-Detected from URL
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "0.625rem",
          }}
        >
          {autoFeatures.map(([name, value]) => (
            <FeatureToggle
              key={name}
              name={name}
              info={FEATURE_INFO[name]}
              value={value}
              onChange={onUpdate}
              isAuto={true}
            />
          ))}
        </div>
      </div>

      {/* Manual section */}
      <div>
        <button
          onClick={() => setManualOpen((o) => !o)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-cyber-text-dim)",
            marginBottom: "0.875rem",
            padding: 0,
          }}
        >
          <p className="section-title" style={{ margin: 0 }}>
            Manual Input Features
          </p>
          {manualOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {manualOpen && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "0.625rem",
            }}
          >
            {manualFeatures.map(([name, value]) => (
              <FeatureToggle
                key={name}
                name={name}
                info={FEATURE_INFO[name]}
                value={value}
                onChange={onUpdate}
                isAuto={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
