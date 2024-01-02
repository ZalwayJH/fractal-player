import React, { useState, useEffect, useRef } from 'react'
import Main from './Main'

function Versions() {
  const instance = useRef(null)
  const params = [0, 0, 0, 0, 0, 0]
  const colorScheme = 3
  const controlsHidden = true

  useEffect(() => {
    instance.current = Main({ params, colorScheme, controlsHidden })
  }, [])

  return <div className="canvas-wrapper" id="canvas" />
}

export default Versions
