import React, { useEffect, useState } from "react"

const Clock = () => {
  const [state, setState] = useState(new Date())

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000)
    return () => clearInterval(timerID)
  })

  const tick = () => {
    setState(new Date())
  }
  return (
    <div>
      <h1>{state.toLocaleTimeString("it-IT")} </h1>
    </div>
  )
}
export { Clock }
