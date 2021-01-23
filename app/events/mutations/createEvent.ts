import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateEventInput = Pick<Prisma.EventCreateArgs, "data">
export default async function createEvent({ data }: CreateEventInput, ctx: Ctx) {
  ctx.session.authorize()

  const event = await db.event.create({ data })

  return event
}
