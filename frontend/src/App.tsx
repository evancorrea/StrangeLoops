import './App.css'
import TrajectoryPlot from './components/TrajectoryPlot';
import { useEffect, useState} from 'react';

type Trajectory = {
  x: number[]
  y: number[]
  z: number[]
}

function App() {
  const [trajectory, setTrajectory] = useState<Trajectory | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:8000/lorenz')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`)
        }

        return response.json()
      })
      .then((data: Trajectory) => {
        setTrajectory(data)
      })
      .catch((error: Error) => {
        setError(error.message)
      })
  }, [])

  if (error) {
    return <p>Could not load trajectory: {error}</p>
  }

  if (!trajectory) {
    return <p>Loading trajectory...</p>
  }

  return (
    <main className="app">
      <h1>Lorenz Attractor</h1>

      <section className="plot-container">
        <TrajectoryPlot
        x={trajectory.x}
        y={trajectory.y}
        z={trajectory.z}
        />
      </section>
    </main>
  )
}

export default App
