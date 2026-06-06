import './App.css'
import TrajectoryPlot from './components/TrajectoryPlot';
import { useState } from 'react';

type Trajectory = {
  x: number[]
  y: number[]
  z: number[]
}

const API_URL = 'http://localhost:8000/simulate'

function App() {
  const [trajectory, setTrajectory] = useState<Trajectory | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dt, setDt] = useState(0.01)
  const [numSteps, setNumSteps] = useState(10000)

  function runSimulation() {
    setError(null)

    fetch(API_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dt: dt,
        num_steps: numSteps,
        initial_state: [1,1,1],
      }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Request failed: $')
      }

      return response.json()
    })
    .then((data: Trajectory) => {
      setTrajectory(data)
    })
    .catch((error: Error) => {
      setError(error.message)
    })
  }




  return (
    <main className="app">
      <h1>Lorenz Attractor</h1>

      <label>
        Time step: {dt}
        <input
          type = "range"
          step="0.001"
          min="0.001"
          max="0.014"
          value = {dt}
          onChange = {(event) => setDt(Number(event.target.value))}
          />
      </label>

      <label>
        Number of Steps: {numSteps}
        <input
        type = "range"
        step = "100"
        min = "100"
        max = "39000"
        value = {numSteps}
        onChange = {(event) => setNumSteps(Number(event.target.value))}
        />
      </label>

      <button type="button" onClick={runSimulation}>
        Run Simulation
      </button>

       {error && <p>Could not load trajectory: {error} </p>}

    {trajectory && (
      <section className="plot-container">
        <TrajectoryPlot
        x={trajectory.x}
        y={trajectory.y}
        z={trajectory.z}
        />
      </section>
    )}
      
    </main>
  )
}

export default App
