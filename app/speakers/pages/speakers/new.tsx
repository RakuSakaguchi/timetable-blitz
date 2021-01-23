import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createSpeaker from "app/speakers/mutations/createSpeaker"
import SpeakerForm from "app/speakers/components/SpeakerForm"

const NewSpeakerPage: BlitzPage = () => {
  const router = useRouter()
  const [createSpeakerMutation] = useMutation(createSpeaker)

  return (
    <div>
      <h1>Create New Speaker</h1>

      {/*<SpeakerForm*/}
      {/*  initialValues={{}}*/}
      {/*  onSubmit={async () => {*/}
      {/*    try {*/}
      {/*      const speaker = await createSpeakerMutation({ data: { name: "MyName" } })*/}
      {/*      alert("Success!" + JSON.stringify(speaker))*/}
      {/*      router.push(`/speakers/${speaker.id}`)*/}
      {/*    } catch (error) {*/}
      {/*      alert("Error creating speaker " + JSON.stringify(error, null, 2))*/}
      {/*    }*/}
      {/*  }}*/}
      {/*/>*/}

      <p>
        <Link href="/speakers">
          <a>Speakers</a>
        </Link>
      </p>
    </div>
  )
}

NewSpeakerPage.getLayout = (page) => <Layout title={"Create New Speaker"}>{page}</Layout>

export default NewSpeakerPage
