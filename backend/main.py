from fastapi import FastAPI
from pydantic import BaseModel
from simulation import run_simulation
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

class SimulationRequest(BaseModel):
    dt: float
    num_steps: int
    initial_state: list[float]
    sigma: float
    rho: float
    beta: float
    

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/simulate")
def simulate(request: SimulationRequest):
    trajectory, stretching = run_simulation(
        request.dt,
        request.num_steps,
        request.initial_state,
        request.sigma,
        request.rho,
        request.beta,
    )

    return {
        "x": trajectory[:, 0].tolist(),
        "y": trajectory[:, 1].tolist(),
        "z": trajectory[:, 2].tolist(),
        "stretching": stretching.tolist(),
    }