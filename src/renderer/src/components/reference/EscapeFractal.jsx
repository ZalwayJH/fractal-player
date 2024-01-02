import React, { useState, useEffect, useRef } from 'react'
import Main from './Main'
// import Controls from './Controls'

const EscapeFractal = () => {
  const [params, setParams] = useState([0, 0, 0, 0, 0, 0])
  const [colorScheme, setColorScheme] = useState(3)
  const [controlsHidden, setControlsHidden] = useState(false)

  const instance = useRef(null)

  useEffect(() => {
    instance.current = Main({ params, colorScheme, controlsHidden })
  }, [])

  // const handleSetParams = (value, index) => {
  //   const newParams = [...params]
  //   newParams[index] = value
  //   setParams(newParams)
  //   instance.current.update(newParams)
  //   instance.current.render()
  // }

  // const handleSetColorScheme = (value) => {
  //   setColorScheme(value)
  //   instance.current.updateColors(value)
  //   instance.current.render()
  // }

  // const handleToggleControls = () => {
  //   setControlsHidden(!controlsHidden)
  // }

  return (
    <>
      {/* <Controls
        params={params}
        setParams={handleSetParams}
        setColorScheme={handleSetColorScheme}
        controlsHidden={controlsHidden}
        toggleControls={handleToggleControls}
      /> */}
      <div className="canvas-wrapper" id="canvas" />
    </>
  )
}

export default EscapeFractal
