import { useAnalyzer } from '../hooks/useAnalyzer';
import URLInput from "../components/analyzer/URLInput";
import FeaturePanel from "../components/analyzer/FeaturePanel";
import ResultCard from "../components/analyzer/ResultCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Cpu } from "lucide-react";

export default function AnalyzerPage() {
  const {
    features,
    result,
    extracting,
    loading,
    error,
    autoFeatures,
    manualFeatures,
    suspiciousCount,
    handleExtract,
    updateFeature,
    handlePredict,
    handleReset,
  } = useAnalyzer();

  return (
    <div
      style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <p className="section-title">Threat Analysis Engine</p>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            fontFamily: "monospace",
            color: "var(--color-cyber-text)",
            margin: "0.5rem 0 0.75rem",
          }}
        >
          URL <span className="glow-text">Scanner</span>
        </h1>
        <p
          style={{
            color: "var(--color-cyber-text-dim)",
            fontSize: "0.875rem",
            maxWidth: "560px",
          }}
        >
          Paste any URL below. The CNN model extracts 30 features and classifies
          it as legitimate or phishing.
        </p>
      </div>

      {/* Error banner */}
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

      {/* Step 1 — URL Input */}
      {!result && (
        <div style={{ marginBottom: "1.5rem" }}>
          <URLInput onAnalyze={handleExtract} loading={extracting || loading} />
        </div>
      )}

      {/* Extracting spinner */}
      {extracting && (
        <div style={{ margin: "1.5rem 0" }}>
          <LoadingSpinner />
        </div>
      )}

      {/* Step 2 — Feature Panel */}
      {features && !result && !extracting && (
        <>
          <div style={{ marginBottom: "1.5rem" }}>
            <FeaturePanel
              features={features}
              autoFeatures={autoFeatures}
              manualFeatures={manualFeatures}
              suspiciousCount={suspiciousCount}
              onUpdate={updateFeature}
            />
          </div>

          {/* Step 3 — Run Detection */}
          <div
            className="cyber-card"
            style={{
              padding: "1.25rem 1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <Cpu size={20} style={{ color: "var(--color-cyber-green)" }} />
              <div>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "monospace",
                    fontSize: "0.85rem",
                    color: "var(--color-cyber-text)",
                    fontWeight: 600,
                  }}
                >
                  CNN Model Ready
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.7rem",
                    color: "var(--color-cyber-text-muted)",
                  }}
                >
                  30 features extracted · Adjust manual features if needed
                </p>
              </div>
            </div>
            <button
              className="btn-cyber"
              onClick={handlePredict}
              disabled={loading}
              style={{ opacity: loading ? 0.5 : 1 }}
            >
              {loading ? "Running Model..." : "Run Detection →"}
            </button>
          </div>
        </>
      )}

      {/* Predicting spinner */}
      {loading && !extracting && (
        <div style={{ margin: "1.5rem 0" }}>
          <LoadingSpinner />
        </div>
      )}

      {/* Step 4 — Result */}
      {result && <ResultCard result={result} onReset={handleReset} />}
    </div>
  );
}
