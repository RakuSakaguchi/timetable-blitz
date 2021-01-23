import React, { useEffect, useState } from "react"

type Props = {
  start: string
  end: string
}

const Timer: React.FC<Props> = (props) => {
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  })

  useEffect(() => {
    const stop = () => {
      clearInterval(interval)
    }
    const interval = setInterval(() => {
      let date = calculateCountdown(props.start)
      if (date === false) {
        date = calculateCountdown(props.end)
      }
      date ? setState(date) : stop()
    }, 1000)
    return () => stop()
  })

  const calculateCountdown = (endDate) => {
    let diff =
      (Date.parse(new Date(endDate).toLocaleString("ja-JP")) -
        Date.parse(new Date().toLocaleString("ja-JP"))) /
      1000

    // clear countdown when date is reached
    if (diff <= 0) return false

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    }

    // calculate time difference between now and expected date
    if (diff >= 365.25 * 86400) {
      // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400))
      diff -= timeLeft.years * 365.25 * 86400
    }
    if (diff >= 3600) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400)
      diff -= timeLeft.days * 86400
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600)
      diff -= timeLeft.hours * 3600
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60)
      diff -= timeLeft.min * 60
    }
    timeLeft.sec = diff

    return timeLeft
  }

  const addLeadingZeros = (value) => {
    value = String(value)
    while (value.length < 2) {
      value = "0" + value
    }
    return value
  }

  const countDown = state
  let fa = "AFTER"
  const date = calculateCountdown(props.start)
  if (date === false) {
    fa = "REMAIN"
  }

  return (
    <>
      <div className="Countdown">
        <span>{fa} </span>

        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong>{addLeadingZeros(countDown.hours)}:</strong>
          </span>
        </span>

        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong>{addLeadingZeros(countDown.min)}:</strong>
          </span>
        </span>

        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong>{addLeadingZeros(countDown.sec)}</strong>
          </span>
        </span>
      </div>
    </>
  )
}

export default Timer
