from integrators import rk4_step
from systems import lorenz

dt = 0.01
num_steps = 10000

states = np.zeros((num_steps, 3))
states[0] = np.array([1.0, 1.0, 1.0])

for i in range(1, num_steps):
    states[i] = rk4_step(lorenz, states[i-1], dt)