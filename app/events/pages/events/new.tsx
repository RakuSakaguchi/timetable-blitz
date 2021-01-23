import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createEvent from "app/events/mutations/createEvent"
import EventForm from "app/events/components/EventForm"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import React, { Suspense, useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"
import setHours from "date-fns/setHours"
import setMinutes from "date-fns/setMinutes"
import logout from "../../../auth/mutations/logout"
import { createEventMutation } from "app/events/mutations/createEvent"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <div>
        <EventForm
          initialValues={{}}
          onSubmit={async () => {
            try {
              const event = await createEventMutation({
                data: { name: "fa", start: "fa", end: "end", userId: currentUser.id },
              })
              alert("Success!" + JSON.stringify(event.id))
              // router.push(`/events/${event.id}`)
            } catch (error) {
              alert("Error creating event " + JSON.stringify(error, null, 2))
            }
          }}
        />
      </div>
    )
  } else {
    return (
      <>
        <Link href="/signup">
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href="/login">
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const NewEventPage: BlitzPage = () => {
  const [createEventMutation] = useMutation(createEvent)
  // const currentUser = useCurrentUser()

  const [speakers, setSpeakers] = useState({
    0: {
      order: 0,
      name: "START",
      start: Date(),
      end: Date(),
      eventId: 0,
    },
  })
  const [name, SetName] = useState("イベント名")
  const [place, setPlace] = useState("イベント会場")

  return (
    <>
      <h2>
        イベント名:{" "}
        <input
          className="in"
          type="text"
          value={name}
          onChange={(event) => {
            SetName(event.target.value)
          }}
        />
      </h2>
      <h2>
        場所:{" "}
        <input
          className="in"
          type="text"
          value={place}
          onChange={(event) => {
            setPlace(event.target.value)
          }}
        />
      </h2>
      <hr />
      {Object.values(speakers).map((e: any) => {
        console.log(e)
        return (
          <>
            {(() => {
              if (e.order === 0) {
                return (
                  <>
                    <input
                      className="in"
                      type="text"
                      value={e.name}
                      onChange={(event) => {
                        setSpeakers((task) => {
                          const target = {
                            ...speakers[e.order],
                            name: event.target.value,
                          }
                          return { ...task, [e.order]: target }
                        })
                      }}
                    />
                    <>
                      <DatePicker
                        className="in"
                        selected={new Date(speakers[e.order].end)}
                        onChange={(date) => {
                          if (e.order === 0) {
                            setSpeakers((task) => {
                              const target = {
                                ...speakers[e.order],
                                start: String(date),
                                end: String(date),
                              }
                              return { ...task, [e.order]: target }
                            })
                          } else {
                            setSpeakers((task) => {
                              const target = {
                                ...speakers[e.order],
                                end: String(date),
                              }
                              return { ...task, [e.order]: target }
                            })
                          }

                          if (speakers[e.order + 1]) {
                            setSpeakers((task) => {
                              const target = {
                                ...speakers[e.order + 1],
                                start: String(date),
                              }
                              return {
                                ...task,
                                [e.order + 1]: target,
                              }
                            })
                          }
                        }}
                        showTimeSelect
                        timeFormat="HH:mm"
                        injectTimes={[
                          setHours(setMinutes(new Date(), 1), 0),
                          setHours(setMinutes(new Date(), 5), 12),
                          setHours(setMinutes(new Date(), 59), 23),
                        ]}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        showTimeInput
                      />
                      <h3>開始：{e.start}</h3>
                      <h3>終了：{e.end}</h3>
                    </>
                  </>
                )
              } else {
                return (
                  <>
                    <p>
                      <input
                        className="in"
                        type="text"
                        value={e.name}
                        onChange={(event) => {
                          setSpeakers((task) => {
                            const target = {
                              ...speakers[e.order],
                              name: event.target.value,
                            }
                            return { ...task, [e.order]: target }
                          })
                        }}
                      />
                    </p>
                    <>
                      <DatePicker
                        className="in"
                        selected={new Date(speakers[e.order].end)}
                        onChange={(date) => {
                          if (e.order === 0) {
                            setSpeakers((task) => {
                              const target = {
                                ...speakers[e.order],
                                start: String(date),
                                end: String(date),
                              }
                              return { ...task, [e.order]: target }
                            })
                          } else {
                            setSpeakers((task) => {
                              const target = {
                                ...speakers[e.order],
                                end: String(date),
                              }
                              return { ...task, [e.order]: target }
                            })
                          }

                          if (speakers[e.order + 1]) {
                            setSpeakers((task) => {
                              const target = {
                                ...speakers[e.order + 1],
                                start: String(date),
                              }
                              return {
                                ...task,
                                [e.order + 1]: target,
                              }
                            })
                          }
                        }}
                        showTimeSelect
                        timeFormat="HH:mm"
                        injectTimes={[
                          setHours(setMinutes(new Date(), 1), 0),
                          setHours(setMinutes(new Date(), 5), 12),
                          setHours(setMinutes(new Date(), 59), 23),
                        ]}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        showTimeInput
                      />
                      <h3>開始：{e.start}</h3>
                      <h3>終了：{e.end}</h3>
                    </>
                  </>
                )
              }
            })()}
          </>
        )
      })}

      <button
        onClick={() => {
          console.log("fa")
          console.log(speakers)
          console.log("fa")
          setSpeakers((task) => {
            const order = parseInt(String(Object.keys(speakers).length))

            return {
              ...task,
              [order]: {
                order,
                eventId: 4,
                name: "初期",
                start: speakers[order - 1].end,
                end: Date(),
              },
            }
          })
        }}
      >
        add
      </button>

      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </>
  )
}

NewEventPage.getLayout = (page) => <Layout title={"Create New Event"}>{page}</Layout>

export default NewEventPage
