import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getSpeaker from "app/speakers/queries/getSpeaker"
import deleteSpeaker from "app/speakers/mutations/deleteSpeaker"

export const Speaker = () => {
  const router = useRouter()
  const speakerId = useParam("speakerId", "number")
  const [speaker] = useQuery(getSpeaker, { where: { id: speakerId } })
  const [deleteSpeakerMutation] = useMutation(deleteSpeaker)

  return (
    <div>
      <h1>Speaker {speaker.id}</h1>
      <pre>{JSON.stringify(speaker, null, 2)}</pre>

      <Link href={`/speakers/${speaker.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteSpeakerMutation({ where: { id: speaker.id } })
            router.push("/speakers")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowSpeakerPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/speakers">
          <a>Speakers</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Speaker />
      </Suspense>
    </div>
  )
}

ShowSpeakerPage.getLayout = (page) => <Layout title={"Speaker"}>{page}</Layout>

export default ShowSpeakerPage
