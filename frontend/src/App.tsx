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
  const [sigma, setSigma] = useState(10)
  const [rho, setRho] = useState(28)
  const [beta, setBeta] = useState(2.67)

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
        sigma: sigma,
        rho: sigma,
        beta: beta
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

      <div className='simulation-page'>
        <div className='output-panel'>
          <div className='plot'>
             {trajectory && (
              <TrajectoryPlot
              x={trajectory.x}
              y={trajectory.y}
              z={trajectory.z}
              />
            )}
          </div>
    
          <button type="button" onClick={runSimulation}>
        Run Simulation
      </button>
        </div>

        <div className='parameter-panel'>
          <div className='parameter-control'>
                  <label>
        Time step: {dt}
        <input
          className='slider'
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
        className='slider'
        type = "range"
        step = "100"
        min = "100"
        max = "39000"
        value = {numSteps}
        onChange = {(event) => setNumSteps(Number(event.target.value))}
        />
      </label>
    
      <label>
        Sigma: {sigma}
        <input
        className = 'slider'
        type = "range"
        step = '0.1'
        min = '1'
        max = "30"
        value = {sigma}
        onChange = {(event) => setSigma(Number(event.target.value))}
        />
      </label>

      <label>
        Rho: {rho}
        <input
        className='slider'
        type = "range"
        step = '0.1'
        min = '0'
        max = "50"
        value = {rho}
        onChange = {(event) => setRho(Number(event.target.value))}
        />
      </label>

      <label>
        Beta: {beta}
        <input
        className='slider'
        type = "range"
        step = '0.01'
        min = '0.5'
        max = "10"
        value = {beta}
        onChange = {(event) => setBeta(Number(event.target.value))}
        />
      </label>
          </div>
        </div>


      </div>
      


      

       {error && <p>Could not load trajectory: {error} </p>}

   
      
    </main>
  )
}

export default App
