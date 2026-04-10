import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

/** POST /extract → { url, features: { name: -1|0|1 } } */
export const extractFeatures = async (url) => {
  const { data } = await api.post("/extract", { url });
  return data;
};

/** POST /predict → { verdict, confidence, legit_prob, phishing_prob,
 *                    url, feature_count, suspicious_features, suspicious_count } */
export const predictURL = async (url, features) => {
  const { data } = await api.post("/predict", { url, features });
  return data;
};
