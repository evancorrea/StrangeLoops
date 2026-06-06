from integrators import rk4_step
from systems import lorenz
import numpy as np

dt = 0.01
num_steps = 10000
def run_simulation(dt, num_steps, initial_state, sigma, rho, beta):
    states = np.zeros((num_steps, 3))
    states[0] = np.array(initial_state)

    for i in range(1, num_steps):
        states[i] = rk4_step(lambda state: lorenz(state, sigma, rho, beta), states[i-1], dt)
    return states