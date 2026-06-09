#define the Lorenz equations
import numpy as np

def lorenz(state, sigma, rho, beta):
    x, y, z = state

    dxdt = sigma * (y-x)
    dydt = x * (rho - z) - y
    dzdt = x * y - beta * z

    return np.array([dxdt, dydt, dzdt])

def lorenz_jacobian(state, sigma, rho, beta):
    x, y, z, = state

    return np.array([
        [-sigma, sigma, 0],
        [rho - z, -1, -x],
        [y, x, -beta],
    ])