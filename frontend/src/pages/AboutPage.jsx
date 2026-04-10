import { FEATURE_INFO } from "../utils/featureLabels";

const DATASET_STATS = [
  {
    label: "Total URLs",
    value: "11,054",
    desc: "Balanced phishing & legitimate",
  },
  { label: "Raw Features", value: "30", desc: "Extracted per URL" },
  { label: "Selected Features", value: "20", desc: "After chi² SelectKBest" },
  { label: "Model Accuracy", value: "91.36%", desc: "On test split" },
];

const MODEL_ARCH = [
  { layer: "Input", detail: "(20, 1) — reshaped feature vector" },
  { layer: "Conv1D", detail: "64 filters, kernel 3, ReLU" },
  { layer: "MaxPooling1D", detail: "pool size 2" },
  { layer: "Conv1D", detail: "128 filters, kernel 3, ReLU" },
  { layer: "GlobalMaxPooling1D", detail: "flatten spatial dimension" },
  { layer: "Dense", detail: "64 units, ReLU + Dropout 0.3" },
  { layer: "Output", detail: "1 unit, Sigmoid → binary probability" },
];

const PIPELINE_STEPS = [
  { label: "30 Features", sub: "from URL extractor" },
  { label: "+ Index=0", sub: "prepend for scaler" },
  { label: "StandardScaler", sub: "fit on 31 cols" },
  { label: "abs()", sub: "non-negative for chi²" },
  { label: "SelectKBest", sub: "chi², k=20" },
  { label: "Reshape (20,1)", sub: "for Conv1D" },
  { label: "CNN Model", sub: "binary classify" },
  { label: "Verdict", sub: "Phishing / Legit" },
];

export default function AboutPage() {
  const features = Object.entries(FEATURE_INFO);

  return (
    <div
      style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem 1.5rem" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
        <p className="section-title">About Web_Link_Inspector</p>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            fontFamily: "monospace",
            color: "var(--color-cyber-text)",
            margin: "0.5rem 0 0.75rem",
          }}
        >
          Model &amp; <span className="glow-text">Dataset</span>
        </h1>
        <p
          style={{
            color: "var(--color-cyber-text-dim)",
            fontSize: "0.875rem",
            maxWidth: "560px",
          }}
        >
          Web_Link_Inspector uses a 1D Convolutional Neural Network trained on
          11,054 URLs to detect phishing attacks from URL features alone.
        </p>
      </div>

      {/* Dataset stats */}
      <section style={{ marginBottom: "3rem" }}>
        <p className="section-title" style={{ marginBottom: "1rem" }}>
          ▸ Dataset
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {DATASET_STATS.map(({ label, value, desc }) => (
            <div
              key={label}
              className="cyber-card"
              style={{ padding: "1.25rem", textAlign: "center" }}
            >
              <div
                style={{
                  fontSize: "2.25rem",
                  fontWeight: 900,
                  fontFamily: "monospace",
                  color: "var(--color-cyber-green)",
                  lineHeight: 1,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-cyber-text)",
                  fontWeight: 600,
                  marginTop: "0.5rem",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "var(--color-cyber-text-muted)",
                  marginTop: "0.25rem",
                }}
              >
                {desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Model architecture */}
      <section style={{ marginBottom: "3rem" }}>
        <p className="section-title" style={{ marginBottom: "1rem" }}>
          ▸ CNN Architecture
        </p>
        <div
          className="cyber-card"
          style={{ padding: "0", overflow: "hidden" }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{ borderBottom: "1px solid var(--color-cyber-border)" }}
              >
                {["Layer", "Configuration"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "0.75rem 1.25rem",
                      textAlign: "left",
                      fontSize: "0.68rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--color-cyber-text-muted)",
                      fontFamily: "monospace",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODEL_ARCH.map(({ layer, detail }, i) => (
                <tr
                  key={layer}
                  style={{
                    borderBottom:
                      i < MODEL_ARCH.length - 1
                        ? "1px solid var(--color-cyber-border)"
                        : "none",
                    background:
                      i % 2 === 0 ? "transparent" : "var(--color-cyber-card-2)",
                  }}
                >
                  <td
                    style={{
                      padding: "0.75rem 1.25rem",
                      fontFamily: "monospace",
                      fontSize: "0.8rem",
                      color: "var(--color-cyber-green)",
                      fontWeight: 700,
                    }}
                  >
                    {layer}
                  </td>
                  <td
                    style={{
                      padding: "0.75rem 1.25rem",
                      fontFamily: "monospace",
                      fontSize: "0.78rem",
                      color: "var(--color-cyber-text-dim)",
                    }}
                  >
                    {detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pipeline */}
      <section style={{ marginBottom: "3rem" }}>
        <p className="section-title" style={{ marginBottom: "1rem" }}>
          ▸ Preprocessing Pipeline
        </p>
        <div className="cyber-card" style={{ padding: "1.5rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0",
            }}
          >
            {PIPELINE_STEPS.map(({ label, sub }, i) => (
              <div
                key={label}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div style={{ textAlign: "center", padding: "0.5rem 0.75rem" }}>
                  <div
                    style={{
                      background: "var(--color-cyber-card-2)",
                      border: "1px solid var(--color-cyber-green)",
                      borderRadius: "6px",
                      padding: "0.5rem 0.875rem",
                      fontFamily: "monospace",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--color-cyber-green)",
                      whiteSpace: "nowrap",
                      boxShadow: "0 0 8px var(--color-cyber-green)22",
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.6rem",
                      color: "var(--color-cyber-text-muted)",
                      marginTop: "0.3rem",
                    }}
                  >
                    {sub}
                  </div>
                </div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <span
                    style={{
                      color: "var(--color-cyber-green)",
                      fontSize: "1.1rem",
                      opacity: 0.6,
                      flexShrink: 0,
                    }}
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature reference */}
      <section>
        <p className="section-title" style={{ marginBottom: "1rem" }}>
          ▸ Feature Reference ({features.length} features)
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "0.625rem",
          }}
        >
          {features.map(([key, info]) => {
            const Icon = info.icon;
            const isAuto = info.category === "auto";
            return (
              <div
                key={key}
                className="cyber-card"
                style={{
                  padding: "0.875rem",
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: "1rem",
                    flexShrink: 0,
                    color: "var(--color-cyber-green)",
                  }}
                >
                  {typeof Icon === "string" ? (
                    Icon
                  ) : Icon ? (
                    <Icon size={16} />
                  ) : (
                    "◈"
                  )}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: "var(--color-cyber-text)",
                      }}
                    >
                      {info.label}
                    </span>
                    <span
                      className={isAuto ? "badge-green" : "badge-gray"}
                      style={{ fontSize: "0.58rem" }}
                    >
                      {isAuto ? "auto" : "manual"}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.65rem",
                      color: "var(--color-cyber-text-muted)",
                      margin: "0.25rem 0 0",
                      lineHeight: 1.4,
                    }}
                  >
                    {info.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
