import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getSpeaker from "app/speakers/queries/getSpeaker"
import updateSpeaker from "app/speakers/mutations/updateSpeaker"
import SpeakerForm from "app/speakers/components/SpeakerForm"

export const EditSpeaker = () => {
  const router = useRouter()
  const speakerId = useParam("speakerId", "number")
  const [speaker, { setQueryData }] = useQuery(getSpeaker, { where: { id: speakerId } })
  const [updateSpeakerMutation] = useMutation(updateSpeaker)

  return (
    <div>
      <h1>Edit Speaker {speaker.id}</h1>
      <pre>{JSON.stringify(speaker)}</pre>

      {/*<SpeakerForm*/}
      {/*  initialValues={speaker}*/}
      {/*  onSubmit={async () => {*/}
      {/*    try {*/}
      {/*      const updated = await updateSpeakerMutation({*/}
      {/*        where: { id: speaker.id },*/}
      {/*        data: { name: "MyNewName" },*/}
      {/*      })*/}
      {/*      await setQueryData(updated)*/}
      {/*      alert("Success!" + JSON.stringify(updated))*/}
      {/*      router.push(`/speakers/${updated.id}`)*/}
      {/*    } catch (error) {*/}
      {/*      console.log(error)*/}
      {/*      alert("Error editing speaker " + JSON.stringify(error, null, 2))*/}
      {/*    }*/}
      {/*  }}*/}
      {/*/>*/}
    </div>
  )
}

const EditSpeakerPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditSpeaker />
      </Suspense>

      <p>
        <Link href="/speakers">
          <a>Speakers</a>
        </Link>
      </p>
    </div>
  )
}

EditSpeakerPage.getLayout = (page) => <Layout title={"Edit Speaker"}>{page}</Layout>

export default EditSpeakerPage
