import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getEvent from "app/events/queries/getEvent"
import deleteEvent from "app/events/mutations/deleteEvent"
import deleteSpeaker from "app/speakers/mutations/deleteSpeaker"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Clock } from "app/components/Clock"
import { Column } from "../../components/Column"
import { Box } from "@chakra-ui/react"

export const Event = () => {
  const router = useRouter()
  const eventId = useParam("eventId", "number")
  const [event] = useQuery(getEvent, { where: { id: eventId } })
  const [deleteEventMutation] = useMutation(deleteEvent)
  const [deleteSpeakerMutaion] = useMutation(deleteSpeaker)
  const currentUser = useCurrentUser()

  return (
    <div>
      <div className="clc">
        <Box align="center" ml={"-22px"}>
          <Clock />
        </Box>
      </div>
      <h1>{event.name}</h1>
      {/*<pre>{JSON.stringify(event.speakers, null, 2)}</pre>*/}

      {Object.values(event.speakers).map((e) => {
        return (
          <Link href={`/speakers/${e.id}`}>
            <p>
              <Column end={e.end} start={e.start} name={e.name} />
            </p>
          </Link>
        )
      })}

      {currentUser && (
        <>
          {currentUser.id === 1 && (
            <h2>
              <Link href={`/events/${event.id}/edit`}>
                <a>Edit</a>
              </Link>

              <button
                type="button"
                onClick={async () => {
                  console.log(event.id)
                  if (window.confirm("This will be deleted")) {
                    await deleteEventMutation({ where: { id: event.id } })

                    router.push("/events")
                  }
                }}
              >
                Delete
              </button>
            </h2>
          )}
        </>
      )}
    </div>
  )
}

const ShowEventPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/events">
          <a>Events</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Event />
      </Suspense>
    </div>
  )
}

ShowEventPage.getLayout = (page) => <Layout title={"Event"}>{page}</Layout>

export default ShowEventPage
