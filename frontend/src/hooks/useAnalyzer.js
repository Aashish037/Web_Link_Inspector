import { useState, useCallback } from "react";
import { extractFeatures, predictURL } from "../services/api";
import { AUTO_KEYS } from "../utils/featureLabels";

export function useAnalyzer() {
  const [url, setUrl] = useState("");
  const [features, setFeatures] = useState(null); 
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState(null);

  const handleExtract = useCallback(async (inputUrl) => {
    if (!inputUrl.trim()) return;
    setExtracting(true);
    setError(null);
    setResult(null);
    setFeatures(null);
    try {
      const data = await extractFeatures(inputUrl.trim());
      setFeatures(data.features);
      setUrl(inputUrl.trim());
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Cannot connect to backend. Make sure uvicorn is running on port 8000.",
      );
    } finally {
      setExtracting(false);
    }
  }, []);

  const updateFeature = useCallback((name, value) => {
    setFeatures((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handlePredict = useCallback(async () => {
    if (!features || !url) return;
    setLoading(true);
    setError(null);
    try {
      const data = await predictURL(url, features);
      setResult(data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Prediction failed. Check the backend terminal for errors.",
      );
    } finally {
      setLoading(false);
    }
  }, [features, url]);

  const handleReset = useCallback(() => {
    setUrl("");
    setFeatures(null);
    setResult(null);
    setError(null);
  }, []);

  // Derived helpers
  const autoFeatures = features
    ? Object.entries(features).filter(([k]) => AUTO_KEYS.has(k))
    : [];
  const manualFeatures = features
    ? Object.entries(features).filter(([k]) => !AUTO_KEYS.has(k))
    : [];
  const suspiciousCount = features
    ? Object.values(features).filter((v) => v === -1).length
    : 0;

  return {
    url,
    features,
    result,
    loading,
    extracting,
    error,
    autoFeatures,
    manualFeatures,
    suspiciousCount,
    handleExtract,
    updateFeature,
    handlePredict,
    handleReset,
  };
}
