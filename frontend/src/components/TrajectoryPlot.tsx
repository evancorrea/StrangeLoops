import PlotModule from 'react-plotly.js'
import type Plotly from 'plotly.js'

const Plot = (
    'default' in PlotModule ? PlotModule.default : PlotModule
) as typeof PlotModule

type TrajectoryPlotProps = {
    x: number[]
    y: number[]
    z: number[]
    stretching: number[]
}
function TrajectoryPlot({ x, y, z, stretching}: TrajectoryPlotProps) {
    return (
        <Plot
          data={[
            {
              type: 'scatter3d',
              mode: 'lines',
              x: x,
              y: y,
              z: z,
              name: "a strange loop",
              line: {
                color: stretching,
                colorscale: 'Viridis',
                width: 3,
                colorbar: {
                  title: { text: 'Local stretching'}
                }
              }
            } as Plotly.Data,
          ]}
          layout={{
            autosize: true,
            margin: { t: 0, r: 0, b: 0, l: 0 }
          }}
          useResizeHandler
          style={{ width: '100%', height: '100%'}}
        />
    )
}

export default TrajectoryPlot
