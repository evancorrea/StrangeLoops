from integrators import rk4_step
from systems import lorenz, lorenz_jacobian
import numpy as np

dt = 0.01
num_steps = 10000
def run_simulation(dt, num_steps, initial_state, sigma, rho, beta):
    states = np.zeros((num_steps, 3))
    states[0] = np.array(initial_state)

    system = lambda state: lorenz(state, sigma, rho, beta)

    for i in range(1, num_steps):
        states[i] = rk4_step(system, states[i-1], dt)

    stretching = np.zeros(num_steps)

    for i in range(num_steps):
        J = lorenz_jacobian(states[i], sigma, rho, beta)
        eigenvalues = np.linalg.eigvals(J)
        stretching[i] = np.max(np.real(eigenvalues))

    return states, stretching