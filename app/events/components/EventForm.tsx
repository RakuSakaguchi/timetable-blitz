import React from "react"

type EventFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const EventForm = ({ initialValues, onSubmit }: EventFormProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <button>Submit</button>
    </form>
  )
}

export default EventForm
