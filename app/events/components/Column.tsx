import React, { Suspense, useEffect, useState } from "react"
import Timer from "app/components/Timer"

type SpeakerProps = {
  name: string
  start: string
  end: string
}

const Column: React.FC<SpeakerProps> = (props) => {
  const [dates, setDates] = useState(new Date())
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDates(new Date())
    }, 1000)
    return () => clearInterval(intervalId)
  })

  let titleStyle = { color: "red" }
  if (new Date(props.end).getTime() < dates.getTime()) {
    titleStyle = { color: "gray" }
  }

  if (props.name.length >= 7) {
    titleStyle = { ...titleStyle }
  }
  return (
    <>
      <hr />

      <h1>{props.start.slice(16, 21)}</h1>

      <div style={titleStyle} className="name">
        {props.name}
      </div>

      <Timer start={props.start} end={props.end} />
    </>
  )
}

export { Column }
