from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import traceback

from feature_extractor import extract_features, features_to_list, FULL_COLUMN_ORDER
from predictor import predict, get_feature_columns

app = FastAPI(title="PhishGuard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class URLRequest(BaseModel):
    url: str


class PredictRequest(BaseModel):
    url: str
    features: dict   


@app.get("/")
def home():
    return {"status": "ok", "message": "PhishGuard API running"}


@app.post("/extract")
def extract_url_features(req: URLRequest):
    try:
        features = extract_features(req.url)
        return {"url": req.url, "features": features}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/predict")
def run_prediction(req: PredictRequest):
    try:
        # Build 31-value list 
        feature_list = features_to_list(req.features, FULL_COLUMN_ORDER)

        print(f"DEBUG: feature_list length = {len(feature_list)}")

        result = predict(feature_list)

        result["url"]           = req.url
        result["feature_count"] = len(feature_list) - 1  # 30 real features

        suspicious = [
            {"feature": k, "value": v}
            for k, v in req.features.items()
            if v == -1
        ]
        result["suspicious_features"] = suspicious
        result["suspicious_count"]    = len(suspicious)

        return result

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))