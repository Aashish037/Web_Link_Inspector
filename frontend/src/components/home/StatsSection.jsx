const STATS = [
  { v: "11,054", l: "Training URLs", s: "Phishing + Legitimate" },
  { v: "30", l: "URL Features", s: "Structural & content-based" },
  { v: "20", l: "Selected Features", s: "via SelectKBest chi2" },
  { v: "91.36%", l: "CNN Accuracy", s: "Best model on test set" },
];

const MODEL_DETAILS = [
  {
    label: "Architecture",
    value: "Conv1D(32) → Flatten → Dense(32) → Dense(1)",
  },
  { label: "Input Shape", value: "(20, 1) — 20 selected features" },
  { label: "Optimizer", value: "Adam · Binary Crossentropy loss" },
  { label: "Train/Test", value: "80% / 20% split · 10 epochs" },
  {
    label: "Preprocessing",
    value: "StandardScaler → SelectKBest (chi2, k=20)",
  },
  { label: "Best Accuracy", value: "91.36% on test set" },
];

export default function StatsSection() {
  return (
    <section style={{ padding: "0 16px 64px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: 16,
            marginBottom: 48,
          }}
        >
          {STATS.map(({ v, l, s }) => (
            <div key={l} className="cyber-card" style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 900,
                  fontFamily: "monospace",
                  color: "var(--color-cyber-green)",
                }}
                className="glow-text"
              >
                {v}
              </div>
              <div
                style={{
                  color: "var(--color-cyber-text)",
                  fontSize: 14,
                  fontWeight: 600,
                  marginTop: 4,
                }}
              >
                {l}
              </div>
              <div
                style={{
                  color: "var(--color-cyber-text-muted)",
                  fontSize: 11,
                  marginTop: 2,
                }}
              >
                {s}
              </div>
            </div>
          ))}
        </div>

        <div className="cyber-card">
          <span className="section-title">Model Info</span>
          <h2
            style={{
              color: "var(--color-cyber-text)",
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            CNN Model Details
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: 10,
            }}
          >
            {MODEL_DETAILS.map(({ label, value }) => (
              <div
                key={label}
                style={{
                  background: "var(--color-cyber-card-2)",
                  border: "1px solid var(--color-cyber-border)",
                  borderRadius: 8,
                  padding: "10px 14px",
                }}
              >
                <div
                  style={{
                    color: "var(--color-cyber-text-muted)",
                    fontSize: 11,
                    fontFamily: "monospace",
                    marginBottom: 4,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{ color: "var(--color-cyber-text-dim)", fontSize: 13 }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
