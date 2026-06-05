import './App.css'
import PlotModule from 'react-plotly.js'
import { useEffect, useState} from 'react';

const Plot = (
  'default' in PlotModule ? PlotModule.default : PlotModule
) as typeof PlotModule

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
        <Plot
          data={[
            {
              type: 'scatter3d',
              mode: 'lines',
              x: trajectory.x,
              y: trajectory.y,
              z: trajectory.z,
            },
          ]}
          layout={{
            autosize: true,
            margin: { t: 0, r: 0, b: 0, l: 0 },
          }}
          useResizeHandler
          style={{ width: '100%', height: '100%' }}
        />
      </section>
    </main>
  )
}

export default App
