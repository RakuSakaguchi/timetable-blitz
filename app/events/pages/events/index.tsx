import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getEvents from "app/events/queries/getEvents"
import { Box, SimpleGrid, Heading, Center } from "@chakra-ui/react"

const ITEMS_PER_PAGE = 100

export const EventsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ events, hasMore }] = usePaginatedQuery(getEvents, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <SimpleGrid columns={2} spacing={8} mr="15px" ml="15px" mt={"18px"}>
        {events.map((e) => (
          <h2 key={e.id}>
            <Link href={"/events/" + e.id}>
              <Box
                borderRadius="md"
                boxShadow="lg"
                height="80px"
                color="white"
                m={[0, 2, 0, 2]}
                bgGradient="linear(to-r, gray.800, gray.700)"
                align="center"
                position="relative"
              >
                <Center color="white" pt="30px">
                  <Heading as="h1" size="md" letterSpacing={"-0.4px"}>
                    {e.name}
                  </Heading>
                </Center>
              </Box>
            </Link>
          </h2>
        ))}
      </SimpleGrid>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const EventsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/events/new">
          <a>Create Event</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <EventsList />
      </Suspense>
    </div>
  )
}

EventsPage.getLayout = (page) => <Layout title={"Events"}>{page}</Layout>

export default EventsPage
