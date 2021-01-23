import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetSpeakersInput = Pick<Prisma.FindManySpeakerArgs, "where" | "orderBy" | "skip" | "take">

export default async function getSpeakers(
  { where, orderBy, skip = 0, take }: GetSpeakersInput,
  ctx: Ctx
) {
  // ctx.session.authorize()

  const speakers = await db.speaker.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.speaker.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    speakers,
    nextPage,
    hasMore,
    count,
  }
}
