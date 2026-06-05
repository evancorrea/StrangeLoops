from fastapi import FastAPI
from simulation import run_simulation
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/lorenz")
def get_lorenz():
    trajectory = run_simulation(0.01, 10000)

    return {
        "x": trajectory[:, 0].tolist(),
        "y": trajectory[:, 1].tolist(),
        "z": trajectory[:, 2].tolist()
    }