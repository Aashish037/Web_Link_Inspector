# PhishGuard — Backend (FastAPI)

This folder contains the FastAPI server for extracting URL features and running model predictions.

## Backend folder structure

```
backend/
├── main.py                 ← FastAPI application and HTTP routes
├── feature_extractor.py    ← URL feature extraction logic
├── predictor.py            ← Loads models and runs inference
├── requirements.txt        ← Python dependencies
├── models/                 ← Exported model files used by the API
│   └── best_model.keras
├── venv/                   ← Local Python virtual environment (generated)
└── README.md
```

## Prerequisites

- Python 3.10+ installed
- `pip` available in your PATH
- `uvicorn` installed from `requirements.txt`

## Setup (create and use a virtual environment)

1. Open a terminal or PowerShell in `d:\phishguard\backend`
2. Create a new virtual environment:
   ```powershell
   python -m venv venv
   ```
3. Activate the virtual environment:
   - PowerShell:
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - Command Prompt:
     ```cmd
     .\venv\Scripts\activate.bat
     ```
   - Git Bash / Bash on Windows:
     ```bash
     source venv/Scripts/activate
     ```
4. Install the backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Prepare model files

- Place your exported model files inside `backend/models/`
- Example model file: `backend/models/best_model.keras`
- The server will load models from this folder at runtime

## Run the backend server

With the virtual environment active, start FastAPI:

```bash
uvicorn main:app --reload --port 8000
```

Then open:

- `http://localhost:8000`
- `http://localhost:8000/docs` for interactive API documentation

## API endpoints

| Method | Path                   | Description                |
| ------ | ---------------------- | -------------------------- |
| GET    | `/`                    | Health check               |
| GET    | `/status`              | List available model files |
| POST   | `/extract`             | Extract URL features       |
| POST   | `/predict/{model_key}` | Predict with one model     |
| POST   | `/predict-all`         | Predict with all models    |

### model_key values

Use one of: `lr`, `rf`, `svm`, `dnn`, `cnn`, `lstm`

## Example requests

Extract features:

```bash
curl -X POST http://localhost:8000/extract \
  -H "Content-Type: application/json" \
  -d '{"url":"http://192.168.1.1/login@secure.php"}'
```

Predict with a model:

```bash
curl -X POST http://localhost:8000/predict/rf \
  -H "Content-Type: application/json" \
  -d '{"url":"http://192.168.1.1/login"}'
```

## Notes

- If you already have `backend/venv/`, reuse it by activating the environment instead of recreating it.
- If your exported model files have different names, place them in `backend/models/` and update the server code if needed.
