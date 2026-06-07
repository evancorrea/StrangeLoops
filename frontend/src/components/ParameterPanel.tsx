
// need to pass in variables eventually used by the component. 
type ParameterPanelProps = {
    dt: number
    setDt: (value: number) => void
    numSteps: number
    setNumSteps: (value: number) => void
    sigma: number
    setSigma: (value: number) => void
    rho: number
    setRho: (value: number) => void
    beta: number
    setBeta: (value: number) => void
}



function ParameterPanel({
    dt,
    setDt,
    numSteps,
    setNumSteps,
    sigma,
    setSigma,
    rho,
    setRho,
    beta,
    setBeta,
}:  ParameterPanelProps) {
    function resetParameters() {
    setDt(0.01)
    setNumSteps(10000)
    setSigma(10)
    setRho(28)
    setBeta(2.67)
}
    return (
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
                <button type = "button" onClick={resetParameters}>
                    Reset Parameters
                </button>
            </div>
        </div>
    )
    }

    export default ParameterPanel
