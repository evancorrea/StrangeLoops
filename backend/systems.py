#define the Lorenz equations
import numpy as np

def lorenz(state, sigma, rho, beta):
    x, y, z = state

    dxdt = sigma * (y-x)
    dydt = x * (rho - z) - y
    dzdt = x * y - beta * z

    return np.array([dxdt, dydt, dzdt])

