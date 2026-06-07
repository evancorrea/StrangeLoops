import './App.css'
import TrajectoryPlot from './components/TrajectoryPlot';
import { useState } from 'react';
import ParameterPanel from './components/ParameterPanel';

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
        rho: rho,
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
          <ParameterPanel
            dt={dt}
            setDt={setDt}
            numSteps={numSteps}
            setNumSteps={setNumSteps}
            sigma={sigma}
            setSigma={setSigma}
            rho={rho}
            setRho={setRho}
            beta={beta}
            setBeta={setBeta}
          />


      </div>
      


      

       {error && <p>Could not load trajectory: {error} </p>}

   
      
    </main>
  )
}

export default App
