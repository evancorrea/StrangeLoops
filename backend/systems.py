#define the Lorenz equations
import numpy as np

def lorenz(state, sigma=10, rho=28, beta=8/3):
    x, y, z = state

    dxdt = sigma * (y-x)
    dydt = x * (rho - z) - y
    dzdt = x * y - beta * z

    return np.array([dxdt, dydt, dzdt])

