import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getSpeakers from "app/speakers/queries/getSpeakers"

const ITEMS_PER_PAGE = 100

export const SpeakersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ speakers, hasMore }] = usePaginatedQuery(getSpeakers, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {speakers.map((speaker) => (
          <li key={speaker.id}>
            <Link href={`/speakers/${speaker.id}`}>
              <a>{speaker.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const SpeakersPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/speakers/new">
          <a>Create Speaker</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <SpeakersList />
      </Suspense>
    </div>
  )
}

SpeakersPage.getLayout = (page) => <Layout title={"Speakers"}>{page}</Layout>

export default SpeakersPage
