import os
import numpy as np
import pandas as pd
import joblib
import tensorflow as tf

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

from feature_extractor import FULL_COLUMN_ORDER   # 31-column list

MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")

_model    = None
_scaler   = None
_selector = None


def load_all():
    global _model, _scaler, _selector

    if _model is not None:
        return

    model_path = os.path.join(MODEL_DIR, "best_model.keras")
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"best_model.keras not found in {MODEL_DIR}")

    _model    = tf.keras.models.load_model(model_path)
    _scaler   = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))
    _selector = joblib.load(os.path.join(MODEL_DIR, "selector.pkl"))

    # print(f" Model loaded | scaler expects {_scaler.n_features_in_} features")


def get_feature_columns() -> list:
    return FULL_COLUMN_ORDER


def predict(features_31: list) -> dict:
    load_all()
    # Build DataFrame with the exact column names the scaler knows 
    df = pd.DataFrame([features_31], columns=FULL_COLUMN_ORDER)

    # Scale (scaler was fit on all 31 columns) 
    X_scaled = _scaler.transform(df)

    #  Select best 20 features (selector was fit on abs of scaled values) 
    X_selected = _selector.transform(np.abs(X_scaled))

    #  CNN needs (batch, timesteps, channels) shape — reshape if necessary
    try:
        input_shape = _model.input_shape   
        if len(input_shape) == 3:
            X_selected = X_selected.reshape(X_selected.shape[0], X_selected.shape[1], 1)
    except Exception:
        pass

    # Predict
    prob = float(_model.predict(X_selected, verbose=0)[0][0])

    legit_prob    = prob
    phishing_prob = 1 - prob
    pred          = 1 if prob > 0.5 else 0

    return {
        "verdict":       "Legitimate" if pred == 1 else "Phishing",
        "confidence":    round(max(legit_prob, phishing_prob) * 100, 2),
        "legit_prob":    round(legit_prob * 100, 2),
        "phishing_prob": round(phishing_prob * 100, 2),
    }