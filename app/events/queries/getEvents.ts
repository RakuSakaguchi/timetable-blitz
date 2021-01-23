import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetEventsInput = Pick<Prisma.FindManyEventArgs, "where" | "orderBy" | "skip" | "take">

export default async function getEvents(
  { where, orderBy, skip = 0, take }: GetEventsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const events = await db.event.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.event.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    events,
    nextPage,
    hasMore,
    count,
  }
}
