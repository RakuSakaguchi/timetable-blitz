import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createEvent from "app/events/mutations/createEvent"
import EventForm from "app/events/components/EventForm"

const NewEventPage: BlitzPage = () => {
  const router = useRouter()
  const [createEventMutation] = useMutation(createEvent)

  return (
    <div>
      <h1>Create New Event</h1>

      <EventForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const event = await createEventMutation({ data: { name: "MyName" } })
            alert("Success!" + JSON.stringify(event))
            router.push(`/events/${event.id}`)
          } catch (error) {
            alert("Error creating event " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/events">
          <a>Events</a>
        </Link>
      </p>
    </div>
  )
}

NewEventPage.getLayout = (page) => <Layout title={"Create New Event"}>{page}</Layout>

export default NewEventPage
