def rk4_step(f, state, dt):
    k1 = f(state)
    k2 = f(state + 0.5 * dt * k1)
    k3 = f(state + 0.5 * dt * k2)
    k4 = f(state + dt * k3)

    next_state = state + (dt/6) * (k1 + 2*k2 + 2*k3 + k4)

    return next_state


def euler_step(f, state, dt):
    return state + dt * f(state)