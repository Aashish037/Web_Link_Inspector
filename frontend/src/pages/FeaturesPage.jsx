import { useState } from "react";
import { useAnalyzer } from '../hooks/useAnalyzer';
import FeatureChart from "../components/features/FeatureChart";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Search, Shield, ShieldAlert } from "lucide-react";

export default function FeaturesPage() {
  const [inputUrl, setInputUrl] = useState("");
  const {
    features,
    result,
    extracting,
    loading,
    error,
    handleExtract,
    handlePredict,
    handleReset,
  } = useAnalyzer();

  const isPhishing = result?.verdict === "Phishing";

  return (
    <div
      style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem 1.5rem" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <p className="section-title">Feature Visualization</p>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            fontFamily: "monospace",
            color: "var(--color-cyber-text)",
            margin: "0.5rem 0 0.75rem",
          }}
        >
          Feature <span className="glow-text">Explorer</span>
        </h1>
        <p
          style={{ color: "var(--color-cyber-text-dim)", fontSize: "0.875rem" }}
        >
          Visualize all 30 URL features as a bar chart and run the CNN
          classifier.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            background: "var(--color-cyber-red-dark)",
            border: "1px solid var(--color-cyber-red)",
            borderRadius: "8px",
            padding: "0.875rem 1.25rem",
            color: "var(--color-cyber-red)",
            fontFamily: "monospace",
            fontSize: "0.8rem",
            marginBottom: "1.5rem",
          }}
        >
          ✕ {error}
        </div>
      )}

      {/* URL form */}
      {!features && (
        <div
          className="cyber-card"
          style={{ padding: "1.75rem", marginBottom: "1.5rem" }}
        >
          <p className="section-title" style={{ marginBottom: "1rem" }}>
            ▸ Enter URL to Visualize
          </p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search
                size={15}
                style={{
                  position: "absolute",
                  left: "0.875rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--color-cyber-text-muted)",
                  pointerEvents: "none",
                }}
              />
              <input
                className="cyber-input"
                placeholder="https://example.com"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleExtract(inputUrl)}
                style={{ paddingLeft: "2.5rem", width: "100%" }}
              />
            </div>
            <button
              className="btn-cyber"
              onClick={() => handleExtract(inputUrl)}
              disabled={extracting || !inputUrl.trim()}
              style={{ opacity: !inputUrl.trim() ? 0.5 : 1 }}
            >
              Extract
            </button>
          </div>
        </div>
      )}

      {/* Spinner */}
      {(extracting || loading) && (
        <div style={{ margin: "1.5rem 0" }}>
          <LoadingSpinner />
        </div>
      )}

      {/* Chart */}
      {features && !extracting && (
        <>
          <div style={{ marginBottom: "1.25rem" }}>
            <FeatureChart features={features} />
          </div>

          {/* Predict + Reset row */}
          {!result && (
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <button
                className="btn-cyber"
                onClick={handlePredict}
                disabled={loading}
              >
                {loading ? "Running..." : "Run CNN Classifier →"}
              </button>
              <button
                className="btn-outline"
                onClick={() => {
                  handleReset();
                  setInputUrl("");
                }}
              >
                Reset
              </button>
            </div>
          )}

          {/* Simplified result */}
          {result && (
            <div
              className="cyber-card animate-fadeIn"
              style={{
                padding: "1.5rem",
                borderColor: isPhishing
                  ? "var(--color-cyber-red)"
                  : "var(--color-cyber-green)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                {isPhishing ? (
                  <ShieldAlert
                    size={36}
                    style={{
                      color: "var(--color-cyber-red)",
                      filter: "drop-shadow(0 0 8px var(--color-cyber-red))",
                    }}
                  />
                ) : (
                  <Shield
                    size={36}
                    style={{
                      color: "var(--color-cyber-green)",
                      filter: "drop-shadow(0 0 8px var(--color-cyber-green))",
                    }}
                  />
                )}
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "1.5rem",
                      fontWeight: 900,
                      fontFamily: "monospace",
                      color: isPhishing
                        ? "var(--color-cyber-red)"
                        : "var(--color-cyber-green)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {result.verdict.toUpperCase()}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.72rem",
                      color: "var(--color-cyber-text-muted)",
                      fontFamily: "monospace",
                    }}
                  >
                    Confidence: {result.confidence.toFixed(1)}% ·{" "}
                    {result.suspicious_count} suspicious features
                  </p>
                </div>
              </div>
              <button
                className="btn-outline"
                onClick={() => {
                  handleReset();
                  setInputUrl("");
                }}
              >
                New Analysis
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
